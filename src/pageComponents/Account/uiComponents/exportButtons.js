import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { exportToExcel, exportToPdf, getCsvFormattedData } from '../../_common/helpers/generalHelperFunctions'
import { CSVLink } from 'react-csv'

const ButtonExport = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border: 1px solid lightgrey;
	border-radius: 5px;
	margin: 10px 4px;
	&:hover {
		background-color: whitesmoke;
	}
`

const DivRow = styled.div`
	display: flex;
	align-items: center;
`

export default function ExportButtons({ data, columns, title, hidePDF }) {
    const exportIgnoreColumns = ['filter']
    const prepareDataForExport = ({ total, ...rest }) => ({ ...rest, total: total.props.value })

    const preparedData = title === 'Orders' ? data.map(prepareDataForExport) : data

    const handleExcelExport = () => {
        if (data.length) {
            exportToExcel(preparedData, columns, title, exportIgnoreColumns)
        }
    }

    const handlePdfExport = () => {
        if (data.length) {
            exportToPdf(preparedData, columns, title, exportIgnoreColumns, title === 'Open Orders')
        }
    }

    return (
        <DivRow>
            {!hidePDF && (
                <ButtonExport onClick={handlePdfExport}>
                    <FontAwesomeIcon size='lg' icon="file-pdf" color="#ff0000" />
                </ButtonExport>
            )}
            <ButtonExport onClick={handleExcelExport}>
                <FontAwesomeIcon size='lg' icon="file-excel" color="#1d6f42" />
            </ButtonExport>
            <CSVLink data={getCsvFormattedData(preparedData, columns, exportIgnoreColumns)}>
                <ButtonExport>
                    <FontAwesomeIcon size='lg' icon="file-csv" color="grey" />
                </ButtonExport>
            </CSVLink>
        </DivRow>
    )
}
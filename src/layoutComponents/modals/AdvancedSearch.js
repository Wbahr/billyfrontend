import React, { useContext, useEffect, useState } from 'react'
import DebounceInput from 'react-debounce-input'
import { FormikStyleLabel } from 'pageComponents/_common/formik/input_v2'
import { useLazyQuery } from '@apollo/client'
import Select from 'react-select'
import Modal from 'pageComponents/_common/modal'
import AdvancedResultsTable from '../uiComponents/AdvancedResultsTable'
import Context from 'setup/context'
import { ADVANCED_IMPERSONATION_SEARCH } from 'setup/providerGQL'
import styled from 'styled-components'

const Center = styled.div`
    display: flex;
    justify-content: space-around;
`

const FlexContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media (max-width: 1224px) {
		justify-content: center;
	}
`

const WrapSelect = styled.div`
    margin-left: -5px;
    margin-top: 2px;
`

const searchTypeOptions = [
    { label: 'Address', value: 'address' },
    { label: 'Ship To', value: 'shipTo' },
    { label: 'Contact Name', value: 'contactName' },
]

export default function AdvancedSearch({ open, onClose }) {
    const context = useContext(Context)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchType, setSearchType] = useState({ label: 'Address', value: 'address' })

    const [impersonationSearch] = useLazyQuery(ADVANCED_IMPERSONATION_SEARCH, {
        onCompleted: data => {
            setData(data.getImpersonationCustomerList)
            setLoading(false)
        }
    })

    useEffect(() => {
        if (searchTerm.length > 0 && context.userInfo?.isAirlineEmployee) {
            setLoading(true)
            impersonationSearch({ variables: { searchString: searchTerm } })
        } else {
            setData([])
        }
    }, [searchTerm])

    function handleOnClose() {
        setSearchTerm('')
        onClose()
    }

    const SelectStyle = {
        control: (provided) => ({
            ...provided,
            borderRadius: '1px',
            border: '1px solid #e1e1e1',
            marginTop: '-4px',
            padding: '0px 10px'
        }),
    }

    const theme = (theme) => ({
        ...theme,
        spacing: {
            ...theme.spacing,
            controlHeight: 30,
            baseUnit: 0,
        }
    })
    
    function impersonate(e) {
        context.startImpersonation(e)
        handleOnClose()
    }

    return (
        <Modal open={open} onClose={handleOnClose}>
            <Center>
                Advanced Search
            </Center>
            <FlexContainer>
                <FormikStyleLabel label='Search For' width='300px'>
                    <WrapSelect>
                        <Select
                            value={searchType}
                            onChange={setSearchType}
                            options={searchTypeOptions}
                            isSearchable={true}
                            styles={SelectStyle}
                            theme={theme}
                        />
                    </WrapSelect>
                </FormikStyleLabel>
                <FormikStyleLabel label='Search Term' width='300px'>
                    <DebounceInput
                        minLength={0}
                        debounceTimeout={300}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                </FormikStyleLabel>
            </FlexContainer>
            <AdvancedResultsTable impersonate={impersonate} data={data} loading={loading} />
        </Modal>
    )
}
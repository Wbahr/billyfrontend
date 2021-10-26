import React, { useContext, useState } from 'react'
import { FormikStyleLabel, FormikStyleInput } from 'pageComponents/_common/formik/input_v2'
import { StateList, CanadianProvinceList } from '../../pageComponents/_common/helpers/helperObjects'
import { useLazyQuery } from '@apollo/client'
import { ButtonRed } from 'styles/buttons'
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

const BtnMargin = styled.div`
    margin: 15px;
`

const WrapSelect = styled.div`
    margin-top: 2px;
`

const searchTypeOptions = [
    { label: 'Customer Address', value: 'customer-address' },
    { label: 'Ship To Address', value: 'shipto-address' },
    { label: 'Contact Name', value: 'contact-name' },
]

export default function AdvancedSearch({ open, onClose }) {
    const context = useContext(Context)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerms, setSearchTerms] = useState({ searchType: 'customer-address' })
    const [stateCode, setStateCode] = useState({})
    const [searchType, setSearchType] = useState({ label: 'Customer Address', value: 'customer-address' })
    
    const [impersonationSearch] = useLazyQuery(ADVANCED_IMPERSONATION_SEARCH, {
        onCompleted: data => {
            setData(data.customerImpersonateAdvancedSearch)
            setLoading(false)
        }
    })

    function search() {
        setLoading(true)    
        impersonationSearch({ variables: { ...searchTerms } })
    }

    function setSearchTerm(field, value) {
        setSearchTerms({ ...searchTerms, [field]: value })
    }

    function handleSetSearchType(e) {
        setStateCode({})
        setSearchTerms({ searchType: e.value })
        setSearchType(e)
    }

    function handleSetStateCode(e) {
        setStateCode(e)
        setSearchTerm('stateCode', e.value)
    }

    function handleOnClose() {
        setSearchTerms({})
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
            <Center>
                <FormikStyleLabel label='Search By' width='300px'>
                    <WrapSelect>
                        <Select
                            value={searchType}
                            onChange={handleSetSearchType}
                            options={searchTypeOptions}
                            isSearchable={true}
                            styles={SelectStyle}
                            theme={theme}
                        />
                    </WrapSelect>
                </FormikStyleLabel>
            </Center>
            {searchType.value === 'contact-name' ? (
                <FlexContainer>
                    <FormikStyleInput
                        label='First Name'
                        width='300px'
                        onChange={(e) => setSearchTerm('contactFirstName', e.target.value)}
                        value={searchTerms.contactFirstName || ''}
                        key='fname'
                    />
                    <FormikStyleInput
                        label='Last Name'
                        width='300px'
                        onChange={(e) => setSearchTerm('contactLastName', e.target.value)}
                        value={searchTerms.contactLastName || ''}
                        key='lname'
                    />
                </FlexContainer>
            ) : (
                <FlexContainer>
                    <FormikStyleInput
                        label='Address'
                        width='300px'
                        onChange={(e) => setSearchTerm('address1', e.target.value)}
                        value={searchTerms.address1 || ''}
                        key='add'
                    />
                    <FormikStyleInput
                        label='City'
                        width='300px'
                        onChange={(e) => setSearchTerm('city', e.target.value)}
                        value={searchTerms.city || ''}
                        key='city'
                    />
                    <FormikStyleLabel label='State/Province' width='300px' key='state'>
                        <WrapSelect>
                            <Select
                                width='300px'
                                onChange={handleSetStateCode}
                                value={stateCode}
                                options={[...StateList, ...CanadianProvinceList]}
                                isSearchable={true}
                                styles={SelectStyle}
                                theme={theme}
                            />
                        </WrapSelect>
                    </FormikStyleLabel>
                    <FormikStyleInput
                        label='Postal Code'
                        width='300px'
                        onChange={(e) => setSearchTerm('postalCode', e.target.value)}
                        value={searchTerms.postalCode || ''}
                        key='zip'
                    />
                </FlexContainer>
            )}
            <BtnMargin>
                <Center>
                    <ButtonRed onClick={search}>Search</ButtonRed>
                </Center>
            </BtnMargin>
            <AdvancedResultsTable impersonate={impersonate} data={data} loading={loading} />
        </Modal>
    )
}
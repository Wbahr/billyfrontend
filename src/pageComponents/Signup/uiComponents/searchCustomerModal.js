import React, { useState, useEffect, useContext } from 'react'
import Context from '../../../setup/context'
import Modal from '../../_common/modal'
import styled from 'styled-components'
import { FormikStyleInput } from 'pageComponents/_common/formik/input_v2'
import { useLazyQuery } from '@apollo/client'
import { IMPERSONATION_SEARCH } from 'setup/providerGQL'
import { ButtonRed } from 'styles/buttons'
import SearchIcon from '@material-ui/icons/Search'
import Loader from 'pageComponents/_common/loader'

const ResultListItem = styled.li`
  cursor: pointer;
`

const DivRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const Container = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
  padding: 12px 24px;
  h4 {
    font-family: ${props => props.theme.fancyFontNameBold};
  }
  p {
    font-family: ${props => props.theme.fancyFontName};
    text-align: center;
  }
  button {
    margin-top: 8px;
  }
`

export default function SearchCustomerModal({ open, hideModal, initialValue, setSelectedCustomerIdCallback }) {
    const context = useContext(Context)
    const [searchResults, setSearchResults] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        if (initialValue) {
            setSearchQuery(String(initialValue))
        }
    }, [initialValue])

    const [performSearch, { loading, data }] = useLazyQuery(IMPERSONATION_SEARCH, {
        fetchPolicy: 'no-cache',
        onCompleted() {
            setSearchResults(data.getImpersonationCustomerList)
        }
    }
    )

    const customerSearch = () => {
        if (context.userInfo?.isAirlineEmployee) { 
            performSearch({ variables: { searchString: searchQuery } }) 
        }
    }

    return (
        <Modal open={open} onClose={() => hideModal()} >
            <Container>
                <DivRow>
                    <FormikStyleInput name="customerSearch" type="text" label="Search Customer" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </DivRow>
                <DivRow>
                    <ButtonRed type="button" onClick={customerSearch}><SearchIcon /> Search</ButtonRed>
                </DivRow>
                <DivRow>
                    {loading && <Loader />}
                    <ul>
                        {searchResults && searchResults.map(({ customerIdP21, name }) => {
                            return (
                                <ResultListItem key={customerIdP21}>
                                    <a onClick={() => {
                                        hideModal()
                                        setSelectedCustomerIdCallback(customerIdP21)
                                    }}
                                    >
                                        {name}
                                    </a>
                                </ResultListItem>
                            )
                        })}
                    </ul>
                </DivRow>
            </Container>
        </Modal>
    )
}
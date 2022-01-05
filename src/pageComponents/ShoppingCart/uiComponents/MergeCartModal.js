import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import Loader from '../../_common/loader'
import { useLazyQuery, useMutation } from '@apollo/client'
import { GET_ALL_USER_CARTS, IMPERSONATION_SEARCH, MERGE_CART_TO_CUSTOMER } from '../../../setup/providerGQL'
import Context from '../../../setup/context'
import { Search as SearchIcon } from '@mui/icons-material'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    List,
    ListSubheader,
    ListItem,
    ListItemText,
    Input,
    InputAdornment,
    Button,
    Divider
} from '@mui/material'
import { useDebounceValue } from '../../_common/helpers/generalHelperFunctions'

const DivShare = styled.div`
	cursor: pointer;
	margin-right: 4px;
	align-self: flex-end;
`

const DivSave = styled(DivShare)`
	margin-right: 16px;
`

const Ashare = styled.a`
	margin-right: 4px;
`

const SearchBar = styled(Input)`
    margin: 8px 16px;
    flex: 1;
`

export default function MergeCartModal() {
    const context = useContext(Context)
    const [open, setOpen] = useState(false)
    const [userCartsData, setUserCartsData] = useState([])
    const [searchString, setSearchString] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const debouncedSearch = useDebounceValue(searchString)

    useEffect(() => {
        if (context.userInfo?.isAirlineEmployee){
            impersonationSearch({ variables: { searchString: debouncedSearch } })
        }
    }, [debouncedSearch])

    const [mergeCart, { loading: mergeCartLoading }] = useMutation(MERGE_CART_TO_CUSTOMER, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            context.startImpersonation(data.copyShoppingCartToCustomer.customerId)
        }
    })

    const [getUserCarts, { loading: userCartsDataLoading }] = useLazyQuery(GET_ALL_USER_CARTS, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            setUserCartsData(data.employeeCarts)
        }
    })

    const [impersonationSearch, { loading: searchLoading }] = useLazyQuery(IMPERSONATION_SEARCH, {
        onCompleted: data => {
            setSearchResults(data.getImpersonationCustomerList)
        }
    })

    const handleMergeCartClick = () => {
        if (!userCartsData.length) {
            getUserCarts()
        }
        setOpen(true)
    }

    const handleListItemClick = customerId => () => {
        mergeCart({ variables: { customerId } })
        setOpen(false)
    }

    const handleClose = () => setOpen(false)

    const handleSearchChange = ({ target: { value } }) => setSearchString(value)

    return (
        <>
            <DivSave onClick={handleMergeCartClick}>
                <Ashare>Merge Cart</Ashare>
                <FontAwesomeIcon icon="code-branch" color="grey" />
            </DivSave>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>
                    Merge Cart Into...
                </DialogTitle>

                <DialogContent dividers style={{ padding: 0 }}>
                    <Grid container direction="column">
                        <SearchBar
                            autoFocus
                            placeholder="Search for other Customers"
                            value={searchString}
                            onChange={handleSearchChange}
                            startAdornment={(
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            )}
                        />

                        <Divider/>

                        <List subheader={<ListSubheader>Other Carts</ListSubheader>}>
                            {(userCartsDataLoading || mergeCartLoading) && <Loader />}
                            {userCartsData.map(({ customerId, customerName, shoppingCartItemCount }) => (
                                <ListItem
                                    button
                                    key={`${customerName}_${customerId}`}
                                    onClick={handleListItemClick(customerId)}
                                >
                                    <ListItemText
                                        primary={`${customerName} - ${shoppingCartItemCount} items`}
                                        secondary={customerId}
                                    />
                                </ListItem>
                            ))}
                        </List>

                        <Divider/>

                        <List subheader={<ListSubheader>Other Customers</ListSubheader>}>
                            {(searchLoading || mergeCartLoading) && <Loader />}
                            {searchResults.map(({ id, name }) => (
                                <ListItem
                                    button
                                    key={`${name}_${id}`}
                                    onClick={handleListItemClick(id)}
                                >
                                    <ListItemText primary={name} secondary={id}/>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

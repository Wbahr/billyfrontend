import React, { useState, useContext, useEffect } from 'react'
import Modal from '../modal'
import styled from 'styled-components'
import Context from '../../../setup/context'
import { ButtonBlack, ButtonRed } from '../../../styles/buttons'
import Select from 'react-select'
import AirlineInput from '../../_common/form/inputv2'

const DivRow = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
`

const DivItem = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  margin: 0;
  font-size: 12px;
  font-style: italic;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 24px;
  h4 {
    font-family: ProximaBold;
  }
  p {
    font-family: Proxima;
    text-align: center;
  }
  button {
    margin-top: 8px;
  }
`

const ErrorSpan = styled.div`
	color: red;
	text-align: center;
`

export default function AddToShoppingListModal({ open, hide, item, customerPartNumberId }) {
    const context = useContext(Context)
    const [listName, setListName] = useState('')
    const [listNotes, setListNotes] = useState('')
    const [selectedUser, setSelectedUser] = useState(null)
    const [selectedLists, setSelectedLists] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [error, setError] = useState('')
	
    const userOptions = context.webUserContacts.map(({ firstName, lastName, webUserId }) => ({ label: `${firstName} ${lastName || ''}`, value: webUserId }))
    const loading = context.upsertShoppingListState?.loading
	
    useEffect(() => {
        if (!context.userInfo?.webUserId) context.getWebUserContacts()
        context.getShoppingLists()
    }, [context.userInfo])
	
    const mapListOptions = ({ name, id }) => ({ label: name, value: id })
	
    const listOptions = context.shoppingLists
        .filter(list => (context.userInfo.webUserId || selectedUser?.value) === list.webUserIdOwner)
        .map(mapListOptions)
	
    const handleListNameChange = ({ target: { value } }) => setListName(value)
    const handleListNotesChange = ({ target: { value } }) => setListNotes(value)
	
    const handleClose = () => {
        setError('')
        setSelectedLists([])
        setSelectedUser(null)
        hide()
    }
	
    const handleUserChange = value => {
        setSelectedLists(null)
        setSelectedUser(value)
    }
	
    const handleAdd = () => {
        if (!context.userInfo.webUserId && !selectedUser) {
            setError('Please select a user')
        } else if ((!selectedLists || !selectedLists.length) && (!listName || !listName.length)) {
            setError('Please select a list or enter a name')
        } else if (listName && listName.length) {
            setError('')
            context.upsertShoppingList({
                webUserIdOwner: context.userInfo.webUserId || selectedUser.value,
                name: listName,
                notes: listNotes,
                shoppingListItems: [{ ...item, customerPartNumberId }],
                editors: []
            }).then(() => hide())
        } else {
            setError('')
            const { itemCode, invMastUid } = item
            const shoppingLists = selectedLists.map(selectedList => {
                const foundList = context.shoppingLists.find(list => list.id === selectedList.value)
                return { ...foundList, shoppingListItems: [...foundList.shoppingListItems, { itemCode, invMastUid, quantity, customerPartNumberId }] }
            })
            Promise.all(shoppingLists.map(list => context.upsertShoppingList(list)))
                .then(() => hide())
        }
    }
	
    const handleQtyChange = ({ target: { value } }) => {
        const cleanVal = value.replace(/\D/g, '')
        const quantity = cleanVal.length ? parseInt(cleanVal) : null
        setQuantity(quantity)
    }
	
    useEffect(() => {
        if (listName?.length || listNotes?.length) {
            setSelectedLists([])
        }
    }, [listName, listNotes])
	
    useEffect(() => {
        if (selectedLists && selectedLists.length) {
            setListName('')
            setListNotes('')
        }
    }, [selectedLists])
	
    return (
        <Modal open={open} onClose={handleClose} contentStyle={{ maxWidth: '350px', borderRadius: '3px', marginTop: 115 }}>
            <Container>
                { !context.userInfo?.webUserId && (
                    <DivItem style={{ width: 200 }}>
                        <Label>Select User</Label>
                        <Select
                            value={selectedUser}
                            onChange={handleUserChange}
                            options={userOptions}
                            placeholder='Search by name'
                        />
                    </DivItem>
                )}
				
                <DivItem style={{ marginTop: 20 }}>
                    <Label>Quantity</Label>
                    <AirlineInput type="number" width={200} value={quantity} onChange={handleQtyChange}/>
                </DivItem>
				
                <DivItem style={{ margin: '20px 0' }}>
                    <p>Select lists to add this item to</p>
                    <Select
                        isMulti
                        value={selectedLists}
                        onChange={setSelectedLists}
                        options={listOptions}
                        placeholder='Search lists'
                    />
                </DivItem>
				
                <p>Or save as new list</p>
				
                <DivItem>
                    <Label>Shopping List Name: </Label>
                    <AirlineInput value={listName} width="300px" onChange={handleListNameChange}/>
                </DivItem>
				
                <DivItem>
                    <Label>Notes: </Label>
                    <textarea value={listNotes} onChange={handleListNotesChange} rows={3} style={{ width: 300 }}/>
                </DivItem>
				
                <ErrorSpan>{error}</ErrorSpan>
                <DivRow>
                    <ButtonBlack onClick={handleClose}>Cancel</ButtonBlack>
                    <ButtonRed disabled={loading} onClick={handleAdd}>{loading ? 'Adding...' : 'Add'}</ButtonRed>
                </DivRow>
            </Container>
        </Modal>
    )
}
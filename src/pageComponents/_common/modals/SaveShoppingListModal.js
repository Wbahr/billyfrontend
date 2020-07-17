import React, { useState, useEffect, useContext } from 'react'
import Modal from '../modal'
import styled from 'styled-components'
import Context from '../../../config/context'
import { ButtonBlack, ButtonRed } from '../../../styles/buttons'
import AirlineInput from '../form/inputv2'
import Select from "../form/select";
import {CircularProgress} from "@material-ui/core";

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

export default function SaveShoppingListModal({open, hide, items, preSelectedUser, saveCallback, enableAddToExisting}) {
	const context = useContext(Context)
	const [listName, setListName] = useState('')
	const [listNotes, setListNotes] = useState('')
	const [selectedUser, setSelectedUser] = useState(preSelectedUser)
	const [selectedShoppingList, setSelectedShoppingList] = useState(null)
	const [shoppingListOptions, setShoppingListOptions] = useState([])
	const [error, setError] = useState('')
	
	const loading = context.upsertShoppingListState?.loading
	const userOptions = context.webUserContacts.map(({firstName, lastName, contactId}) => ({label: `${firstName} ${lastName || ''}`, value: contactId}))
	
	useEffect(() => {
		setSelectedUser(preSelectedUser)
	}, [preSelectedUser, open])
	
	useEffect(() => {
		if (!context.userInfo?.contactId) context.getWebUserContacts()
		context.getShoppingLists()
	}, [context.userInfo])
	
	useEffect(() => {
		if (listName?.length || listNotes?.length) {
			setSelectedShoppingList(null)
		}
	}, [listName, listNotes])
	
	useEffect(() => {
		if (selectedShoppingList) {
			setListName('')
			setListNotes('')
		}
	}, [selectedShoppingList])
	
	const handleClose = () => {
		setListName('')
		setError('')
		setListNotes('')
		setSelectedShoppingList(null)
		hide()
	}
	
	const handleListNameChange = ({target: {value}}) => setListName(value)
	const handleListNotesChange = ({target: {value}}) => setListNotes(value)
	
	const handleListChange = value => {
		setSelectedShoppingList(shoppingListOptions.find(list => list.value === value))
	}
	
	const handleSaveList = () => {
		if (!context.userInfo.contactId && !selectedUser) {
			setError('Please select a user to save this list for')
		} else if ((listName && listName.length) || selectedShoppingList) {
			setError('')
			if (selectedShoppingList) {
				const shoppingList = context.shoppingLists.find(list => list.id === selectedShoppingList.value)
				context.upsertShoppingList({
					...shoppingList,
					items: [...items || [], ...shoppingList.items],
				})
					.then(({data: {shoppingListEdit}}) => {
						saveCallback && saveCallback(shoppingListEdit)
						hide()
					})
			} else {
				context.upsertShoppingList({
					contactIdOwner: context.userInfo.contactId || selectedUser.value,
					name: listName,
					notes: listNotes,
					items,
					editors: []
				})
					.then(({data: {shoppingListEdit}}) => {
						saveCallback && saveCallback(shoppingListEdit)
						hide()
					})
			}
		} else {
			setError('Please enter a name or select a list')
		}
	}
	
	const mapShoppingListOptions = list => ({label: list.name, value: list.id, ...list});
	
	useEffect(() => {
		if (context.userInfo?.contactId) {
			setShoppingListOptions(context.shoppingLists.map(mapShoppingListOptions))
		} else {
			selectedUser && setShoppingListOptions(context.shoppingLists.map(mapShoppingListOptions))
		}
	}, [context.shoppingLists, selectedUser])
	
	const handleUserChange = value => setSelectedUser(userOptions.find(user => user.value === value))
	
	return (
		<Modal open={open} onClose={handleClose} contentStyle={{'maxWidth': '350px', 'borderRadius': '3px'}}>
			<Container>
				<h4>Save Shopping List</h4>
				
				{ !context.userInfo?.contactId && context.getWebUserContactsState?.loading
					? (
						<CircularProgress/>
					) : !context.userInfo?.contactId && (
					<DivItem>
						<Label>Select User</Label>
						<Select
							value={selectedUser}
							setValue={handleUserChange}
							options={userOptions}
							placeholder='Search by Name'
						/>
					</DivItem>
				)}
				
				{
					enableAddToExisting && (
						<div>
							<p>Add items to existing list</p>
							<DivItem>
								<Label>Select List</Label>
								<Select
									value={selectedShoppingList}
									setValue={handleListChange}
									options={shoppingListOptions.filter(list => list.contactIdOwner === (context.userInfo.contactId || selectedUser?.value))}
									placeholder='Search lists by Name, Item ID'
								/>
							</DivItem>
							<p>or</p>
							
							<p>Save as new List</p>
						</div>
					)
				}
				<DivItem>
					<Label>Shopping List Name: </Label>
					<AirlineInput value={listName} width="300px" onChange={handleListNameChange}/>
				</DivItem>
				
				<DivItem>
					<Label>Notes: </Label>
					<textarea value={listNotes} onChange={handleListNotesChange} rows={5} style={{width: 300}}/>
				</DivItem>
				
				<ErrorSpan>{error}</ErrorSpan>
				<DivRow>
					<ButtonBlack onClick={handleClose}>Cancel</ButtonBlack>
					<ButtonRed disabled={loading} onClick={handleSaveList}>{loading ? 'Saving...' : 'Save'}</ButtonRed>
				</DivRow>
			</Container>
		</Modal>
	)
}
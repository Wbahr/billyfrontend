import React, { useState, useContext, useEffect } from 'react'
import Modal from '../modal'
import styled from 'styled-components'
import Context from '../../../setup/context'
import { ButtonBlack, ButtonRed } from '../../../styles/buttons'
import Select from 'react-select'

const DivRow = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
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

export default function ShareShoppingListModal({ open, hide, shoppingList }) {
    const context = useContext(Context)
    const [selectedUsers, setSelectedUsers] = useState([])
    const [error, setError] = useState('')
	
    const loading = context.upsertShoppingListState?.loading
	
    const mapUserOptions = ({ firstName, lastName, webUserId }) => ({ label: `${firstName} ${lastName || ''}`, value: webUserId })
	
    const userOptions = context.webUserContacts
        .filter(user => shoppingList.webUserIdOwner !== user.webUserId)
        .map(mapUserOptions)
	
    useEffect(() => {
        if (shoppingList.editors) setSelectedUsers(shoppingList.editors.map(mapUserOptions))
    }, [shoppingList])
	
    const handleClose = () => {
        setError('')
        hide()
    }
	
    const handleShare = () => {
        if (!context.userInfo.webUserId && !selectedUsers.length) {
            setError('Please select a user')
        } else {
            context.upsertShoppingList({ ...shoppingList, editors: selectedUsers.map(u => ({ webUserId: u.value })) })
                .then(() => hide())
        }
    }
	
    return (
        <Modal open={open} onClose={handleClose} contentStyle={{ maxWidth: '350px', borderRadius: '3px' }}>
            <Container>
                <div>
                    <p>Select users to access list: {shoppingList.name}</p>
                    <Select
                        isMulti
                        value={selectedUsers}
                        onChange={setSelectedUsers}
                        options={userOptions}
                        placeholder='Search user'
                        width={225}
                    />
                </div>
                <ErrorSpan>{error}</ErrorSpan>
                <DivRow>
                    <ButtonBlack onClick={handleClose}>Cancel</ButtonBlack>
                    <ButtonRed disabled={loading} onClick={handleShare}>{loading ? 'Sharing...' : 'Share'}</ButtonRed>
                </DivRow>
            </Container>
        </Modal>
    )
}
import React from 'react'
import Modal from '../modal'
import styled from 'styled-components'

const TextContainer = styled.div`
    width: 75%;
    background: white;
    margin: 10px auto 25px;
`

export default function ErrorModal({ open, hide, text }) {
    return (
        <Modal open={open} onClose={hide} contentStyle={{ maxWidth: '350px', borderRadius: '3px', background: '#ea4437' }}>
            <TextContainer>
                {text}
            </TextContainer>
        </Modal>
    )
}
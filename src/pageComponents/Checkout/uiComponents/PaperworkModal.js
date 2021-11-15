import React, { useState } from 'react'
import Modal from '../../_common/modal'
import CustomSelect from '../../_common/form/select'
import styled from 'styled-components'
import { ButtonBlack, ButtonRed } from '../../../styles/buttons'

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

export default function PaperworkModal(props) {

    const {
        open,
        hide,
        setFieldValue
    } = props

    const paperworkOptions = [
        { label: 'Certificate of Conformance', value: 'coc', key: 'COC' },
        { label: 'CofC', value: 'both', key: 'BOTH' },
        { label: 'Special Inspection Requirements', value: 'inspect', key: 'INSPECT' },
        { label: 'Special Paperwork', value: 'special', key: 'special' },
    ]
    
    const [paperwork, setPaperwork] = useState()

    const handleSaveSelection = () => {
        setFieldValue('schedule.paperworkCode', paperwork)
        hide()
    }

    return (
        <Modal open={open} onClose={hide} contentStyle={{ maxWidth: 350, borderRadius: 3 }}>
            <Container>
                <h4>QC Document</h4>
                <DivItem>
                    <Label>QC Document: </Label>
                    <CustomSelect 
                        value={paperworkOptions.filter(o => o.value === paperwork)} 
                        setValue={setPaperwork}
                        options={paperworkOptions}
                    />
                </DivItem>
                <DivRow>
                    <ButtonBlack onClick={hide}>Cancel</ButtonBlack>
                    <ButtonRed onClick={handleSaveSelection}>Save</ButtonRed>
                </DivRow>
            </Container>
        </Modal>
    )
}
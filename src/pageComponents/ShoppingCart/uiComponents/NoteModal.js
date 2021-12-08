import React, { useEffect, useState } from 'react'
import { Checkbox } from '@material-ui/core'
import Modal from '../../_common/modal'
import styled from 'styled-components'
import { ButtonBlack, ButtonRed } from '../../../styles/buttons'

const DivRow = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`
const DivButtonRow = styled.div`
  display: flex;
  width: 300px;
  max-width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`
const DivItem = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
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
  width: 100%;
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

const MarginTopDiv = styled.div`
  margin-top: 10px;
`

const Textarea = styled.textarea`
    width: 300px; 
    max-width: 100%;
`

export default function NoteModal(props) {

    const {
        addNote,
        removeNote,
        values,
        open,
        hide,
        lineNoteAreas
    } = props

    const [areas, setAreas] = useState(['Order Entry'])
    const [noteInput, setNoteInput] = useState('')

    useEffect(() => {
        if (values?.note) {
            setNoteInput(values.note)
        }
        if (values?.targetAreas) {
            setAreas(values.targetAreas)
        }
    }, [values])

    const areaOptions = lineNoteAreas?.map(a => {
        function handleChange(e) {
            const checked = e.target.checked
            if (checked) {
                setAreas([...areas, a])
            } else {
                setAreas(areas.filter(s => s !== a))
            }
        }

        return (
            <div key={a} style={{ width: 300 }}>
                <Checkbox checked={areas.includes(a)} onChange={handleChange} />{a}
            </div>
        )
    })

    function handleClose() {
        setAreas(['Order Entry'])
        setNoteInput('')
        hide()
    }

    function handleAddNote() {
        addNote(values.index, areas, noteInput, values.noteIdx)
        handleClose()
    }

    function handleRemoveNote() {
        removeNote(values.index, values.noteIdx)
        handleClose()
    }

    const saveDisabled = areas.length === 0 || noteInput.length === 0
    
    return (
        <Modal open={open} onClose={handleClose} contentStyle={{ width: '90vw', maxHeight: '90vh', overflowY: 'scroll', borderRadius: 3 }}>
            <Container>
                <h4>Note Location</h4>
                <DivRow>
                    {areaOptions}
                </DivRow>
                <DivItem>
                    <Label>Note: </Label>
                    <Textarea value={noteInput} onChange={(e) => setNoteInput(e.target.value)} rows={3} />
                </DivItem>
                <MarginTopDiv></MarginTopDiv>
                <DivButtonRow>
                    <ButtonBlack onClick={handleClose}>Cancel</ButtonBlack>
                    {values?.noteIdx !== undefined && <ButtonRed onClick={handleRemoveNote}>Delete</ButtonRed>}
                    <ButtonRed onClick={handleAddNote} disabled={saveDisabled}>Save</ButtonRed>
                </DivButtonRow>
            </Container>
        </Modal>
    )
}
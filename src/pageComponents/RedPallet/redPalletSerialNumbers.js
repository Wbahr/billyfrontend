import React from 'react'
import styled from 'styled-components'
import { Field } from 'formik'

const DivLeftAlign = styled.div`
  display: flex;
  align-items: flex-end;
  width: 516px;
  min-width: 316px;
  margin: 0 auto;
  @media (max-width: 700px) {
    width: auto;
    min-width: none;
    flex-direction: column;
  }
`

const Input = styled.input`
  cursor: pointer;
  width: 500px;
  min-width: 300px;
  height: 25px;
  border: 1px solid grey;
  border-radius: 3px;
  margin: 8px;
  padding: 16px 8px;
  :focus {
    outline: none;
    border: 1px solid #318EFC;
  }
  @media (max-width: 700px) {
    width: 100%;
    min-width: none;
    flex-direction: column;
  }
`

const Inputm = styled(Input)`
  width: 225px;
  min-width: 125px;
`

class RedPalletSerialNumbers extends  React.Component {

	render() {
		const {
			fieldCount,
			index
		} = this.props
		let Fields = []
		let fieldNumber = 0
		while (fieldCount > fieldNumber) {
			if (fieldCount - fieldNumber >= 2){
				Fields.push(
					<DivLeftAlign>
						<Field name={`RepairItems.${index}.serialNumber.${fieldNumber}`}>
							{({ field }) => (
								<Inputm {...field}
									component='input'
									placeholder='Serial #' />
							)}
						</Field>
						<Field name={`RepairItems.${index}.serialNumber.${fieldNumber + 1}`}>
							{({ field }) => (
								<Inputm {...field}
									component='input'
									placeholder='Serial #' />
							)}
						</Field>
					</DivLeftAlign>
				)
				fieldNumber += 2
			} else {
				Fields.push(
					<DivLeftAlign>
						<Field name={`RepairItems.${index}.serialNumber.${fieldNumber}`}>
							{({ field }) => (
								<Inputm {...field}
									component='input'
									placeholder='Serial #' />
							)}
						</Field>
					</DivLeftAlign>
				)
				fieldNumber += 1
			}
		}

		return (
      <>
        {Fields}
      </>
		)
	}
}

export default RedPalletSerialNumbers

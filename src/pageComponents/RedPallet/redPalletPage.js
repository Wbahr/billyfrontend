// import React from 'react'
// import styled from 'styled-components'
// import _ from 'lodash'
// import 'react-table/react-table.css'
// import RPlogo from '../../imgs/airline/redpalletlogo.png'
// import { StyledTextGrey, StyledTextGreyBold } from '../../styles/fonts'
// import RedPalletForm from './redPalletForm'
// import { getUserData } from '../../api-temp/apiCalls'

// const DivRedPallet = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   max-width: 800px;
//   margin: 0 auto;
// `

// const DivAlert = styled.div`
//   height: auto;
//   width: 100%;
//   border: 1px solid orange;
//   border-radius: 2px;
//   background-color: cornsilk;
//   color: darkorange;
//   padding 4px;
// `

// const emptyItem = {
//   'repairType': '',
//   'po': '',
//   'urgency': 'normal',
//   'manufacturer': '',
//   'model': '',
//   'part': '',
//   'warranty': 'false',
//   'issue': '',
//   'quantity': '1'
// }

// class RedPalletPage extends React.Component {
//   state = {
//     initValues: null
//   }

//   userDataMutator = (response) => {
//     let mutatedResponse = response
//     for(let i = 0; i < mutatedResponse.ShipTos.length;i++) {
//       if (mutatedResponse.ShipTos[i].IsDefault){
//         mutatedResponse.address_1 = response.ShipTos[i].Line1
//         mutatedResponse.address_2 = response.ShipTos[i].Line2
//         mutatedResponse.city = response.ShipTos[i].City
//         mutatedResponse.state = response.ShipTos[i].State
//         mutatedResponse.zip = response.ShipTos[i].Zip
//         mutatedResponse.phone = response.ShipTos[i].Phone
//       }
//     }

//     mutatedResponse.RepairItems = [emptyItem]
//     mutatedResponse.Company = response.CustomerName
//     console.log('mutatedResponse',mutatedResponse)
//     return mutatedResponse
//   }
//   componentWillMount() {
//     getUserData().then(
//       (response) => this.userDataMutator(response)
//     ).then(
//       (mutatedResponse) => {this.setState({ initValues: mutatedResponse })}
//     )
//   }

//   render(){
//     return (
//       <>
//         <DivRedPallet>
//           <img src={RPlogo} width={'50%'} height={'auto'}/>
//           <StyledTextGrey>Airline’s Red Pallet Program is a fast and easy way to get your repair pickups scheduled and move on with
//             your day. Simply fill out the information about your repair needs and hit submit. You will be contacted
//             promptly with details regarding the pick up of your components. <StyledTextGreyBold>*Required Fields</StyledTextGreyBold>
//           </StyledTextGrey>
//           <DivAlert>
//             <span>Note: There will be a minimum charge of $95.00 per item for tear down & evaluation. If an order is not placed, item
//           will be returned as is un-assembled.</span>
//           </DivAlert>
//         </DivRedPallet>
//         { !_.isNil(this.state.initValues) &&
//           <RedPalletForm
//             initValues={this.state.initValues}
//             emptyItem={emptyItem}
//           />
//         }
//       </>
//     )
//   }
// }

// export default RedPalletPage

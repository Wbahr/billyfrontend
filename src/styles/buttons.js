import styled from 'styled-components'

// export const ButtonRed = styled.div`
//   cursor: pointer;
//   background-image: linear-gradient(to top left, #950f23, #DB1633);
//   color: white;
//   padding: 4px 12px;
//   font-size: 20px;
//   font-family: Proxima;
//   font-weight: 600;
//   border-radius: 3px;
// `

const ButtonRed = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #db1633;
  background-image: linear-gradient(to top left, #950f23, #DB1633);
  color: white;
  padding: 8px 16px;
  cursor: pointer;
  width: 250px;
  margin: 8px 0;
  box-shadow: 1px 1px 2px #000;
  p {
    font-size: 20px;
    font-family: Proxima;
    font-weight: 600;
  }
`

export const ButtonBlack = styled.div`
  cursor: pointer;
  background-image: linear-gradient(to top left, #001d3d, #003978);
  color: white;
  padding: 4px 12px;
  font-size: 20px;
  font-family: Proxima;
  font-weight: 600;
  border-radius: 3px;
`

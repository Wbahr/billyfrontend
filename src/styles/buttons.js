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

export const ButtonRed = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #db1633;
  background-image: linear-gradient(to top left, #950f23, #DB1633);
  color: white;
  padding: 8px 16px;
  cursor: pointer;
  box-shadow: 1px 1px 2px #000;
  font-size: 20px;
  font-family: Proxima;
  font-weight: 600;
  border: none;
  &:disabled {
    cursor: default;
    background-image: linear-gradient(to top left, grey, darkgrey);
  }
  svg {
    margin-right: 5px;
  }
`

export const ButtonBlack = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to top left, #001d3d, #003978);
  color: white;
  padding: 4px 12px;
  font-size: 20px;
  font-family: Proxima;
  font-weight: 600;
  border: none;
  svg {
    margin-right: 5px;
  }
`

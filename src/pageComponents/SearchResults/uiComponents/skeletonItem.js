import React from 'react'
import styled, { keyframes } from 'styled-components'

export const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const SkeletonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 320px;
  height: 350px;
  margin: 0 8px 20px 8px;
  padding: 10px;
  border-bottom: 1px #dedede solid;
`

export const Image = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 5px;
  background: linear-gradient(-90deg, whitesmoke, #dedede, whitesmoke, #dedede);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 2500ms ease infinite;
  margin: 5px 0;
`

const QuickLook = styled.div`
  width: 75px;
  height: 15px;
  background: linear-gradient(-90deg, whitesmoke, #dedede, whitesmoke, #dedede);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 2500ms ease infinite;
  margin: 5px 0;
`

export const Title = styled.div`
  width: 250px;
  height: 25px;
  background: linear-gradient(-90deg, whitesmoke, #dedede, whitesmoke, #dedede);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 2500ms ease infinite;
  margin: 5px 0;
`

export const Detail1 = styled.div`
  width: 150px;
  height: 15px;
  background: linear-gradient(-90deg, whitesmoke, #dedede, whitesmoke, #dedede);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 2500ms ease infinite;
  margin: 15px auto 5px 0;
`

const Detail2 = styled.div`
  width: 225px;
  height: 15px;
  background: linear-gradient(-90deg, whitesmoke, #dedede, whitesmoke, #dedede);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 2500ms ease infinite;
  margin: 5px auto 5px 0;
`
const Detail3 = styled.div`
  width: 125px;
  height: 15px;
  background: linear-gradient(-90deg, whitesmoke, #dedede, whitesmoke, #dedede);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 2500ms ease infinite;
  margin: 5px auto 5px 0;
`

const Button = styled.div`
  width: 105px;
  height: 37px;
  border-radius: 3px;
  background: linear-gradient(-90deg, whitesmoke, #dedede, whitesmoke, #dedede);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 2500ms ease infinite;
  margin: 5px auto;
`


export default () => (
    <SkeletonDiv>
        <Image />
        <QuickLook />
        <Title />
        <Detail1 />
        <Detail2 />
        <Detail3 />
        <Button />
    </SkeletonDiv>
)

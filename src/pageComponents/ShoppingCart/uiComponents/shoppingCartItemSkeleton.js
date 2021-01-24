import React from 'react'
import styled, { keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Context from '../../../setup/context'

const gradientAnimation = keyframes`
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
	border-top: 2px whitesmoke solid;
	border-bottom: 2px whitesmoke solid;
	padding: 8px 16px;
	margin: 8px 0;
	height: 135px;
	background-color: white;
`

const DivCard = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
`

const DivMove = styled.div`
	cursor: move;
	display: flex;
	height: 100%;
	align-items: center;
	padding: 0 12px;
`

const DivCol1 = styled.div`
	display: flex;
	width: 100px;
`

const DivCol2 = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 300px;
	height: 100%;
	margin-right: 50px;
	p {
		font-size: 16px;
		margin: 0;
	}
`

const DivCol3 = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	flex-grow: 99;
`


const Img = styled.div`
	margin: 10px 14px;
	width: 95px;
	height: 95px;
	background: linear-gradient(-90deg, whitesmoke, #dedede, whitesmoke, #dedede);
	background-size: 400% 400%;
	animation: ${gradientAnimation} 2500ms ease infinite;
`

const Title = styled.div`
	width: 290px;
	height: 24px;
	background: linear-gradient(-90deg, whitesmoke, #dedede, whitesmoke, #dedede);
	background-size: 400% 400%;
	animation: ${gradientAnimation} 2500ms ease infinite;
	margin: 5px 0;
`

const Detail1 = styled.div`
	width: 115px;
	height: 18px;
	background: linear-gradient(-90deg, whitesmoke, #dedede, whitesmoke, #dedede);
	background-size: 400% 400%;
	animation: ${gradientAnimation} 2500ms ease infinite;
	margin: 5px 10px 5px 0;
`

const Detail2 = styled.div`
	width: 80px;
	height: 18px;
	background: linear-gradient(-90deg, whitesmoke, #dedede, whitesmoke, #dedede);
	background-size: 400% 400%;
	animation: ${gradientAnimation} 2500ms ease infinite;
	margin: 5px 10px 5px 0;
`

const Row = styled.div`
	display: flex;
`

const Detail3 = styled.div`
	width: 100px;
	height: 14px;
	background: linear-gradient(-90deg, whitesmoke, #dedede, whitesmoke, #dedede);
	background-size: 400% 400%;
	animation: ${gradientAnimation} 2500ms ease infinite;
	margin: 2px 10px 5px 0;
`

const Detail4 = styled.div`
	width: 50px;
	height: 32px;
	background: linear-gradient(-90deg, whitesmoke, #dedede, whitesmoke, #dedede);
	background-size: 400% 400%;
	animation: ${gradientAnimation} 2500ms ease infinite;
	margin: 2px 70px 5px 0;
`

const Detail5 = styled.div`
	width: 90px;
	height: 32px;
	background: linear-gradient(-90deg, whitesmoke, #dedede, whitesmoke, #dedede);
	background-size: 400% 400%;
	animation: ${gradientAnimation} 2500ms ease infinite;
	margin: 2px 10px 5px 0;
`

const Detail6 = styled.div`
	width: 300px;
	height: 32px;
	background: linear-gradient(-90deg, whitesmoke, #dedede, whitesmoke, #dedede);
	background-size: 400% 400%;
	animation: ${gradientAnimation} 2500ms ease infinite;
	margin: 10px 0 5px 0;
`

const Price = styled.div`
	width: 80px;
	height: 37px;
	background: linear-gradient(-90deg, whitesmoke, #dedede, whitesmoke, #dedede);
	background-size: 400% 400%;
	animation: ${gradientAnimation} 2500ms ease infinite;
	margin: 5px auto;
`

const DivRemove = styled.div`
	cursor: pointer;
	display: flex;
	width: auto;
	margin: auto 12px;
	align-items: center;
`

export default function SkeletonItem({ index }){
  return (
    <SkeletonDiv>
      <DivCard>
        <DivMove>
          <FontAwesomeIcon icon="grip-lines" color="lightgrey"/>
        </DivMove>
        <DivCol1>
          <Img max-height='100%' max-width='100%' />
        </DivCol1>
        <DivCol2>
          <Title />
          <Row>
            <Detail1 />
            <Detail2 />
          </Row>
          <Detail3 />
        </DivCol2>
        <DivCol3>
          <Row>
            <Detail4 />
            <Detail5 />
          </Row>
          <Detail6 />
        </DivCol3>
        <Price />
        <Context.Consumer>
          {({ removeItem }) => (
            <>
              <DivRemove onClick={() => removeItem(index)} alt='remove-item'>
                <FontAwesomeIcon icon="times-circle" color="lightgrey"/>
              </DivRemove>
            </>
          )}
        </Context.Consumer>
      </DivCard>
    </SkeletonDiv>
  )
}
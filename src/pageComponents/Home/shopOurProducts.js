import React, { useState } from 'react'
import styled from 'styled-components'
import { H2 } from '../_common/text'
import SectionHeader from '../_common/sectionHeader.js'
import { Link, useHistory } from 'react-router-dom'

const Thing = styled.div`
  margin-top: -6px;
  width: 60px;
  height: 5px;
  background-color: #DB1633;
  margin-bottom: 20px;
`
const Div = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center
  cursor: pointer;
  width: 200px;
  height: 60px;
  color: black;
  background-color: #f3f3f3;
  padding: 0 4px;
  margin: 0 10px;
  box-shadow: 1px 2px 2px rgba(0,0,0,.2);
`

export default function ShopOurProducts() {
  const [searchTerm, setSearchTerm] = useState('')

  return(
    <>
      <div>
        <SectionHeader
          text='Recommended For You'
        />
      </div>
      <div>
      <div>
        <SectionHeader
          text='Shop Our Categories'
        />
      </div>
      <Div>
        <Card>
          Aluminum Structural Framing
        </Card>
        <Card>
          Hose & Fitting
        </Card>
        <Card>
          Lubrication
        </Card>
        <Card>
          Process & Instrumentation
        </Card>
      </Div>
      <Div>
        <Card>
          Aluminum Hydraulic Components
        </Card>
        <Card>
          Aluminum Hydraulic Components
        </Card>
        <Card>
          Aluminum Hydraulic Components
        </Card>
        <Card>
          Aluminum Hydraulic Components
        </Card>
      </Div>
      <Div>
        <Card>
          Aluminum Hydraulic Components
        </Card>
        <Card>
          Aluminum Hydraulic Components
        </Card>
        <Card>
          Aluminum Hydraulic Components
        </Card>
        <Card>
          Aluminum Hydraulic Components
        </Card>
      </Div>
      </div>
      
    </>
  )
}
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { StyledText0 } from '../../styles/fonts'
import ContactUs from './contactPages/contactUsPage'

const Div = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding 0;
  background-color: grey;
`
export default function ContactPage({ history }) {
  const [pageComponent, setPageComponent] = useState()
  let { page } = useParams()
  
  const contactPages = [
    {
      'label': 'ContactUs',
      'page': 'contact-us'
    }
  ]
  useEffect(() => {
    if (page === 'contact-us') {
      setPageComponent(<ContactUs />)
    }
  }, [page])

  return (
    <>
      {pageComponent}
    </>
  )
}
ContactPage.propTypes = {
  history: PropTypes.object.isRequired
}
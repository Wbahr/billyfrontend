import React, {useState, useContext} from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import Context from '../../../config/context'
import { faAutoprefixer } from '@fortawesome/free-brands-svg-icons'
import AbbLogo from './Abb Jokab.png'



 
const FeaturedHeader = styled.div`
  width: 1200px;

`;



export default function Abb() { 

  return(
    
      <FeaturedHeader>
        <img src={AbbLogo}/> 
       </FeaturedHeader>
  
     
  );
}


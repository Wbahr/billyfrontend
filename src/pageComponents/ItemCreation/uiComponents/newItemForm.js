// Render Prop
import React from 'react';
import { Formik, Form, Field } from 'formik';
import styled from "styled-components"
import FormikInput from '../../_common/formik/input'

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', isFormHidden: true};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('This should not pop up: ' + this.state.value);
    event.preventDefault();
  }
}

function searchItem(e) {
  e.preventDefault();
  //var element = document.getElementsByClassName(DivDisabler);
  
  console.log('Item is being searched placeholder.');
}

const ButtonRed = styled.button`
  background-color: rgb(219, 22, 51);
  color: white;
  font-weight: 600;
  border: 0;
  padding: 4px 8px;
  box-shadow: 2px 2px 4px #000;
  &:hover{
    background-color: #b51029;
  }
  &:active{
    background-color: #b51029;
    box-shadow: 2px 2px 2px #000;
  }
`

const ButtonBlue = styled.button`
  background-color: rgb(30,144,255);
  color: white;
  font-weight: 600;
  border: 0;
  padding: 4px 8px;
  box-shadow: 2px 2px 4px #000;
  &:hover{
    background-color: #b51029;
  }
  &:active{
    background-color: #b51029;
    box-shadow: 2px 2px 2px #000;
  }
`

const DivCenter = styled.div`
  display: flex;
  justify-content: center;
`

const DivDisabler = styled.div`
<!--display:none;-->
  `

const H2 = styled.h2`
  width: 100%;
  text-align: center;
  font-size: 20px;
  margin: 0;
`

const H4 = styled.h4`
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: #DB1633;
`

const DivFormContainer = styled.div`
  display: flex;
  margin-bottom: 8px; 
`

const DivInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 16px;
  background-color: whitesmoke
  padding: 8px 16px;
`

const DivInputContainerDark = styled(DivInputContainer)`
  background-color: #e8e8e8;
`

const H3 = styled.h3`
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: 800;
  color: black;
`

const NewItem = () => (
  <div>
    <H2>Item Creation</H2>
    <H4>for internal new items</H4>
    <Formik
      initialValues={{  itemID: 'b', itemDescription: 'c', defaultSalesDis: 'd', defaultPurchaseDis: 'e', 
      supplierID: 'f', DivisionID: 'g',  UOM: 'EA', baseUnit: 'h', locationID: '2100', productGroupID: 'j',
        taxGroupID: 'ALL', replenishmentLoc: 'k', replenishmentMethod: 'l', glAccountNo: 'm', averageLeadTime: 'n', primarySupplier: 'o'}}
      validate={values => {
        let errors = {};
        /*if (!values.email) {
          errors.defaultSalesDis = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.defaultSalesDis))
        {
          errors.defaultSalesDis = 'Invalid email address';
        }*/
        if(!values.defaultSalesDis) {
          errors.defaultSalesDis = 'Required';
        }
        if(!values.itemName) {
          errors.itemName = 'Required';
        }
        if(!values.itemID) {
          errors.itemID = 'Required';
        }
        if(!values.defaultPurchaseDis) {
          errors.defaultPurchaseDis = 'Required';
        }
        if(!values.supplierID) {
          errors.supplierID = 'Required';
        } 
        if(!values.DivisionID) {
          errors.DivisionID = 'Required';
        } /*else if (values.password && values.verifyPassword && (values.password !== values.verifyPassword)) {
          errors.password = 'Passwords do not match';
        }*/
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <DivFormContainer>
            <FormikInput label="Search Item ID" type="text" name="itemIDSearch"/>
          </DivFormContainer>
          <DivFormContainer>
            <FormikInput label="Search Item Description" type="text" name="itemDescSearch"/>
          </DivFormContainer>
          <DivCenter>
          <ButtonBlue onClick={searchItem}>Search by ID/Description</ButtonBlue>
          </DivCenter>
          <DivInputContainer>
            <H3>TEST</H3>
          </DivInputContainer>


        <DivDisabler>
          <DivFormContainer>
            <DivInputContainer>
              <H3>Item & Group Information 1/3</H3>
              <FormikInput label="Item ID" type="text" name="itemID" />
              <FormikInput label="Item Description"type="text" name="itemDescription" />
              <FormikInput label="Default Sales Discount Group" type="text" name="defaultSalesDis" />
              <FormikInput label="Default Purchase Discount Group" type="text" name="defaultPurchaseDis" />
              <label for="UOMform">Unit of measure:</label>
              <Field as="select" id="UOMform" name="UOM">
                  <option value="EA">EA</option>
                  <option value="other1">other1</option>
                  <option value="other2">other2</option>
                  <option value="other3">other3</option>
              </Field>
              <FormikInput label="Supplier ID" type="text" name="supplierID" />
              <FormikInput label="Division ID" type="text" name="DivisionID" disabled="true" />
              <FormikInput label="Base Unit" type="text" name="UOM" disabled="true" />
          
            </DivInputContainer>
            <DivInputContainerDark>
              <H3>Item & Group Information 2/3</H3>
              
              <FormikInput label="Location ID" type="text" name="locationID" />
              <FormikInput label="Product Group ID" type="text" name="productGroupID" />
              <FormikInput label="Tax Group ID"type="text" name="taxGroupID" disabled="true" />
              <FormikInput label="Replenishment Location" type="text" name="replenishmentLoc" />
              <FormikInput label="Replenishment Method" type="text" name="replenishmentMethod" />
              <FormikInput label="GL Account Number" type="text" name="glAccountNo" />
              <FormikInput label="Average Lead Time" type="text" name="averageLeadTime" />
              <FormikInput label="Primary Supplier" type="text" name="primarySupplier" />
            </DivInputContainerDark>
          </DivFormContainer>
          <DivCenter>
            <ButtonRed type="submit" disabled={isSubmitting}>
              Register Item
            </ButtonRed>
          </DivCenter>
          </DivDisabler>
        </Form>
      )}
    </Formik>
  </div>
);

export default NewItem;
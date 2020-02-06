// Render Prop
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import styled from "styled-components"
import FormikInput from '../../_common/formik/input'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';


const QUERY_SUPPLIER_LIST = gql`
  query GetSuppliers{
    getAirlineSuppliers{
      id
      name
    }
  }
`

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', isFormHidden: true };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('This should not pop up: ' + this.state.value);
    event.preventDefault();
  }
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

const HiddenDiv = styled.div`
  `

const H2 = styled.h2`
  width: 100%;
  text-align: center;
  font-size: 20px;
  margin: 0;
`

const DivContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
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


const NewItem = () => {
  // const [paragraphVisible, setParagraphVisible, formVisiable] = useState(false)

  // const [title, setTitle] = useState("Begin item creation");
  // var toggleVisibility = () => {
  //   setParagraphVisible(!paragraphVisible)

  // }

  // var toggleVisibilityForm = () => {
  //   var mee = this;
  //   setParagraphVisible(!formVisiable)
  // }

  // const [checkedBrandFilters, setCheckedBrandFilters] = useState([])

  const { loading, error, data } = useQuery(QUERY_SUPPLIER_LIST, {
    onCompleted: data => {

    }
  })

  return <div>
    <H2>Item Creation</H2>
    <H4>for internal new items</H4>
    <Formik
      initialValues={{
        itemID: 'SMC kq2', itemDescription: 'a', defaultSalesDis: 'D', defaultPurchaseDis: 'C',
        supplierID: 'd', DivisionID: 'type in Supplier', UOM: 'EA', baseUnit: 'h', locationID: '2100', productGroupID: '1000',
        taxGroupID: 'ALL', replenishmentLoc: '2100', replenishmentMethod: 'UpTo', glAccountNo: 'f', averageLeadTime: '30', primarySupplier: 'type in Supplier'
      }}
      validate={values => {
        let errors = {};
        /*if (!values.email) {
          errors.defaultSalesDis = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.defaultSalesDis))
        {
          errors.defaultSalesDis = 'Invalid email address';
        }*/
        if (!values.itemID) {
          errors.itemID = 'Required';
        } else if (!/^[A-Z0-9._ %+-]{2,40}$/i.test(values.itemID)) {
          errors.itemID = 'Please enter less than 40 characters and exclude {*,"}';
        }
        // if (!values.defaultSalesDis) {
        //   errors.defaultSalesDis = 'Required';
        // } else if (!/^[A-Z0-9._%+-]{2,10}$/i.test(values.defaultSalesDis)) {
        //   errors.defaultSalesDis = 'Too long!';
        // }
        if (!values.productGroupID) {
          errors.productGroupID = 'Required';
        } else if (!/^[0-9]{4,4}$/i.test(values.productGroupID)) {
          errors.productGroupID = 'Enter a valid ProductGroupID';
        }
        /*if(!values.itemName) {
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
        /*if(!values.DivisionID) {
          errors.DivisionID = 'Required';
        } else if (values.password && values.verifyPassword && (values.password !== values.verifyPassword)) {
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
          
          {/* <Field name="SupplierIDSearch">
                      {({
                        field,
                        form,
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }) => (
                          <select{...field} onChange={(e) => {form.setFieldValue('supplierID', e.target.value), form.setFieldValue('UOM', e.target.value), form.setFieldValue('DivisionID', e.target.value), form.setFieldValue('primarySupplier', e.target.value)}}>
                            <option value="Parker" >Parker</option>
                            <option value="SMC"> SMC</option>
                            <option value="Phoenix">Phoenix</option>
                            <option value="Schmersal">Schmersal</option>
                            <option value="More to be loaded from P21">More to be loaded from P21</option>
                          </select>
                        )
                      }
                    </Field> */}
          
          {/*<DivCenter>
            <ButtonBlue onClick={(e) => { toggleVisibility(), setTitle("Update item creation") }} type="button">{title}</ButtonBlue>
          </DivCenter>*/}

          
            <HiddenDiv>
              <hr></hr>
              <br></br>
              <H3>Search results placeholder</H3>
              {/* <DivContainer>
                <CategoryImage
                  text='Item Result 1'
                  src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
                  history={history}
                />
              </DivContainer>
              <DivContainer>
                <CategoryImage
                  text='Item Result 2'
                  src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
                  history={history}
                />
              </DivContainer>
              <DivContainer>
                <CategoryImage
                  text='Item Result 3'
                  src='https://www.sourceatlantic.ca/UserFiles/images/homepage/industrial-mro-safety.jpg'
                  history={history}
                />
              </DivContainer> */}
              <br></br>
              <hr></hr>
              {/* <ButtonBlue onClick={(e) => { toggleVisibilityForm() }} type="button">That's not what I'm looking for</ButtonBlue>
              {
                formVisiable && <h3>TEST!!</h3>
              } */}
              <br /><br /><br />
              <DivFormContainer>
                <DivInputContainer>
                  <H3>Item & Group Information 1/2</H3>
                  <FormikInput label="Item ID (mirrors top Item ID)" type="text" name="itemID" onChange="form.setFieldValue('itemID', e.target.value)" disabled="true" />
                  <FormikInput label="Item Description" type="text" name="itemDescription" onChange="form.setFieldValue('itemDescription', e.target.value)" />
                  <FormikInput label="Default Sales Discount Group (remove later)" type="text" name="defaultSalesDis" onChange="form.setFieldValue('defaultSalesDis', e.target.value)" />
                  <FormikInput label="Default Purchase Discount Group (remove later)" type="text" name="defaultPurchaseDis" onChange="form.setFieldValue('defaultPurchaseDis', e.target.value)" />
                  <label for="UOMform">Unit of measure:</label>
                    <Field name="UOM">
                      {({
                        field,
                        form,
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }) => (
                          <select{...field} onChange={(e) => {form.setFieldValue('baseUnit', e.target.value), form.setFieldValue('UOM', e.target.value)}}>
                            <option value="selectOne" >Select one</option>
                            <option value="EA"> EA</option>
                            <option value="CS">CS</option>
                            <option value="Pack">Pack</option>
                            <option value="other3">other3</option>
                          </select>
                        )
                      }
                    </Field>
                  <FormikInput label="Supplier ID (mirror top, remove later)" type="text" name="supplierID" onChange="form.setFieldValue('supplierID', e.target.value), form.setFieldValue('DivisionID', e.target.value), form.setFieldValue('primarySupplier', e.target.value)"  disabled="true"/>
                  <FormikInput label="Division ID (remove later, mirrors supplier DDL)" type="text" name="DivisionID" disabled="true" />
                  <FormikInput label="Base Unit (remove later)" type="text" name="baseUnit" disabled="true" />


                </DivInputContainer>
                <DivInputContainerDark>
                  <H3>Item & Group Information 2/2</H3>

                  <FormikInput label="Location ID (remove later)" type="text" name="locationID" onChange="form.setFieldValue('locationID', e.target.value)" disabled="true" />
                  <FormikInput label="Product Group ID" type="text" name="productGroupID" onChange="form.setFieldValue('productGroupID', e.target.value)" />
                  <FormikInput label="Tax Group ID (remove later)" type="text" name="taxGroupID" disabled="true" onChange="form.setFieldValue('taxGroupID', e.target.value)" disabled="true" />
                  <FormikInput label="Replenishment Location (remove later)" type="text" name="replenishmentLoc" disabled="true" onChange="form.setFieldValue('replenishmentLoc', e.target.value)" disabled="true" />
                  <FormikInput label="Replenishment Method" type="text" name="replenishmentMethod" onChange="form.setFieldValue('replenishmentMethod', e.target.value)" />
                  <FormikInput label="GL Account Number (remove later)" type="text" name="glAccountNo" onChange="form.setFieldValue('glAccountNo', e.target.value)" disabled="true" />
                  <FormikInput label="Average Lead Time (remove later)" type="text" name="averageLeadTime" onChange="form.setFieldValue('averageLeadTime', e.target.value)" disabled="true" />
                  <FormikInput label="Primary Supplier (remove later, mirrors supplier DDL)" type="text" name="primarySupplier" disabled="true" />
                </DivInputContainerDark>

              </DivFormContainer>
              <DivCenter>
                <ButtonRed type="submit" disabled={isSubmitting}>
                  Register Item
            </ButtonRed>
              </DivCenter>
            </HiddenDiv>
          



        </Form>
      )}
    </Formik>
  </div>
};

export default NewItem;
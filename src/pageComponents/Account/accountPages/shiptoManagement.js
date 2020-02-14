import React, {useState, useContext} from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import Select from '../../_common/select'
import SelectField from '../../_common/formik/select'
import FormikInput from '../../_common/formik/input_v2'
import { Formik, Form, Field } from 'formik'
import { StateList, CanadianProvinceList } from '../../_common/helpers/helperObjects'

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
`

function ShiptoManagementPage() {
  // const context = useContext(Context);
  const [defaultShipTo, setDefaultShipTo] = useState(0)
  const [addingNewShipTo, setAddingNewShipTo] = useState(false)


  return(
    <>
      <p>Default Ship To:</p>
        <Select
          value={defaultShipTo}
          setValue={setDefaultShipTo}
          options={[{'label': 'Warehouse 1 - 123 Main Street Nazareth, PA 18064', 'value': 0},{'label': 'Main Manufacturing Facility - 999 Green Drive - Washington, NJ 08865', 'value': 1}]}
          width='600px'
        />
      {!addingNewShipTo && <p onClick={()=>setAddingNewShipTo(true)}>Add a New Ship To</p>}
      {addingNewShipTo &&
        <FormContainer>
          <p onClick={()=>setAddingNewShipTo(false)}>Cancel</p>
          <Formik
            initialValues={{ company_name: '', contact_name_first: '', contact_name_last: '', address1: '', address2: '', city: '', state: '', province: '', zip: '', email: '', phone: '' }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <FormikInput label="Company Name" name="company_name" width="500px" />
                <FormikInput label="First Name" name="contact_name_first" />
                <FormikInput label="Last Name" name="contact_name_last" />
                <FormikInput label="Address 1" name="address1" width="600px"/>
                <FormikInput label="Address 2" name="address2" width="600px"/>
                <FormikInput label="City" name="city" />
                {values.country  === "us" && 
                  <>
                    <Field 
                      name="shipto.state" 
                      component={SelectField} 
                      options={StateList}
                      placeholder="Select a State"
                      label="State"
                    /> 
                  </>
                }
                {values.country  === "canada" && 
                  <>
                    <Field 
                      name="shipto.province" 
                      component={SelectField} 
                      options={CanadianProvinceList}
                      placeholder="Select a Province"
                      label="Province"
                    /> 
                  </>
                }
                <FormikInput label="Zip" name="zip" />    
                <Field 
                  name="country" 
                  component={SelectField} 
                  options={[{'label': 'United States', 'value': 'us'},{'label': 'Canada', 'value': 'canada'}]}
                  placeholder="Select a Country"
                  width="250px"
                  isSearchable={false}
                  label="Country"
                /> 
                <FormikInput label="Phone" name="phone" />
                <FormikInput label="Email" name="email" />
                <button type="submit" disabled={isSubmitting}>Save Ship To</button>
              </Form>
            )}
          </Formik>
        </FormContainer>
      }
    </>
  )
}

export default ShiptoManagementPage
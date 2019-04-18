import React from 'react'
import { Formik, Form, Field, FieldArray } from 'formik';

const RMAform = () => (
  <div>
    <Formik
      initialValues={{ friends: ['jared', 'ian', 'brent'] }}
      onSubmit={values =>
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500)
      }
      render={({ values }) => (
        <Form>
          <FieldArray
            name="returnItems"
            render={arrayHelpers => (
              <div>
                {values.friends.map((friend, index) => (
                  <div key={index}>
                    <Field type='checkbox' name={`returnItems.${index}.willReturn`} />
                    <Field name={`returnItems.${index}.returnQuantity`} />
                    <Field component="select" name={`returnItems.${index}.returnReason`}>
                      <option value='mistake'>Purchased by Mistake</option>
                      <option value='inaccurate'>Inaccurate Description / Recommendation</option>
                      <option value='damaged'>Product / Packaging arrived Damaged</option>
                      <option value='defective'>Item is Defective / Doesn't work</option>
                      <option value='late'>Item arrived too late</option>
                      <option value='incorrect'>Incorrect item sent</option>
                      <option value='excess'>Received more than ordered</option>
                      <option value='early'>Item arrived too early</option>
                      <option value='no_need'>No longer needed</option>
                      <option value='not_approved'>Customer did not approve purchase</option>
                      <option value='missing'>Missing items / Components</option>
                      <option value='other'>Other</option>
                    </Field>
                    <Field component="select" name={`returnItems.${index}.refundType`}>
                      <option value='credit'>Airline Credit</option>
                      <option value='refund'>Refund</option>
                      <option value='credit'>Replacement</option>
                    </Field>
                    <Field name={`returnItems.${index}.otherDesc`} />
                    <Field type='textarea' name={`returnItems.${index}.details`} />
                  </div>
                ))}
              </div>
            )}
          />
        </Form>
      )}
    />
  </div>
)

export default RMAform

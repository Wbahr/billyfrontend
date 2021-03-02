// Render Prop
import React, { useEffect, useState } from 'react'
import { Formik, Form as FormikForm, Field } from 'formik'
import styled from 'styled-components'
import FormikInput from '../../../../pageComponents/_common/formik/input_v2'
import FormikSelect from '../../../../pageComponents/_common/formik/select'
import gql from 'graphql-tag'
import { Button } from '@material-ui/core'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import AirlineInput from 'pageComponents/_common/form/inputv2'
import AirlineSelect from 'pageComponents/_common/form/selectv2'
import PropTypes from 'prop-types'

const Form = styled(FormikForm)`
  margin: 32px 64px;
`

const DivCenter = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

const H2 = styled.h2`
  font-family: ProximaBold;
  width: 100%;
  text-align: center;
  font-size: 26px;
  margin: 0;
  background-color: white;
  color: black;
  padding: 6px;
  border-bottom: 1px solid;
  text-transform: uppercase;
`

const DivFormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  padding: 16px 32px;
  width: 100%;
  margin-bottom: 8px; 
`

const DivError = styled.div`
  height: auto;
  width: max-content;
  border: 1px solid orange;
  border-radius: 2px;
  background-color: cornsilk;
  color: darkorange;
  padding: 4px;
  margin: 0 auto;
  margin-bottom: 4px;
`

const ItemCreationSchema = Yup.object().shape({
    itemId: Yup.string()
        .matches(/[A-Z0-9][A-Z0-9- ]+[A-Z0-9]/, 'Only alphanumeric, space, and dash characters are permitted.')
        .min(3)
        .max(30)
        .uppercase()
        .required()
        .strict(),
    shortDescription: Yup.string()
        .min(5)
        .max(40)
        .matches(/[a-zA-Z0-9- ()+:/|_#*]/)
        .required(),
    longDescription: Yup.string()
        .max(3000),
    airlineCost: Yup.number()
        .min(0.01)
        .max(9999999)
        .required(),
    listPrice: Yup.number()
        .min(0.01)
        .max(9999999)
        .required(),
    tariff: Yup.number()
        .min(0)
        .max(9999999),
    productGroupId: Yup.string().required(),
    unitOfMeasure: Yup.string()
        .required()
})

const CREATE_ITEM = gql`
  mutation CreateItem($item: ItemCreateInputGraphType) {
    itemCreate(item: $item){
      itemId
      message
      success
      invMastUid
    }
  }
`

const ErrorBlock = ({ errors, fieldName }) => {

    const fieldErrors = errors.filter(e => e.path === fieldName)
    
    if (fieldErrors.length){
        return (
            <div>
                <ul>
                    {
                        fieldErrors.map(e => <li key={`${e.path}-${e.type}`}>{e.message}</li>)
                    }
                </ul>
            </div>
        )
    } else {
        return <></>
    }
}
ErrorBlock.propTypes = {
    errors: PropTypes.array,
    fieldName: PropTypes.string
}

export default function NewItemForm(props) {
    const [formIsSubmitting, setFormIsSubmitting] = useState(false)
    const {
        searchTerm,
        supplierList,
        selectedSupplierId,
        unitsOfMeasureList,
        productGroupsList,
        showModal
    } = props

    const [itemFormData, setItemFormData] = useState({
        itemId: '',
        shortDescription: '',
        longDescription: '',
        airlineCost: 0.0,
        listPrice: 0.0,
        tariff: 0.0,
        productGroupId: 0,
        unitOfMeasure: ''
    })
    const [isValid, setIsValid] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {

        ItemCreationSchema.validate(itemFormData, { abortEarly: false })
            .then(data => {
                console.log('Valid')
                console.log(data)
                setIsValid(true)
                setErrors([])
            })
            .catch(err => {
                console.log('Invalid')
                console.log(err)
                setIsValid(false)
                setErrors(err.inner)
            })

    }, [itemFormData])

    const handleInput = (event, name, value, selection) => {
        const formData = {
            ...itemFormData,
            [event?.target?.name || name]: event?.target?.value || value
        }

        console.log(selection)
        console.log(value)
        console.log(formData)

        setItemFormData(formData)
    }

    const submitNewItem = () => {

    }

    const [executeCreateItem] = useMutation(CREATE_ITEM, {
        onCompleted: data => {
            setFormIsSubmitting(false)
            showModal(data.itemCreate)
        }
    })

    function formatCurrentFields(values){
        const mutatedValues = values
        mutatedValues.listPrice = parseFloat(values.listPrice.substring(1))
        mutatedValues.airlinePartCost = parseFloat(values.airlinePartCost.substring(1))
        mutatedValues.tariff = parseFloat(values.tariff.substring(1))
        return mutatedValues
    }

    return (
        <>
            <form>
                <div>
                    <AirlineInput
                        type="text"
                        name="itemId"
                        value={itemFormData.itemId}
                        disabled={true}
                        label="Item ID"
                        onChange={handleInput}
                    />
                    <ErrorBlock errors={errors} fieldName='itemId' />
                </div>

                <div>
                    <AirlineInput 
                        type="text"
                        name="shortDescription"
                        value={itemFormData.shortDescription}
                        label="Short Description"
                        onChange={handleInput}
                    />
                    <ErrorBlock errors={errors} fieldName='shortDescription' />
                </div>
                <div>
                    <AirlineInput 
                        type="text"
                        name="longDescription"
                        value={itemFormData.longDescription}
                        label="Long Description"
                        onChange={handleInput}
                    />
                    <ErrorBlock errors={errors} fieldName='longDescription' />
                </div>
                
                <div>
                    <AirlineSelect
                        name="unitOfMeasure"
                        label="Unit of Measure"
                        value={itemFormData.unitOfMeasure} 
                        options={unitsOfMeasureList}
                        getOptionLabel={(option) => { return (option.value + ' - ' + option.label)}}
                        getOptionValue={option => option.value}
                        changeFunction={handleInput}
                        isSearchable={true}
                        placeholder="Unit of Measure"
                    />
                    <ErrorBlock errors={errors} fieldName='unitOfMeasure' />
                </div>
                
                <div>
                    <AirlineInput 
                        type="text"
                        name="listPrice"
                        value={itemFormData.listPrice}
                        label="List Price"
                        onChange={handleInput}
                    />
                    <ErrorBlock errors={errors} fieldName='listPrice' />
                </div>
                
                <div>
                    <AirlineInput 
                        type="text"
                        name="airlineCost"
                        value={itemFormData.airlineCost}
                        label="Airline Cost"
                        onChange={handleInput}
                    />
                    <ErrorBlock errors={errors} fieldName='airlineCost' />
                </div>
                
                <div>
                    <AirlineInput 
                        type="text"
                        name="tariff"
                        value={itemFormData.tariff}
                        label="Tariff"
                        onChange={handleInput}
                    />
                    <ErrorBlock errors={errors} fieldName='tariff' />
                </div>
                
                <div>
                    <AirlineSelect
                        name="productGroupId"
                        label="Product Group"
                        value={itemFormData.productGroupId} 
                        options={productGroupsList}
                        getOptionLabel={(option) => { return (option.value + ' - ' + option.label)}}
                        getOptionValue={option => option.value}
                        changeFunction={handleInput}
                        isSearchable={true}
                        placeholder="Product Group"
                    />
                    <ErrorBlock errors={errors} fieldName='productGroupId' />
                </div>
                
            </form>
            <DivCenter>
                <Button variant="contained" color="secondary" type="submit" disabled={formIsSubmitting || errors.length}>
                    {formIsSubmitting ? 'Registering Item..' : 'Register Item'}
                </Button>
            </DivCenter>
        </>
    )
}
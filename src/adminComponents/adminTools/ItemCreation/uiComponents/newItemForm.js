// Render Prop
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Button } from '@material-ui/core'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import AirlineInput from 'pageComponents/_common/form/inputv3'
import AirlineSelect from 'pageComponents/_common/form/selectv3'
import PropTypes from 'prop-types'

const DivCenter = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
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
    airlinePartCost: Yup.number()
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
        .required(),
    supplierId: Yup.number()
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

    const selectedSupplier = supplierList.find(s => s.id === selectedSupplierId)
    const initialItemId = selectedSupplier?.prefix ? `${selectedSupplier.prefix} ${searchTerm}` : searchTerm

    const [itemFormData, setItemFormData] = useState({
        itemId: initialItemId,
        shortDescription: '',
        longDescription: '',
        airlinePartCost: 0.0,
        listPrice: 0.0,
        tariff: 0.0,
        productGroupId: 0,
        unitOfMeasure: '',
        supplierId: selectedSupplierId
    })
    const [isValid, setIsValid] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {

        ItemCreationSchema.validate(itemFormData, { abortEarly: false })
            .then(data => {
                setIsValid(true)
                setErrors([])
            })
            .catch(err => {
                setIsValid(false)
                setErrors(err.inner)
            })

    }, [itemFormData])

    const handleInput = (event, name, value, selection) => {
        const formData = {
            ...itemFormData,
            [event?.target?.name || name]: event?.target?.value || value
        }

        setItemFormData(formData)
    }

    const [executeCreateItem] = useMutation(CREATE_ITEM, {
        onCompleted: data => {
            setFormIsSubmitting(false)
            showModal(data.itemCreate)
        }
    })

    const submitNewItem = () => {
        setFormIsSubmitting(true)
        executeCreateItem({
            variables: itemFormData
        })
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
                        name="airlinePartCost"
                        value={itemFormData.airlineCost}
                        label="Airline Cost"
                        onChange={handleInput}
                    />
                    <ErrorBlock errors={errors} fieldName='airlinePartCost' />
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
                <Button onClick={submitNewItem} variant="contained" color="secondary" type="submit" disabled={formIsSubmitting || errors.length > 0}>
                    {formIsSubmitting ? 'Registering Item..' : 'Register Item'}
                </Button>
            </DivCenter>
        </>
    )
}
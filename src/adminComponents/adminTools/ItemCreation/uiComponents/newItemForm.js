import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { Button, Grid } from '@material-ui/core'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { MemoizedField } from 'pageComponents/_common/form/FormField'

const CREATE_ITEM = gql`
mutation CreateItem($item: ItemCreateInputGraphType) {
    itemCreate(item: $item){
        itemId
        invMastUid
        success
        messages
    }
}
`

export default function NewItemForm(props) {
    const [formIsSubmitting, setFormIsSubmitting] = useState(false)
    const {
        searchTerm,
        selectedSupplier,
        supplierList,
        unitsOfMeasureList,
        productGroupsList,
        showModal
    } = props
    
    const initialItemId = selectedSupplier?.prefix ? `${selectedSupplier.prefix} ${searchTerm}` : searchTerm
    
    const initialState = {
        itemId: initialItemId,
        shortDescription: '',
        extendedDescription: '',
        manufacturerPartNumber: searchTerm,
        airlinePartCost: null,
        listPrice: null,
        tariff: undefined,
        productGroup: null,
        unitOfMeasure: '',
        supplier: selectedSupplier
    }
    
    const [formData, setFormData] = useState(initialState)
    
    useEffect(() => {
        setFormData({ ...formData, supplier: selectedSupplier })
    }, [selectedSupplier])
    
    useEffect(() => {
        setFormData({ ...formData, manufacturerPartNumber: searchTerm })
    }, [searchTerm])
    
    useEffect(() => {
        setFormData({ ...formData, itemId: `${formData.supplier?.prefix || ''} ${formData.manufacturerPartNumber || ''}`.trim() })
    }, [formData.manufacturerPartNumber, formData.supplier])
    
    const itemCreationSchema = Yup.object({
        manufacturerPartNumber: Yup.string()
            .label('Manufacturer Part Number')
            .matches(/[A-Za-z0-9 -,./+=:()#]/, 'Only alphanumeric, space, and -,./=:()# characters are permitted.')
            .min(3)
            .max(30)
            .uppercase()
            .required()
            .meta({ autoFocus: true }),
        itemId: Yup.string()
            .label('Item ID')
            .matches(/[A-Za-z0-9 -,./+=:()#]/, 'Only alphanumeric, space, and -,./=:()# characters are permitted.')
            .min(3)
            .max(30)
            .uppercase()
            .meta({ disabled: true }),
        description: Yup.string()
            .label('Description')
            .meta({ type: 'textarea' })
            .min(5)
            .max(3000)
            .required(),
        unitOfMeasure: Yup.string()
            .label('Unit Of Measure')
            .meta({ options: unitsOfMeasureList, type: 'select' })
            .required(),
        airlinePartCost: Yup.number()
            .label('Airline Cost')
            .min(0.01)
            .max(9999999)
            .required(),
        listPrice: Yup.number()
            .label('List Price')
            .moreThan(formData.airlinePartCost)
            .required(),
        tariff: Yup.number()
            .label('Tariff')
            .min(0)
            .max(9999999),
        productGroup: Yup.string()
            .label('Product Group')
            .meta({ options: productGroupsList, type: 'select' })
            .required(),
        supplier: Yup.string()
            .label('Supplier')
            .meta({ options: supplierList, type: 'select' })
            .required()
    })
    
    const [executeCreateItem] = useMutation(CREATE_ITEM, {
        onCompleted: data => {
            setFormIsSubmitting(false)
            showModal(data.itemCreate)
            if (data.itemCreate.success) {
                setFormData(initialState)
            }
        },
        onError: () => {
            setFormIsSubmitting(false)
        }
    })
    
    const submitNewItem = () => {
        setFormIsSubmitting(true)
        
        const { unitOfMeasure, productGroup, supplier, description, ...rest } = formData
        executeCreateItem({
            variables: {
                item: {
                    ...rest,
                    shortDescription: description.slice(0, 40),
                    extendedDescription: description.slice(40, description.length),
                    unitOfMeasure: unitOfMeasure.value,
                    productGroupId: productGroup.value,
                    supplierId: supplier.value
                }
            }
        })
    }
    
    const validate = () => {
        try {
            itemCreationSchema.validateSync(formData)
        } catch (e) { return e }
    }
    
    const error = validate()
    
    const fields = Object.keys(itemCreationSchema.describe().fields)
    
    return (
        <>
            <Grid container justify="center">
                <form style={{ flex: 1, padding: 16, maxWidth: 500 }}>
                    {fields.map(field => (
                        <MemoizedField
                            key={field}
                            field={field}
                            formData={formData}
                            setFormData={setFormData}
                            yupSchema={itemCreationSchema}
                        />
                    ))}
                </form>
            </Grid>
            
            <Grid container justify="center">
                <Button
                    onClick={submitNewItem}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={formIsSubmitting || !!error}
                >
                    {formIsSubmitting ? 'Registering Item..' : 'Register Item'}
                </Button>
            </Grid>
        </>
    )
}
import React, { useMemo, useState } from 'react'
import { TextField, Grid, Typography as Text } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { searchObjectArrayForString } from '../helpers/generalHelperFunctions'

export const MemoizedField = props => {
    const { field, formData } = props
    const [focused, setFocused] = useState(false)
    
    const handleFocus = () => setFocused(true)
    
    const handleBlur = () => {
        setFocused(false)
    }
    
    const memoizedFormField = useMemo(() => (
        <FormField {...props}/>
    ), [focused, formData[field]])
    
    return (
        <div onFocus={handleFocus} onBlur={handleBlur} style={{ marginTop: 16 }}>
            {memoizedFormField}
        </div>
    )
}

export default function FormField({ field, formData, setFormData, yupSchema }) {
    const fieldSchema = yupSchema.describe().fields[field]
    const fieldSchemaType = fieldSchema.meta?.type || fieldSchema.type
    const type = fieldSchemaType === 'number'
        ? fieldSchema.tests.some(t => t.name === 'integer') ? 'integer' : 'decimal'
        : fieldSchemaType
    const options = fieldSchema.meta?.options || []
    const required = fieldSchema.tests.some(t => t.name === 'required')
    const label = fieldSchema.label || field
    const [value, setValue] = useState(formData[field])
    
    const validate = () => {
        try {
            const transformedValue = yupSchema.validateSyncAt(field, formData)
            if (type === 'string') setFormData({ ...formData, [field]: transformedValue })
        } catch (e) {
            return e
        }
    }
    
    const error = validate()
    
    const getCleanValue = (dirtyValue) => {
        switch (type) {
        case 'integer':
            const cleanInt = dirtyValue.replace(/\D/g, '')
            return cleanInt.length && parseInt(cleanInt)
        
        case 'decimal':
            const cleanFloat = dirtyValue.replace(/[^0-9.]|\.(?=.*\.)/g, '')
            setValue(cleanFloat)
            return cleanFloat.length && parseFloat(cleanFloat)
        
        case 'text':
        case 'string':
            const regexSource = fieldSchema.tests.find(test => test.params?.regex)?.params?.regex?.source
            const regex = regexSource && new RegExp(regexSource, 'gi')
            const cleanString = regex ? dirtyValue.match(regex)?.join('') : dirtyValue
            return cleanString
        
        default:
            return dirtyValue
        }
    }
    
    const handleChange = ({ target: { value } }) => setFormData({ ...formData, [field]: getCleanValue(value) })
    
    const handleSelectChange = (e, newValue) => setFormData({ ...formData, [field]: newValue })
    
    return (
        <InputType
            {...fieldSchema.meta} //Can pass any valid mui TextField prop through via the yup .meta({}) chain
            id={field}
            type={type}
            label={label}
            value={(type === 'decimal' ? value : formData[field]) || ''} //Fix for parseFloat stripping decimal point
            onChange={handleChange}
            onSelectChange={handleSelectChange}
            options={options}
            error={error}
            required={required}
            rows={fieldSchema.meta?.rows}
        />
    )
}

export const InputType = ({ id, type, value, onChange, onSelectChange, options, rows, error, ...rest }) => {
    const [touched, setTouched] = useState(false)
    const showError = Boolean(touched && error)
    const errorText = touched && error && error.type !== 'required' && error.message
    
    const handleBlur = () => setTouched(true)
    switch (type) {
    case 'select':
        return (
            <Autocomplete
                id={id}
                fullWidth
                openOnFocus
                autoHighlight
                value={value || null}
                onChange={onSelectChange}
                options={options} //[{ label, value }]
                getOptionLabel={option => option.label || ''}
                getOptionSelected={(option, selected) => option.value === selected.value}
                renderOption={renderOptionWithValue}
                filterOptions={(options, state) => searchObjectArrayForString(options, state.inputValue)}
                renderInput={(params) => (
                    <TextField {...params} {...rest} error={showError} helperText={errorText}/>
                )}
                placeholder="Search options"
                ListboxProps={{ style: { maxHeight: 350 } }}
                onBlur={handleBlur}
            />
        )
    
    default:
        return (
            <TextField
                {...rest}
                id={id}
                fullWidth
                type={type} //Any valid html5 input type
                multiline={type === 'textarea'}
                rows={rows || 3}
                value={value}
                onChange={onChange}
                InputProps={{ inputProps: { shrink: !!value } }}
                error={showError}
                helperText={errorText}
                onBlur={handleBlur}
            />
        )
    }
}

const renderOptionWithValue = ({ label, value }) => (
    <Grid key={value} container>
        <Text>{label}</Text>
        <Text style={{ color: '#999', fontSize: 12, textAlign: 'left', margin: 'auto 10px' }}>{value}</Text>
    </Grid>
)
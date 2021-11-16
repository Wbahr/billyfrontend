import styled from 'styled-components'
import { Field } from 'formik'

export const FormikFormGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    background-color: rgb(242, 243, 244);
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
    flex-basis: min-content;
    flex-direction: column;
    margin: 10px;
    padding: 10px;
`

export const FormikFormContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: center;
    ${FormikFormGroup} {
        flex-direction: column;
    }
`

export const FormikFormContainerColumnMajor = styled(FormikFormContainer)`
    flex-direction: column;
    ${FormikFormGroup} {
        flex-direction: row;
        justify-content: center;
    }
`

//Place components inside this div so they are not affected by outside 
//flex sizing and will flow together with their label and error message
export const FormikFormFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 8px;
    width: 416px;
    justify-content: center;
    input, select {
        height: 40px;
        padding: 0 8px;
        color: #303030;
        font-size: 16px;
        border-radius: 1px;
        border: 1px solid #e1e1e1;  
        :focus{
            border: 1px solid #007bff;  
            outline: none;
        }
            ::placeholder {
            color: grey;
            font-size: 14px;
        }
    }
    label {
        color: #606060;
        font-size: 14px;
        font-weight: 400;
        padding-left: 4px;
        margin-bottom: 0px;
        // background-color: white;
        width: max-content;
        padding: 2px;
        margin-left: 7px;
    }
`

export const FormikFormFieldLabel = styled.label`

`

export const FormikFormFieldError = styled.span`
    color: black;
    font-size: 14px;
    font-weight: bold;
    padding-left: 4px;
    margin-right: -4px;
    width: max-content;
    padding: 2px;
    width: 100%;
    text-align: right;
    font-style: italic;
`

export const FormikFormField = styled(Field)`

`
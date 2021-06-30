import React, { useContext, useState, useEffect } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Checkbox, Grid } from '@material-ui/core'
import { ButtonBlack, ButtonRed } from '../../../styles/buttons'
import { DivNavigation } from '../../../styles/divs'
import Context from '../../../setup/context'
import ProcessingSubmissionModal from '../uiComponents/processingSubmissionModal'
import SubmissionFailedModal from '../uiComponents/submissionFailedModal'
import styled from 'styled-components'

const CAPTCHA_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

const Label = styled.label`
	margin: 0;
	font-size: 12px;
	font-style: italic;
`
const Term = styled.li`
    list-style-type: none;
    font-size: 12px;
    margin: 10px
`

const CaptchaContainer = styled.div`
    margin: 10px 0;
    width: 100%;
    display: flex;
    justify-content: center;
`

export default function ConfirmationScreen(props) {
    const { handleMoveStep, values, history } = props

    const context = useContext(Context)

    const [captchaPassed, setCaptchaPassed] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [showSubmissionFailedModal, setShowSubmissionFailedModal] = useState(false)
    const [termsAccepted, setTermsAccepted] = useState(false)
    
    useEffect(() => {
        window.scrollTo({ top: 0 })
        if (context.userInfo) {
            setCaptchaPassed(true)
        }
    }, [])

    function handleAcceptTerms(e) {
        setTermsAccepted(e.target.checked)
    }

    function handleCaptcha(token) {
        const requestBody = JSON.stringify({
            event: {
                token,
                siteKey: CAPTCHA_KEY,
            }
        })
        //send request to airline server to add secret key and send to google then

        setCaptchaPassed(true)
    }

    function handleSubmitServiceForm() {
        setSubmitting(true)
        console.log(values)
        new Promise(res => res({ formNo: 100 })).then(rtn => {
            const { formNo } = rtn
            if (formNo) {
                history.push(`/serviceform-complete/${formNo}`)
            } else {
                setShowSubmissionFailedModal(true)
            }
            setSubmitting(false)
        }).catch(err => {
            setSubmitting(false)
            setShowSubmissionFailedModal(true)
        })
    }

    return (
        <div>
            <ul>
                <Term>Due to extensive inspection and evaluation of your component(s), report generation and a thorough research for presenting an option for replacing the part(s) with equivalent new one(s), there will be a minimum charge of $115.00 for each part submitted. If an order is not placed, part(s) will be returned unassembled.</Term>
                <Term>Please note that all emergency repairs require a PO or credit card prior to receiving the part.</Term>
                <Term>Please drain all fluids from parts.</Term>
                <Term>Once your parts are received we will evaluate and send a complete repair quote before any work is started.</Term>
                <Term>There will be an additional charge for oil and residue disposal. </Term>
                <Term>Items returned for warranty and found not to be defective will be charged inspection/test fee for labor and material.</Term>
            </ul>
            <Grid container alignItems="center">
                <Checkbox
                    size="small"
                    checked={termsAccepted}
                    onChange={handleAcceptTerms}
                />
                <Label>I understand and accept AHC' Terms and Conditions and authorize the evaluation of the above part(s).</Label>
            </Grid>
            {!context.userInfo && (
                <CaptchaContainer>
                    <ReCAPTCHA sitekey={CAPTCHA_KEY} onChange={handleCaptcha} />
                </CaptchaContainer>
            )}
            <DivNavigation>
                <ButtonBlack onClick={() => handleMoveStep(2)}>Previous</ButtonBlack>
                <ButtonRed disabled={!termsAccepted || !captchaPassed} onClick={handleSubmitServiceForm}>Submit</ButtonRed>
            </DivNavigation>
            {submitting && <ProcessingSubmissionModal />}
            {showSubmissionFailedModal && <SubmissionFailedModal />}
        </div>
    )
}
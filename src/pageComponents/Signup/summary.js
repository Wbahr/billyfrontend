import React from 'react'
import { Link } from 'react-router-dom';
import { FormikFormGroup } from 'styles/formikForm';

export default function Summary() {
    return (
        <FormikFormGroup>
            <p>
                Thank you for registering for an online account at Airline Hydraulics. We have received 
                your submission and will be reviewing it shortly. <b>We will notify you via email once your account has 
                been approved and you are able to log into your account.</b> You can expect to hear back from us in 
                regards to your customer registration within 1 business day.
            </p>
            <p>
                If you require immediate assistance, please call us at 1-800-999-7378.
            </p>
            <ul>
                <li>Want to browse our products? <Link to="/categories">Check out our product lines today!</Link></li>
                <li> Need repair or field services? Looking for engineered systems and assembiles? Looking for plant services? <Link to="/pages/services/services">Let us serve you.</Link></li>
                <li>Looking for quick answers? <Link to="/pages/resources/">Check out our resource center</Link> for linecards, brochures, and more.</li>
            </ul>
            <p><Link to="/">Return to Homepage</Link></p>        
        </FormikFormGroup>
    );
}
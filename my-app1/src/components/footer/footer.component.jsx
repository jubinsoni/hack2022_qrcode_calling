import React from "react";
import './footer.styles.css'

export const Footer = ({footerMessage}) => (
    // <div>sdsd {console.log(props.name)}</div>
    <div className='footer'>
        <p> {footerMessage} </p>
    </div>
);
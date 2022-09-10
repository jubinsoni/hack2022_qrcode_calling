import React from "react";
import './card.styles.css'
import { useHistory } from 'react-router-dom';


export const Card = (props) => {
    const history = useHistory();
    return (
        <div>
        <div className='card-container' onClick={() => history.push({pathname:`/order/itemlist`,state:props.placeName})}>
            <p>{ props.placeName.name } </p>
        </div>
        <div>
            <p> </p>
        </div>
        </div>
    );
};
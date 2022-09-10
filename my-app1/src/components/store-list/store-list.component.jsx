import React from "react";
import './store-list.styles.css'
import { Card } from "../card/card.component";

export const StoreList = (props) => {
    const Details = props.location.state;
    
    return (<div className='confirm-box'>
                <h2>Stores</h2>
                <div className='confirm-box2'>
                    {Details.map(restaurant => (
                        <Card key={restaurant.id} placeName={restaurant} />
                        ))}
                </div>
            </div>
            );
};
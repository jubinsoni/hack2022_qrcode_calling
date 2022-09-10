import React from "react";
import './confirm-list.styles.css'
//import { useHistory } from 'react-router-dom';
import {useState} from 'react';


export const ConfirmList = (props) => {
    const selectedItems = props.location.state;
    //const history = useHistory();

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const handleClick = async () => {

        console.log("items " + JSON.stringify(selectedItems));

        setIsLoading(true);
        try {
          //const response = await fetch('http://127.0.0.1:5000/restaurant_order', {
          //const response = await fetch('http://192.168.251.241:5000/restaurant_order', {
          const response = await fetch('http://192.168.1.20:5000/restaurant_order', {
            method: 'POST',
            body: JSON.stringify({
              item_list:JSON.stringify(selectedItems),
              number:'+918770915486',
            }),
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          });
    
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }
    
          const result = await response.json();
    
          console.log('result is: ', JSON.stringify(result, null, 4));
    
          setData(result);
        } catch (err) {
          setErr(err.message);
        } finally {
          setIsLoading(false);
        }
    };

    return (<div className='confirm-box'>
                <div className='Makerequest'>
                    <h2>Please Confirm Your order</h2>
                    {selectedItems.map(elem => (
                            <p key={elem} className='Makerequest3'>{elem}</p>
                            ))}
                </div>
                <div className='Makerequest'>
                    {err && <h2>{err}</h2>}
                    {<button className='Makerequest1' onClick={() => handleClick()}>Confirm Order</button>}

                    {isLoading && <h2>Loading...</h2>}

                    {data && (
                        <div>
                        <h2>Your OrderId: {data.message}</h2>
                        </div>
                    )}
                </div>
            </div>
            );
};
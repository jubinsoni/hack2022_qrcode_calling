import React from 'react';
import './input-number.styles.css'
import { useHistory } from 'react-router-dom';
import {useState} from 'react';


export const InputNumber = ({placeHolder,handleChange,handleRadioChange, inputNumberSearch, restaurantList, radioSearch, orderCase, endpoint}) => {
    const history = useHistory();

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const handleClick = async (inputNumberSearch, radioSearch) => {
        console.log(inputNumberSearch);
        console.log(radioSearch);
        console.log(orderCase);
        console.log('http://127.0.0.1:5000/' + endpoint);

        setIsLoading(true);
        try {
          //const response = await fetch('http://127.0.0.1:5000/' + endpoint, {
          //const response = await fetch('http://192.168.1.20:5000/' + endpoint, {
          const response = await fetch('http://192.168.1.20:5000/' + endpoint, {
            method: 'POST',
            body: JSON.stringify({
              languge:radioSearch,
              number:inputNumberSearch,
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
          if(result.message === 'OK')
          {
            result.message = 'You Will Recive Call Back Shortly';
          }
        } catch (err) {
          setErr(err.message);
        } finally {
          setIsLoading(false);
        }
    };

    return(
    <div>
        <div>
            <input 
            className='input-number'
            type='text'
            placeholder={placeHolder} 
            onChange={handleChange} />
        </div>
        {!orderCase &&<div className='radio-btn-grp' onChange={handleRadioChange}>
            <input type="radio" value="hindi" name="gender" /> हिन्दी
            <input type="radio" value="punjabi" name="gender" /> ਪੰਜਾਬੀ
            <input type="radio" value="gujrati" name="gender" /> ગુજરાતી
            <input type="radio" value="telgu" name="gender" /> తెలుగు
            <input type="radio" value="tamil" name="gender" /> தமிழ்
            <input type="radio" value="english" name="gender" /> English
        </div>}
        <div>
            {err && <h2>{err}</h2>}
            {!orderCase && <button className='Makerequest' onClick={() => handleClick(inputNumberSearch, radioSearch)}>Place Call</button>}

            {isLoading && <h2>Loading...</h2>}

            {data && (
                <div>
                <h2> {data.message}</h2>
                </div>
            )}
        </div>
        <div>
            {orderCase && <button className='Makerequest' onClick={() => history.push({pathname:`/order/storelist`,state:restaurantList})}>Select Restaurant</button>}
        </div>
    </div>
    
    );
};
import React from "react";
import './item-list.styles.css'
import { useHistory } from 'react-router-dom';
import {useState} from 'react';

export const ItemList = (props) => {
    const ItemDetails = props.location.state.menu;
    const history = useHistory();
    const [checkSelectedItems, setcheckSelectedItems] = useState([]);

    const handleChange = event => {
        if (event.target.checked) {
          //console.log('✅ Checkbox is checked');
          setcheckSelectedItems((checkSelectedItems) => [...checkSelectedItems, event.target.value]);
        } else {
          //console.log('⛔️ Checkbox is NOT checked');
          setcheckSelectedItems(current =>
            current.filter(employee => {
              return employee !== event.target.value;
            }),
          );
        }
    };

    return (<div className='confirm-box'>
                <div className='confirm-box2'>
                <h2>Menu</h2>
                    {
                        ItemDetails.map(item => {
                        return (
                        <div key={item.id}>
                        <div className='check-box-group'>
                            <label  className="container">{item.name} 
                              <input  type="checkbox" value={item.name} onChange={handleChange} />
                              <span   className="checkmark"></span>
                            </label>
                        </div>
                        <div>
                          <p></p>
                        </div>
                        </div>
                        );
                        })
                    }
                </div>
                <div className='Makerequest1'>
                    {console.log("from itemlist list")}
                    <button className='Makerequest' onClick={() => history.push({pathname:`/order/confirmlist`,state:checkSelectedItems})}>Place order</button>
                </div>
            </div>
            );
};
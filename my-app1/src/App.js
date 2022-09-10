import React, {Component} from 'react';
import './App.css';
import { Footer } from './components/footer/footer.component';
import { NotFound } from './components/not-found/not-found.component';
import { Switch,Route } from 'react-router';
import { datas } from './utils/data'

import { InputNumber } from './components/input-number/input-number.component';
import { StoreList } from './components/store-list/store-list.component';
import { ItemList } from './components/item-list/item-list.component';
import { ConfirmList } from './components/confirm-list copy/confirm-list.component';

export const DefaultApp = (props) => {
  
  return(
    <div className="App">
      <h1>Number</h1>
        <InputNumber placeHolder='Number' handleChange={props.handleChange} handleRadioChange={props.handleRadioChange} inputNumberSearch={props.inputNumberSearch} restaurantList={props.filteredrestaurants} radioSearch={props.radioSearch}/>
        <Footer footerMessage='Made with &#10084;&#65039;&nbsp; by ObdPlatform' /> 
    </div>
  );
}

export const Guide = (props) => {
  
  return(
    <div className="App">
      <h1>Virtual Tour Guide</h1>
        <InputNumber placeHolder='Enter Number' handleChange={props.handleChange} handleRadioChange={props.handleRadioChange} inputNumberSearch={props.inputNumberSearch} restaurantList={props.filteredrestaurants} radioSearch={props.radioSearch} orderCase={false} endpoint='virtual_tour_guide' />
        <Footer footerMessage='Made with &#10084;&#65039;&nbsp; by ObdPlatform' /> 
    </div>
  );
}

export const Add = (props) => {
  
  return(
    <div className="App">
      <h1>Advertisement</h1>
        <InputNumber placeHolder='Enter Number' handleChange={props.handleChange} handleRadioChange={props.handleRadioChange} inputNumberSearch={props.inputNumberSearch} restaurantList={props.filteredrestaurants} radioSearch={props.radioSearch} orderCase={false} endpoint='advertisement'/>
        <Footer footerMessage='Made with &#10084;&#65039;&nbsp; by ObdPlatform' /> 
    </div>
  );
}

export const Order = (props) => {
  
  return(
    <div className="App">
      <h1>Highway Order</h1>
        <InputNumber placeHolder='Enter Number' handleChange={props.handleChange} handleRadioChange={props.handleRadioChange} inputNumberSearch={props.inputNumberSearch} restaurantList={props.filteredrestaurants} radioSearch={props.radioSearch} orderCase={true} />
        <Footer footerMessage='Made with &#10084;&#65039;&nbsp; by ObdPlatform' /> 
    </div>
  );
}

class App extends Component{
  constructor(){
    super();

    this.state = {
      restaurants: datas,
      inputNumberSearch: "",
      radioSearch:""
    };
  }

  // componentDidMount(){
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //   .then(response => response.json())
  //   //.then(users => console.log(users))
  //   .then(users => this.setState({restaurants : users}))
  // }

  handleChange = (e) => (
    this.setState({inputNumberSearch: e.target.value})
  )

  handleRadioChange = (e) =>{
    this.setState({radioSearch: e.target.value})
  }

  render() {
    const {restaurants, inputNumberSearch, radioSearch} = this.state;
    //console.log(inputNumberSearch)
    //console.log(radioSearch)
    return (
      <div>
         <Switch>
          <Route exact={true} path='/guide' render={(props) => (<Guide filteredrestaurants={restaurants} handleChange={this.handleChange} handleRadioChange={this.handleRadioChange} inputNumberSearch={inputNumberSearch} radioSearch={radioSearch} />)}/>
          <Route exact={true} path='/add' render={(props) => (<Add filteredrestaurants={restaurants} handleChange={this.handleChange} handleRadioChange={this.handleRadioChange} inputNumberSearch={inputNumberSearch} radioSearch={radioSearch}  />)}/>
          <Route exact={true} path='/order' render={(props) => (<Order filteredrestaurants={restaurants} handleChange={this.handleChange} handleRadioChange={this.handleRadioChange} inputNumberSearch={inputNumberSearch} radioSearch={radioSearch}  />)}/>
          <Route path='/order/storelist' component={StoreList} />
          <Route path='/order/itemlist' component={ItemList} />
          <Route path='/order/confirmlist' component={ConfirmList} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  };
}

export default App;

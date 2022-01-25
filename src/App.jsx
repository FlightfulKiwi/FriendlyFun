/* eslint-disable import/extensions */
import React from 'react';
import Info from './components/Info/Info.jsx';
import Electricity from './components/Electricity/Electricity.jsx';
import { CARBON_INTERFACE_API_KEY } from '../config.js';

const headers = {
  Authorization: CARBON_INTERFACE_API_KEY,
  'Content-Type': 'application/json',
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.getElectricityEstimate = this.getElectricityEstimate.bind(this);
  }

  getElectricityEstimate(url) {
    const body = {
      type: 'electricity',
      electricity_unit: url.unit,
      electricity_value: url.value,
      country: url.country,
      state: url.state,
    };
  }

  render() {
    return (
      <div>
        <Info />
        <Electricity electricityEstimate={this.getElectricityEstimate} />
      </div>
    );
  }
}

export default App;

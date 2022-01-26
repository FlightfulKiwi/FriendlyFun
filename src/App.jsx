/* eslint-disable import/extensions */
import React from 'react';
import Info from './components/Info/Info.jsx';
import Electricity from './components/Electricity/Electricity.jsx';
import FuelCombustion from './components/FuelCombustion/FuelCombustion.jsx';
import Shipping from './components/Shipping/Shipping.jsx';
import { CARBON_INTERFACE_API_KEY } from '../config.js';

const headers = {
  Authorization: `Bearer ${CARBON_INTERFACE_API_KEY}`,
  'Content-Type': 'application/json',
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.getElectricityEstimate = this.getElectricityEstimate.bind(this);
    this.getFuelSourceEstimate = this.getFuelSourceEstimate.bind(this);
    this.getShippingEstimate = this.getShippingEstimate.bind(this);
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

  getFuelSourceEstimate(url) {
    const body = {
      type: 'fueld_combustion',
      fuel_source_type: url.type,
      fuel_source_unit: url.unit,
      fuel_source_value: url.value,
    };
  }

  getShippingEstimate(url) {
    const body = {
      type: 'shipping',
      weight_unit: url.weightUnit,
      weight_value: url.weightValue,
      distance_unit: url.distanceUnit,
      distance_value: url.distanceValue,
      transport_method: url.transportMethod,
    };
    console.log(body);
  }

  render() {
    return (
      <div>
        <Info />
        <Electricity electricityEstimate={this.getElectricityEstimate} />
        <FuelCombustion fuelSourceEstimate={this.getFuelSourceEstimate} />
        <Shipping shippingEstimate={this.getShippingEstimate} />
      </div>
    );
  }
}

export default App;

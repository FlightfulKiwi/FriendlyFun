/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import React from 'react';
import axios from 'axios';
import Info from './components/Info/Info.jsx';
import Electricity from './components/Electricity/Electricity.jsx';
import FuelCombustion from './components/FuelCombustion/FuelCombustion.jsx';
import Shipping from './components/Shipping/Shipping.jsx';
import Flight from './components/Flight/Flight.jsx';
import Vehicle from './components/Vehicle/Vehicle.jsx';
import { CARBON_INTERFACE_API_KEY } from '../config.js';

const headers = {
  Authorization: `Bearer ${CARBON_INTERFACE_API_KEY}`,
  'Content-Type': 'application/json',
};
const carbonInterfaceURL = 'https://www.carboninterface.com/api/v1/estimates';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carbonLbElec: 0,
      carbonKgElec: 0,
      carbonLbFuel: 0,
      carbonKgFuel: 0,
      carbonLbShip: 0,
      carbonKgShip: 0,
      carbonLbFly: 0,
      carbonKgFly: 0,
      carbonLbVeh: 0,
      carbonKgVeh: 0,
    };
    this.getElectricityEstimate = this.getElectricityEstimate.bind(this);
    this.getFuelSourceEstimate = this.getFuelSourceEstimate.bind(this);
    this.getShippingEstimate = this.getShippingEstimate.bind(this);
    this.getFlightEstimate = this.getFlightEstimate.bind(this);
    this.getVehicleEstimate = this.getVehicleEstimate.bind(this);
  }

  async getElectricityEstimate(url) {
    const body = {
      type: 'electricity',
      electricity_unit: url.unit,
      electricity_value: url.value,
      country: url.country,
      state: url.state,
    };

    try {
      const estimate = await axios.post(carbonInterfaceURL, body, { headers });

      this.setState({
        carbonKgElec: estimate.data.data.attributes.carbon_kg,
        carbonLbElec: estimate.data.data.attributes.carbon_lb,
      });
    } catch (err) {
      console.error('Error retrieving Electricity estimate from CI:', err);
    }
  }

  async getFuelSourceEstimate(url) {
    const body = {
      type: 'fuel_combustion',
      fuel_source_type: url.type,
      fuel_source_unit: url.unit,
      fuel_source_value: url.value,
    };

    try {
      const estimate = await axios.post(carbonInterfaceURL, body, { headers });

      this.setState({
        carbonKgFuel: estimate.data.data.attributes.carbon_kg,
        carbonLbFuel: estimate.data.data.attributes.carbon_lb,
      });
    } catch (err) {
      console.error('Error retrieving Fuel Combustion estimate from CI:', err);
    }
  }

  async getShippingEstimate(url) {
    const body = {
      type: 'shipping',
      weight_unit: url.weightUnit,
      weight_value: url.weightValue,
      distance_unit: url.distanceUnit,
      distance_value: url.distanceValue,
      transport_method: url.transportMethod,
    };

    try {
      const estimate = await axios.post(carbonInterfaceURL, body, { headers });

      this.setState({
        carbonKgShip: estimate.data.data.attributes.carbon_kg,
        carbonLbShip: estimate.data.data.attributes.carbon_lb,
      });
    } catch (err) {
      console.error('Error retrieving Shipping estimate from CI:', err);
    }
  }

  async getFlightEstimate(url) {
    const {
      passengers, isRoundTrip, flightFrom, flightTo, continent, cityOrCode,
    } = url;
    let departureAirport = flightFrom;
    let destinationAirport = flightTo;

    if (cityOrCode === 'city') {
      try {
        departureAirport = await axios.get(`/airportdetails?cityOrCode=${cityOrCode}&destination=${flightFrom}&continent=${continent}`);
        destinationAirport = await axios.get(`/airportdetails?cityOrCode=${cityOrCode}&destination=${flightTo}&continent=${continent}`);
      } catch (err) {
        console.error('Error getting IATA code from DB:', err);
      }

      departureAirport = departureAirport.data.code;
      destinationAirport = destinationAirport.data.code;
    }

    const legs = [{
      departure_airport: departureAirport.toLowerCase(),
      destination_airport: destinationAirport.toLowerCase(),
    }];

    if (isRoundTrip) {
      legs.push({
        departure_airport: destinationAirport.toLowerCase(),
        destination_airport: departureAirport.toLowerCase(),
      });
    }

    const body = {
      type: 'flight',
      passengers,
      legs,
    };

    try {
      const estimate = await axios.post(carbonInterfaceURL, body, { headers });

      this.setState({
        carbonKgFly: estimate.data.data.attributes.carbon_kg,
        carbonLbFly: estimate.data.data.attributes.carbon_lb,
      });
    } catch (err) {
      console.error('Error retrieving estimate from Carbon Interface:', err);
    }
  }

  async getVehicleEstimate(url) {
    const body = {
      type: 'vehicle',
      distance_unit: url.unit,
      distance_value: url.value,
      vehicle_model_id: url.vehicleModelId,
    };

    try {
      const estimate = await axios.post(carbonInterfaceURL, body, { headers });

      this.setState({
        carbonKgVeh: estimate.data.data.attributes.carbon_kg,
        carbonLbVeh: estimate.data.data.attributes.carbon_lb,
      });
    } catch (err) {
      console.error('Error retrieving Vehicle estimate from CI:', err);
    }
  }

  render() {
    const {
      carbonLbElec, carbonKgElec, carbonLbFuel, carbonKgFuel, carbonLbShip, carbonKgShip,
      carbonLbFly, carbonKgFly, carbonLbVeh, carbonKgVeh,
    } = this.state;

    return (
      <div>
        <Info />
        <div className="estimates-container">
          <Vehicle
            vehicleEstimate={this.getVehicleEstimate}
            carbonLb={carbonLbVeh}
            carbonKg={carbonKgVeh}
          />
          <Flight
            flightEstimate={this.getFlightEstimate}
            carbonLb={carbonLbFly}
            carbonKg={carbonKgFly}
          />
          <Electricity
            electricityEstimate={this.getElectricityEstimate}
            carbonLb={carbonLbElec}
            carbonKg={carbonKgElec}
          />
          <Shipping
            shippingEstimate={this.getShippingEstimate}
            carbonLb={carbonLbShip}
            carbonKg={carbonKgShip}
          />
          <FuelCombustion
            fuelSourceEstimate={this.getFuelSourceEstimate}
            carbonLb={carbonLbFuel}
            carbonKg={carbonKgFuel}
          />
        </div>
      </div>
    );
  }
}

export default App;

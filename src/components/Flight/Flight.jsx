import React from 'react';
import PropTypes from 'prop-types';

// const { getAirportDetails } = require('../../../database/getAirportDetails');

class Flight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRoundTrip: false,
      flightFrom: '',
      flightTo: '',
      continent: '',
      cityOrCode: '',
    };
    this.onComputeClick = this.onComputeClick.bind(this);
    this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    await this.setState({ [name]: value });
  }

  async handleDropdownSelect(event) {
    event.preventDefault();
    const { target } = event;
    const { name, value } = target;

    await this.setState({ [name]: value });
  }

  onComputeClick(e) {
    e.preventDefault();
    const flightURL = {
      passengers: document.getElementById('flight-passengers').value,
    };

    const { flightEstimate } = this.props;
    flightEstimate(flightURL);

    document.getElementById('flight-passengers').value = '';
    this.setState({
      isRoundTrip: false, flightFrom: '', flightTo: '', continent: '', cityOrCode: '',
    });
  }

  render() {
    const {
      flightTo, flightFrom, isRoundTrip, continent, cityOrCode,
    } = this.state;

    return (
      <div id="flight">
        <p id="section-title">Flights</p>

        <label htmlFor="flight-passengers">
          Number of Passengers
          <sup className="reqd-indicator">*</sup>
          :
          <input type="number" id="flight-passengers" required />
        </label>

        <label htmlFor="flight-continent">
          Continent of Travel
          <sup className="reqd-indicator">*</sup>
          :
          <select
            id="flight-continent"
            name="continent"
            value={continent}
            onChange={this.handleDropdownSelect}
            required
          >
            <option value="" disabled>Choose a continent</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
          </select>
        </label>

        <label htmlFor="flight-lookup">
          From - To
          <sup className="reqd-indicator">*</sup>
          :
          <select
            id="flight-lookup"
            name="cityOrCode"
            onChange={this.handleDropdownSelect}
            value={cityOrCode}
            required
          >
            <option value="" disabled>City or IATA Code</option>
            <option value="city">City</option>
            <option value="airportCode">IATA Code</option>
          </select>
        </label>

        <input
          type="text"
          id="flight-from"
          placeholder="From"
          name="flightFrom"
          size="16"
          onChange={this.handleInputChange}
          value={flightFrom}
          required
        />

        <input
          type="text"
          id="flight-to"
          placeholder="To"
          name="flightTo"
          size="16"
          onChange={this.handleInputChange}
          value={flightTo}
          required
        />

        <label htmlFor="flight-roundtrip">
          Roundtrip:&nbsp;
          <input
            type="checkbox"
            checked={isRoundTrip}
            id="flight-roundtrip"
            name="isRoundTrip"
            onChange={this.handleInputChange}
          />
        </label>

        <div className="btn flight-button">
          <button type="button" onClick={this.onComputeClick}>
            Compute Estimate
          </button>
        </div>
      </div>
    );
  }
}

Flight.propTypes = {
  flightEstimate: PropTypes.func.isRequired,
};

export default Flight;

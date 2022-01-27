import React from 'react';
import PropTypes from 'prop-types';

class Flight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRoundTrip: false,
      flightFrom: '',
      flightTo: '',
      continent: '',
      cityOrCode: '',
      estimateVisible: false,
    };
    this.onComputeClick = this.onComputeClick.bind(this);
    this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.closeEstimate = this.closeEstimate.bind(this);
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
    const {
      isRoundTrip, flightFrom, flightTo, continent, cityOrCode,
    } = this.state;
    const flightURL = {
      passengers: Number(document.getElementById('flight-passengers').value),
      continent,
      cityOrCode,
      flightFrom,
      flightTo,
      isRoundTrip,
    };

    const { flightEstimate } = this.props;
    flightEstimate(flightURL);

    this.setState({ estimateVisible: true });
  }

  closeEstimate(e) {
    e.preventDefault();

    document.getElementById('flight-passengers').value = '';
    this.setState({
      isRoundTrip: false, flightFrom: '', flightTo: '', continent: '', cityOrCode: '', estimateVisible: false,
    });
  }

  render() {
    const {
      flightTo, flightFrom, isRoundTrip, continent, cityOrCode, estimateVisible,
    } = this.state;
    const { carbonKg, carbonLb } = this.props;

    return (
      <div id="flight">
        <p id="section-title">Flights</p>

        <label htmlFor="flight-passengers">
          Number of Passengers
          <sup className="reqd-indicator">*</sup>
          :&nbsp;&nbsp;
          <input type="number" id="flight-passengers" required />
          &nbsp;&nbsp;
        </label>

        <label htmlFor="flight-continent">
          Continent of Travel
          <sup className="reqd-indicator">*</sup>
          :&nbsp;&nbsp;
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
          &nbsp;&nbsp;
        </label>

        <label htmlFor="flight-lookup">
          From - To
          <sup className="reqd-indicator">*</sup>
          :&nbsp;&nbsp;
          <select
            id="flight-lookup"
            name="cityOrCode"
            onChange={this.handleDropdownSelect}
            value={cityOrCode}
            required
          >
            <option value="" disabled>City or IATA Code</option>
            <option value="city">City</option>
            <option value="code">IATA Code</option>
          </select>
          &nbsp;&nbsp;
        </label>

        <input
          type="text"
          id="flight-from"
          placeholder="From"
          name="flightFrom"
          size="20"
          onChange={this.handleInputChange}
          value={flightFrom}
          required
        />
        &nbsp;&nbsp;

        <input
          type="text"
          id="flight-to"
          placeholder="To"
          name="flightTo"
          size="20"
          onChange={this.handleInputChange}
          value={flightTo}
          required
        />
        &nbsp;&nbsp;

        <label htmlFor="flight-roundtrip">
          Roundtrip:&nbsp;&nbsp;
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
            Estimate
          </button>
        </div>

        {estimateVisible
          && (
          <div className="show-estimate-text">
            <p>
              A&nbsp;
              {isRoundTrip ? 'round trip' : 'one-way'}
              &nbsp;flight from&nbsp;
              {flightFrom}
              &nbsp;to&nbsp;
              {flightTo}
              &nbsp;results in the emission of
            </p>
            <div className="show-carbon">
              <div>
                {carbonKg}
                &nbsp;kilograms of carbon dioxide equivalent
              </div>
              <div>
                {carbonLb}
                &nbsp;pounds of carbon dioxide equivalent
              </div>
            </div>
            <button
              type="button"
              className="btn close-button"
              onClick={this.closeEstimate}
            >
              Close
            </button>
          </div>
          )}
      </div>
    );
  }
}

Flight.propTypes = {
  flightEstimate: PropTypes.func.isRequired,
  carbonLb: PropTypes.number.isRequired,
  carbonKg: PropTypes.number.isRequired,
};

export default Flight;

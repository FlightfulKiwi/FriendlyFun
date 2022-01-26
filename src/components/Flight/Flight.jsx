import React from 'react';
import PropTypes from 'prop-types';
import param from '../param';

class Flight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRoundTrip: false,
      departure: '',
      arrival: '',
      distanceUnit: 'km',
    };
    this.onComputeClick = this.onComputeClick.bind(this);
    this.onDistanceUnitSelect = this.onDistanceUnitSelect.bind(this);
  }

  onDistanceUnitSelect(e) {
    e.preventDefault();
    this.setState({ distanceUnit: e.target.value });
  }

  onComputeClick(e) {
    e.preventDefault();
    const { distanceUnit } = this.state;
    const flightURL = {
      passengers: document.getElementById('flight-passengers').value,
      legsArray,
      distanceUnit,
    };

    const { flightEstimate } = this.props;
    flightEstimate(flightURL);

    document.getElementById('flight-passengers').value = '';
    this.setState({ isRoundTrip: false, distanceUnit: '' });
  }

  render() {
    const { distanceUnit, legs } = this.state;

    return (
      <div id="flight">
        <p id="section-title">Fuel Combustion</p>

        <label htmlFor="flight-passengers">
          Number of Passengers
          <sup className="reqd-indicator">*</sup>
          :
          <input type="number" id="flight-passengers" required />
        </label>

        <label htmlFor="flight-passengers">
          Number of Passengers
          <sup className="reqd-indicator">*</sup>
          :
          <select
            id="flight-passengers"
            value={type}
            onChange={this.onTypeSelect}
            required
          >
            {
              param.fuelSourcesNames.map((name, i) => {
                const k = 2 * i;
                return (
                  <option key={k} value={param.fuelSources[name][0]}>
                    {name}
                  </option>
                );
              })
            }
          </select>
        </label>

        <label htmlFor="flight-distance-unit">
          Distance Unit:
          <select
            id="flight-distance-unit"
            value={distanceUnit}
            onChange={this.onDistanceUnitSelect}
          >
            <option value="km">Kilometers</option>
            <option value="mi">Miles</option>
          </select>
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

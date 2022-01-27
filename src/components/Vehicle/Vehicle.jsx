import React from 'react';
import PropTypes from 'prop-types';
import param from '../param';

let models = [];
let vehicleModelId = '';

class Vehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: '',
      unit: '',
      make: '',
      model: '',
      estimateVisible: false,
    };
    this.onComputeClick = this.onComputeClick.bind(this);
    this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
    this.closeEstimate = this.closeEstimate.bind(this);
  }

  async handleDropdownSelect(event) {
    event.preventDefault();

    const { target } = event;
    const { name, value } = target;

    if (name === 'make') {
      models = Object.keys(param.vehicleMakesAndModels[value]);
    }

    await this.setState({ [name]: value });
  }

  async onComputeClick(e) {
    e.preventDefault();

    await this.setState({
      distance: Number(document.getElementById('vehicle-distance').value),
    });

    const {
      distance, unit, make, model,
    } = this.state;
    vehicleModelId = param.vehicleMakesAndModels[make][model];

    const vehicleURL = {
      unit,
      value: distance,
      vehicleModelId,
    };

    const { vehicleEstimate } = this.props;
    vehicleEstimate(vehicleURL);

    this.setState({ estimateVisible: true });
  }

  closeEstimate(e) {
    e.preventDefault();

    document.getElementById('vehicle-distance').value = '';
    models = [];
    vehicleModelId = '';
    this.setState({
      distance: '', unit: '', make: '', model: '', estimateVisible: false,
    });
  }

  render() {
    const {
      distance, unit, make, model, estimateVisible,
    } = this.state;
    const { carbonKg, carbonLb } = this.props;

    return (
      <div id="vehicle">
        <p id="section-title">Vehicle</p>

        <label htmlFor="vehicle-distance">
          Distance
          <sup className="reqd-indicator">*</sup>
          :&nbsp;&nbsp;
          <input type="number" id="vehicle-distance" required />
          &nbsp;&nbsp;
        </label>

        <label htmlFor="vehicle-distance">
          Unit
          <sup className="reqd-indicator">*</sup>
          :&nbsp;&nbsp;
          <select
            id="vehicle-distance"
            name="unit"
            value={unit}
            onChange={this.handleDropdownSelect}
            required
          >
            <option value="" disabled>Choose unit</option>
            <option value="mi">Miles</option>
            <option value="km">Kilometers</option>
          </select>
          &nbsp;&nbsp;
        </label>

        <label htmlFor="vehicle-make">
          Make
          <sup className="reqd-indicator">*</sup>
          :&nbsp;&nbsp;
          <select
            id="vehicle-make"
            name="make"
            onChange={this.handleDropdownSelect}
            value={make}
            required
          >
            <option value="" disabled>Choose a Make</option>
            {
              param.vehicleMakes.map((car, i) => {
                const k = 2 * i;
                return (
                  <option
                    key={k}
                    value={car}
                  >
                    {car}
                  </option>
                );
              })
            }
          </select>
          &nbsp;&nbsp;
        </label>

        <label htmlFor="vehicle-model">
          Model
          <sup className="reqd-indicator">*</sup>
          :&nbsp;&nbsp;
          <select
            id="vehicle-model"
            name="model"
            onChange={this.handleDropdownSelect}
            value={model}
            required
          >
            <option value="" disabled>Choose a Model</option>
            {
              models.map((mod, i) => {
                const k = 3 * i;
                return (
                  <option
                    key={k}
                    value={mod}
                  >
                    {mod}
                  </option>
                );
              })
            }
          </select>
          &nbsp;&nbsp;
        </label>

        <div className="btn vehicle-button">
          <button type="button" onClick={this.onComputeClick}>
            Estimate
          </button>
        </div>

        {estimateVisible
          && (
          <div className="show-estimate-text">
            <p>
              A&nbsp;
              {distance}
              -
              {unit}
              &nbsp;car ride in a&nbsp;
              {make}
              &nbsp;
              {model}
              &nbsp;leads to the emission of approximately
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

Vehicle.propTypes = {
  vehicleEstimate: PropTypes.func.isRequired,
  carbonLb: PropTypes.number.isRequired,
  carbonKg: PropTypes.number.isRequired,
};

export default Vehicle;

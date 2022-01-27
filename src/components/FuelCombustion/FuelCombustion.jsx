import React from 'react';
import PropTypes from 'prop-types';
import param from '../param';

class FuelCombustion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      unit: '',
      unitsArray: [],
    };
    this.onTypeSelect = this.onTypeSelect.bind(this);
    this.onUnitSelect = this.onUnitSelect.bind(this);
    this.onComputeClick = this.onComputeClick.bind(this);
  }

  onTypeSelect(e) {
    e.preventDefault();
    const el = document.getElementById('fuel-source-type');
    const name = el.options[el.selectedIndex].text;

    this.setState({
      type: e.target.value,
      unitsArray: param.fuelSources[name][1],
    });
  }

  onUnitSelect(e) {
    e.preventDefault();
    this.setState({ unit: e.target.value });
  }

  onComputeClick(e) {
    e.preventDefault();
    const { type, unit } = this.state;
    const fuelSourceURL = {
      type,
      unit,
      value: Number(document.getElementById('fuel-source-value').value),
    };

    const { fuelSourceEstimate } = this.props;
    fuelSourceEstimate(fuelSourceURL);

    document.getElementById('fuel-source-value').value = '';
    this.setState({ type: '', unit: '', unitsArray: [] });
  }

  render() {
    const { type, unit, unitsArray } = this.state;

    return (
      <div id="fuel-source">
        <p id="section-title">Fuel Combustion</p>

        <label htmlFor="fuel-source-type">
          Fuel Source Type
          <sup className="reqd-indicator">*</sup>
          :&nbsp;&nbsp;
          <select
            id="fuel-source-type"
            value={type}
            onChange={this.onTypeSelect}
            required
          >
            <option value="" disabled>Choose Fuel Source</option>
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
          &nbsp;&nbsp;
        </label>

        <label htmlFor="fuel-source-value">
          Fuel Source Value
          <sup className="reqd-indicator">*</sup>
          :&nbsp;&nbsp;
          <input type="number" id="fuel-source-value" required />
        </label>
        &nbsp;&nbsp;

        <label htmlFor="fuel-source-unit">
          Fuel Source Unit
          <sup className="reqd-indicator">*</sup>
          :&nbsp;&nbsp;
          <select
            id="fuel-source-unit"
            value={unit}
            onChange={this.onUnitSelect}
            required
          >
            {
              unitsArray.map((un, i) => {
                const k = 3 * i;
                return (
                  <option key={k} value={un}>
                    {un}
                  </option>
                );
              })
            }
          </select>
          &nbsp;&nbsp;
        </label>

        <div className="btn fuel-source-button">
          <button type="button" onClick={this.onComputeClick}>
            Estimate
          </button>
        </div>
      </div>
    );
  }
}

FuelCombustion.propTypes = {
  fuelSourceEstimate: PropTypes.func.isRequired,
};

export default FuelCombustion;

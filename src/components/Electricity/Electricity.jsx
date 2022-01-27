import React from 'react';
import PropTypes from 'prop-types';
import param from '../param';

class Electricity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unit: 'mwh',
      continent: '',
      country: '',
      state: '',
      estimateVisible: false,
    };
    this.onContinentSelect = this.onContinentSelect.bind(this);
    this.onUnitSelect = this.onUnitSelect.bind(this);
    this.onCountrySelect = this.onCountrySelect.bind(this);
    this.onStateSelect = this.onStateSelect.bind(this);
    this.onComputeClick = this.onComputeClick.bind(this);
    this.closeEstimate = this.closeEstimate.bind(this);
  }

  onContinentSelect(e) {
    e.preventDefault();
    this.setState({ continent: e.target.value });
  }

  onUnitSelect(e) {
    e.preventDefault();
    this.setState({ unit: e.target.value });
  }

  onCountrySelect(e) {
    e.preventDefault();
    this.setState({ country: e.target.value });
  }

  onStateSelect(e) {
    e.preventDefault();
    this.setState({ state: e.target.value });
  }

  async onComputeClick(e) {
    e.preventDefault();

    await this.setState({
      amount: Number(document.getElementById('electricity-value').value),
    });

    const {
      unit, country, state, amount,
    } = this.state;
    const electricityURL = {
      unit,
      value: amount,
      country,
      state,
    };

    const { electricityEstimate } = this.props;
    electricityEstimate(electricityURL);

    this.setState({ estimateVisible: true });
  }

  closeEstimate(e) {
    e.preventDefault();

    document.getElementById('electricity-value').value = '';
    this.setState({
      amount: '',
      unit: 'mwh',
      continent: '',
      country: '',
      state: '',
      estimateVisible: false,
    });
  }

  render() {
    const {
      unit, continent, country, state, estimateVisible, amount,
    } = this.state;
    const { carbonKg, carbonLb } = this.props;

    return (
      <div id="electricity">
        <p id="section-title">Electricity</p>

        <label htmlFor="electricity-value">
          Value
          <sup className="reqd-indicator">*</sup>
          :&nbsp;&nbsp;
          <input type="number" id="electricity-value" required />
        </label>
        &nbsp;&nbsp;

        <label htmlFor="electricity-unit">
          Unit:&nbsp;&nbsp;
          <select
            id="electricity-unit"
            value={unit}
            onChange={this.onUnitSelect}
          >
            <option value="mwh">MWh</option>
            <option value="kwh">kWh</option>
          </select>
          &nbsp;&nbsp;
        </label>

        <label htmlFor="electricity-continent">
          Continent
          <sup className="reqd-indicator">*</sup>
          :&nbsp;&nbsp;
          <select
            id="electricity-continent"
            value={continent}
            onChange={this.onContinentSelect}
            required
          >
            <option value="" disabled>Choose a continent</option>
            <option value="north-america">North America</option>
            <option value="europe">Europe</option>
          </select>
          &nbsp;&nbsp;
        </label>

        <label htmlFor="electrictiy-country">
          Country
          <sup className="reqd-indicator">*</sup>
          :&nbsp;&nbsp;
          {
            continent === 'north-america'
              ? (
                <select
                  id="electricity-country"
                  value={country}
                  onChange={this.onCountrySelect}
                  required
                >
                  <option value="" disabled>Choose a country</option>
                  <option value="us">USA</option>
                  <option value="ca">Canada</option>
                </select>
              )
              : (
                <select
                  id="electricity-country"
                  value={country}
                  onChange={this.onCountrySelect}
                  required
                >
                  <option value="" disabled>Choose a country</option>
                  {
                    param.geoCoverageEuropeCountries.map((cntry, i) => {
                      const k = 3 * i;
                      return (
                        <option
                          key={k}
                          value={param.geoCoverageEurope[cntry]}
                        >
                          {cntry}
                        </option>
                      );
                    })
                  }
                </select>
              )
          }
          &nbsp;&nbsp;
        </label>

        {
          continent === 'north-america'
          && (
            <label htmlFor="electricity-state">
              State/Province:&nbsp;&nbsp;
              {
                country === 'us'
                  ? (
                    <select
                      id="electricity-state"
                      value={state}
                      onChange={this.onStateSelect}
                    >
                      {
                        param.stateCodesUSNames.map((st, i) => {
                          const k = 2 * i;
                          return (
                            <option key={k} value={param.stateCodesUS[st]}>
                              {st}
                            </option>
                          );
                        })
                      }
                    </select>
                  )
                  : (
                    <select
                      id="electricity-state"
                      value={state}
                      onChange={this.onStateSelect}
                    >
                      {
                        param.provinceCodesCanadaNames.map((pr, i) => {
                          const k = 4 * i;
                          return (
                            <option key={k} value={param.provinceCodesCanada[pr]}>
                              {pr}
                            </option>
                          );
                        })
                      }
                    </select>
                  )
              }
              &nbsp;&nbsp;
            </label>
          )
        }

        <div className="btn electricity-button">
          <button type="submit" onClick={this.onComputeClick}>
            Estimate
          </button>
        </div>

        {estimateVisible
          && (
          <div className="show-estimate-text">
            <p>
              Consumption of&nbsp;
              {amount}
              {unit}
              &nbsp;of electricity equates to the emission of approximately
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

Electricity.propTypes = {
  electricityEstimate: PropTypes.func.isRequired,
  carbonLb: PropTypes.number.isRequired,
  carbonKg: PropTypes.number.isRequired,
};

export default Electricity;

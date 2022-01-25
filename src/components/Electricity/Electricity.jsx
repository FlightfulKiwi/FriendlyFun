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
    };
    this.onContinentSelect = this.onContinentSelect.bind(this);
    this.onUnitSelect = this.onUnitSelect.bind(this);
    this.onCountrySelect = this.onCountrySelect.bind(this);
    this.onStateSelect = this.onStateSelect.bind(this);
    this.onComputeClick = this.onComputeClick.bind(this);
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

  onComputeClick(e) {
    e.preventDefault();
    const { unit, country, state } = this.state;
    const electricityURL = {
      unit,
      value: document.getElementById('electricity-value').value,
      country,
      state,
    };

    const { electricityEstimate } = this.props;
    electricityEstimate(electricityURL);

    document.getElementById('electricity-value').value = '';
    this.setState({
      unit: 'mwh',
      continent: '',
      country: '',
      state: '',
    });
  }

  render() {
    const {
      unit, continent, country, state,
    } = this.state;

    return (
      <div id="electricity">
        <label htmlFor="electricity-value">
          Value
          <sup className="reqd-indicator">*</sup>
          :
          <input type="number" id="electricity-value" required />
        </label>

        <label htmlFor="electricity-unit">
          Unit:
          <select
            id="electricity-unit"
            value={unit}
            onChange={this.onUnitSelect}
          >
            <option value="mwh">MWh</option>
            <option value="kwh">kWh</option>
          </select>
        </label>

        <label htmlFor="electricity-continent">
          Continent
          <sup className="reqd-indicator">*</sup>
          :
          <select
            id="electricity-continent"
            value={continent}
            onChange={this.onContinentSelect}
          >
            <option value="" disabled>Choose a continent</option>
            <option value="north-america">North America</option>
            <option value="europe">Europe</option>
          </select>
        </label>

        <label htmlFor="electrictiy-country">
          Country
          <sup className="reqd-indicator">*</sup>
          :
          {
            continent === 'north-america'
              ? (
                <select
                  id="electricity-country"
                  value={country}
                  onChange={this.onCountrySelect}
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
        </label>

        {/* <label htmlFor="electricity-state">
          State/Province */}
        {
          // continent === 'europe' &&
          // (
          //   <select id="electricity-state">
          //     <option value="" disabled>Choose a state</option>
          //   </select>
          // )

          continent === 'north-america'
          && (
            <label htmlFor="electricity-state">
              State/Province
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
            </label>
          )
        }

        <button type="submit" className="electricity-button" onClick={this.onComputeClick}>
          Compute Estimate
        </button>
      </div>
    );
  }
}

Electricity.propTypes = {
  electricityEstimate: PropTypes.func.isRequired,
};

export default Electricity;

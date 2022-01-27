import React from 'react';
import PropTypes from 'prop-types';

class Shipping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weightUnit: '',
      distanceUnit: '',
      transport: '',
    };
    this.onComputeClick = this.onComputeClick.bind(this);
    this.onWeightUnitSelect = this.onWeightUnitSelect.bind(this);
    this.onDistanceUnitSelect = this.onDistanceUnitSelect.bind(this);
    this.onTransportSelect = this.onTransportSelect.bind(this);
  }

  onWeightUnitSelect(e) {
    e.preventDefault();
    this.setState({ weightUnit: e.target.value });
  }

  onDistanceUnitSelect(e) {
    e.preventDefault();
    this.setState({ distanceUnit: e.target.value });
  }

  onTransportSelect(e) {
    e.preventDefault();
    this.setState({ transport: e.target.value });
  }

  onComputeClick(e) {
    e.preventDefault();
    const { weightUnit, distanceUnit, transport } = this.state;
    const shippingURL = {
      weightUnit,
      weightValue: Number(document.getElementById('shipping-weight-value').value),
      distanceUnit,
      distanceValue: Number(document.getElementById('shipping-distance-value').value),
      transportMethod: transport,
    };

    const { shippingEstimate } = this.props;
    shippingEstimate(shippingURL);

    document.getElementById('shipping-weight-value').value = '';
    document.getElementById('shipping-distance-value').value = '';
    this.setState({ weightUnit: '', distanceUnit: '', transport: '' });
  }

  render() {
    const { weightUnit, distanceUnit, transport } = this.state;

    return (
      <div id="shipping">
        <p id="section-title">Shipping</p>

        <label htmlFor="shipping-weight-value">
          Weight Value
          <sup className="reqd-indicator">*</sup>
          :&nbsp;&nbsp;
          <input type="number" id="shipping-weight-value" required />
        </label>
        &nbsp;&nbsp;

        <label htmlFor="shipping-weight-unit">
          Weight Unit
          <sup className="reqd-indicator">*</sup>
          :&nbsp;&nbsp;
          <select
            id="shipping-weight-unit"
            value={weightUnit}
            onChange={this.onWeightUnitSelect}
            required
          >
            <option value="" disabled>Weight Unit</option>
            <option value="g">Grams</option>
            <option value="lb">Pounds</option>
            <option value="kg">Kilograms</option>
            <option value="mt">Metric Tons</option>
          </select>
          &nbsp;&nbsp;
        </label>

        <label htmlFor="shipping-distance-value">
          Distance Value
          <sup className="reqd-indicator">*</sup>
          :&nbsp;&nbsp;
          <input type="number" id="shipping-distance-value" required />
        </label>
        &nbsp;&nbsp;

        <label htmlFor="shipping-distance-unit">
          Distance Unit
          <sup className="reqd-indicator">*</sup>
          :&nbsp;&nbsp;
          <select
            id="shipping-distance-unit"
            value={distanceUnit}
            onChange={this.onDistanceUnitSelect}
            required
          >
            <option value="" disabled>Distance Unit</option>
            <option value="mi">Miles</option>
            <option value="km">Kilometers</option>
          </select>
          &nbsp;&nbsp;
        </label>

        <label htmlFor="transport-method">
          Transport Method
          <sup className="reqd-indicator">*</sup>
          :&nbsp;&nbsp;
          <select
            id="transport-method"
            value={transport}
            onChange={this.onTransportSelect}
            required
          >
            <option value="" disabled>Method</option>
            <option value="ship">Ship</option>
            <option value="train">Train</option>
            <option value="truck">Truck</option>
            <option value="plane">Plane</option>
          </select>
          &nbsp;&nbsp;
        </label>

        <div className="btn shipping-button">
          <button type="button" onClick={this.onComputeClick}>
            Estimate
          </button>
        </div>
      </div>
    );
  }
}

Shipping.propTypes = {
  shippingEstimate: PropTypes.func.isRequired,
};

export default Shipping;

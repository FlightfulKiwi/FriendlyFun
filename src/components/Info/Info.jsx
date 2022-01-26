import React from 'react';

const CARBON_INTERFACE_HOME = 'https://docs.carboninterface.com/#/';
const CARBON_INTERFACE_METHOD = 'https://www.notion.so/Carbon-Interface-Methodology-d788fff61c724a48b100e0f7d77c0c57';

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <h1>
          Welcome to&nbsp;
          <span>My Emissions Estimate (MyEE)</span>
        </h1>
        <h3>Introduction</h3>
        <p>
          Our goal with this project is simply to raise awareness about the environmental impact
          of a few common emitting activities. The information provided is simply CO
          <sub>2</sub>
          e emissions estimates evaluated using methodologies provided by the&nbsp;
          <strong><a href={CARBON_INTERFACE_HOME}>Carbon Interface API</a></strong>
          . (To get a better understanding of how these estimates were computed,
          please refer to this&nbsp;
          <span><a href={CARBON_INTERFACE_METHOD}>methodology document</a></span>
          .)
        </p>
        <p>
          Your presence here suggests you are climate-conscious and are looking to learn more.
          We hope to provide valuable information to assist you in any which way.
        </p>
        <h3>Features</h3>
        <div>
          Our application allows for the computation of estimates associated with:
          <div>Electricity</div>
          <div>Flights</div>
          <div>Vehicles</div>
          <div>Fuel Combustion</div>
          <div>Shipping</div>
        </div>
      </div>
    );
  }
}

export default Info;

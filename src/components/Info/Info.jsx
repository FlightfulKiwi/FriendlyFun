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
        <h2>
          Welcome to&nbsp;
          <span>My Emissions Estimate (MyEE)</span>
        </h2>

        <div className="intro-container">
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
        </div>

        <h3>Features</h3>
        Our application allows for the computation of estimates associated with:
        <div className="features-container">
          <div className="features features-ve">
            <h4>Vehicles</h4>
            <p>
              Approximates the carbon dioxide equivalent (CO
              <sub>2</sub>
              e) emitted by driving a car a specified distance.
              (For now, only 10 makes are available.
              All vehicles are from 2020 unless otherwise specified.)
            </p>
          </div>

          <div className="features features-fl">
            <h4>Flights</h4>
            <p>
              Estimates the carbon dioxide equivalent (CO
              <sub>2</sub>
              e) of flying between two destinations. One-way and round trips available.
              (Destinations exclusively in North America and Europe for now.)
            </p>
          </div>

          <div className="features features-el">
            <h4>Electricity</h4>
            <p>
              Evaluates the carbon dioxide equivalent (CO
              <sub>2</sub>
              e) of consuming a given amount of electricity.
            </p>
          </div>

          <div className="features features-sh">
            <h4>Shipping</h4>
            <p>
              Evaluates the environmental impact (in terms of emitted CO
              <sub>2</sub>
              ) of shipping a package of a given weight over a specified distance
              using one of four shipping methods.
            </p>
          </div>

          <div className="features features-fc">
            <h4>Fuel Combustion</h4>
            <p>
              Estimates equivalent amount of carbon dioxide released by the combustion
              of various fuel types.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Info;

/* eslint-disable import/extensions */
import React from 'react';
import Info from './components/Info/Info.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <Info />
      </div>
    );
  }
}

export default App;

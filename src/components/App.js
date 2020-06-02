import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router";

import index from './index'
import index_map from './index_map'

import '../css/modules.css';
import '../css/style.min.css';
import '../css/creative.css';
import '../css/creative.min.css';

import '../css/creative.css';
import '../css/creative.min.css';

import '../js/index.js';
// import '../js/creative.js';
// import '../js/creative.min.js';

class App extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
    }
}

  componentDidMount() {}

  render () {
    return (
      <div className="App">
          <Switch>
            <Route exact path='/' component={index} />
            <Route exact path='/index_map' component={index_map} />
          </Switch>
      </div>
    );
  }

}


export default App;

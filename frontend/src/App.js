import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { DataLoader } from './components';

class App extends Component {
  render() {
    return (
    	<MuiThemeProvider>
	      <div>
	      	<h2 className="App">Simple API-usage application</h2>
	      	<DataLoader endpoint="/api/project" />
	      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

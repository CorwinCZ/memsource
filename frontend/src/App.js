import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { LoginForm } from './components';
import { DataLoader } from './components';

// material-ui is registering nad handling tap events for mobile deices, it needes this inject plugin
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
    	<MuiThemeProvider>
	      <div className="App">
	      	<h1>Simple API-usage application</h1>
	      	<LoginForm> 
	      		<DataLoader endpoint="/api/project" />
	      	</LoginForm>
	      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';

import { Home, Welcome, Dashboard, Burndown } from './pages';
import { Topbar } from './components';

import './App.scss';

const NotMatch = () => <Redirect to="/home" />;

function App() {
  return (
    <Router>
      <div className="App">
        <Topbar />
        <Switch>
          <Route sensitive strict exact path="/home" component={Home} />
          <Route sensitive strict exact path="/welcome" component={Welcome} />
          <Route sensitive strict exact path="/dashboard" component={Dashboard} />
          <Route sensitive strict exact path="/burndown" component={Burndown} />
          <Route sensitive strict exact component={NotMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

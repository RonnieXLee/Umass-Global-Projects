import { Route, Switch, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Home from './Home';
import Jobs from './Jobs';
import Companies from './Companies';
import CompanyDetails from './CompanyDetails';
import Profile from './Profile';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <ProtectedRoute
            exact
            path="/jobs"
            render={() => <Jobs data={this.props.data} />}
          />
          <ProtectedRoute
            exact
            path="/companies/:handle"
            render={routeProps => (
              <CompanyDetails {...routeProps} data={this.props.data} />
            )}
          />
          <ProtectedRoute
            path="/companies"
            render={() => <Companies data={this.props.data} />}
          />
          <ProtectedRoute
            exact
            path="/profile"
            render={() => <Profile data={this.props.data} />}
          />
          <Route
            exact
            path="/login"
            render={routeProps => (
              <Login
                {...routeProps}
                data={this.props.data}
                getUserInfo={this.props.getUserInfo}
              />
            )}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default Routes;

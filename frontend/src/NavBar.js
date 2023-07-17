import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const activeStyle = {
  fontWeight: 'bold',
  color: 'dodgerblue'
};

class NavBar extends Component {
  logOut = () => {
    alert('Successfully logged out!');
    localStorage.clear();
    this.props.resetState();
  };

  renderLoggedIn = () => {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <NavLink
          className="navbar-brand"
          exact
          to="/"
          activeStyle={activeStyle}
        >
          Jobly
        </NavLink>
        <div className="navbar" id="navbarNav">
          <span className="navbar-nav">
            <li className="nav-item active">
              <NavLink
                exact
                to="/jobs"
                activeStyle={activeStyle}
                className="nav-link"
              >
                <p>Jobs</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/companies"
                activeStyle={activeStyle}
                className="nav-link"
              >
                <p>Companies</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/profile"
                activeStyle={activeStyle}
                className="nav-link"
              >
                <p>Profile</p>
              </NavLink>
            </li>
            {!localStorage.getItem('_token') ? (
              <NavLink
                exact
                to="/login"
                activeStyle={activeStyle}
                className="nav-link"
              >
                <p>Login</p>
              </NavLink>
            ) : (
              <NavLink
                exact
                to="/"
                activeStyle={activeStyle}
                className="nav-link"
              >
                <p onClick={this.logOut}> Log out</p>
              </NavLink>
            )}
          </span>
        </div>
      </nav>
    );
  };

  renderLoggedOut = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink
          className="navbar-brand"
          exact
          to="/"
          activeStyle={activeStyle}
        >
          Jobly
        </NavLink>
        {!localStorage.getItem('_token') ? (
          <span>
            <NavLink
              exact
              to="/login"
              activeStyle={activeStyle}
              className="nav-link"
            >
              <p>Login</p>
            </NavLink>
          </span>
        ) : (
          <span>
            <NavLink
              exact
              to="/"
              activeStyle={activeStyle}
              className="nav-link"
            >
              <p onClick={this.logOut}> Log out</p>
            </NavLink>
          </span>
        )}
      </nav>
    );
  };

  render() {
    return this.props.data.currUser
      ? this.renderLoggedIn()
      : this.renderLoggedOut();
  }
}

export default NavBar;

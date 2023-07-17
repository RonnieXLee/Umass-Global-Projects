import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar';
import Routes from './Routes';
import JoblyApi from './JoblyApi';
import ProtectedRoute from './ProtectedRoute';
import { withRouter } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currUser: null, loaded: false };
  }

  async componentDidMount() {
    if (localStorage.getItem('_token')) {
      const midPart = localStorage.getItem('_token').split('.')[1];
      const payload = atob(midPart);
      const payloadJSON = JSON.parse(payload);
      const userName = payloadJSON.username;
      const currUser = await JoblyApi.getUserInfo(userName);
      this.setState({ currUser, loaded: true });
    } else {
      this.setState({ loaded: true });
    }
  }

  updateCurrUser = async (token) => {
    const payload = atob(token.split('.')[1]);
    const payloadJSON = JSON.parse(payload);
    const userName = payloadJSON.username;
    const currUser = await JoblyApi.getUserInfo(userName);
    this.setState({ currUser });
  };

  resetState = () => {
    this.setState({ currUser: null });
  };

  render() {
    return (
      <div>
        {!this.state.loaded ? (
          <div> Loading... </div>
        ) : (
          <div className="App">
            <NavBar data={this.state} resetState={this.resetState} />
            <Routes data={this.state} getUserInfo={this.updateCurrUser} />
            <ProtectedRoute data={this.state} />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(App);

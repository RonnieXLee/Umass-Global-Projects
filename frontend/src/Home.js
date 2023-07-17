import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Jobly</h1>
        <p>All the jobs in one, convenient place.</p>
        {localStorage.getItem('_token') ? (
          <h2>Welcome Back!</h2>
        ) : (
          <button className="btn btn-primary">
            <Link to={`/login`} className="nav-link" style={{ color: 'white' }}>
              Login
            </Link>
          </button>
        )}
      </div>
    );
  }
}

export default Home;

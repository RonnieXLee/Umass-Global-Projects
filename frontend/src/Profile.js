import React, { Component } from 'react';
import JoblyApi from './JoblyApi';

class Profile extends Component {
  constructor(props) {
    super(props);
    const {
      username,
      first_name,
      last_name,
      email,
      photo_url,
      password
    } = this.props.data.currUser;
    this.state = {
      username,
      first_name,
      last_name,
      email,
      photo_url,
      password
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const { username, password, photo_url, ...data } = this.state;
    if (photo_url) {
      this.setState({
        photo_url: `https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg`
      });
    }
    const verified = await JoblyApi.login({ username, password });
    if (verified) {
      await JoblyApi.patchUserInfo(username, data);
    } else {
      alert('Wrong password');
    }

    this.setState({ password: '' });
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    return (
      <div className=" d-flex bd-highlight container">
        <div className="container">
          <h2> Profile for {this.state.username}</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                name="first_name"
                className="form-control"
                value={this.state.first_name}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                name="last_name"
                className="form-control"
                value={this.state.last_name}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                className="form-control"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="photoUrl">Photo URL</label>
              <input
                name="photo_url"
                className="form-control"
                value={
                  this.state.photo_url
                    ? this.state.photo_url
                    : `https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg`
                }
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Re-enter Password</label>
              <input
                name="password"
                className="form-control"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-2">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;

import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { search: '' };
  }

  componentDidMount() {}

  handleChange = evt => {
    this.setState({
      search: evt.target.value
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.updateSearch(this.state.search);
    this.setState({ search: '' });
  };

  render() {
    return (
      <div className="container">
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <input
            className="form-control form-control-lg flex-grow-1"
            name="search"
            placeholder="Enter search term.."
            onChange={this.handleChange}
          />
          <button type="submit" className="btn btn-lg btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

SearchBar.defaultProps = {};

SearchBar.propTypes = {};

export default SearchBar;

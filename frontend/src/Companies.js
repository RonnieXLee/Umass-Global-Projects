import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import Card from './Card';
import SearchBar from './SearchBar';

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = { companies: [] };
    this.updateSearch = this.updateSearch.bind(this);
  }

  async componentDidMount() {
    const allCompanies = await JoblyApi.getAllCompanies();
    this.setState({ companies: allCompanies });
  }

  async updateSearch(companyName) {
    const filteredCompanies = await JoblyApi.searchCompany(companyName);
    this.setState({ companies: filteredCompanies });
  }

  render() {
    return (
      <div>
        <h1>Companies</h1>
        <SearchBar updateSearch={this.updateSearch} />
        <div>
          {this.state.companies.map(comp => (
            <Card company={comp} username={this.props.data.currUser.username} />
          ))}
        </div>
      </div>
    );
  }
}

export default Companies;

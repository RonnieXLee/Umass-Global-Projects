import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001/';

class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = 'get') {
    console.debug('API Call:', endpoint, paramsOrData, verb);

    paramsOrData._token = localStorage.getItem('_token');

    try {
      return (await axios({
        method: verb,
        url: `${BASE_URL}${endpoint}`,
        [verb === 'get' ? 'params' : 'data']: paramsOrData
      })).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getAllCompanies() {
    let res = await this.request('companies/');
    return res.companies;
  }

  static async searchCompany(search) {
    let res = await this.request(`companies?search=${search}`);
    return res.companies;
  }

  static async getAllJobs() {
    let res = await this.request('jobs/');
    return res.jobs;
  }

  static async searchJob(search) {
    let res = await this.request(`jobs?search=${search}`);
    return res.jobs;
  }

  static async register(paramsOrData) {
    let res = await this.request('users', paramsOrData, 'post');
    return res.token;
  }

  static async login(paramsOrData) {
    let res = await this.request('login', paramsOrData, 'post');
    return res.token;
  }

  static async getUserInfo(userName) {
    let res = await this.request(`users/${userName}`);
    return res.user;
  }

  static async patchUserInfo(userName, data) {
    let res = await this.request(`users/${userName}`, data, 'patch');
    return res.user;
  }

  static async apply(id, userName, state) {
    let res = await this.request(`jobs/${id}/apply`, { id, userName, state }, 'post');
    return res;
  }
}

export default JoblyApi;

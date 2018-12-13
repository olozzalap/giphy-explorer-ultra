import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import keys from '../keys.js';
import axios from 'axios';

import SearchInput from './SearchInput';
import SearchAppBar from './SearchAppBar';
import Results from './Results';

let ticking = false;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      results: [],
      giphyKey: keys.giphy,
      giphyEndpoint: "https://api.giphy.com/v1/gifs/",
      trendingResults: true,
      pagination: {},
      pageSize: 16
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    // Pulls up trending gifs on load
    this.sendRequest(false);

    window.addEventListener("scroll", this.handleScroll)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    this.setState({
      results: [],
      trendingResults: false
    });
    this.sendRequest(false);
  }
  handleScroll(e) {
    console.log((window.scrollY + window.innerHeight) - document.body.clientHeight);
    console.log(document.body.clientHeight, document.documentElement.scrollHeight);
    if ((window.scrollY + window.innerHeight + 75) > document.body.clientHeight) {
      this.sendRequest(true);    
    }
  }
  sendRequest(isNextPage) {
    let params = {params: {
      api_key: this.state.giphyKey, 
      limit: this.state.pageSize
    }}
    if (!this.state.trendingResults) {
      params.params.q = this.state.searchText;
    }
    if (isNextPage === true) {
      params.params.offset = this.state.pagination.offset + this.state.pageSize;
    }
    axios.get(this.getEndpoint(), params)
    .then(res => {
      console.log(res);
      this.setState({
        pagination: res.data.pagination,
        results: this.state.results.concat(res.data.data)
      })
    }, err => {
      console.log(err);
    })
  }
  getEndpoint() {
    return `${this.state.giphyEndpoint}${(this.state.trendingResults) ? "trending" : "search"}`
  }

  render() {
    console.log(this.state);
    return (
      <main>
        <SearchAppBar onChange={this.handleChange} value={this.state.searchText} />

        <Results items={this.state.results}/>

        <CssBaseline />
      </main>
    );
  }
}

export default App;
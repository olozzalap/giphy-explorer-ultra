import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import keys from '../keys.js';
import axios from 'axios';

import SearchInput from './SearchInput';
import SearchAppBar from './SearchAppBar';
import Results from './Results';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      results: [],
      giphyKey: keys.giphy,
      giphyEndpoint: "https://api.giphy.com/v1/gifs/",
      pagination: {}
    }
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    // Pulls up trending gifs on load
    axios.get(`${this.state.giphyEndpoint}trending`, {params: {api_key: this.state.giphyKey, limit: 8}})
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

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
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
import React, { Component } from 'react';

class SearchInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section>
        Search Input
        <label>Search</label>
        <input type="text" name="searchText" value={this.props.value} onChange={(e) => {this.props.onChange(e)}} />

      </section>
    );
  }
}

export default SearchInput;
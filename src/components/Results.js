import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import GifCard from './GifCard';

const masonryOptions = {
    transitionDuration: 0
};

class Results extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section>
        <Masonry
          options={masonryOptions}
        >
          {this.props.items.map((item, i) => {
            return (
              <GifCard item={item}/>
            )
          })}
        </Masonry>
      </section>
    );
  }
}

export default Results;
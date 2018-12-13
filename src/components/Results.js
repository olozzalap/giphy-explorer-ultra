import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import GifCard from './GifCard';

const masonryOptions = {
    transitionDuration: ".9s",
    stagger: 30
};

class Results extends Component {
  constructor(props) {
    super(props);
    console.log(this.masonry);
  }
  render() {
    return (
      <section>
        <Masonry
          options={masonryOptions}
          updateOnEachImageLoad={true}
          enableResizableChildren={true}
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
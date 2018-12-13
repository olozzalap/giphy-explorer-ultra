import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import GifCard from './GifCard';

const masonryOptions = {
    transitionDuration: ".5s",
    stagger: 20
};

class Results extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <section>
        <Masonry
          options={masonryOptions}
          enableResizableChildren={true}
        >
          {this.props.items.map((item, i) => {
            return (
              <GifCard key={i + item.id} item={item}/>
            )
          })}
        </Masonry>
      </section>
    );
  }
}

export default Results;
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'

import './index.css'
import Image from './Image'


class ImagePicker extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      picked: Map()
    }
    this.handleImageClick = this.handleImageClick.bind(this);
    this.renderImage = this.renderImage.bind(this);
  }

  handleImageClick(image) {
    const { multiple, onPick } = this.props
    const pickedImage = multiple ? this.state.picked : Map()
    const newerPickedImage = 
      pickedImage.has(image.value) ? 
        pickedImage.delete(image.value) : 
          pickedImage.set(image.value, image.src)
          
    this.setState({picked: newerPickedImage});

    const pickedImageToArray = [];
    newerPickedImage.map((image, i) => pickedImageToArray.push({src: image, value: i}));
    
    onPick(multiple ? pickedImageToArray : pickedImageToArray[0]);
  }

  renderImage(image, i) {
    return (
      <Image 
        src={image.png}
        isSelected={this.state.picked.has(image.value)} 
        onImageClick={() => this.handleImageClick(image)} 
        key={i}
      />
    )
  }

  render() {
    const { images } = this.props;

    return (
      <div className="image_picker">
        { images.map(this.renderImage) }
        <div className="clear" />
      </div>
    )
  }
}

ImagePicker.propTypes = {
  images: PropTypes.array,
  multiple: PropTypes.bool,
  onPick: PropTypes.func
}

export default ImagePicker;

import React, { Component } from 'react'
import PropTypes from 'prop-types'

const ImageStyle = (width, height) => {
  return {
    width,
    height,
    objectFit: "cover"
  }
}

export default class Image extends Component {
  render() {
    const { src, isSelected, onImageClick } = this.props;

    return (
      <div className={`responsive${isSelected ? " selected" : ""}`}
        onClick={onImageClick}>
        <img
            src={src}
            alt=""
            className={`thumbnail${isSelected ? " selected" : ""}`}
            style={ImageStyle(150, 150)}
        />
      </div>
    );
  }
}

Image.propTypes = {
  src: PropTypes.string,
  isSelected: PropTypes.bool
}

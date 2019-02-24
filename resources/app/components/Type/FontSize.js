import React from 'react';

class FontSize extends React.Component{
  updateBaseFontSize = (e) => {
    const newBaseFontSize = parseInt(e.target.value, 10);
    this.props.updateBaseFontSize(newBaseFontSize);
  }
  render(){
    const {size, name} = this.props;
    const remSize = size/16;
    const fontSize = {
      fontSize: `${remSize}rem`
    }
    return(
      <div className="flex justify-between items-center">
        <p style={fontSize}>{size}px<span className="text-grey ml-4">- {remSize}rem</span></p>
        <span className="text-grey">{name}</span>
      </div>
    )
  }

}
export default FontSize;
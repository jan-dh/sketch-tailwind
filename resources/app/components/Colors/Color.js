import React from 'react';
import PropTypes from 'prop-types';

class Color extends React.Component{
  nameRef = React.createRef();
  hexRef = React.createRef();

  // Create color
  updateExistingColor = () => {
    const color = {
      name: this.nameRef.current.value,
      hex: this.hexRef.current.value,
      index: this.props.index
    }
    // Add Color to state, there we update the state
    this.props.updateColor(color);
  }
  render(){
    const {name, hex} = this.props.details;
    return(
      <div className="flex mb-6 items-end">
        <div style={{backgroundColor:hex}} className="color"></div>
        <div>
          <input type="text" name="name" placeholder={name} defaultValue={name} ref={this.nameRef} />
        </div>
        <div>
          <input
            type="text"
            name="hex"
            placeholder={hex}
            defaultValue={hex}
            ref={this.hexRef}
          />
        </div>
        <button className="button" onClick={this.updateExistingColor}>Update</button>
        <button className="button ml-4" onClick={() => this.props.removeColor(this.props.index)}>&times;</button>
      </div>
    )
  }
}

Color.propTypes = {
  index: PropTypes.string,
  details: PropTypes.object
}

export default Color;

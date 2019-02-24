import React from 'react';

class Color extends React.Component{
  nameRef = React.createRef();
  hexRef = React.createRef();

  validateColor = (e) => {
    // let isColor  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e.currentTarget.value);
    // const colorClass = isColor ? 'border' : 'border-red'
    // const value = e.currentTarget.value;
    // const updatedColor = {
    //   ...this.props.details,
    //   [e.currentTarget.name]: e.currentTarget.value
    // };
  }

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
          {/*<label htmlFor="name">Class-name</label>*/}
          <input type="text" name="name" placeholder={name} defaultValue={name} ref={this.nameRef} />
        </div>
        <div>
          {/*<label htmlFor="name">Color</label>*/}
          <input
            type="text"
            name="hex"
            placeholder={hex}
            defaultValue={hex}
            ref={this.hexRef}
            onKeyDown={this.validateColor}
          />
        </div>
        <button className="button" onClick={this.updateExistingColor}>Update</button>
        <button className="button ml-4" onClick={() => this.props.removeColor(this.props.index)}>&times;</button>
      </div>
    )
  }
}

export default Color;


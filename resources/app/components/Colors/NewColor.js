import React from 'react';

class NewColor extends React.Component{
  nameRef = React.createRef();
  hexRef = React.createRef();

  createColor = e => {
    e.preventDefault();
    const color = {
      name: this.nameRef.current.value,
      hex: this.hexRef.current.value,
      id: this.props.id
    }
    // Add Color to state
    this.props.addColor(color);
    // Reset input
    this.nameRef.current.value = '';
    this.hexRef.current.value = '';
  }
  render(){
    return(
      <div className="mb-8">
        <label className="mb-4">Add new color</label>
        <div className="flex">
          <input type="text" placeholder="Color name" ref={this.nameRef} />
          <input type="text" placeholder="Hex code" ref={this.hexRef} />
          <button className="button" onClick={this.createColor}>Add new Color</button>
        </div>
      </div>
    )
  }
}

export default NewColor;
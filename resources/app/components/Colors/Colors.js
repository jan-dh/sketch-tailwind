import React from 'react';
import {Link} from 'react-router-dom';
import Color from './Color';
import NewColor from './NewColor';

class Colors extends React.Component{
  render(){
    return(
      <React.Fragment>
        <div className="mb-8">
          <h2 className="mb-6">Colors</h2>
          <div className='richtext mb-8'>
            <p>Colors are taken from the Layer Styles. When adding additional colors, try to use variable names for the colors</p>
          </div>
          <label className="mb-4">Active colors</label>
          {Object.keys(this.props.colors).map(key =>
          <Color
            key={key}
            index={key}
            details = {this.props.colors[key]}
            updateColor={this.props.updateColor}
            removeColor={this.props.removeColor}
          />)}
          <NewColor addColor={this.props.addColor} key={Date.now()}/>
        </div>
        <div className="flex justify-end">
          <Link to="/typography" className='button'>Next</Link>
        </div>
      </React.Fragment>
    )
  }
}

export default Colors;

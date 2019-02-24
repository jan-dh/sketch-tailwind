import React from 'react';
import {Link} from 'react-router-dom';
import FontSize from './FontSize';
import calculatePosition from './calculatePosition';

class Type extends React.Component{
  updateFontSizes = (e) => {
    // Update fontsizes
    const basePosition = Object.keys(this.props.fontSizes).indexOf(e.target.value);
    const size = Object.keys(this.props.fontSizes).length;
    let newFontSizes = this.props.fontSizes;
    // Loop over fontsizes and set appropriate value
    Object.keys(this.props.fontSizes).forEach((key, i) => {
      newFontSizes= {...newFontSizes, [key]: calculatePosition(i, basePosition, size) };
    })
    this.props.updateFontSizes(newFontSizes);
  }
  validateForm = (e) => {
    if (!this.props.baseFontSizeSet) {
      console.log('not set ');
      e.preventDefault();
    }
  }
  render(){
    const {fontSizes, fontFamilies, baseFontSizeSet} = this.props;
    const buttonClass = baseFontSizeSet ? 'button' : 'button button--disabled';
    return(
      <React.Fragment>
        <div className="mb-8">
          <h2 className="mb-6">Typography</h2>
          <div className="mb-4">
            <h3>Font families</h3>
            {Object.keys(fontFamilies).map(key =>
              <div className="flex justify-between" key={key}>
                <span className='text-lg'>{key}</span>
                <span className="text-grey">{this.props.fontFamilies[key]}</span>
              </div>
            )}
          </div>
          <div className="mb-4">
            <h3>Font sizes</h3>
            <label htmlFor="sizeSelect">Pick a base font-size</label>
            <div className="relative">
              <select name="sizeSelect" id="" className="inline-block appearance-none w-full bg-grey-lighter border cursor-pointer border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey" onChange={this.updateFontSizes}>
                <option value="">- {baseFontSizeSet}</option>
                {Object.keys(fontSizes).map(key =>
                  <option value={key} key={key}>
                    {key}px
                  </option>)}
              </select>
              <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div className="mb-4">
            {Object.keys(fontSizes).map(key =>
              <FontSize
                key={key}
                size={key}
                name={this.props.fontSizes[key]}
              />
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <Link to="/" className='button'>Previous</Link>
          <Link to="/export" className={buttonClass} onClick={this.validateForm}>Next</Link>
        </div>
      </React.Fragment>
    )
  }
}

export default Type;

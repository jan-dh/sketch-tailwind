import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Highlight, { defaultProps } from "prism-react-renderer";
import prismTheme from 'prism-react-renderer/themes/nightOwl'

class ExportFile extends React.Component{
  exportFile = () => {
    const theme = this.cleanUpTheme();
    window.postMessage('exportFile', theme)
  }
  cleanUpTheme = () => {
    const {colors, fontFamilies, fontSizes} = this.props.state;
    // Create Theme
    let theme = {};
    theme.colors = this.cleanUpColors(colors);
    theme.fontSizes = this.cleanUpSizes(fontSizes);
    theme.fonts = this.cleanUpFamilies(fontFamilies);

    return theme;
  }
  cleanUpColors = colors =>{
    let cleanColors = {};
    Object.keys(colors).forEach(key => {
      const item = colors[key];
      cleanColors[item.name] = item.hex;
    });
    colors = {...cleanColors};
    return colors;
  }
  cleanUpSizes = sizes => {
    let cleanSizes = {};
    cleanSizes = Object.assign({}, ...Object.entries(sizes).map(([a,b]) => ({ [b]: `${a/16}rem` })))
    return  cleanSizes;
  }
  cleanUpFamilies = families => {
    let cleanFamilies = {};
    cleanFamilies = Object.assign({}, ...families.map(($family) => ({ [$family.value]:$family.name })))
    return  cleanFamilies;
  }
  render(){
    const markup = `${JSON.stringify(this.cleanUpTheme(), null, " ")}`.trim();
    return(
      <React.Fragment>
        <div className="mb-8">
          <h2 className="mb-6">Export file</h2>
          <Highlight {...defaultProps} code={markup} language="javascript" theme={prismTheme}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className} style={style}>
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
          <button className="button mt-4" onClick={this.exportFile}>Create file</button>
        </div>
        <div className="flex justify-start">
          <Link to="/typography" className='button'>Previous</Link>
        </div>
      </React.Fragment>
    )
  }
}

ExportFile.propTypes = {
  state : PropTypes.object
}

export default ExportFile;

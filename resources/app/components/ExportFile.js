import React from 'react';
import {Link} from 'react-router-dom';
import Highlight, { defaultProps } from "prism-react-renderer";
// import theme from 'prism-react-renderer/themes/nightOwl'

class ExportFile extends React.Component{
  exportFile = () => {
    const {colors, fontFamilies, fontSizes} = this.props.state;
    const cleanColors = this.cleanUpColors(colors);

    // Create Theme
    let theme = {};
    theme.colors = cleanColors;
    theme.fonts = fontFamilies;
    theme.fontSizes = fontSizes;
    const file = 'const theme=' + JSON.stringify(theme) + '\n\nexport default theme;';
    // Todo: Copy it without fcking up the state
    window.postMessage('exportFile', file)
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
  createMarkup = () =>  {
    return { __html: JSON.stringify(this.props.state) };
  }
  render(){
    const markup = `
      function(){
        alert('ok');
      }
    `.trim();
    return(
      <React.Fragment>
        <div className="mb-8">
          <h2 className="mb-6">Export file</h2>
          <Highlight {...defaultProps} code={markup} language="jsx">
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
          <button className="button" onClick={this.exportFile}>Create file</button>
        </div>
        <div className="flex justify-start">
          <Link to="/typography" className='button'>Previous</Link>
        </div>
      </React.Fragment>
    )
  }
}

export default ExportFile;
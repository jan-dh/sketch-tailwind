import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import ExportFile from './ExportFile';
import Colors from './Colors/Colors';
import Type from './Type/Type';


class App extends React.Component{
  state =  {
    colors:[],
    fontFamilies:[],
    fontSizes:{},
    baseFontSizeSet: false,
  }
  addColor = color => {
    const colors = {...this.state.colors};
    colors[`color${Date.now()}`] = color;
    this.setState({
      colors: colors
    })
  }
  updateColor = (color) => {
    const colors = {...this.state.colors};
    colors[`${color.index}`] = color;
    this.setState({
      colors: colors
    })
  }
  removeColor = key => {
    const colors = {...this.state.colors};
    delete colors[key];
    this.setState({
      colors:colors
    })
  }
  updateFontSizes = sizes => {
    this.setState({fontSizes: sizes})
    this.setState({baseFontSizeSet: true})
  }
  componentDidMount(){
    const sketchState = window.initialState;
    this.setState({
      colors:sketchState.colors || [],
      fontSizes: sketchState.fontSizes || {},
      fontFamilies: sketchState.fontFamilies || [],
    });
  }
  render(){
    return(
      <HashRouter>
        <React.Fragment>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <Route exact path="/"
              render={() =>
                <Colors
                  colors={this.state.colors}
                  addColor={this.addColor}
                  updateColor={this.updateColor}
                  removeColor={this.removeColor}
                />}
            />
            <Route exact path="/typography"
              render={() =>
                <Type
                  fontFamilies={this.state.fontFamilies}
                  fontSizes={this.state.fontSizes}
                  updateBaseFontSize={this.updateBaseFontSize}
                  updateFontSizes={this.updateFontSizes}
                  baseFontSizeSet={this.state.baseFontSizeSet}
                />}
            />
            <Route exact path="/export"
              render={() =>
                <ExportFile
                  state={this.state}
                />}
            />
          </div>
        </React.Fragment>
      </HashRouter>
    )
  }

}
export default App;

import React from 'react';
import { render} from 'react-dom';
import App from './components/App';

// Old way to render
// render(<App/>, document.getElementById('main'));
// New way, to enable acces from the window (window.appComponent.loadInitialState)
render(<App ref={(appComponent) => {window.ourComponent = appComponent}} />, document.getElementById("main"));

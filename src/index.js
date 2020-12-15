//
// Author:       Brian Fromme
// Copyright:    Copyright 2020, Gnu Public License - Version 2.0
// Credits:      Brian Fromme, Bryan Gartner, Darren Soothill
// Maintainer:   Brian Fromme
// Status:       Prototype
// Description:  Sonar first page loaded module
//

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

// const element = document.getElementById('content');
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// NOTE: explain
//document.body.classList.remove('loading');

reportWebVitals();


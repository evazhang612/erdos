import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import moongoose from 'mongoose'; 

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


Object.getOwnPropertyNames(mongoose).forEach(prop => {
  console.log(prop);
});

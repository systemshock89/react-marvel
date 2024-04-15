import React from 'react';
import ReactDOM from 'react-dom/client'; // for react 18
// import ReactDOM from 'react-dom'; // for react 17
import App from './components/app/App';
import './style/style.scss';
// import { flushSync } from 'react-dom';

// for react 18
ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

// for react 17
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


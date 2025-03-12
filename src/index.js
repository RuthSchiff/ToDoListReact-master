import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import NavbarComponent from './Nav';
import Login from './componnents/Login';
import Register from './componnents/Register';
import Main from './Main';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Router> */}
      {/* <Nav></Nav>
       <Login></Login> */}
       {/* <Register></Register> */}
      {/* <App></App> */}
      {/* <Main></Main> */}
    {/* </Router> */}
    <Router>
      <Main />
    </Router>
  </React.StrictMode>
)
// reportWebVitals();
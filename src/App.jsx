import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home.jsx';
import Retail from './components/retail/retail.jsx';
import Logistics from './components/logistics/logistics.jsx';
import Signin from './components/retail/retailSignin.jsx';
import Signup from './components/retail/retailSignup.jsx';
import './App.css';

function App() {
  return (
      <div className="background-image" style={{width: "100vw",
        height: "100vh",
        backgroundColor: "#9B9494"}}
      >
        <Router>
            <Home/>
            <Routes>
              <Route path={"/retail"} component={<Retail/>} />
              <Route path={"/logistics"} component={<Logistics/>} />
              <Route path={"/signin"} component={<Signin/>} />
              <Route path={"/signup"} component={<Signup/>} />

            </Routes>
        </Router>
      </div>
  );
}

export default App;

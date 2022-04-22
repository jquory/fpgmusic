import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login/index';
import Search from './components/search/index';
import PrivateRouter from './components/PrivateRouter';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <PrivateRouter path="/create-playlist" component={Search} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

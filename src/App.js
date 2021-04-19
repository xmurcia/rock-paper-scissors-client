import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Game from './pages/Game';

const App = () => (
  <Router>
    <Switch>
      <Route path="/:roomId">
        <Game />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
)

export default App;

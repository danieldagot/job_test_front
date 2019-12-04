import React from "react";
import { BrowserRouter as Router, Route,Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Tible from "./pages/Tible";
import data from "./pages/data";
import Home from "./pages/Home";
function App() {
  return (
    <Router>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/Tible">Tible</Link>
      </li>
      <Container>
        <Route exact path="/" component={Home} />
        <Route path="/Tible" component={data} />
      </Container>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Logged from './views/Logged.js';
import Login from './views/Login.js';
import './css/app.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Logged}/>
          <Route exact path="/login" component={Login}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
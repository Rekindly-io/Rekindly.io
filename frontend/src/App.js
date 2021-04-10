import logo from './logo.svg'
import './App.css'
import Rooms from './Rooms'
import {
  BrowserRouter as Router, 
  Switch, 
  Route
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/rooms">
          <Rooms />
        </Route>
      </Switch>
    </Router>
  );
}

export default App

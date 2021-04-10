import logo from './logo.svg'
import './App.css'
import Rooms from './Pages/Rooms'
import Home from './Pages/Home'
import { ChakraProvider } from '@chakra-ui/react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/rooms">
            <Rooms />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App

import logo from './logo.svg'
import './App.css'
import HomePage from './Pages/HomePage'
import { ChakraProvider } from '@chakra-ui/react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import RoomPage from './Pages/RoomPage'

function App() {
  return (
    <ChakraProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/room">
              <RoomPage />
            </Route>
          </Switch>
        </Router>
    </ChakraProvider>
  );
}

export default App

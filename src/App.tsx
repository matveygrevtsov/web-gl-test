import React from 'react'
import logo from './logo.svg'
import './App.css'
import { MainPage } from './pages/MainPage/MainPage'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={MainPage} />
    </Switch>
  </Router>
)

export default App

import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './Containers/Home/home'
import Search from './Containers/Search/search'
import './App.css'

const App = () => (
  <main className="app">
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/search' component={Search}/>
    </Switch>
  </main>
);

export default App

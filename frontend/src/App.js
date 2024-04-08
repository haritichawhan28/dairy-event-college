import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from './components/Header'
import Auth from './components/Auth'
import Events from './components/Events'
import UserEvents from './components/UserEvents'
import EventDetail from './components/EventDetail'
import AddEvent from './components/AddEvent'

function App () {

  const isLoggedIn = useSelector(state=> state.isLoggedIn);
  console.log(isLoggedIn)

  return <React.Fragment>
    <header>
      <Header />
    </header>

    <main>
      <Routes>
        <Route path='/auth' element= { <Auth /> } />
        <Route path='/events' element= { <Events /> } />
        <Route path='/event/add' element= { <AddEvent /> } />
        <Route path='/myEvents' element= { <UserEvents /> } />
        <Route path='/myEvents/:id' element= { <EventDetail /> } />
      </Routes>
    </main>
  </React.Fragment>
}

export default App

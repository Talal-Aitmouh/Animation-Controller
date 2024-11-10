import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeControl from './components/Layout'
import Herocontrol from './components/Hero'
import AnimationController from './components/DivController'
import LoadingAnimation from './components/Loading'
import ScrollAnimation from './components/Scroll'
import TextAnimationController from './components/TesxtController'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeControl />} >
          <Route index element={<Herocontrol />} />
          <Route path ='div' index element={<AnimationController />} />
          <Route path ='loading' index element={<LoadingAnimation />} />
          <Route path ='scroll' index element={<ScrollAnimation />} />
          <Route path ='text' index element={<TextAnimationController />} />
          
          

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

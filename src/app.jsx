import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './app.css';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';
import { NotFound } from './pages/NotFound'
import { MockRecipe } from './pages/MockRecipe';
import Login from './pages/Login'

export default function App() {
  const [username, setUsername] = useState('');

  return (
    <>

      <BrowserRouter>
        <Header username={username} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/mockrecipe' element={<MockRecipe />} />
          <Route path='/login' element={<Login setUsername={setUsername}/>} />
          {/* <Route path='/recipes' element={<Recipes />} />
          <Route path='/submit-recipe' element={<Submit-recipe />} />
          <Route path='/about' element={<About />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/bad' element={<Bad />} /> */}
        </Routes>
      </BrowserRouter>

      <Footer />

    </>
  );
}

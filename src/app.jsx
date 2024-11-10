import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './app.css';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';
import { NotFound } from './pages/NotFound'
import { MockRecipe } from './pages/MockRecipe';
import Login from './pages/Login';
import { About } from './pages/About';
import { Bad } from './pages/Bad'
import { Recipes } from './pages/Recipes'
import { SubmitRecipe } from './pages/SubmitRecipe';
import { RecipeProvider } from './components/RecipeProvider';

export default function App() {
  const [username, setUsername] = useState('');

  return (
    <>
      <RecipeProvider>
        <BrowserRouter>
          <Header username={username} />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/mockrecipe' element={<MockRecipe />} />
            <Route path='/login' element={<Login setUsername={setUsername} />} />
            <Route path='/about' element={<About />} />
            <Route path='/bad' element={<Bad />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/submit-recipe" element={<SubmitRecipe />} />
            {/* <Route path='/Dashboard' element={<Dashboard />} /> */}
          </Routes>
        </BrowserRouter>

        <Footer />
      </RecipeProvider>
    </>
  );
}

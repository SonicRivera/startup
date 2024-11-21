import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './app.css';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';
import { NotFound } from './pages/NotFound';
import { MockRecipe } from './pages/Mockrecipe';
import Login from './pages/Login';
import Register from './pages/Register';
import { About } from './pages/About';
import { Bad } from './pages/Bad';
import { Recipes } from './pages/Recipes';
import { SubmitRecipe } from './pages/SubmitRecipe';

export default function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
        } else {
          setUsername('');
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
        setUsername('');
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header username={username} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/recipe/:id' element={<MockRecipe username={username} />} />
          <Route path='/login' element={<Login setUsername={setUsername} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<About />} />
          <Route path='/bad' element={<Bad />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/submit-recipe" element={<SubmitRecipe />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './app.css';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';
import { NotFound } from './pages/NotFound';
import { MockRecipe } from './pages/MockRecipe';
import Login from './pages/Login';
import Register from './pages/Register';
import { About } from './pages/About';
import { Bad } from './pages/Bad';
import { Recipes } from './pages/Recipes';
import { SubmitRecipe } from './pages/SubmitRecipe';

export default function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch the user data using the token
      fetch('http://localhost:4000/api/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.username) {
            setUsername(data.username);
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header username={username} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/mockrecipe' element={<MockRecipe username={username} />} />
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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUsername }) => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername(inputValue);
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-6 h-100 d-flex justify-content-center align-items-center ps-0">
          <img
            className="img-fluid h-100 w-100 object-fit-cover"
            style={{ objectPosition: 'top' }}
            src="https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Background"
          />
        </div>
        <div className="col-6 d-flex flex-column justify-content-center align-items-center">
          <h2 className="mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="w-100">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Username"
                onChange={(e) => setInputValue(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

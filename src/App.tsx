import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes, Navigate, Link } from 'react-router-dom';

function App() {
  return (
    <>
      <ul>
        <li> <Link to='/'>Home</Link> </li>
        <li> <Link to='/posts'>Posts List</Link> </li>
        <li> <Link to='/posts/new'>Posts Upload</Link> </li>
        <li> <Link to='/posts/:id'>Posts Detail</Link> </li>
        <li> <Link to='/posts/edit/:id'>Posts Edit</Link> </li>
        <li> <Link to='/profiles'>Profile page</Link> </li>
      </ul>
      <Routes>
        <Route path='/' element={<h1>Main Page</h1>}></Route>
        <Route path='/posts' element={<h1>Posts List</h1>}></Route>
        <Route path='/posts/new' element={<h1>Posts Upload</h1>}></Route>
        <Route path='/posts/:id' element={<h1>Posts Detail</h1>}></Route>
        <Route path='/posts/edit/:id' element={<h1>Posts Edit</h1>}></Route>
        <Route path='/profiles' element={<h1>Profiles</h1>}></Route>
        <Route path='*' element={<Navigate replace to='/'/>}></Route>
      </Routes>
    </>
  );
}

export default App;

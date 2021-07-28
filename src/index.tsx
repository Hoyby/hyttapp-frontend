import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Dashboard from './components/Dashboard'
import Layout from './components/Layout'
import Login from './components/Login'
import './index.css';


ReactDOM.render(

  // <React.StrictMode>

  <Layout>
    <Login />
  </Layout>,

  // </React.StrictMode>
  document.getElementById('root')
)

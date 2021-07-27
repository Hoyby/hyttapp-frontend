import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './components/Layout'
import Login from './components/Login'

ReactDOM.render(
  // <React.StrictMode>

  <Layout>
    <Login />
  </Layout>,

  // </React.StrictMode>
  document.getElementById('root')
)

import React, { useState } from 'react'
import { render } from 'react-dom'
import App from './App'
import Dashboard from './components/Dashboard'
import Layout from './components/Layout'
import Login from './components/Login'
import './index.css'

// const store = createStore<StoreState>(enthusiasm, {
//   enthusiasmLevel: 1,
//   languageName: 'TypeScript',
// })

render(
  <Layout>
    <App />
  </Layout>,
  document.getElementById('root') as HTMLElement
)

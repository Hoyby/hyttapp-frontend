import React, {useReducer, createContext} from 'react'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import jwt from 'jwt-decode'


export const AuthContext: any = createContext('auth')

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken))
      localStorage.setItem('user', jwt(action.payload.accessToken))
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      }
    case 'LOGOUT':
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      <div className="App">
        {!state.isAuthenticated ? <Login /> : <Dashboard />}
      </div>
    </AuthContext.Provider>
  )
}

import React, {useReducer, createContext} from 'react'
import Dashboard from './components/Dashboard'
import Login from './components/Login'

export const AuthContext: any = createContext('auth')

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('token', JSON.stringify(action.payload.token))
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

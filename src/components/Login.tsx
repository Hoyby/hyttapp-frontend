import axios from 'axios'
import React, { useState } from 'react'
import { AuthContext } from '../App'

export default function Login() {
  const { dispatch } = React.useContext(AuthContext)

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    isSubmitting: false,
    errorMessage: null,
  })

  type TUserData = {
    payload: {
      id: string
      username: string
    }
  }

  const [userData, setUserData] = useState({
    id: '',
    username: '',
  })

  const changeHandler = (e: { target: { name: any; value: any } }) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const handleLogIn = (event: any) => {
    event.preventDefault()
    setUserInfo({
      ...userInfo,
      isSubmitting: true,
      errorMessage: null,
    })

    axios
      .post('http://localhost:8000/auth/login', userInfo, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: 'LOGIN', payload: res.data })

        // setUserData({
        //   ...userData,
        //   id: user.payload.id,
        //   username: user.payload.username,
        // })
      })
      .catch((error) => {
        console.log(error.message || error.statusText)

        setUserInfo({
          ...userInfo,
          isSubmitting: false,
          errorMessage: error.response.data.error,
        })
      })
  }

  const handleRefresh = (event: any) => {
    event.preventDefault()

    axios
      .get('http://localhost:8000/auth/refresh_token/', {
        withCredentials: true,
      })
      .then((res) => {
        const accessToken = res.data.accessToken
        // const user = jwt(accessToken) as TUserData
        localStorage.setItem('accessToken', res.data.accessToken)

        // setUserData({
        //   ...userData,
        //   id: user.payload.id,
        //   username: user.payload.username,
        // })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleLogOut = (event: any) => {
    event.preventDefault()

    axios
      .delete('http://localhost:8000/auth/refresh_token/', {
        withCredentials: true,
        headers: {
          Authorization: `Basic ${localStorage.getItem('accesssToken')}}`,
        },
      })
      .then((res) => {
        localStorage.removeItem('accessToken')
        setUserData({ ...userData, id: '', username: '' })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="border-4 w-96 flex flex-col m-auto items-center mt-40">
      <h1 className="mb-4 font-medium">Login</h1>
      <form className="border-4">
        <div className="flex flex-col items-center">
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            className="border-2 w-60 m-2"
            required
            type="text"
            name="email"
            placeholder="Username"
            value={userInfo.email}
            onChange={changeHandler}
          />

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            className="border-2 w-60 m-2"
            type="password"
            name="password"
            tokens-testid="password"
            placeholder="Password"
            value={userInfo.password}
            onChange={changeHandler}
          />

          <button onClick={handleLogIn} className="w-20 border-2 m-4">
            Log in
          </button>
        </div>
      </form>
      <div className="items-center">
        <button className="m-2 border-2 p-1" onClick={handleLogOut}>
          Log out
        </button>
        <button className="m-2 border-2 p-1" onClick={handleRefresh}>
          Refresh
        </button>
      </div>

      
      <p className="text-red-500">{userInfo.errorMessage}</p>
      <br/>
      <p>id: {userData.id}</p>
      <p>username: {userData.username}</p>
    </div>
  )
}

import axios from 'axios'
import React, { useState } from 'react'
import jwt from 'jwt-decode'

export default function Login() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
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

  //for testing
  const handleButton = (event: any) => {
    axios
      .get('http://localhost:8000/users', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res)
      })
  }

  const handleLogIn = (event: any) => {
    event.preventDefault()

    axios
      .post('http://localhost:8000/auth/login', userInfo, {
        withCredentials: true,
      })
      .then((res) => {
        const accessToken = res.data.accessToken
        const user = jwt(accessToken) as TUserData
        localStorage.setItem('accessToken', res.data.accessToken)

        setUserData({
          ...userData,
          id: user.payload.id,
          username: user.payload.username,
        })
      })
      .catch((error) => {
        console.log(error)
      })
    //TODO: Hide login panel
  }

  const handleRefresh = (event: any) => {
    event.preventDefault()

    axios
      .get('http://localhost:8000/auth/refresh_token/', {
        withCredentials: true,
      })
      .then((res) => {
        const accessToken = res.data.accessToken
        const user = jwt(accessToken) as TUserData
        localStorage.setItem('accessToken', res.data.accessToken)

        setUserData({
          ...userData,
          id: user.payload.id,
          username: user.payload.username,
        })
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
    <div>
      <h1>Login</h1>
      <form method="post" action="localhost:8000/users">
        <div className="container">
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
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
            type="password"
            name="password"
            tokens-testid="password"
            placeholder="Password"
            value={userInfo.password}
            onChange={changeHandler}
          />

          <button onClick={handleLogIn}>Log in</button>
        </div>
      </form>
      <div className="container">
        <button onClick={handleLogOut}>Log out</button>
        <button onClick={handleRefresh}>Refresh</button>
        <button onClick={handleButton}>Button</button>
      </div>

      <p></p>
      <p>id: {userData.id}</p>
      <p>username: {userData.username}</p>
    </div>
  )
}

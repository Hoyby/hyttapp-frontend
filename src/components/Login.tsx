import axios from 'axios';
import React, { useState } from 'react'

export default function Login() {

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    })

    const [tokens, settokens] = useState({
        accessToken: '',
        refreshToken: '',
    })

    const [responseData, setResponseData] = useState({
        username: '',
        email: '',
    })

    const changeHandler = (e: { target: { name: any; value: any; }; }) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    const handleLogIn = (event: any) => {
        event.preventDefault()
        axios.post('http://localhost:8000/auth/', userInfo)
            .then(response => {
                settokens({ ...tokens, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken })

                axios.get('http://localhost:8000/users/', {
                    headers: {
                        Authorization: ('Bearer ' + response.data.accessToken)
                    }
                })
                    .then(function (_response) {
                        console.log("accessToken is working");
                        setResponseData({ ...responseData, username: _response.data[0].name, email: _response.data.email })
                    })
                    .catch(function (error) {
                        console.log(error);
                    })

            })
            .catch(error => {
                console.log(error)
            })

    }




    return (
        <div>
            <h1>Login</h1>
            <form method="post" action="localhost:8000/users">
                <div className="container">
                    <label htmlFor="email"><b>Email</b></label>
                    <input
                        required
                        type='text'
                        name='email'
                        placeholder='Username'
                        value={userInfo.email}
                        onChange={changeHandler} />

                    <label htmlFor="psw"><b>Password</b></label>
                    <input
                        type='password'
                        name='password'
                        tokens-testid='password'
                        placeholder='Password'
                        value={userInfo.password}
                        onChange={changeHandler} />

                    <button onClick={handleLogIn}>Log in</button>
                </div>

                <div className="container">
                    <button type="submit">Logout</button>
                    <button type="submit">Refresh</button>
                </div>
            </form>

            <p></p>
            <p>username: {responseData.username}</p>
        </div>
    )
}

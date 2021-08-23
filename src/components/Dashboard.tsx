import React from 'react'

export default function Dashboard() {
    const user = localStorage.getItem('user')

    return (
        <div>
            <h1>Welcome: {JSON.parse(user!).payload.username}</h1>
        </div>
    )
}

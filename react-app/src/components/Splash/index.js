import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import "./Splash.css"

const SplashPage = ({ user }) => {

    const history = useHistory()
    if (user) return <Redirect to="/photos" />

    return (
        <div className="splash-page">

            <div className="welcome-container">
                <h1 className="logo-nav">
                    <span className="blue">P</span>
                    <span className="red">h</span>
                    <span className="yellow">o</span>
                    <span className="blue">o</span>
                    <span className="green">g</span>
                    <span className="red">l</span>
                    <span className="yellow">e</span>
                </h1>
                <h3>Welcome to Phoogle</h3>
                <p>Where cherished memories are stored!</p>
                <button className="started-btn"
                    onClick={()=>history.push('/login')}>Get Started</button>
            </div>

        </div>
    )
}

export default SplashPage

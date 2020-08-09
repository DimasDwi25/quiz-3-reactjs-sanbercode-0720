import React from 'react'
import {Switch,Link, Route } from 'react-router-dom'
import './style.css'
import logo from './logo.png'
import { BrowserRouter as Router } from "react-router-dom";
import About from '../About/about'
import ListMovie from '../list-movie/ListMovies';
import Home from '../home/Movie';


const Navbar = () => {
    return(
        <>
        <div class="navbar">
            <img src={logo} />
            <Router>
                <div class="link">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/movie-list">Movie List Editor</Link>
                            </li>
                            <li>
                                <button type="submit"><Link to="/login">Login</Link></button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </Router>
        </div>
        <Router>
            <div class="switch">
                <switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/movie-list">
                        <ListMovie />
                    </Route>
                    <Route path="/login">
                    </Route>
    
                    <Route path="/" />
                </switch>
            </div>
        </Router>
        </>
    )
}

export default Navbar
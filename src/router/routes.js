import React from 'react'
import {Switch,Link, Route } from 'react-router-dom'
import { BrowserRouter as Router } from "react-router-dom";
import About from '../About/about'
import ListMovie from '../list-movie/ListMovies';
import Movie from '../home/Movie'


const Routes = () => {
    return(
        <>
            <Router>
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
                    <switch>
                        <Route exact path="/">
                            <Movie />
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
            </Router>
        </>
    )
}

export default Routes
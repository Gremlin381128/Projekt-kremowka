import React, { Components, Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Świat kremówek</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Kremówki</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Stwórz nową kremówkę</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/login" className="nav-link">Zaloguj się</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Zarejestruj się</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
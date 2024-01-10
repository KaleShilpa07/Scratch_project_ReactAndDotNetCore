

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export class Navbar extends Component {
    // refreshPage=()=> {
    //   window.location.reload(false);
    // }
    render() {
        return (
            <>
                <div>
                    <nav className="navbar fixed-top navbar-expand-lg  navbar-dark bg-dark">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="/science">Scratch App</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item"> <Link className="nav-link" to="/Home"   >     Home     </Link></li>
                                    <li className="nav-item"> <Link className="nav-link" to="/About" >About</Link></li>
                                    <li className="nav-item"> <Link className="nav-link" to="/Contact" >      Contact      </Link></li>
                                    <li className="nav-item"> <Link className="nav-link" to="/Products">        Products        </Link></li>
                                    <li className="nav-item"> <Link className="nav-link" to="/Images" >       Images       </Link></li>
                                    <li className="nav-item"> <Link className="nav-link" to="/Services" >        Services        </Link></li>
                                    <li className="nav-item"> <Link className="nav-link" to="/Information">    Information     </Link></li>
                                </ul>
                                <Link className="btn btn-primary btn-sm mx-1" to="/Login" role="button">Login</Link>
                                <Link className="btn btn-primary btn-sm mx-1" to="/SignUp" role="button">SignUp</Link>


                            </div>
                        </div>
                    </nav>
                </div></>
        )
    }
}

export default Navbar
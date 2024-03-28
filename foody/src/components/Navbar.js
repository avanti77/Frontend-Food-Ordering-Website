import React, { useState } from 'react'

import {Link , useNavigate} from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../screens/Cart';
// import Badge from "@material-ui/core/Badge";
export default function Navbar() {
  const [cartView, setCartView] = useState(false)

  let navigate = useNavigate();
   const handleLogout = () => {
        localStorage.removeItem('token')

        navigate("/login")
    }
  const loadCart = () => {
        setCartView(true)
    }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="#">Foody</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link fs-5 mx-3 active " aria-current="page" to="#">Home</Link>
        </li>

        {(localStorage.getItem("token")) ?
        <li className="nav-item">
            <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/" >My Orders</Link>  {/* index.css - nav-link color white */}
        </li> : ""}
       
      </ul>
       
         {(!localStorage.getItem("token")) ?
            <form className="d-flex">
                <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
            </form> :
            <div>

              <button  className="btn bg-white text-success mx-2" onClick={loadCart}>Cart</button>
              {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

              <button onClick={handleLogout} className="btn bg-white text-success" >Logout</button>
            </div>
            
            }

       </div>
     </div>
    </nav>
    </div>
  );
}

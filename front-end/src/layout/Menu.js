import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  const history = useHistory();
  let [number, setNumber] = useState("");

  const handleChange = (event) => {
    setNumber(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(number) {
      history.push(`search?mobile_number=${number}`);
    }
  }
  return (
    <nav className="navbar main-navbar navbar-expand-md shadow fixed-top">
      <Link className="navbar-brand logo white-text" to={"/"}>
        <b> DaHoo </b>
      </Link>
      <button
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        type="button"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item active">
            <Link className="nav-link white-text" to="/dashboard">
              <span className="oi oi-home" />
              &nbsp;Home
            </Link>
          </li>
          
          <li className="nav-item">
            <Link className="nav-link" to="/reservations/new">
              <span className="oi oi-plus" />
              &nbsp;New Reservation
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tables/new">
              <span className="oi oi-layers" />
              &nbsp;New Table
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to="/search">
              <span className="oi oi-magnifying-glass" />
              &nbsp;Search
            </Link>
          </li> */}
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} value={number} required/>
          <button className="btn btn-outline-success my-2 my-sm-0" onClick={handleSubmit}>Search</button>
        </form>
        {/* <div className="text-center d-none d-md-inline">
          <button
            className="btn rounded-circle border-0"
            id="sidebarToggle"
            type="button"
          />
        </div> */}
      </div>
    </nav>
  );
}

export default Menu;

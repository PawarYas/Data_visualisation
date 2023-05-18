import React from "react";
import { Link} from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="shadow navbar navbar-expand-lg bg-body-tertiary bg-color text-dark">
        <div className="container-fluid">
          <Link className="navbar-brand text-center font-weight-bold" href="/">Data Visualizer</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

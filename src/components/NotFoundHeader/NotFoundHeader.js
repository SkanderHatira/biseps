import { Link } from "react-router-dom";
import React from "react";
import { useAuth } from "../../hooks/useAuth";

const NotFoundHeader = () => {
  const auth = useAuth();
  return (
    <div>
      {auth.user.isAuthenticated && auth.user.isAuthenticated ? (
        <div className="d-lg-flex">
          <div className="container  d-lg-flex pt-3 align-items-lg-center min-height-lg-100vh space-bottom-4 ">
            <div className="not-found-404">404</div>
            <div className="">
              <h1 className="text-primary font-weight-normal">
                Oops! Vous semblez perdu,
              </h1>
              <p className="h3">Allons retrouver votre cap</p>
              <Link
                className="btn btn-primary btn-wide transition-3d-hover"
                to="/"
              >
                Naviguer
              </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default NotFoundHeader;

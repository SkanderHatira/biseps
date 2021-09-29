import NotFoundHeader from "../../components/NotFoundHeader/NotFoundHeader";
import NotFoundSVG from "../../components/SVG/NotFoundSVG";
import React from "react";

const NotFound = () => {
  return (
    <>
      <NotFoundHeader />
      <NotFoundSVG className="not-found-svg z-index-2" />
    </>
  );
};

export default NotFound;

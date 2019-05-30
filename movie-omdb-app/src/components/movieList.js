import React from "react";
import { Link } from "react-router-dom";

const MovieList = props =>
  props.list.map(item => (
    <div className="row no-gutters">
      <div className="col-md-12 mt-md-0 p-0 mx-auto">
        <ul className="list-group">
          <li
            className="list-group-item text-center text-grey col-12 col-sm-12 mt-md-0 p-0 mx-auto"
            key={item.imdbID}
          >
            <span>Title: {item.Title}</span>
            <br />
            <br />
            <span>Year: {item.Year}</span>
            <br />
            <br />
            <span>imdbID: {item.imdbID}</span>
            <br />
            {/* {item.Poster !== "N/A" && (
                <img src={item.Poster} alt={item.Title} />
              )} */}
            <Link
              to={{
                pathname: "/details",
                state: { movieObj: item }
              }}
            >
              View Details
            </Link>
          </li>
        </ul>
      </div>
    </div>
  ));

export default MovieList;

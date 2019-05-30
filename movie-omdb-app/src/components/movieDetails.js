import React from "react";
import { Link } from "react-router-dom";

const MovieDetails = props => {
  const details = props.history.location;
  //state
  const movieDetails = Object.keys(details.state.movieObj).map((key, index) => {
    return (
      <React.Fragment>
        <div>
          {key === "Poster" && (
            <img src={details.state.movieObj[key]} alt="text" />
          )}
          {key !== "Poster" && (
            <span>
              {JSON.stringify(key)}:{details.state.movieObj[key]}
            </span>
          )}
        </div>
        <br />
      </React.Fragment>
    );
  });

  return (
    <React.Fragment>
      <Link
        to={{
          pathname: "/dashboard"
        }}
      >
        Back to dashboard
      </Link>
      <br />
      <br />
      {movieDetails}
    </React.Fragment>
  );
};

export default MovieDetails;

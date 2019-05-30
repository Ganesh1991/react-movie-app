import React from "react";

class MovieSearch extends React.Component {
  handleSearch = () => {
    if (this.name.value === "" && this.year.value === "") {
      alert("Please enter search paramters");
      return false;
    } else {
      this.props.searchMovie(this.name.value, this.year.value);
    }
  };

  HandleclearSearch = () => {
    this.name.value = "";
    this.year.value = "";
    this.props.clearSearch();
  };

  render() {
    return (
      <div>
        <h1>Search for a Movie:</h1>
        <input
          type="text"
          placeholder="Search by Name"
          name="name"
          ref={nametxt => (this.name = nametxt)}
          style={{ marginRight: 5 }}
        />
        <input
          type="text"
          placeholder="Search by Year"
          name="year"
          ref={yeartext => (this.year = yeartext)}
          style={{ marginRight: 10 }}
        />
        <button style={{ marginRight: 5 }} onClick={this.handleSearch}>Search</button>
        <button onClick={this.HandleclearSearch}>Clear</button>
      </div>
    );
  }
}

export default MovieSearch;

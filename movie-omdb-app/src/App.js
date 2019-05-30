import React from "react";
import "./App.css";
import MovieList from "./components/movieList";
import { getMovies, searchMoviebyYearAndTitle } from "./services/index";
import { apiUrl } from "./constant";
import MovieSearch from "./components/movieSearch";
import { async } from "q";

class App extends React.Component {
  state = {
    movieList: [],
    page: 1,
    movieListLoading: true,
    searchBtnClicked: false
  };

  onSignOut = () => {
    localStorage.setItem("userApikey", "");
    this.props.history.push("/");
  };

  componentDidMount() {
    document.addEventListener("scroll", this.handleScroll);
    this.getMovieList();
  }

  componentWillMount() {
    document.removeEventListener("scroll", this.handleScroll);
  }

  getMovieList = async () => {
    const params = `${apiUrl}${localStorage.getItem("userApikey")}`;
    let Inputpage = this.state.page + 1;
    const data = await getMovies(params, Inputpage);
    if (data.Response === "True") {
      const movieList = this.state.movieList;
      const newMovieList = [...movieList, ...data.Search];
      console.log("TCL: App -> getMovieList -> newMovieList", newMovieList);
      this.setState({
        movieList: newMovieList,
        movieListLoading: false,
        page: Inputpage
      });
    } else {
      this.setState({ movieListLoading: false });
    }
  };

  handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    else {
      console.log("Loading more movie");
      this.getMovieList();
    }
  };

  clearSearch = async () => {
    console.log("Search is clared");
    const params = `${apiUrl}${localStorage.getItem("userApikey")}`;
    let Inputpage = 1;
    const data = await getMovies(params, Inputpage);
    if (data.Response === "True") {
      const newMovieList = [...data.Search];
      console.log("TCL: App -> getMovieList -> newMovieList", newMovieList);
      this.setState({
        movieList: newMovieList,
        movieListLoading: false,
        page: Inputpage
      });
    } else {
      this.setState({ movieListLoading: false });
    }
  };

  searchMovie = async (name, year) => {
    let page = this.state.page;
    const params = `${apiUrl}${localStorage.getItem("userApikey")}`;
    if (!this.state.searchBtnClicked) {
      page = 0 + 1;
    }
    this.setState({ searchBtnClicked: true, page: page });
    const data = await searchMoviebyYearAndTitle(params, name, year, page);
    if (data.Response === "True") {
      this.setState({
        movieList: data.Search
      });
    } else {
      this.setState({
        movieList: []
      });
    }
  };

  render() {
    return (
      <div>
        <div>
          <header>
            <h1 style={{ textAlign: "center" }} className="nav-item">
              Welcome to Movie app
            </h1>
            <nav className="navbar navbar-expand-sm bg-white navbar-light justify-content-end p-0">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <button
                    className="btn btn-danger btn-lg br-0"
                    onClick={this.onSignOut}
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </nav>
            <MovieSearch
              searchMovie={this.searchMovie}
              clearSearch={this.clearSearch}
            />
          </header>
        </div>
        {this.state.movieListLoading && <div>....Loading</div>}
        {!this.state.movieListLoading && this.state.movieList.length > 0 && (
          <MovieList list={this.state.movieList} onScroll={this.handleScroll} />
        )}
        {!this.state.movieListLoading && this.state.movieList.length === 0 && (
          <div>No search results found </div>
        )}
      </div>
    );
  }
}

export default App;

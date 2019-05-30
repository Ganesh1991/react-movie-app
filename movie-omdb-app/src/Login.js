import React from "react";
import "./login.css";
import { Redirect } from "react-router-dom";
import { searchMovieTitle } from "./services/index";
import { apiUrl } from "./constant";
import { async } from "q";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: "",
      isLoginBtnClicked: false,
      isLoginSuccess: false
    };
  }

  handleOnChange = event => {
    if (this.state.errorMsg !== "") {
      this.setState({ errorMsg: "" });
    }
  };

  handleSubmit = async () => {
    const userName = this.userInput.value;
    if (userName === "") {
      this.setState({ errorMsg: "Username is required." });
    } else {
      this.setState({ isLoginBtnClicked: true });
      const data = await searchMovieTitle("batman", `${apiUrl}${userName}`);
      console.log("TCL: Login -> handleSubmit -> data", data);
      if (data.Response === "True") {
        localStorage.setItem("userApikey", userName);
        this.setState({ isLoginSuccess: true });
      } else {
        this.setState({
          errorMsg: "Invalid Username.",
          isLoginBtnClicked: false
        });
      }
    }
  };

  render() {
    const { errorMsg, isLoginBtnClicked, isLoginSuccess } = this.state;
    if (isLoginSuccess) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="row no-gutters">
        <div className="col-lg-4 col-md-5 col-sm-6 col-10 mx-auto mt-5">
          <div className="card px-1 py-5">
            <h3 className="text-secondary text-center mb-2">
              Welcome to Movie app
            </h3>
            <span className="text-center mb-4">
              Please use OMDb API key as username
            </span>
            <div className="col-md-10 col-10 mx-auto">
              <div className="form-label-group">
                <input
                  ref={inputTxt => (this.userInput = inputTxt)}
                  onChange={this.handleOnChange}
                  type="text"
                  id="username"
                  name="username"
                  className="form-control form-control-custom"
                  placeholder="Enter your username"
                />
                <label htmlFor="username">Enter your username</label>
              </div>
              <span className="text-center mb-4 error">{errorMsg}</span>
            </div>
            <div className="col-md-10 col-10 mx-auto">
              <button
                type="button"
                disabled={isLoginBtnClicked}
                onClick={this.handleSubmit}
                className="btn btn-outline-primary btn-lg form-control-custom"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

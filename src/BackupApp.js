import React, { Component } from "react";
import "./App.css";
import Footer from "./component/Footer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      id: null,
      url: null,
      avatar_url: null,
      following: null,
      follower: null,
      public_repos: null,
      created_at: null,
      error: ""
    };
  }

  getUser(username) {
    return fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        return response;
      });
  }

  async handleSubmit(e) {
    e.preventDefault();
    let user = await this.getUser(this.refs.username.value);
    this.setState({
      username: user.login,
      url: user.url,
      id: user.id,
      avatar_url: user.avatar_url,
      followers: user.followers,
      following: user.following,
      public_repos: user.public_repos,
      created_at: user.created_at
    });

    console.log(user);
  }

  render() {
    let user;
    if (this.state.username) {
      user = (
        <div>
          <img
            src={this.state.avatar_url}
            width="128"
            height="128"
            alt="something"
          />
          <p>
            User Name :{this.state.username}
            <br />
            Github ID :{this.state.id}
            <br />
            URL : {this.state.url}
            <br />
            No of REPOSITORY : {this.state.public_repos}
            <br />
            Followers : {this.state.followers}
            <br />
            Following : {this.state.following}
            <br />
            Date Joined : {this.state.created_at}
          </p>
        </div>
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"> Github User Finder</h1>
        </header>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            ref="username"
            type="text"
            placeholder="@githubuser"
            alt="sample alt"
          />
          <button className="button">Search</button>
        </form>
        {/* <p className="App-intro">{user}</p> */}
        {user}
        <Footer />
      </div>
    );
  }
}

export default App;

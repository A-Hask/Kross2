import React from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
// import Auth from "../utils/auth";

const Home = () => {
  //   const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div>
        <div>
          <Signup />
        </div>
        <br></br>
        <div>
          <Login />
        </div>
      </div>
    </main>
  );
};

export default Home;

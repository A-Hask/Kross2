import PostList from "../components/PostList";
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import GameList from "../components/GameList";
import KrossieList from "../components/KrossieList";
import Auth from "../utils/auth";
import PostForm from "../components/PostForm";

import { ADD_KROSSIE } from "../utils/mutations";

import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
//import Home from "./Home";

const Profile = (props) => {
  const { username: userParam } = useParams();

  const [addKrossie] = useMutation(ADD_KROSSIE);
  // const [addGame] = useMutation(ADD_GAME);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  console.log(user.games);

  // navigate to profile page if username is logged in user
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile:username" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return <h4>You need to be logged in to see this page.</h4>;
  }

  const handleClick = async () => {
    try {
      await addKrossie({
        variables: { id: user._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {user.username}'s profile.
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <PostList posts={user.posts} title={`${user.username}'s posts...`} />
        </div>
        <div className="col-12 mb-3 col-lg-8">
          <PostList posts={user.posts} title={`${user.username}'s posts...`} />
        </div>
        <div className="col-12 mb-3 col-lg-8">
          <GameList games={user.games} title={`${user.username}'s games...`} />
        </div>
        <div className="col-12 col-lg-3 mb-3">
          <KrossieList
            username={user.username}
            krossieCount={user.krossieCount}
            krossies={user.krossies}
          />
          {userParam && (
            <button className="btn ml-auto" onClick={handleClick}>
              Add Krossie
            </button>
          )}
        </div>
      </div>
      <div className="mb-3">{!userParam && <PostForm />}</div>
    </div>
  );
};

export default Profile;

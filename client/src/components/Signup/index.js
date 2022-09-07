import React, { useEffect, useState } from "react";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";

const games = ["Fortnite", "Animal Crossing", "Among Us", "Pokemon"];

const Signup = () => {
  const [addUser, { error }] = useMutation(ADD_USER);
  const [gameList, setGameList] = useState([]);
  const [formState, updateFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({ variables: { ...formState } });

      console.log(data);

      Auth.login(data.addUser.token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleCheck = (event) => {
    const game = event.target.name;
    console.log(event.target.checked);
    if (event.target.checked && !gameList.includes(game)) {
      setGameList([...gameList, game]);
    } else if (!event.target.checked) {
      // const index = gameList.indexOf(game);
      // index >= 0 && gameList.splice(index, 1);
      setGameList(gameList.filter((x) => x !== game));
    }
  };

  useEffect(() => {
    console.log(gameList);
  }, [gameList]);

  return (
    <main className="w-100 mt-auto bg-secondary p-4">
      <form>
        <div>
          <h3>Sign Up</h3>
        </div>
        <div className="container"></div>
        <label>Username:</label>
        <input
          type="username"
          placeholder="Enter Username"
          name="username"
          value={formState.username}
          onChange={handleChange}
        />
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={formState.password}
            onChange={handleChange}
          />
          <div>
            <h3>Games:</h3>
            {games.map((game) => {
              return (
                <div>
                  <input
                    type="checkbox"
                    key={game}
                    name={game}
                    onChange={handleCheck}
                  />
                  <label>{game}</label>
                </div>
              );
            })}
          </div>
          <br></br>
          <button onClick={handleFormSubmit}>Submit</button>
        </div>
      </form>
      {error && <div>Signup Failed</div>}
    </main>
  );
};

export default Signup;

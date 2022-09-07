import React from "react";

const GameList = ({ games, title }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        {games &&
          games.map((game) => (
            <p className="pill mb-3" key={game._id}>
              {game.gamename}
            </p>
          ))}
      </div>
    </div>
  );
};

export default GameList;

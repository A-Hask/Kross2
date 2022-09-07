import React from 'react';
import { Link } from 'react-router-dom';

const KrossieList = ({ krossieCount, username, krossies }) => {
  if (!krossies || !krossies.length) {
    return <p className="bg-dark text-light p-3">{username}, make some krossies!</p>;
  }

  return (
    <div>
      <h5>
        {username}'s {krossieCount} {krossieCount === 1 ? 'krossie' : 'krossies'}
      </h5>
      {krossies.map(krossie => (
        <button className="btn w-100 display-block mb-2" key={krossie._id}>
          <Link to={`/profile/${krossie.username}`}>{krossie.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default KrossieList;
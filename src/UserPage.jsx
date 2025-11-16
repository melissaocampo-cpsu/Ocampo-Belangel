import React from "react";

function UserPage({ username }) {
  return (
    <div className="user-page">
      <h1>Welcome, {username}!</h1>
    </div>
  );
}

export default UserPage;

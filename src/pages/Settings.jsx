import React from "react";

function Settings() {
  return (
    <>
      <h1>Settings</h1>
      <p>This is the settings page</p>
      <div className="settingsContainer">
        <p>username: </p>
        <input />
      </div>
      <div className="settingsContainer">
        <p>password: </p>
        <input />
      </div>
    </>
  );
}

export default Settings;

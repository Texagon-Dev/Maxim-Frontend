import React from "react";
import supabase from "./Supabase";
import { getCurrentLocalUser,signout,GetPureUser } from "./Authentication";

const Test = () => {
  const [authuser, setAuthUser] = React.useState("");

  async function getUser() {
    setAuthUser(await GetPureUser());
    if (authuser == null) {
      const { data, error } = await supabase.auth.getUser(authuser);
      setAuthUser(data);
    }
  }

  return (
    <div className="w-full h-full">
      <button onClick={getUser} className="w-1/2 text-center bg-red-300">
        Get User
      </button>
      <button onClick={signout} className="w-1/2 text-center bg-red-300">
        Log Out the User
      </button>
      <div>{JSON.stringify(authuser, null, 2)}</div>
    </div>
  );
};

export default Test;

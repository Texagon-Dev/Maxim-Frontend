import supabase from "./Supabase";

const RefID = "wuzcayybydmkhtkohkza";
const AuthTokenValidator = `sb-${RefID}-auth-token`;
const Host = window.location.origin;

export async function currentuserdata(UUID) {
  const data = await supabase.from("Customers").select("*").eq("UUID", UUID);
  if (data) {
    localStorage.setItem("currentuser", JSON.stringify(data.data[0]));
  } else {
    window.location.href = "/login";
  }
  return data;
}

export async function validate(rerdirection = false) {
  let data = await supabase.auth.getSession();

  if (data.data.session != null) {
    const UUID = data.data.session.user.id;
    await currentuserdata(UUID);
    return data.data.session;
  } else {
    if (rerdirection) {
      window.location.href = "/login";
    }
  }
  return false;
}

export async function validatetoken() {
  const token = localStorage.getItem(AuthTokenValidator);
  if (!token) {
    console.log("No Token Found");
    return true;
  } else {
    const { data, error } = await supabase.auth.getUser(token.access_token);
    if (data) {
      console.log("Validated Token : ", data);
      return false;
    } else {
      localStorage.clear();
      return true;
    }
  }
}

export const GetPureUser = async () => {
  const LoggedinUser = getCurrentLocalUser();
  return LoggedinUser;
};

export const login = async ({ email, pass }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: pass,
    redirectTo: `${Host}/dashboard/chat`,
  });

  if (error) {
    return { statuscode: 400, err: error.message, data: null };
  } else if (data) {
    return { statuscode: 200, data: data, err: null };
  }
};

export const google_login = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    redirectTo: `${Host}/dashboard/chat`,
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
};

export const microsoft_login = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "azure",
    options: {
      scopes: "profile",
    },
    redirectTo: `${Host}/dashboard/chat`,
  });
};

export const signout = async () => {
  console.log("Signing Out");
  const { error } = await supabase.auth.signOut();

  localStorage.clear();
  window.location.href = "/login";
  if (error) {
    console.log(error);
  }
};

export const signup = async ({ email, pass, name }) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: pass,
    options: {
      data: {
        name: name,
      },
      redirectTo: `${Host}/dashboard/chat`,
    },
  });

  if (error) {
    return { statuscode: 400, err: error, data: null };
  }

  if (data) {
    if (data.identities === null) {
      alert("User Already Exists");
      return { statuscode: 1, data: null, err: "User Already Exists" };
    }
    alert("Kindly Confirm your Email");
    return { statuscode: 200, data: data, err: null };
  }

  return { statuscode: 3, err: "Unknown Error" };
};

export const forgotpassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${Host}/reset-password`,
  });
};

export const updatepswd = async (password) => {
  return await supabase.auth.updateUser({
    password: password,
  });
};

export const getCurrentLocalUser = () => {
  const user = localStorage.getItem(AuthTokenValidator);
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export function getauthstatus() {
  const token = localStorage.getItem(AuthTokenValidator);
  if (!token) {
    return false;
  }
  return true;
}

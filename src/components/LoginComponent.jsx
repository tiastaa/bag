import classes from "./LoginComponent.module.scss";
import { useState } from "react";
import { getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { app, googleAuthProvider } from "../firebase";
import { getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import UserInfo from "./UserInfo/UserInfo";

const LoginComponent = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState([]);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(() => {
      return currentUser;
    });
  });

  const login = async () => {
    await signInWithPopup(auth, googleAuthProvider)
      .then((credentials) => {
        setUser(credentials.user);
        // setUser("aaaaaaaaaaaaaaaaaaaaaaa");
        // writeUserData(credentials.user);
        console.log(credentials.user);
      })
      .catch((e) => console.error(e));
    console.log("user");

    console.log("user");
  };
  const logout = async () => {
    await auth.signOut();

    // console.log(user);
    setUser([]);
  };

  return (
    <>
      {user != null ? (
        <>
          <UserInfo user={user} />
          <button className={classes.log_button} onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <button className={classes.log_button} onClick={login}>
          Login by Google
        </button>
      )}
    </>
  );
};

export default LoginComponent;

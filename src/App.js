import "./App.css";

import React, {useEffect, useState} from "react";
import {SignInSignUp} from "./pages";
import {ToastContainer, Zoom} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {AuthContext} from "./utils/contexts";
import {isUserLoggedApi} from "./api/auth";
import Routing from "./routes/Routing";
import * as PropTypes from "prop-types";

function MuiPickersUtilsProvider(props) {
  return null;
}

MuiPickersUtilsProvider.propTypes = {
  utils: PropTypes.any,
  children: PropTypes.node
};

function App() {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);
  useEffect(() => {
    setUser(isUserLoggedApi());
    setRefreshCheckLogin(false);
    setLoadUser(true);
  }, [refreshCheckLogin]);
  if (!loadUser) return null;
  return (

      <AuthContext.Provider value={user}>

        {user ? (
            <Routing setRefreshCheckLogin={setRefreshCheckLogin}/>
        ) : (
            <h1>
              <SignInSignUp setRefreshCheckLogin={setRefreshCheckLogin}/>
            </h1>
        )}

        <ToastContainer
            position="top-right"
            autoClose={5000}
            transition={Zoom}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable={false}
            pauseOnHover
        />

      </AuthContext.Provider>
  );
}

export default App;

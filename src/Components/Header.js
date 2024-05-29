import React, { useEffect, useState } from "react";
import pic1 from "../Assets/lunch.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "350px",
  },
};

const Header = () => {
  const clientId =
    "682662386940-pmpv9fnnm862mjde7gl6d79idrngq6jl.apps.googleusercontent.com";
  const location = useLocation();
  const [headerBackground, setHeaderBackground] = useState("transparent");
  const [logoDisplay, setLogoDisplay] = useState("none");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(undefined);

  const navigate=useNavigate()

  // function openModal() {
  //   setIsOpen(true);
  // }

  function closeModal() {
    setIsOpen(false);
  }

  const onFailure = (response) => {
    console.log(response);
  };
  const onSuccess = (response) => {
    setIsLoggedIn(true);
    console.log(response.profileObj.name);
    setLoggedUser(response.profileObj.name);
    setIsOpen(false);
  };
  const logout=(e)=>{
    e.preventDefault();
    setIsLoggedIn(false);
    setLoggedUser(undefined);
    // localStorage.clear();
  }

  useEffect(() => {
    if (location.pathname === "/") {
      setHeaderBackground("transparent");
      setLogoDisplay("none");
    } else {
      setHeaderBackground("red");
      setLogoDisplay("inline-block");
    }
    function start() {
      gapi.client.init({
        clientId: "clientId",
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, [location.pathname]);

  return (
    <>
      <div className="header" style={{ backgroundColor: headerBackground }}>
        <img
          src={pic1}
          alt="Image not found"
          style={{ display: logoDisplay }}
          onClick={()=>navigate('/')}
        />
        {!isLoggedIn ? (
          <>
            <a href="" onClick={(e)=>e.preventDefault()}>Create an Account</a>
            <label
              onClick={() => setIsOpen(true)}
              style={{ cursor: "pointer" }}
            >
              Login
            </label>
          </>
        ) : (
          <>
            <a onClick={(e)=>logout(e)} style={{color:'white',paddingRight:'20px'}}>Logout</a>
            <label
              onClick={() => setIsOpen(true)}
              style={{ cursor: "pointer" }}
            >
              {loggedUser}
            </label>
          </>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Login Modal"
      >
        <h2 style={{ display: "inline-block" }}>Login</h2>
        <a
          onClick={closeModal}
          style={{
            padding: "7px",
            float: "right",
            border: "1px solid red",
            borderRadius: "5px",
          }}
        >
          X
        </a>

        <form>
          <input
            type="text"
            className="mt-2 px-2"
            placeholder="Enter Email"
            style={{ display: "block", width: "100%" }}
          />
          <input
            type="password"
            className="mt-2 px-2"
            placeholder="Enter Password"
            style={{ display: "block", width: "100%" }}
          />
          <button type="submit" className="mt-3 px-3">
            Login
          </button>
          <button type="button" className="mx-3 px-3" onClick={closeModal}>
            Cancel
          </button>
        </form>

        <div>
          <GoogleLogin
            clientId={clientId}
            buttonText="Continue with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </Modal>
    </>
  );
};

export default Header;

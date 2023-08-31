import "./Login.css";
import React, { useContext } from "react";
import { useRef, useState, useEffect } from "react";
import Services from "../../../api/axiosConfig";
import Urls from "../../../api/Urls";
import { useAuth } from "../AuthActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Services.userService.post(
        Urls.login,
        JSON.stringify({
          email: email,
          password: pwd,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      const accessToken = response?.data?.token;
      const role = response?.data?.role;
      const userId = response?.data?.userId;
      
      setAuth({ userId, email, pwd, role, accessToken });
      setEmail("");
      setPwd("");
      setSuccess(true);
      navigate("/", {replace:true});
    } catch (err) {
      if (err.response?.status === 400) {
        setErrMsg("Missing E-mail or Password");
      } else if (err.response?.status === 403) {
        setErrMsg("Wrong E-mail or Password");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail:</label>
            <input
              type="text"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
              value={email}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              value={pwd}
            />
            <button>Sign In</button>
          </form>
          <p>
            Don't have an account?
            <br />
            <span className="line">
              <a href="/Register">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;

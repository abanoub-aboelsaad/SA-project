import { useState } from "react";
import "./Login.css";
import toast from "react-hot-toast";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [, setAuth] = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      if (res && res.data.success) {
        toast.success(res.data.message);
        
        // Set authentication data in context
        setAuth({
          user: res.data.user,
        });

        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Email not registered");
    }
  };

  return (
    <div>
      <div className="bod">
        <div className="mai">
          <form onSubmit={handleSubmit}>
            <label className="chk" aria-hidden="true">
              log in
            </label>

            <input
              className="inpu"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              className="inpu"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="pswd"
              placeholder="Password"
              required
            />
            <button className="b" type="submit">
              login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

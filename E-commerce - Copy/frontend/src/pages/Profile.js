import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";

function Profile() {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    if (auth.user && auth.user._id) {
      axios
        .get(`http://localhost:8080/api/auth/profile/${auth.user._id}`)
        .then((res) => {
          console.log("Profile API Response:", res.data);
          setProfile({
            name: res.data.name,
            email: res.data.email
         
          });
        })
        .catch((err) => console.error("Profile API Error:", err));
    }
  }, [auth.user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (auth.user && auth.user._id) {
      axios
        .put(`http://localhost:8080/api/auth/profile/${auth.user._id}`, profile)
        .then((res) => {
          toast.success("Profile updated successfully");
        })
        .catch((err) => console.error("Update Profile Error:", err));
    }
  };

  return (
    <div>
      <div>
        <div className="bod">
          <div className="maii">
            <form onSubmit={handleSubmit}>
              <label className="addprodd" aria-hidden="true">
                Update Profile
              </label>
              <input
                className="inpu"
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                name="name"
                placeholder="Name"
                required
              />
              <input
                className="inpu"
                type="text"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                name="email"
                placeholder="Email"
                required
              />
        

              <button className="bbb" type="submit">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

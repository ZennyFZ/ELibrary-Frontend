import React, { useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { getCurrentUser } from "../../apis/UserService";
import { useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const formatDate = user?.dob?.split("T")[0]; //format date
  function getUserData() {
    getCurrentUser()
      .then(res => {
        setUser(res.data.user);
      })
      .catch(err => {
        console.log(err);
      });
  }
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      <TableContainer component={Paper} style={{ width: "800px", padding: "5%" }}>
        <h1>Profile</h1>
        <div style={{ display: "flex" }}>
          <div>
            <img
              src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
              alt="avatar"
              style={{ width: "200px", height: "200px" }}
            />
          </div>

          <div style={{ marginLeft: "10%" }}>
            <h3>Name: {user?.name}</h3>
            <h3>Email: {user?.email}</h3>
            <h3>Phone: {user?.phone}</h3>
            <h3>Day of birth: {formatDate}</h3>
          </div>
        </div>
      </TableContainer>
    </div>
  );
};

export default UserProfile;

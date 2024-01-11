import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

const UserProfile = () => {
  return (
    <TableContainer component={Paper} style={{ width: "1000px" }}>
      <div className="user-profile" style={{ marginLeft: "30px" }}>
        <div className="profile-header">
          <img src="user-avatar.jpg" alt="User Avatar" className="avatar" />
          <h3 className="username">Tài Smile</h3>
        </div>
        <div className="profile-details">
          <div className="detail">
            <h3>Phone</h3>
            <p>0901425613</p>
          </div>
          <div className="detail">
            <h3>Email</h3>
            <p>taismile@gmail.com</p>
          </div>
          <div className="detail">
            <h3>Address</h3>
            <p>Nhà văn hóa sinh viên FPT</p>
          </div>
        </div>
      </div>
    </TableContainer>
  );
};

export default UserProfile;

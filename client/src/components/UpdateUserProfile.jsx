import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "./../redux/authSlice";
import { showNotification } from "../redux/notificationSlice";

const UpdateUserProfile = () => {
  const {user} = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: user?.phoneNumber || "",
    email: user?.email || "",
    address: user?.address || "",
    pincode: user?.pincode || "",
    state: user?.state || "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async() => {
    try {
      const res = await axios.post(
        "https://ecommerce-backend-bv1o.onrender.com/api/v1/users/updateProfile", formData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if(res.data.success){
        dispatch(setUser(res.data.user));
        handleClose();
        dispatch(showNotification(res.data.message));
      }else{
        dispatch(showNotification('Update failed: ' + res.data.message));
      }
    } catch (error) {
      dispatch(showNotification('Error updating profile. Please try again.'));
    }
  };
  return (
    <div>
      <Button
        sx={{
          position: "absolute",
          top: "2px",
          right: "2px",
          borderRadius: "50px",
          color: "#72A0C1",
        }}
        onClick={handleClickOpen}
      >
        <EditIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}>Update Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="phoneNumber"
            name="phoneNumber"
            label="Mobile Number"
            type="tel"
            fullWidth
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="address"
            name="address"
            label="Address"
            fullWidth
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="pincode"
            name="pincode"
            label="Pincode"
            type="number"
            fullWidth
            value={formData.pincode}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="state"
            name="state"
            label="State"
            fullWidth
            value={formData.state}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateUserProfile;

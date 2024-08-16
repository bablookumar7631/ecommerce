// import React, { useState } from 'react';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Box
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import { useSelector } from 'react-redux';

// const UpdateUserProfile = () => {

//     const {user} = useSelector(store => store.auth);

//     const [open, setOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         phoneNumber: user?.phoneNumber || "",
//         email: user?.email || "",
//         address: user?.address || "",
//         pincode: user?.pincode || "",
//         state: user?.state || "",
//         profilePhoto: user?.profilePhoto || "",
//     });
    
//     const handleClickOpen = () => {
//         setOpen(true);
//     };
    
//     const handleClose = () => {
//         setOpen(false);
//     };
    
//     const handleChange = (e) => {
//         setFormData({
//         ...formData,
//         [e.target.name]: e.target.value,
//         });
//     };

//     const handleImageChange = (e) => {
//         setFormData({
//           ...formData,
//           image: e.target.files[0],
//         });
//       };
    
//     const handleSubmit = (e) => {
//       e.preventDefault();
        
//       handleClose();
//     };



//   return (
//     <div>
//       <EditIcon
//             sx={{
//                 position: 'absolute',
//                 top: '20px',
//                 right: '20px',
//                 width: '35px',
//                 height: '35px',
//                 padding: '8px',
//                 backgroundColor: 'rgba(0, 0, 0, 0.04)',
//                 borderRadius: '50%',
//                 '&:hover': {
//                 backgroundColor: 'rgba(0, 0, 0, 0.1)',
//                 },
//                 cursor: 'pointer',
//                 boxSizing: 'border-box',
//             }}
//             onClick={handleClickOpen}
//         />

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle sx={{textAlign: 'center', marginBottom: '12px'}}>Update Profile</DialogTitle>
//         <DialogContent>
//           <Box
//             component="form"
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               gap: '10px',
//               width: '400px', // Adjust width of the dialog
//             }}
//             onSubmit={handleSubmit}
//           >
//             <TextField
//               label="Phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               fullWidth
//             />
//             <TextField
//               label="Email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               fullWidth
//             />
//             <TextField
//               label="Address"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               fullWidth
//             />
//             <TextField
//               label="Pincode"
//               name="pincode"
//               value={formData.pincode}
//               onChange={handleChange}
//               fullWidth
//             />
//             <TextField
//               label="State"
//               name="state"
//               value={formData.state}
//               onChange={handleChange}
//               fullWidth
//             />
//             <TextField 
//                 type="file"
//                 name="profilePhoto"
//                 value={formData.profilePhoto}
//                 onChange={handleImageChange}
//                 inputProps={{
//                     accept: 'image/*',
//                 }}
//             />
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="secondary">Cancel</Button>
//           <Button onClick={handleUpdate} variant="contained" color="primary">
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   )
// }

// export default UpdateUserProfile



// import React, { useState } from 'react';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Box
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
// // import { toast } from 'react-toastify';
// import { setUser } from '../redux/authSlice';

// const UpdateUserProfile = () => {
//   const { user } = useSelector(store => store.auth);
//   const dispatch = useDispatch();
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     phoneNumber: user?.phoneNumber || "",
//     email: user?.email || "",
//     address: user?.address || "",
//     pincode: user?.pincode || "",
//     state: user?.state || "",
//     profilePhoto: null,
//   });

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImageChange = (e) => {
//     setFormData({
//       ...formData,
//       profilePhoto: e.target.files[0],
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const updateFormData = new FormData();
//     updateFormData.append("phoneNumber", formData.phoneNumber);
//     updateFormData.append("email", formData.email);
//     updateFormData.append("address", formData.address);
//     updateFormData.append("pincode", formData.pincode);
//     updateFormData.append("state", formData.state);

//     if (formData.profilePhoto) {
//       updateFormData.append("profilePhoto", formData.profilePhoto);
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post("http://localhost:8000/api/v1/users/updateProfile", updateFormData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         },
//         withCredentials: true
//       });

//       if (res.data.success) {
//         dispatch(setUser(res.data.user));  // Update the Redux state with the new user data
//         // toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       // toast.error(error.response?.data?.message || "An error occurred while updating your profile.");
//     } finally {
//       setLoading(false);
//       setOpen(false);
//     }
//   };

//   return (
//     <div>
//       <EditIcon
//         sx={{
//           position: 'absolute',
//           top: '20px',
//           right: '20px',
//           width: '35px',
//           height: '35px',
//           padding: '8px',
//           backgroundColor: 'rgba(0, 0, 0, 0.04)',
//           borderRadius: '50%',
//           '&:hover': {
//             backgroundColor: 'rgba(0, 0, 0, 0.1)',
//           },
//           cursor: 'pointer',
//           boxSizing: 'border-box',
//         }}
//         onClick={handleClickOpen}
//       />

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle sx={{ textAlign: 'center', marginBottom: '12px' }}>Update Profile</DialogTitle>
//         <DialogContent>
//           <Box
//             component="form"
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               gap: '10px',
//               width: '400px',
//             }}
//             onSubmit={handleSubmit}
//           >
//             <TextField
//               label="Phone"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               fullWidth
//             />
//             <TextField
//               label="Email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               fullWidth
//             />
//             <TextField
//               label="Address"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               fullWidth
//             />
//             <TextField
//               label="Pincode"
//               name="pincode"
//               value={formData.pincode}
//               onChange={handleChange}
//               fullWidth
//             />
//             <TextField
//               label="State"
//               name="state"
//               value={formData.state}
//               onChange={handleChange}
//               fullWidth
//             />
//             <TextField
//               type="file"
//               name="profilePhoto"
//               onChange={handleImageChange}
//               inputProps={{
//                 accept: 'image/*',
//               }}
//             />
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="secondary">Cancel</Button>
//           <Button type="submit" variant="contained" color="primary" disabled={loading}>
//             {loading ? "Updating..." : "Update"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default UpdateUserProfile;


import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../redux/authSlice';

const UpdateUserProfile = () => {
  const { user } = useSelector(store => store.auth);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: user?.phoneNumber || "",
    email: user?.email || "",
    address: user?.address || "",
    pincode: user?.pincode || "",
    state: user?.state || "",
    profilePhoto: user?.profilePhoto || "",
  });
  const dispatch = useDispatch();

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

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      profilePhoto: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted"); // Check if this gets logged
    console.log(formData); // Check if formData is correct

    const updateFormData = new FormData();
    updateFormData.append("phoneNumber", formData.phoneNumber);
    updateFormData.append("email", formData.email);
    updateFormData.append("address", formData.address);
    updateFormData.append("pincode", formData.pincode);
    updateFormData.append("state", formData.state);

    if (formData.profilePhoto) {
      updateFormData.append("profilePhoto", formData.profilePhoto);
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/v1/users/updateProfile", updateFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      console.log("API Response:", res); // Check the API response

      if (res.data.success) {
        dispatch(setUser(res.data.user));  // Update the Redux state with the new user data
        // toast.success(res.data.message);
      } else {
        console.log("API Error:", res.data.message);
        // toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Catch Error:", error.response?.data?.message || error.message);
      // toast.error(error.response?.data?.message || "An error occurred while updating your profile.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div>
      <EditIcon
        sx={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '35px',
          height: '35px',
          padding: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          borderRadius: '50%',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          },
          cursor: 'pointer',
          boxSizing: 'border-box',
        }}
        onClick={handleClickOpen}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center', marginBottom: '12px' }}>Update Profile</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              width: '400px',
            }}
            onSubmit={handleSubmit}
          >
            <TextField
              label="Phone"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              type="file"
              name="profilePhoto"
              onChange={handleImageChange}
              inputProps={{
                accept: 'image/*',
              }}
            />
            {/* The submit button should be inside the form for onSubmit to work */}
            <DialogActions>
              <Button onClick={handleClose} color="secondary">Cancel</Button>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateUserProfile;




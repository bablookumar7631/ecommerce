// import React, { useState } from 'react';
// import { TextField, Button, Grid, Typography } from '@mui/material';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import AllCategories from './AllCategories';

// const AddCategory = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         categoryImage: null,
//     });

//     // Handle text input changes
//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     // Handle file input changes
//     const handleImageChange = (e) => {
//         setFormData({
//             ...formData,
//             categoryImage: e.target.files[0],
//         });
//     };

//     // Reset the form
//     const resetForm = () => {
//         setFormData({
//             name: '',
//             categoryImage: null,
//         });
//         // Clear the file input field
//         document.querySelector('input[name="categoryImage"]').value = '';
//     };

//     // Submit the form
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const data = new FormData();
//         data.append('name', formData.name);
//         data.append('categoryImage', formData.categoryImage);

//         try {
//             const response = await axios.post('http://localhost:8000/api/v1/categories/categories', data, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             if (response.data.success) {
//                 toast.success(response.data.message);
//                 resetForm(); // Clear the form on successful submission
//             } else {
//                 toast.error('Submission failed');
//             }
//         } catch (error) {
//             console.error('Error uploading category:', error);
//             toast.error('Error uploading category');
//         }
//     };
//     return (
//         <div>
//             <Grid container spacing={3} sx={{ width: '50%', mx: 'auto', mt: 2 }}>
//                 <Grid item xs={12}>
//                     <Typography variant="h6">Add New Category</Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <TextField
//                         label="Name"
//                         name="name"
//                         fullWidth
//                         required
//                         value={formData.name}
//                         onChange={handleChange}
//                     />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Button
//                         variant="contained"
//                         component="label"
//                         fullWidth
//                         sx={{ marginBottom: 2, bgcolor: 'gray',
//                         '&:hover': {
//                             bgcolor: 'silver',
//                             },
//                         }}
//                     >
//                         Upload Category Image
//                         <input
//                             type="file"
//                             name="categoryImage"
//                             accept="image/*"
//                             hidden
//                             onChange={handleImageChange}
//                         />
//                     </Button>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         sx={{ marginTop: 2 }}
//                         onClick={handleSubmit}
//                     >
//                         Submit
//                     </Button>
//                 </Grid>
//             </Grid>

//             <div>
//                 <hr className='mt-10' />
//                 <AllCategories/>
//             </div>
//         </div>
//     );
// };

// export default AddCategory;







// import React, { useState } from 'react';
// import { TextField, Button, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import CloseIcon from '@mui/icons-material/Close';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import AllCategories from './AllCategories';

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));

// const AddCategory = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     categoryImage: null,
//   });
//   const [open, setOpen] = useState(false);

//   // Handle text input changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle file input changes
//   const handleImageChange = (e) => {
//     setFormData({
//       ...formData,
//       categoryImage: e.target.files[0],
//     });
//   };

//   // Reset the form
//   const resetForm = () => {
//     setFormData({
//       name: '',
//       categoryImage: null,
//     });
//     // Clear the file input field
//     document.querySelector('input[name="categoryImage"]').value = '';
//   };

//   // Submit the form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append('name', formData.name);
//     data.append('categoryImage', formData.categoryImage);

//     try {
//       const response = await axios.post('http://localhost:8000/api/v1/categories/categories', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.success) {
//         toast.success(response.data.message);
//         resetForm(); // Clear the form on successful submission
//         handleClose(); // Close the dialog on successful submission
//       } else {
//         toast.error('Submission failed');
//       }
//     } catch (error) {
//       console.error('Error uploading category:', error);
//       toast.error('Error uploading category');
//     }
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Add New Category
//       </Button>

//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={open}
//       >
//         <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
//           Add New Category
//           <IconButton
//             aria-label="close"
//             onClick={handleClose}
//             sx={(theme) => ({
//               position: 'absolute',
//               right: 8,
//               top: 8,
//               color: theme.palette.grey[500],
//             })}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           <Grid container spacing={3} sx={{ width: '100%' }}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Name"
//                 name="name"
//                 fullWidth
//                 required
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button
//                 variant="contained"
//                 component="label"
//                 fullWidth
//                 sx={{ marginBottom: 2, bgcolor: 'gray',
//                 '&:hover': {
//                   bgcolor: 'silver',
//                 },
//                 }}
//               >
//                 Upload Category Image
//                 <input
//                   type="file"
//                   name="categoryImage"
//                   accept="image/*"
//                   hidden
//                   onChange={handleImageChange}
//                 />
//               </Button>
//             </Grid>
//             <Grid item xs={12}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 sx={{ marginTop: 2 }}
//                 onClick={handleSubmit}
//               >
//                 Submit
//               </Button>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button autoFocus onClick={handleClose}>
//             Close
//           </Button>
//         </DialogActions>
//       </BootstrapDialog>

//       <div>
//         <AllCategories />
//       </div>
//     </div>
//   );
// };

// export default AddCategory;



import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import toast from 'react-hot-toast';
import AllCategories from './AllCategories';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
    categoryImage: null,
  });
  const [open, setOpen] = useState(false);

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file input changes
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      categoryImage: e.target.files[0],
    });
  };

  // Reset the form
  const resetForm = () => {
    setFormData({
      name: '',
      categoryImage: null,
    });
    // Clear the file input field
    document.querySelector('input[name="categoryImage"]').value = '';
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('categoryImage', formData.categoryImage);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/categories/categories', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        resetForm(); // Clear the form on successful submission
        handleClose(); // Close the dialog on successful submission
      } else {
        toast.error('Submission failed');
      }
    } catch (error) {
      console.error('Error uploading category:', error);
      toast.error('Error uploading category');
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          position: 'absolute',
          top: 0,
          right: '16.7%',
        }}
      >
        Add New Category
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ ml:3 , p: 2 }} id="customized-dialog-title">
          Add New Category
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{marginLeft:'22px'}}>
          <Grid container spacing={3} sx={{ width: '100%' }}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ bgcolor: 'gray',
                '&:hover': {
                  bgcolor: 'silver',
                },
                }}
              >
                Upload Category Image
                <input
                  type="file"
                  name="categoryImage"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 1, marginBottom: 4 }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>

      <div>
        <AllCategories />
      </div>
    </div>
  );
};

export default AddCategory;


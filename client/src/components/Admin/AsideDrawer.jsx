// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
// import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
// import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import PaymentIcon from '@mui/icons-material/Payment';
// import PostAddIcon from '@mui/icons-material/PostAdd';


// const menus = [
//   {
//       label: 'Dashboard',
//       icon: <SpaceDashboardIcon/>,
//       link: '/admin/dashboard'
//   },
//   {
//      label: 'Products',
//      icon: <ProductionQuantityLimitsIcon/>,
//      link: '/admin/products'
//   },
//   {
//       label: 'Customers',
//       icon: <SupervisedUserCircleIcon/>,
//       link: '/admin/customers'
//    },
//   {
//       label: 'Orders',
//       icon: <ShoppingCartIcon/>,
//       link: '/admin/orders'
//   },
//   {
//       label: 'Payments',
//       icon: <PaymentIcon/>,
//       link: '/admin/payments'
//   },
//   {
//       label: 'Form',
//       icon: <PostAddIcon/>,
//       link: '/admin/form'
//   }
// ]


// const AsideDrawer = ({ children }) => {
//   const [open, setOpen] = React.useState(false);

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };

//   const DrawerList = (
//     <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
//       <List>
//         {['Dashboard', 'Product', 'Customers', 'Orders', 'Payments', 'Form'].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {['All mail', 'Trash', 'Spam'].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <div>
//       <div onClick={toggleDrawer(true)} style={{ cursor: 'pointer' }}>
//         {children}
//       </div>
//       <Drawer open={open} onClose={toggleDrawer(false)}>
//         {DrawerList}
//       </Drawer>
//     </div>
//   );
// }

// export default AsideDrawer



import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

// Import the icons
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import PostAddIcon from '@mui/icons-material/PostAdd';

const menus = [
  {
    label: 'Dashboard',
    icon: <SpaceDashboardIcon />,
    link: '/admin/dashboard'
  },
  {
    label: 'Products',
    icon: <ProductionQuantityLimitsIcon />,
    link: '/admin/products'
  },
  {
    label: 'Customers',
    icon: <SupervisedUserCircleIcon />,
    link: '/admin/customers'
  },
  {
    label: 'Orders',
    icon: <ShoppingCartIcon />,
    link: '/admin/orders'
  },
  {
    label: 'Payments',
    icon: <PaymentIcon />,
    link: '/admin/payments'
  },
  {
    label: 'Add Product',
    icon: <PostAddIcon />,
    link: '/admin/add-product'
  }
];

const AsideDrawer = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menus.map((menu, index) => (
          <ListItem key={menu.label} disablePadding>
            <ListItemButton onClick={() => navigate(menu.link)}>
              <ListItemIcon>
                {menu.icon}
              </ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <div onClick={toggleDrawer(true)} style={{ cursor: 'pointer' }}>
        {children}
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default AsideDrawer;

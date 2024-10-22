# MERN Ecommerce Platform
This is a full-featured ecommerce platform built using the MERN stack (MongoDB, Express.js, React, and Node.js) with Redux for state management and Material UI for the design framework. The platform includes a fully functional shopping experience with Stripe for payment processing, user and admin dashboards, and several additional features to enhance the user experience.

## Key Features
- User and Admin Dashboards: Separate user and admin dashboards to manage different sets of functionalities.
- MERN Stack: MongoDB for the database, Express.js for the backend, React.js for the frontend, and Node.js for the server.
- Redux for State Management: Centralized state management using Redux and Redux Toolkit.
- Material UI: A modern, responsive UI built with Material UI components.
- Stripe Integration: Secure payment processing with Stripe.
- Dynamic Charts: Real-time data visualization using Material UI Charts for both users and admins.
- Swiper Integration: Swiper for creating smooth and responsive sliders on the homepage and product pages.
- Animations: Enhanced UI interactions using Animate.css for smooth transitions and effects.
- File Uploads: Cloudinary integration for seamless product image uploads.

## Packages and Technologies Used
### Server (Backend)
- Express.js: Fast and minimalist web framework.
- Mongoose: MongoDB object modeling for Node.js.
- bcrypt & bcryptjs: For password hashing and security.
- JWT (jsonwebtoken): JSON Web Tokens for secure user authentication.
- Multer: For handling multipart form data, especially for file uploads.
- Cloudinary: For storing and managing product images.
- Stripe: For handling payment processing.
- dotenv: To manage environment variables securely.

### Client (Frontend)
- React.js: A powerful JavaScript library for building interactive user interfaces.
- Redux & Redux Toolkit: For managing global state efficiently.
- React Router DOM: For handling dynamic routing between pages.
- Material UI: A sleek, professional UI design with built-in components.
- Stripe.js: For integrating Stripe payment gateway in the frontend.
- Swiper: Responsive and smooth sliders on the UI.
- Animate.css: Adds subtle animation effects to enhance user experience.
- Vite: Fast build tool for frontend development.


## Installation and Setup
1. Clone the repository:
   git clone https://github.com/your-username/mern-ecommerce.git

2. Install server dependencies:
   cd server
   npm install

3. Install client dependencies:
   cd client
   npm install

4. Run the development servers:
   - For the backend:
     npm run dev

   - For the frontend:
     npm run dev

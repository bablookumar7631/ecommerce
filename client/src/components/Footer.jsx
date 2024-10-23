import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showNotification } from "../redux/notificationSlice";

const Footer = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/api/v1/contactUser/contact-us', formData);

      if (res.data.success) {
        dispatch(showNotification(res.data.message));
        setFormData({ fullName: '', email: '', message: '' }); // Reset form after submission
      } else {
        dispatch(showNotification(res.data.message || "An error occurred while sending the message."));
      }
    } catch (error) {
      dispatch(showNotification(error.response?.data?.message || "Failed to send the message. Please try again later."));
    }
  }

  return (
    <div>
      <footer className="bg-blue-100">
        <div className="w-10/12 mx-auto grid md:grid-cols-4 md:gap-16 gap-8 py-8">
          <div className="flex flex-col items-center">
            <Link to={"/"}>
              <img
                src="./images/ecommerce.png"
                alt="website-logo"
                className="w-16 h-16"
              />
            </Link>
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, earum
              commodi praesentium ex amet sed dolorem exercitationem ipsa atque!
              Quam
            </p>
          </div>

          <div>
            <h1 className="font-semibold text-2xl mb-3">Website Links</h1>
            <ul className="flex flex-col">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/product"}>Product</Link>
              </li>

              <li>
                <Link to={"/sign-in"}>SignIn</Link>
              </li>
              <li>
                <Link to={"/sign-up"}>SignUp</Link>
              </li>
            </ul>
          </div>

          <div>
            <h1 className="font-semibold text-2xl mb-3">Follow us</h1>
            <ul>
              <li>
                <Link to="/">Facebook</Link>
              </li>
              <li>
                <Link to="/">Youtube</Link>
              </li>
              <li>
                <Link to="/">Twitter</Link>
              </li>
              <li>
                <Link to="/">Linkedin</Link>
              </li>
              <li>
                <Link to="/">Instagram</Link>
              </li>
            </ul>
          </div>

          <div>
            <h1 className="font-semibold text-2xl mb-3">Contact us</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                required
                name="fullName"
                className="bg-white w-full rounded p-2"
                placeholder="Your name"
                value={formData.fullName}
                onChange={handleChange}
              />

              <input
                required
                type="email"
                name="email"
                className="bg-white w-full rounded p-2"
                placeholder="Enter email id"
                value={formData.email}
                onChange={handleChange}
              />

              <textarea
                required
                name="message"
                className="bg-white w-full rounded p-2"
                placeholder="Message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
              />

              <button type='submit' className="bg-blue-950 text-white py-2 px-6 rounded">
                Submit
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;


import React, { useState } from 'react';
import { useAuth } from '../../context/Auth';
import { useNavigate } from 'react-router-dom';
import { updateUserDetails } from '../../actions/userAction';

export const EditProfileForm = () => {

   const { user, updateUser } = useAuth();
   const [error, setError] = useState("");
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      username: user.username,
      fullname: user.fullname,
      email: user.email
   });

   const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormData({
         ...formData,
         [id]: value,
      });
   };
   
   const handleFormSubmit = async (e) => {
      try {
         setError("");
         const res = await updateUserDetails(formData);
         updateUser({...user, ...res});
         alert("scuccessfully updated user details");
      } catch (error) {
         setError(error?.message || "Error while updating user details");
      }
   }

   const onSubmit = (e) => {
      e.preventDefault();
      handleFormSubmit(formData);
   };

   const handleOutOfBoxClick = (e) => {
      if(e.currentTarget === e.target) {
         navigate(-1);
      }
   }
   
   return (
      <section id="editProfileForm" onClick={handleOutOfBoxClick}>
         <h3>Edit Profile Details...</h3>
         <form onSubmit={onSubmit}>
            <div className="inputBox">
               <label htmlFor="fullname">Full Name:</label>
               <input
                  type="text"
                  id="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
               />
            </div>
            <div className="inputBox">
               <label htmlFor="username">Username:</label>
               <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
               />
            </div>
            <div className="inputBox">
               <label htmlFor="email">Email:</label>
               <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
               />
            </div>

            <p className="errorBox">{error}</p>

            <div className="buttonBox">
               <button 
                  type="button" className="cancelBtn"
                  onClick={() => navigate(-1)}
               > Cancel </button>
               <button 
                  type="submit" className="saveBtn"
               > Save </button>
            </div>
         </form>
      </section>
   );
};

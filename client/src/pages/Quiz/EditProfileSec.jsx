import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const EditProfileForm = () => {
   const { user, updateUser, clearError } = useAuth();
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      username: user.username,
      fullname: user.fullname,
      email: user.email
   });
   const [avatarFile, setAvatarFile] = useState(null);
   const [avatarPreview, setAvatarPreview] = useState(user.avatar);
   const [isChanged, setIsChanged] = useState(false);

   useEffect(() => {
      // Check if form data is different from user data
      const hasChanged = Object.keys(formData).some(key => formData[key] != user[key]);
      setIsChanged(hasChanged);
      if(avatarFile) setIsChanged(1);
   }, [formData, user, avatarFile]);

   const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormData({
         ...formData,
         [id]: value,
      });
   };

   const handleAvatarChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         setAvatarFile(file);
         setAvatarPreview(URL.createObjectURL(file));
      }
   };

   const handleFormSubmit = async (e) => {
      const res = await updateUser({...formData, avatarFile});
      if(!(res.statusCode==200)) {
         toast.error(res.message);
         clearError();
      } else {
         toast.success(res.message);
      }
   };

   const onSubmit = (e) => {
      e.preventDefault();
      handleFormSubmit();
   };

   return (
      <section className="editProfileForm">
         <h3>Edit Profile Details...</h3>
         <form onSubmit={onSubmit}>
            <div className="inputBox">
               <label htmlFor="avatarFile">
                  <img src={avatarPreview} />
                  <span className="credTag">Image By Freepik</span>
                  <i className="fas fa-arrow-up-from-bracket"></i>
               </label>
               <input 
                  type="file" id="avatarFile" accept="image/png, image/gif, image/jpeg, image/jpg" 
                  onChange={handleAvatarChange}
               />
            </div>
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

            {/* <p className="errorBox">{error}</p> */}

            <div className="buttonBox">
               <button
                  type="button"
                  className="cancelBtn"
                  onClick={() => navigate(-1, { replace: true })}
               >
                  Cancel
               </button>
               <button
                  type="submit"
                  className="saveBtn"
                  disabled={!isChanged} 
               >
                  Save
               </button>
            </div>
         </form>
      </section>
   );
};

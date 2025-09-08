// src/components/Profile.js
import React, { useState, useEffect } from "react";
import { FaUserCircle, FaEnvelope, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
 const { user, Loading ,logOut} = useAuth()
 const [userName, setUserName] = useState("Loading...");
 const [userEmail, setUserEmail] = useState("Loading...");
 const navigate = useNavigate()

 console.log(user);

 useEffect(() => {
  if (!Loading && user) {
   setUserName(user.displayName || "N/A");
   setUserEmail(user.email || "N/A");
  } else if (!Loading && !user) {
   // Fallback for a logged-out state, although this page should be protected
   setUserName("Guest User");
   setUserEmail("Not logged in");
  }
 }, [user, Loading]);

 const handleLogOut = ()=>{
    logOut().then(()=>{
        navigate('/')
    }).catch()
 }

//  const handleUpdateProfile = () => {
//   // This function would handle the logic for updating the user's profile
//   // For example, showing a modal with a form to change name, etc.
//   Swal.fire({
//    title: "Update Profile",
//    html: `
//     <input id="swal-input1" class="swal2-input" placeholder="New Username" value="${userName}">
//    `,
//    showCancelButton: true,
//    confirmButtonText: "Update",
//    preConfirm: () => {
//     const newName = document.getElementById("swal-input1").value;
//     if (!newName) {
//      Swal.showValidationMessage("Please enter a new name.");
//      return false;
//     }
//     // Here you would call your API to update the profile
//     // For now, we'll just update the state
//     setUserName(newName);
//     Swal.fire("Success!", "Your profile has been updated.", "success");
//    },
//   });
//  };

 return (
  <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-[90vh] p-3 sm:p-6 flex items-center justify-center">
   <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-lg text-center">
    <div className="flex justify-center mb-6">
     <FaUserCircle className="text-blue-600 text-8xl" />
    </div>
    <h2 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h2>
    <p className="text-gray-500 mb-6">Manage your account information</p>

    <div className="space-y-4 text-left">
     {/* User Name Section */}
     <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-3">
       <FaUserCircle className="text-gray-400 text-xl" />
       <div>
        <p className="text-sm text-gray-500">Username</p>
        <p className="font-medium text-gray-800">{userName}</p>
       </div>
      </div>
      <button 
    //   onClick={handleUpdateProfile} 
      className="text-blue-500 hover:text-blue-700 transition">
       <FaEdit />
      </button>
     </div>

     {/* User Email Section */}
     <div className="bg-gray-100 p-4 rounded-lg flex items-center shadow-sm">
      <FaEnvelope className="text-gray-400 text-xl mr-3" />
      <div>
       <p className="text-sm text-gray-500">Email</p>
       <p className="font-medium text-gray-800">{userEmail}</p>
      </div>
     </div>

     {/* Additional Actions Section */}
     <div className="pt-4 space-y-3">
      {/* <button
       className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
       onClick={() => Swal.fire("Change Password", "This feature is coming soon!", "info")}
      >
       Change Password
      </button> */}
      <button
       className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
       onClick={() => handleLogOut()}
      >
       Logout
      </button>
     </div>
    </div>
   </div>
  </div>
 );
};

export default Profile;
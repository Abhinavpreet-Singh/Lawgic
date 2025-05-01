import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { uploadProfileImage, updateUserDisplayName, updateUserProfilePhoto } from '../../firebase/profileService';
import { FaUser, FaCamera, FaPencilAlt, FaCheck, FaTimes, FaGavel } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { currentUser, userProfile } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || '');
    }
  }, [currentUser]);

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleNameSave = async () => {
    if (!displayName.trim()) {
      setError('Name cannot be empty');
      return;
    }

    try {
      setError('');
      await updateUserDisplayName(currentUser, displayName);
      setIsEditingName(false);
      setSuccessMessage('Name updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating name:', error);
      setError('Failed to update name. Please try again.');
    }
  };

  const handleNameCancel = () => {
    setDisplayName(currentUser.displayName || '');
    setIsEditingName(false);
    setError('');
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, GIF, WEBP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      setError('');
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      const photoURL = await uploadProfileImage(currentUser.uid, file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Update the auth profile with the new photo URL
      await updateUserProfilePhoto(currentUser, photoURL);
      
      setSuccessMessage('Profile picture updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#f3eee5] pt-24 sm:pt-28 px-6 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow p-8 max-w-md w-full text-center">
          <p className="text-xl text-[#251c1a]">Please log in to view your profile</p>
          <Link 
            to="/login" 
            className="mt-4 inline-block bg-[#251c1a] text-white px-6 py-2 rounded-lg"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3eee5] pt-24 sm:pt-28 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#251c1a] to-[#3a2e2b] relative h-48 sm:h-64 flex items-center justify-center">
            <div className="absolute top-6 left-6">
              <Link to="/dashboard" className="text-[#f3eee5] hover:underline flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </Link>
            </div>
            
            <div className="w-20 h-20 bg-[#251c1a]/50 rounded-full flex items-center justify-center">
              <FaGavel className="text-[#f3eee5] text-3xl" />
            </div>
          </div>
          
          <div className="relative px-6 sm:px-8 pb-8">
            {/* Profile Picture */}
            <div className="relative mx-auto -mt-16 w-32 h-32 rounded-full border-4 border-white shadow-md bg-[#f3eee5]">
              <div className="w-full h-full rounded-full overflow-hidden">
                {currentUser.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#251c1a]/10">
                    <FaUser className="text-4xl text-[#251c1a]/40" />
                  </div>
                )}
              </div>
              
              <button 
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 w-10 h-10 bg-[#251c1a] rounded-full text-white flex items-center justify-center shadow-lg"
                disabled={isUploading}
              >
                <FaCamera />
              </button>
              
              <input 
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/jpeg, image/png, image/gif, image/webp"
                disabled={isUploading}
              />
              
              {isUploading && (
                <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center bg-black/30">
                  <div className="w-full h-1 bg-[#251c1a]/20 absolute bottom-0">
                    <div 
                      className="h-full bg-[#251c1a]" 
                      style={{ width: `${uploadProgress}%`, transition: 'width 0.3s ease-out' }}
                    ></div>
                  </div>
                  <span className="text-white font-medium">{uploadProgress}%</span>
                </div>
              )}
            </div>
            
            {/* User Information */}
            <div className="mt-6 text-center">
              <div className="flex justify-center items-center">
                {isEditingName ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="border border-[#251c1a]/20 rounded px-3 py-2 text-xl font-semibold text-[#251c1a] text-center focus:outline-none focus:ring-2 focus:ring-[#251c1a]/40"
                      placeholder="Your name"
                    />
                    <button
                      onClick={handleNameSave}
                      className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={handleNameCancel}
                      className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-[#251c1a]">
                      {currentUser.displayName || 'No name set'}
                    </h1>
                    <button
                      onClick={handleNameEdit}
                      className="ml-2 text-[#251c1a]/50 hover:text-[#251c1a] transition-colors"
                    >
                      <FaPencilAlt />
                    </button>
                  </div>
                )}
              </div>
              
              <p className="mt-1 text-[#251c1a]/70">{currentUser.email}</p>
              
              {error && (
                <div className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              {successMessage && (
                <div className="mt-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">
                  {successMessage}
                </div>
              )}
            </div>
            
            {/* Account Info */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-[#251c1a]">Account Information</h2>
              <div className="bg-[#251c1a]/5 rounded-lg p-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-[#251c1a]/70">Member since</span>
                  <span className="font-medium text-[#251c1a]">
                    {userProfile?.createdAt 
                      ? new Date(userProfile.createdAt).toLocaleDateString() 
                      : new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#251c1a]/70">Account type</span>
                  <span className="font-medium text-[#251c1a]">
                    {userProfile?.accountType === 'google' 
                      ? 'Google' 
                      : userProfile?.accountType === 'github'
                      ? 'GitHub'
                      : 'Email'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Legal Interest Areas - Can be expanded in future */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-[#251c1a]">Legal Interest Areas</h2>
              <div className="bg-[#251c1a]/5 rounded-lg p-4 flex flex-wrap gap-2">
                {userProfile?.interests && userProfile.interests.length > 0 ? (
                  userProfile.interests.map((interest, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-[#251c1a]/10 text-[#251c1a] rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))
                ) : (
                  <p className="text-[#251c1a]/50 text-sm">
                    No interests specified yet. You can update your legal interests from your dashboard.
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
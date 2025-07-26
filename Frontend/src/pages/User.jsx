import React, { useState } from 'react'
import { FaUser, FaBook, FaChartLine, FaCertificate, FaCog, FaSignOutAlt, FaRegEdit } from 'react-icons/fa';
import { MdDashboard, MdAssignment, MdQuiz, MdVideoLibrary } from 'react-icons/md';

function User() {
   const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    class: '12th',
    stream: 'Science',
    school: 'Delhi Public School',
    joinDate: 'January 2023',
    coursesEnrolled: 6,
    completedCourses: 3,
    progress: 65
  });

  const courses = [
    { id: 1, title: 'Physics Class 12', progress: 80, lastAccessed: '2 days ago' },
    { id: 2, title: 'Chemistry Class 12', progress: 65, lastAccessed: '1 week ago' },
    { id: 3, title: 'Mathematics Class 12', progress: 45, lastAccessed: '3 days ago' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };
  return (
    <>
     <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">EduLearn+</h1>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-indigo-700 px-4 py-2 rounded-md">
              <FaBook className="text-lg" />
              <span>My Courses</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
              <FaUser className="text-xl" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">
                  <FaUser className="text-4xl text-indigo-600" />
                </div>
                <button 
                  className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <FaRegEdit className="text-sm" />
                </button>
              </div>
              <h2 className="text-xl font-bold">{userData.name}</h2>
              <p className="text-gray-600">{userData.class} {userData.stream}</p>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-md ${activeTab === 'dashboard' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <MdDashboard className="text-xl" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => setActiveTab('myCourses')}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-md ${activeTab === 'myCourses' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FaBook className="text-lg" />
                <span>My Courses</span>
              </button>
              <button
                onClick={() => setActiveTab('assignments')}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-md ${activeTab === 'assignments' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <MdAssignment className="text-xl" />
                <span>Assignments</span>
              </button>
              <button
                onClick={() => setActiveTab('quizzes')}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-md ${activeTab === 'quizzes' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <MdQuiz className="text-xl" />
                <span>Quizzes</span>
              </button>
              <button
                onClick={() => setActiveTab('certificates')}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-md ${activeTab === 'certificates' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FaCertificate className="text-lg" />
                <span>Certificates</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-md ${activeTab === 'settings' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FaCog className="text-lg" />
                <span>Settings</span>
              </button>
              <button className="flex items-center space-x-3 w-full px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100">
                <FaSignOutAlt className="text-lg" />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Dashboard</h2>
                  <span className="text-gray-500">Joined {userData.joinDate}</span>
                </div>

                {/* User Info */}
                {isEditing ? (
                  <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={userData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Class</label>
                        <select
                          name="class"
                          value={userData.class}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="11th">11th</option>
                          <option value="12th">12th</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Stream</label>
                        <select
                          name="stream"
                          value={userData.stream}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="Science">Science</option>
                          <option value="Commerce">Commerce</option>
                          <option value="Arts">Arts</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600">Name</p>
                        <p className="font-medium">{userData.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Email</p>
                        <p className="font-medium">{userData.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Class</p>
                        <p className="font-medium">{userData.class}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Stream</p>
                        <p className="font-medium">{userData.stream}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">School</p>
                        <p className="font-medium">{userData.school}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600">Courses Enrolled</p>
                        <p className="text-3xl font-bold text-indigo-600">{userData.coursesEnrolled}</p>
                      </div>
                      <div className="bg-indigo-100 p-3 rounded-full">
                        <FaBook className="text-indigo-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600">Completed Courses</p>
                        <p className="text-3xl font-bold text-green-600">{userData.completedCourses}</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-full">
                        <FaCertificate className="text-green-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600">Overall Progress</p>
                        <p className="text-3xl font-bold text-blue-600">{userData.progress}%</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-full">
                        <FaChartLine className="text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Courses */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Active Courses</h3>
                  <div className="space-y-4">
                    {courses.map(course => (
                      <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{course.title}</h4>
                          <span className="text-sm text-gray-500">Last accessed: {course.lastAccessed}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-indigo-600 h-2.5 rounded-full" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-600">{course.progress}% complete</span>
                          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                            Continue Learning
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'myCourses' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">My Courses</h2>
                {/* Course list would go here */}
              </div>
            )}

            {/* Other tabs would be implemented similarly */}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default User
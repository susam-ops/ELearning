import React, { useEffect, useState } from 'react'
import { 
  FaChalkboardTeacher, 
  FaBook, 
  FaUsers, 
  FaChartBar, 
  FaCalendarAlt,
  FaCommentAlt,
  FaFileUpload,
  FaBell
} from 'react-icons/fa';
import { MdAssignment, MdQuiz, MdVideoLibrary } from 'react-icons/md';

const Teacher = ()=> {
   const [activeTab, setActiveTab] = useState('dashboard');
  const [teacherData, setTeacherData] = useState({
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@example.com',
    subjects: ['Physics', 'Chemistry'],
    institution: 'Delhi Public School',
    joinDate: '15 March 2022',
    totalStudents: 142,
    activeCourses: 5,
    announcements: []
  });

  const [courses, setCourses] = useState([
    { id: 1, title: 'Physics Class 12', students: 45, completion: 78, lastActivity: '2 days ago' },
    { id: 2, title: 'Chemistry Class 12', students: 38, completion: 65, lastActivity: '1 week ago' },
    { id: 3, title: 'Physics Class 11', students: 32, completion: 52, lastActivity: '3 days ago' }
  ]);

  const [upcomingClasses, setUpcomingClasses] = useState([
    { id: 1, course: 'Physics Class 12', date: 'Today, 10:00 AM', topic: 'Electromagnetic Waves' },
    { id: 2, course: 'Chemistry Class 12', date: 'Tomorrow, 11:30 AM', topic: 'Chemical Kinetics' }
  ]);

  const [recentSubmissions, setRecentSubmissions] = useState([
    { id: 1, student: 'Rahul Verma', assignment: 'Wave Optics Problems', status: 'Pending Review', submitted: '2 hours ago' },
    { id: 2, student: 'Anjali Patel', assignment: 'Organic Chemistry Worksheet', status: 'Graded (85/100)', submitted: '1 day ago' }
  ]);

  // Simulate fetching data
  useEffect(() => {
    // In a real app, you would fetch this from your API
    const fetchData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      // Set data (in real app, this would come from backend)
    };
    fetchData();
  }, []);
  return (
    <>
     <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-700 text-white py-4 px-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <FaChalkboardTeacher className="text-2xl" />
            <h1 className="text-xl font-bold">EduLearn Teacher Portal</h1>
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative">
              <FaBell className="text-xl" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                <FaChalkboardTeacher className="text-sm" />
              </div>
              <span className="font-medium">{teacherData.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col items-center mb-6 p-4 border-b">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
                <FaChalkboardTeacher className="text-2xl text-indigo-600" />
              </div>
              <h2 className="font-bold text-center">{teacherData.name}</h2>
              <p className="text-sm text-gray-600 text-center">{teacherData.institution}</p>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg ${activeTab === 'dashboard' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FaChartBar className="text-lg" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => setActiveTab('myCourses')}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg ${activeTab === 'myCourses' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FaBook className="text-lg" />
                <span>My Courses</span>
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg ${activeTab === 'students' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FaUsers className="text-lg" />
                <span>Students</span>
              </button>
              <button
                onClick={() => setActiveTab('assignments')}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg ${activeTab === 'assignments' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <MdAssignment className="text-xl" />
                <span>Assignments</span>
              </button>
              <button
                onClick={() => setActiveTab('quizzes')}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg ${activeTab === 'quizzes' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <MdQuiz className="text-xl" />
                <span>Quizzes</span>
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg ${activeTab === 'content' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <MdVideoLibrary className="text-xl" />
                <span>Content Library</span>
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg ${activeTab === 'calendar' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FaCalendarAlt className="text-lg" />
                <span>Schedule</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Welcome Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-2">Welcome back, {teacherData.name}!</h2>
                  <p className="text-gray-600">Here's what's happening with your classes today.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-600">Active Courses</p>
                        <p className="text-3xl font-bold text-indigo-600">{teacherData.activeCourses}</p>
                      </div>
                      <div className="bg-indigo-100 p-3 rounded-full">
                        <FaBook className="text-indigo-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-600">Total Students</p>
                        <p className="text-3xl font-bold text-green-600">{teacherData.totalStudents}</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-full">
                        <FaUsers className="text-green-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-600">Teaching Since</p>
                        <p className="text-3xl font-bold text-blue-600">{teacherData.joinDate}</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-full">
                        <FaCalendarAlt className="text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Classes */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Upcoming Classes</h3>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {upcomingClasses.map(cls => (
                      <div key={cls.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{cls.course}</h4>
                            <p className="text-gray-600">{cls.topic}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{cls.date}</p>
                            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                              Prepare
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Submissions */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Recent Submissions</h3>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      View All
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentSubmissions.map(sub => (
                          <tr key={sub.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium">{sub.student}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>{sub.assignment}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${sub.status.includes('Graded') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {sub.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {sub.submitted}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-indigo-600 hover:text-indigo-900">Review</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'myCourses' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">My Courses</h2>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center space-x-2">
                    <FaBook className="text-sm" />
                    <span>Create New Course</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map(course => (
                    <div key={course.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="bg-indigo-600 text-white p-4">
                        <h3 className="font-bold text-lg">{course.title}</h3>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between mb-3">
                          <span className="text-gray-600">Students</span>
                          <span className="font-medium">{course.students}</span>
                        </div>
                        <div className="flex justify-between mb-4">
                          <span className="text-gray-600">Completion</span>
                          <span className="font-medium">{course.completion}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full" 
                            style={{ width: `${course.completion}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-gray-50 flex justify-between">
                        <span className="text-sm text-gray-600">Last activity: {course.lastActivity}</span>
                        <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                          Manage
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
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

export default Teacher
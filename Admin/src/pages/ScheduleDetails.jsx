import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteScheduleApi, getScheduleApi } from "../api/schedule.api";
import { FaCalendarAlt, FaEdit, FaTrash, FaClock, FaChalkboardTeacher } from "react-icons/fa";

function ScheduleDetails() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffects in ScheduleDetails");
    const fetchSchedulesDetails = async () => {
      try {
        console.log("check useEffec");
        const res = await getScheduleApi();
        console.log("res is: ", res?.user);
        setSchedules(res?.user || []);
      } catch (error) {
        console.error("Error fetching schedule details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedulesDetails();
  }, []);

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      try {
        await deleteScheduleApi(_id);
        setSchedules(schedules.filter((schedule) => schedule._id !== _id));
      } catch (error) {
        console.error("Error deleting schedule:", error);
        alert("Failed to delete schedule.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900 flex items-center">
              <FaCalendarAlt className="mr-3" />
              Schedule Management
            </h1>
            <p className="text-indigo-600 mt-2">
              Manage all class schedules in the system
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
              <p className="text-indigo-800 font-medium">Loading schedules...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-indigo-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Teacher
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Faculty
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Start Time
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      End Time
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {schedules.length > 0 ? (
                    schedules.map((schedule) => (
                      <tr key={schedule._id} className="hover:bg-indigo-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                                {schedule.teacherId?.userId?.fullName?.charAt(0) || "T"}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {schedule.teacherId?.userId?.fullName || "N/A"}
                              </div>
                              <div className="text-xs text-gray-500">
                                ID: {schedule.teacherId?._id?.substring(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            schedule.level === "Undergraduate" 
                              ? "bg-blue-100 text-blue-800" 
                              : schedule.level === "Graduate" 
                              ? "bg-purple-100 text-purple-800" 
                              : "bg-indigo-100 text-indigo-800"
                          }`}>
                            {schedule.level}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {schedule.faculty || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {schedule.subject || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium flex items-center">
                            <FaClock className="h-4 w-4 text-indigo-500 mr-1" />
                            {schedule.startTime}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium flex items-center">
                            <FaClock className="h-4 w-4 text-indigo-500 mr-1" />
                            {schedule.endTime}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <Link
                              to={`/admin/editschedule/${schedule._id}`}
                              className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 p-2 rounded-lg transition-colors"
                            >
                              <FaEdit />
                            </Link>
                            <button
                              onClick={() => handleDelete(schedule._id)}
                              className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-indigo-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-700">No schedules found</h3>
                        <p className="text-gray-500 mt-1">There are no schedules in the system yet.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScheduleDetails;
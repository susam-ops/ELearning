import React, { useState, useEffect } from "react";
import {
  getCourseApi,
  deleteCourseApi,
  updateCourseApi,
} from "../api/course.api";
import { FaBook, FaClock, FaListOl, FaTrash } from "react-icons/fa";

function Coursedetails() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editFormData, setEditFormData] = useState({
    teacherName: "",
    level: "",
    faculty: "",
    subject: "",
    duration: "",
    chapters: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCoursesDetails = async () => {
      try {
        const res = await getCourseApi();
        setCourses(res?.user || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesDetails();
  }, []);

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourseApi(_id);
        setCourses(courses.filter((course) => course._id !== _id));
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Failed to delete course.");
      }
    }
  };

  const handleEditClick = (course) => {
    setEditingCourse(course._id);
    setEditFormData({
      teacherName: course.teacherId?.userId?.fullName || "",
      level: course.level || "",
      faculty: course.faculty || "",
      subject: course.subject || "",
      duration: course.duration || "",
      chapters: course.chapters || "",
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const courseBefore = courses.find((c) => c._id === editingCourse);

      // Build only changed data
      const changedData = {};
      if (editFormData.level !== courseBefore.level)
        changedData.level = editFormData.level;
      if (editFormData.faculty !== courseBefore.faculty)
        changedData.faculty = editFormData.faculty;
      if (editFormData.subject !== courseBefore.subject)
        changedData.subject = editFormData.subject;
      if (editFormData.duration !== courseBefore.duration)
        changedData.duration = editFormData.duration;
      if (editFormData.chapters !== courseBefore.chapters)
        changedData.chapters = editFormData.chapters;

      const updatedCourse = await updateCourseApi(editingCourse, changedData);

      setCourses(
        courses.map((course) =>
          course._id === editingCourse
            ? { ...course, ...updatedCourse }
            : course
        )
      );

      setEditingCourse(null);
      alert("Course updated successfully!");
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingCourse(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900 flex items-center">
              <FaBook className="mr-3" />
              Course Management
            </h1>
            <p className="text-indigo-600 mt-2">
              Manage all courses in the system
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
              <p className="text-indigo-800 font-medium">Loading courses...</p>
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
                      Duration
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Chapters
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <tr
                        key={course._id}
                        className="hover:bg-indigo-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {course.teacherId?.userId?.fullName || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {course.level || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {course.faculty || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {course.subject || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaClock className="mr-1 text-indigo-500" />
                            {course.duration || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaListOl className="mr-1 text-indigo-500" />
                            {course.chapters || "0"}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleEditClick(course)}
                              className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 p-2 rounded-lg transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(course._id)}
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
                      <td
                        colSpan="7"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No courses found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Edit Course Modal */}
        {editingCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6">
                  Edit Course
                </h2>
                <form onSubmit={handleEditFormSubmit}>
                  <input
                    type="text"
                    name="level"
                    placeholder="Level"
                    value={editFormData.level}
                    onChange={handleEditFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                  />
                  <input
                    type="text"
                    name="faculty"
                    placeholder="Faculty"
                    value={editFormData.faculty}
                    onChange={handleEditFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={editFormData.subject}
                    onChange={handleEditFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                  />
                  <input
                    type="text"
                    name="duration"
                    placeholder="Duration"
                    value={editFormData.duration}
                    onChange={handleEditFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                  />
                  <input
                    type="number"
                    name="chapters"
                    placeholder="Chapters"
                    value={editFormData.chapters}
                    onChange={handleEditFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-6"
                  />
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Updating..." : "Update Course"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Coursedetails;

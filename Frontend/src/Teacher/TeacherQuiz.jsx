import React, { useEffect, useState } from "react";
import { FaBook, FaQuestionCircle, FaClock, FaPlay } from "react-icons/fa";
import { getQuizApi } from "../api/quiz.api";
import { useNavigate } from "react-router-dom";

const TeacherQuiz = ({ teacherId }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getQuizApi(teacherId);
        if (data.user) {
          setQuizzes(data.user);
        }
      } catch (error) {
        console.error("Error loading quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) fetchQuizzes();
  }, [teacherId]);

  if (loading) return <p className="text-center text-gray-600">Loading quizzes...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Quizzes</h2>

      {quizzes.length === 0 ? (
        <p className="text-gray-500">No quizzes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="border rounded-lg shadow p-4 bg-white hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FaBook /> {quiz.title}
              </h3>
              <p className="text-sm text-gray-600">Subject: {quiz.subject}</p>
              <p className="text-sm text-gray-600">Level: {quiz.level}</p>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <FaQuestionCircle /> {quiz.questions?.length || 0} Questions
              </p>
              <p className="text-xs text-gray-400 flex items-center gap-2 mt-2">
                <FaClock /> Created: {new Date(quiz.createdAt).toLocaleDateString()}
              </p>

              <button
                className="mt-3 w-full bg-blue-500 text-white py-2 px-4 rounded flex items-center justify-center gap-2 hover:bg-blue-600 transition"
                onClick={() => navigate(`/teacher/playquiz/${quiz._id}`)}
              >
                <FaPlay /> Play Quiz
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherQuiz;

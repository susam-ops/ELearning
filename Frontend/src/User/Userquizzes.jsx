import React, { useEffect, useState } from "react";
import { FaBook, FaQuestionCircle, FaClock, FaPlay, FaSearch, FaFilter } from "react-icons/fa";
import { getQuizForStudentApi } from "../api/quiz.api";
import { useNavigate } from "react-router-dom";

const UserQuizzes = ({ level, faculty }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const navigate = useNavigate();

  // Fetch quizzes from API
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getQuizForStudentApi(level, faculty);
        const quizList = response?.user || [];
        setQuizzes(quizList);
        setFilteredQuizzes(quizList);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError("Failed to load quizzes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (faculty && level) {
      fetchQuizzes();
    }
  }, [faculty, level]);

  // Filter and sort quizzes
  useEffect(() => {
    let result = quizzes;

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (quiz) =>
          quiz.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quiz.subject?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "title":
          return (a.title || "").localeCompare(b.title || "");
        case "mostQuestions":
          return (b.questions?.length || 0) - (a.questions?.length || 0);
        case "leastQuestions":
          return (a.questions?.length || 0) - (b.questions?.length || 0);
        default:
          return 0;
      }
    });

    setFilteredQuizzes(result);
  }, [quizzes, searchTerm, sortBy]);

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quizzes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Quizzes</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header & Search/Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Available Quizzes</h1>
          <p className="text-gray-600 mb-6">
            For {faculty} students at level {level}
          </p>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search quizzes by title or subject..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title (A-Z)</option>
                <option value="mostQuestions">Most Questions</option>
                <option value="leastQuestions">Least Questions</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-600 mb-4">
            Showing {filteredQuizzes.length} of {quizzes.length} quizzes
          </p>
        </div>

        {/* Quiz Grid */}
        {filteredQuizzes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {searchTerm ? "No quizzes match your search" : "No quizzes available"}
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Try adjusting your search terms or filters."
                : "Check back later for new quizzes in your faculty and level."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{quiz.title}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {quiz.subject || "N/A"}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaBook className="mr-2" />
                      <span>Level: {quiz.level || "N/A"}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <FaQuestionCircle className="mr-2" />
                      <span>{quiz.questions?.length || 0} Questions</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <FaClock className="mr-2" />
                      <span>Created: {formatDate(quiz.createdAt)}</span>
                    </div>
                  </div>

                  <button
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    onClick={() => navigate(`/user/studentplayquiz/${quiz._id}`)}
                  >
                    <FaPlay className="text-sm" />
                    Start Quiz
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserQuizzes;

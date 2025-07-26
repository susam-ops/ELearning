import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Button";

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login first");
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:8000/api/all-users/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else if (response.status === 401) {
          toast.error("Session expired, please login again");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">
        All Users
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="w-full min-w-[600px] md:min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-3 md:px-4 text-left">ID</th>
              <th className="py-3 px-3 md:px-4 text-left">Username</th>
              <th className="py-3 px-3 md:px-4 text-left">Email</th>
              <th className="py-3 px-3 md:px-4 text-left">Joined Date</th>
              <th className="py-3 px-3 md:px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-3 md:px-4">{user.id}</td>
                <td className="py-3 px-3 md:px-4">{user.username}</td>
                <td className="py-3 px-3 md:px-4 truncate max-w-[120px] md:max-w-none">
                  {user.email}
                </td>
                <td className="py-3 px-3 md:px-4">
                  {new Date(user.date_joined).toLocaleDateString()}
                </td>
                <td className="py-3 px-3 md:px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 md:mt-6">
        <Button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
        >
          Back
        </Button>
      </div>
    </div>
  );
}

export default UserDetails;
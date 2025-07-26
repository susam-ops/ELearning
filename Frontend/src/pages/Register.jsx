import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../components/custom/Card";

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/register/",
      {
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword, // Keep camelCase here
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      toast.success("Registration successful!");
      reset();
      navigate("/login");
    }
  } catch (error) {
    console.error("Registration error:", error);
    
    if (error.response) {
      // Handle field errors
      if (error.response.data) {
        for (const [field, messages] of Object.entries(error.response.data)) {
          if (Array.isArray(messages)) {
            toast.error(`${field}: ${messages[0]}`);
          } else {
            toast.error(messages);
          }
        }
      }
    } else {
      toast.error("Network error. Please try again.");
    }
  }
};

  return (
    <div
      className="flex w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('../src/image/Front.png')" }}
    >
      <div className="w-full flex justify-center items-center bg-opacity-50">
        <Card>
          <div className="text-center text-3xl font-bold mb-2 text-gray-800">
            Join for learning
          </div>
          <div className="text-center text-lg mb-6 text-gray-600">
            Ready to take next step toward your bright future. Create your
            account now...
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Username"
              name="username"
              type="text"
              register={register}
              validation={{ 
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters"
                }
              }}
              error={errors.username}
              className="mb-4"
            />

            <Input
              label="Email"
              name="email"
              type="email"
              register={register}
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              error={errors.email}
              className="mb-4"
            />

            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              validation={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                  message: "Password must contain at least one letter and one number",
                },
              }}
              error={errors.password}
              className="mb-4"
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              register={register}
              validation={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              }}
              error={errors.confirmPassword}
              className="mb-6"
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </form>

          <div className="text-center mt-4 text-gray-900">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-500"
            >
              Log in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Register;
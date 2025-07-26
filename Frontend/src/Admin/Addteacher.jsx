import React from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";

function Addteacher() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

 const onSubmit = (data) => {
    console.log(data);
    reset(); // This will clear the form after submission
  };

  console.log(watch("example"));
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto  bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-3xl font-bold text-center text-gray-800 mb-8">
            Enter Teacher Details
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Fullname"
              name="fullname"
              type="text"
              register={register}
              validation={{ required: "Fullname is required" }}
              error={errors.fullname}
              className="mb-4"
            />
            <Input
              label="Email"
              name="email"
              type="email"
              register={register}
              validation={{
                required: "Email is required",
              }}
              error={errors.email}
              className="mb-4"
            />
            <Input
              label="Subject"
              name="subject"
              type="subject"
              register={register}
              validation={{
                required: "Subject is required",
              }}
              error={errors.subject}
              className="mb-4"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              validation={{
                required: "Password is required",
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
            
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Add Teacher
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addteacher;
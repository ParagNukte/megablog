import { useState } from "react";
import authService from "../appwrite/auth.js";
import { login } from "../store/authSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { Button, Logo, Input } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function SignupForm() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const createAcc = async (data) => {
    setError("");
    
    try {
      const userData = await authService.createAccount(data);
      console.log(userData)
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="mx-auto w-full p-10 border border-black/10 max-w-lg bg-gray-100 rounded-xl">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight ">
          Sign into your account
        </h2>
        <p className="mt-2 text-center  text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign in
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center"> {error}</p>}

        <form onSubmit={handleSubmit(createAcc)}>
          <div className="space-y-5">
            <Input
              label="Full Name : "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />

            <Input
              label="Email"
              palceholder="Enter email"
              type="email"
              {...register(
                "email", //IT IS A KEY
                {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                      "Enter the valid email address",
                  },
                }
              )} // you have to compusorily spread the register or else whereevr the register is used it will always overwrite the values everywhre  and keep the argument unique so that the data retrived is done using that argurment
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter Password"
              {...register("password", {
                required: true,
              })}
            />

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;

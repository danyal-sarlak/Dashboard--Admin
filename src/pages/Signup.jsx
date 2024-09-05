import React, { useState } from "react";
import { IoMdKey } from "react-icons/io";
import { BiUserPlus } from "react-icons/bi";
import { Link } from "react-router-dom";

import { useFormik } from "formik";

import supabase from "../supabase";
import SignupModal from "../Components/SignupModal";

export default function Signup() {
  const [showModal, setShowModal] = useState(false);

  const handleSignUp = async (values) => {
    const newUser = {
      username: values.username,
      password: values.password,
       // افزودن address به داده‌های ارسالی
    };

    const { data, error } = await supabase.from("cmsUsers").insert([newUser]);

    if (error) {
      console.error("Error:", error.message);
      setShowModal(false);
    } else {
      console.log("User added:", data);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      address: "", // افزودن address به مقادیر اولیه
    },

    validate: (values) => {
      let errors = {};

      if (values.email === "") {
        errors.email = " ایمیل الزامی است";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "فرمت ایمیل صحیح نمی باشد";
      }

      if (values.username === "") {
        errors.username = "  نام کاربری الزامی است  ";
      }

      if (values.password === "") {
        errors.password = "  پسورد الزامی است";
      }

      if (values.address === "") {
        errors.address = "    آدرس الزامی است "; // افزودن اعتبارسنجی برای address
      }

      return errors;
    },

    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  return (
    <form
      className="flex items-center flex-col justify-center h-screen bg-slate-200 p-4"
      onSubmit={formik.handleSubmit}
    >
    
    {showModal && <SignupModal />}
      <div className="w-full max-w-md bg-white rounded-lg h-fit p-5">
        <div className="flex justify-center gap-x-4 pt-6">
          <Link
            to="/login"
            className="flex items-center gap-x-1 justify-center w-20 h-10 bg-blue-500 rounded-lg"
          >
            <p className="text-white font-normal">sign in</p>
            <IoMdKey className="text-white w-5 h-5" />
          </Link>
          <Link
            to="/signup"
            className="flex items-center gap-x-1 justify-center w-20 h-10 bg-blue-500 rounded-lg"
          >
            <p className="text-white font-normal">sign up</p>
            <BiUserPlus className="text-white w-5 h-5" />
          </Link>
        </div>
        <div className="flex flex-col py-5">
          <label className="text-lg font-medium">Email</label>
          <input
            className="bg-blue-100 p-3 rounded-md"
            type="text"
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <span>{formik.errors.email}</span>
          ) : null}
        </div>
        <div className="flex flex-col py-1">
          <label className="text-lg font-medium">UserName</label>
          <input
            className="bg-blue-100 p-3 rounded-md"
            type="text"
            name="username"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username ? (
            <span>{formik.errors.username}</span>
          ) : null}
        </div>
        <div className="flex flex-col py-5">
          <label className="text-lg font-medium">Password</label>
          <input
            className="bg-blue-100 p-3 rounded-md"
            type="password"
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <span>{formik.errors.password}</span>
          ) : null}
        </div>
        <div className="flex flex-col py-5">
          <label className="text-lg font-medium">Address</label>
          <input
            className="bg-blue-100 p-3 rounded-md"
            type="text"
            name="address"
            {...formik.getFieldProps("address")} // گرفتن مقدار address
          />
          {formik.touched.address && formik.errors.address ? (
            <span>{formik.errors.address}</span>
          ) : null}
        </div>
        <div className="p-5">
          <button
            className="bg-blue-500 w-full p-3 rounded-lg text-white"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
}
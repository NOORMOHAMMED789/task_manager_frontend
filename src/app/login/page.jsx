// app/login/page.js
'use client';
import Input from '@/components/Input';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { googleLogin, logout } = useAuth();
  const [formData, setFormData] = useState({
    values: {
      email: "",
      password: "",
    },
    touched: {
      email: false,
      password: false,
    },
    errors: {
      email: null,
      password: null,
    },
  });

  // function to update the form fields
  function updateFormData(field, value, result, isTouched) {
    setFormData((prevState) => {
      return {
        ...prevState,
        values: {
          ...prevState.values,
          [field]: value,
        },
        errors: {
          ...prevState.errors,
          [field]: result.success ,
        },
        touched: {
          ...prevState.touched,
          [field]: isTouched,
        },
      };
    });
  }

  const onEmailChange = (email) => {
    updateFormData('email',email, true, true)
  };

  const onPasswordChange = (password) => {
    updateFormData("password", password, true, true);
  };
  const router = useRouter();

  const navigateToSignUp = async () => {
    router.replace("/signup");
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("clicked")
  }
  return (
    <div className="w-full md:w-full px-10 md:px-5 lg:px-0 lg:w-[500px] mx-auto my-auto mt-[60px] md:mt-[80px] lg:mt-[100px]">
      <div className="font-extrabold text-blue-500 mb-2 md:mb-3 lg:mb-4 text-[24px] md:text-[30px] lg:text-[40px]">
        Login
      </div>
      <div className="rounded-xl border-blue-500 border-[2px] w-full h-[50vh] px-2 lg:w-[600px] lg:h-[400px]">
        <div className="px-5 py-5 md:px-6 md:py-6 lg:px-7 lg:py-7 flex flex-col gap-7">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-7"
          >
              <Input
                onChangeValue={(value) => onEmailChange(value)}
                value={formData.values.email}
                type="text"
                error={!!formData.errors.email}
                placeHolder={"Enter your email address..."}
                required={true}
              />
              <Input
                onChangeValue={(value) => onPasswordChange(value)}
                value={formData.values.password}
                type="password"
                error={!!formData.errors.password}
                placeHolder={"Enter your password..."}
                required={true}
              />
            <div onClick={handleSubmit} type='Submit' className="text-center px-1.5 py-1.5 md:px-2 md:py-2 lg:px-3 lg:py-3 text-white bg-blue-500 hover:cursor-pointer hover:shadow-2xl">
              Login
            </div>
          </form>
          <div className="text-center flex justify-center items-center gap-3">
            <span>Dont have an account?</span>
            <Link href="/signup" className="text-blue-500 hover:underline">
              Signup
            </Link>
          </div>
          <div className="text-center hover:cursor-pointer hover:shadow-2xl gap-4 border-[1px] px-2 py-2 rounded-full flex justify-center items-center">
            <div>
              <FcGoogle size={24} />
            </div>
            <div>
              Login with <strong>Google</strong>
            </div>
          </div>
        </div>
      </div>

      {/* <div onClick={navigateToSignUp}>Signup page</div> */}
    </div>
  );
};

export default Login;

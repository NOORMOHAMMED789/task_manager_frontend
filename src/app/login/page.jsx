// app/login/page.js
"use client";
import Input from "@/components/Input";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { PiSpinnerGapThin } from "react-icons/pi";

const Login = () => {
  const { googleLogin, logout, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const googleSignIn = async () => {
    try {
      await googleLogin();
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };
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
          [field]: result.success,
        },
        touched: {
          ...prevState.touched,
          [field]: isTouched,
        },
      };
    });
  }

  const onEmailChange = (email) => {
    updateFormData("email", email, true, true);
  };

  const onPasswordChange = (password) => {
    updateFormData("password", password, true, true);
  };
  const router = useRouter();

  const navigateToSignUp = async () => {
    router.replace("/signup");
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      console.log("clicked", formData.values);
      await login(formData.values.email, formData.values.password);
      setLoading(false);
    } catch (error) {
       setLoading(false);
      console.log("error is", error.code);
      if (error.code === "auth/invalid-credential") {
        toast.warning("Looks like your not signed up!.", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
      } else if (error.code === "auth/invalid-email") {
        toast.error("Please provide credentails", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
        });
      } else if (error.code === "auth/missing-password") {
        toast.error("Please enter the password", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
        });
      } else if (error.code === "auth/too-many-requests") {
        toast.warning("Too many login attempts. Try later!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
        });
      }
    }
  };
  return (
    <div className="w-full md:w-full px-10 md:px-5 lg:px-0 lg:w-[500px] mx-auto my-auto mt-[60px] md:mt-[80px] lg:mt-[100px]">
      <div className="font-extrabold text-blue-500 mb-2 md:mb-3 lg:mb-4 text-[24px] md:text-[30px] lg:text-[40px]">
        Login
      </div>
      <div className="rounded-xl border-blue-500 border-[2px] w-full px-2 lg:w-[600px] lg:h-[400px]">
        <div className="px-5 py-5 md:px-6 md:py-6 lg:px-7 lg:py-7 flex flex-col gap-7">
          <form onSubmit={handleSubmit} className="flex flex-col gap-7">
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
            <button
              onClick={handleSubmit}
              type="Submit"
              disabled={!formData.values.email || !formData.values.password}
              className="text-center px-1.5 py-1.5 md:px-2 md:py-2 lg:px-3 lg:py-3 disabled:bg-gray-400 disabled:cursor-not-allowed text-white bg-blue-500 hover:cursor-pointer hover:shadow-2xl"
            >
              {loading ? (
                <span className="inline-block animate-spin360">
                  <PiSpinnerGapThin size={24} />
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="text-center flex justify-center items-center gap-3">
            <span>Dont have an account?</span>
            <Link href="/signup" className="text-blue-500 hover:underline">
              Signup
            </Link>
          </div>
          <div
            onClick={googleSignIn}
            className="text-center hover:cursor-pointer hover:shadow-2xl gap-4 border-[1px] px-2 py-2 rounded-full flex justify-center items-center"
          >
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

import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import googleImg from "../../assets/socialLoiginImg/google.png";
import gitHubImg from "../../assets/socialLoiginImg/github.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";

const Login = () => {
  const { login, signInGoogle, signInGithub, auth } = useContext(AuthContext);
  const [toggleIcon, setToggleIcon] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        // console.log(loggedUser);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your Log In Successful",
          showConfirmButton: false,
          buttonsStyling: "#32c770",
          timer: 1500,
        });
        navigate(from, { replace: true });
        reset();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          buttonsStyling: {
            color: "#32c770",
            backgroundColor: "#32c770",
          },
          title: "Oops...",
          title: `${err.message}`,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      });
  };

  const handleGoogleLogin = () => {
    const googleProvider = new GoogleAuthProvider();
    signInGoogle(googleProvider)
      .then((result) => {
        const loggedUser = result.user;
        // console.log(loggedUser);
        navigate(from, { replace: true });
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your Google Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {});
  };
  const handleGithubLogin = () => {
    const githubProvider = new GithubAuthProvider();
    signInGithub(githubProvider)
      .then((result) => {
        const loggedUser = result.user;
        navigate(from, { replace: true });
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your Github Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {});
  };
  return (
    <div className="container mx-auto ">
      <div style={{ height: "80vh" }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center h-full"
        >
          <div className="flex flex-col justify-start items-start fullForm lg:w-2/6 md:w-3/6  shadow-2xl">
            <h2 className="text-2xl mb-2" style={{ color: "#32c770" }}>
              Please Login
            </h2>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="CreativaDesignHub.world@gmail.com"
              className="border"
              name="email"
            />
            <div className="w-full relative">
              <input
                type={`${toggleIcon ? "text" : "password"}`}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern:
                    /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}/,
                })}
                className="border m-0"
                placeholder="******"
                name="password"
              />

              <span
                onClick={() => setToggleIcon(!toggleIcon)}
                className="absolute bottom-4 right-4 toggle-icon"
              >
                {toggleIcon ? (
                  <FontAwesomeIcon
                    className="block"
                    icon={faEyeSlash}
                  ></FontAwesomeIcon>
                ) : (
                  <FontAwesomeIcon
                    className="block"
                    icon={faEye}
                  ></FontAwesomeIcon>
                )}
              </span>
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">Password must be 6 characters</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-600">Password less than 20 characters</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600">Password must be PATTERN rules</p>
            )}
            <p className="mb-3 text-end w-full forget-password">
              Forget Password
            </p>
            {/* <span className="text-green-500 m-0">{successMassage}</span>
            <span className="text-red-500 m-0">{errorMassage}</span> */}
            <p className="mb-2">
              Don't Have an Account?{" "}
              <Link
                style={{ color: "#32c770", fontWeight: 700 }}
                to="/register"
              >
                Please Register
              </Link>
            </p>
            <input
              type="submit"
              value="Login"
              className="bg-[#32c770] border-0 text-white font-semibold cursor-pointer"
            />
            <div className="pt-5 flex items-center justify-between w-full">
              <p>Or Sign in with:</p>
              <div className="flex items-center justify-between">
                <img
                  onClick={handleGoogleLogin}
                  style={{
                    width: "50px",
                    marginRight: "10px",
                    border: "2px solid #32c770",
                    cursor: "pointer",
                    padding: "10px",
                  }}
                  src={googleImg}
                  alt=""
                />
                <img
                  onClick={handleGithubLogin}
                  style={{
                    width: "50px",
                    marginRight: "10px",
                    border: "2px solid #32c770",
                    cursor: "pointer",
                    padding: "10px",
                  }}
                  src={gitHubImg}
                  alt=""
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

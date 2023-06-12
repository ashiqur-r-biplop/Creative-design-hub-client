import { faEye, faEyeSlash, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import googleImg from "../../assets/socialLoiginImg/google.png";
import gitHubImg from "../../assets/socialLoiginImg/github.png";

import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { set, useForm } from "react-hook-form";
const Register = () => {
  const [toggleIcon, setToggleIcon] = useState(false);
  const [toggleIconConfirm, setToggleIconConfirm] = useState(false);
  const [errorMassage, setErrorMassage] = useState("");
  const [gander, setGender] = useState("Others");
  const navigate = useNavigate();
  const { signUp, signInGoogle, signInGithub, ProfileUpdate, setReload } =
    useContext(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    const confirmPassword = data.confirmPassword;
    const name = data.name;
    const photo = data.photoUrl;
    const contact = data.phoneNumber;
    const address = data.address;
    if (password !== confirmPassword) {
      setErrorMassage("Password an confirm password doesn't match");
      return;
    } else {
      setErrorMassage("");
    }
    // console.log("error", errorMassage);
    signUp(email, password)
      .then((result) => {
        const loggedUser = result.user;
        // console.log(loggedUser);
        ProfileUpdate(name, photo).then(() => {
          setReload(true);
          const saveUser = {
            email,
            name,
            photo,
            role: "student",
            gander,
            contact,
            address,
          };
          // console.log(saveUser);
          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                reset();
                Swal.fire("Good job!", "User created successfully", "success");
                navigate(from, { replace: true });
              }
            });

          reset();
        });
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
  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const handleGoogleLogin = () => {
    const googleProvider = new GoogleAuthProvider();
    signInGoogle(googleProvider)
      .then((result) => {
        const loggedUser = result.user;
        // console.log(loggedUser);
        const saveUser = {
          email: loggedUser.email,
          name: loggedUser.displayName,
          photo: loggedUser?.photoURL,
          role: "student",
        };
        // console.log(loggedUser);
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId || !data.insertedId) {
              reset();
              Swal.fire("Good job!", "User created successfully", "success");
              navigate(from, { replace: true });
            }
          });
      })
      .catch((err) => {});
  };
  const handleGithubLogin = () => {
    signInGithub()
      .then((result) => {
        const loggedUser = result.user;
        // console.log(loggedUser);
        const saveUser = {
          email: loggedUser?.email,
          name: loggedUser?.displayName,
          photo: loggedUser?.photoURL,
          role: "student",
        };
        // console.log(loggedUser);
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId || !data.insertedId) {
              reset();
              Swal.fire("Good job!", "User created successfully", "success");
              navigate(from, { replace: true });
            }
          });
      })
      .catch((err) => {});
  };
  return (
    <div className="container mx-auto md:pt-32 p-3">
      <div style={{ width: "100%" }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center h-full"
        >
          <div className="flex flex-col justify-start items-start fullForm w-full  shadow-2xl">
            <h2 className="text-2xl mb-2" style={{ color: "#32c770" }}>
              Please Register
            </h2>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter Your Name"
              className="border"
            />
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="CreativaDesignHub.world@gmail.com"
              className="border"
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
                placeholder="Enter Password"
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
            <>
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
            </>
            <div className="w-full relative">
              <input
                type={`${toggleIconConfirm ? "text" : "password"}`}
                {...register("confirmPassword", { required: true })}
                className="border m-0 mt-3"
                placeholder="Enter Confirm Password"
              />

              <span
                onClick={() => setToggleIconConfirm(!toggleIconConfirm)}
                className="absolute bottom-4 right-4 toggle-icon"
              >
                {toggleIconConfirm ? (
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
            {<p className="text-red-700 ">{errorMassage}</p>}
            <div className="md:flex w-full justify-between items-center">
              <input
                type="url"
                {...register("photoUrl", { required: true })}
                placeholder="Enter Your Photo URL"
                className="border mt-5"
              />
              <input
                type="number"
                {...register("phoneNumber", { required: true })}
                placeholder="Enter Your Phone Number"
                className="border mt-5 ms-2"
              />
            </div>
            <input
              type="text"
              {...register("address", { required: true })}
              placeholder="Enter Your Address"
              className="border"
            />
            <select onChange={handleGender} className="border">
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">other</option>
            </select>
            <p className="mb-3 text-end w-full forget-password">
              Forget Password
            </p>
            <p className="mb-2">
              Already have an Account?{" "}
              <Link style={{ color: "#32c770", fontWeight: 700 }} to="/login">
                Please Login
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
                {/* <img
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
                /> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

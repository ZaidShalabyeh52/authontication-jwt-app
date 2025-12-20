import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
import shieldImg from "../../public/shield.png";
import { useForm } from "react-hook-form";
import api from "../lib/api.js";
import { useNavigate, Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

function Register() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (!confirmPassword) {
        setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }

      const res = await api.post("/createUser", {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (res.status === 200 || res.status === 201) {
        navigate("/protected");
      }
    } catch (error) {
      const msg =
        error?.response?.data?.error || error?.message || "Registration failed";
      setError("root", {
        type: "server",
        message: msg,
      });
    }
  };

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "white" }, // border when idle
      "&:hover fieldset": { borderColor: "white" }, // border on hover
      "&.Mui-focused fieldset": { borderColor: "primary.main" }, // border on focus
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& input:-webkit-autofill, & textarea:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #1f2937 inset !important",
      WebkitTextFillColor: "#ffffff !important",
      caretColor: "#ffffff",
      transition: "background-color 5000s ease-in-out 0s",
    },
    "& input:-webkit-autofill:focus, & textarea:-webkit-autofill:focus": {
      WebkitBoxShadow: "0 0 0 1000px #1f2937 inset !important",
      WebkitTextFillColor: "#ffffff !important",
    },
    "& .MuiInputLabel-root": {
      color: "white", // label when idle
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "primary.main", // label on focus
    },
  };

  return (
    <main className="min-h-screen bg-gray-900 flex justify-center items-center gap-[15%]">
      <img
        src={shieldImg}
        alt="Security"
        className="hidden lg:block w-[450px] h-[450px] object-cover rounded-lg"
      />
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-900 text-white">
        {/* gradient border wrapper */}
        <div className="relative rounded-lg bg-linear-to-b from-[#0080ff] to-[#00ffb3] p-0.5">
          {/* centered label overlapping top border */}

          <div className="absolute -top-[22px] left-1/2 transform -translate-x-1/2 flex items-center justify-center">
            <div className="relative bg-[#0080ff] w-[3px] h-6 -top-2.5 rounded-l-lg rounded-br-lg"></div>
            <div className="border-t-[3px] border-[#0080ff]  bg-gray-800 px-4 text-white font-bold text-3xl h-11">
              REGISTER
            </div>
            <div className="relative bg-[#0080ff] w-[3px] h-6 -top-2.5 rounded-r-lg rounded-bl-lg"></div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-52 sm:w-2xs md:w-96 flex flex-col gap-6 bg-gray-800 p-8 rounded-lg shadow-lg"
          >
            {errors.root ? (
              <div className="h-1 text-sm text-red-500">
                {errors.root.message}
              </div>
            ) : (
              // reserve space to avoid layout shift
              <div className="h-0.5">&nbsp;</div>
            )}
            <div>
              <TextField
                {...register("username", {
                  required: "Username is required",
                  pattern: {
                    value: /^[A-Za-z0-9_]{3,20}$/,
                    message:
                      "Username must be 3-20 characters and contain only letters, numbers, and underscores",
                  },
                })}
                id="username"
                label="Username"
                color="primary"
                sx={textFieldStyle}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle sx={{ color: "white" }} />
                      </InputAdornment>
                    ),
                    inputProps: {
                      maxLength: 20,
                    },
                  },
                }}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <TextField
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                id="email"
                label="Email"
                sx={textFieldStyle}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "white" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <TextField
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=(?:.*[A-Za-z]){4,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message:
                      "Password must be at least 8 characters, include uppercase, lowercase letters and numbers",
                  },
                })}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                sx={textFieldStyle}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "white" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: "white" }}
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                    inputProps: {
                      maxLength: 25,
                    },
                  },
                }}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <TextField
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                id="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                sx={textFieldStyle}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "white" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                          sx={{ color: "white" }}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                    inputProps: {
                      maxLength: 25,
                    },
                  },
                }}
              />
              {errors.confirmPassword ? (
                <p className="text-red-500 text-sm mt-0.5 h-4">
                  {errors.confirmPassword.message}
                </p>
              ) : (
                <p className="text-sm mt-0.5 h-4">&nbsp;</p>
              )}
            </div>
            <div>
              <Button
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                color="success"
                startIcon={<HowToRegOutlinedIcon />}
                fullWidth
                sx={{
                  "&.Mui-disabled": {
                    backgroundColor: "#555",
                    color: "#aaa",
                    opacity: 0.7,
                  },
                  py: 1.5,
                  mt: 2,
                }}
              >
                {isSubmitting ? "LOGGING IN..." : "CREATE ACCOUNT"}
              </Button>
              <Link
                to="/login"
                className="text-blue-500 hover:underline flex justify-center mt-2"
              >
                Already have an account ? Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
export default Register;

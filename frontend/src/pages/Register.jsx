import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
import hackerImg from "../assets/shield.png";

function Register() {
  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "white" }, // border when idle
      "&:hover fieldset": { borderColor: "white" }, // border on hover
      "&.Mui-focused fieldset": { borderColor: "primary.main" }, // border on focus
    },
    "& .MuiInputBase-input": {
      color: "white",
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
        src={hackerImg}
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

          <form className="w-52 sm:w-2xs  md:w-96 flex flex-col gap-6 bg-gray-800 p-8 rounded-lg shadow-lg">
            <TextField
              required
              id="outlined-required"
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
                },
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Email"
              sx={textFieldStyle}
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
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              sx={textFieldStyle}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "white" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              id="outlined-password-input"
              label="Confirm Password"
              type="password"
              sx={textFieldStyle}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "white" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="success"
              startIcon={<HowToRegOutlinedIcon />}
              fullWidth
              sx={{ py: 1.5 }}
            >
              {" "}
              Create account
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
export default Register;

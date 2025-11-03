import { Button } from "@mui/material";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";

function App() {
  return (
    <main className="min-h-screen bg-gray-900 flex flex-col">
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-900 text-white">
        <h1 className="md:text-[40px] lg:text-[60px] text-[32px] font-extrabold text-center px-4 w-[85%]">
          Register now or log in to our authentication app to experience true{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-[#0080ff] to-[#00ffb3]">
            secure access
          </span>
        </h1>
      </div>

      <div className="flex justify-center items-center gap-7">
        <Button
          component={Link}
          to="/register"
          variant="contained"
          color="primary"
          size="large "
          className="w-32 h-12"
          startIcon={<HowToRegOutlinedIcon />}
        >
          Register
        </Button>
        <Button
          component={Link}
          to="/login"
          variant="outlined"
          color="primary"
          size="large"
          className="w-32 h-12"
          startIcon={<LoginIcon />}
        >
          Log in
        </Button>
      </div>
    </main>
  );
}

export default App;

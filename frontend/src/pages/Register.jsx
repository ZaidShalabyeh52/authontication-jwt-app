import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function Register() {
  return (
    <>
      <form>
        {" "}
        <TextField required id="username" label="Username" />
        <TextField required id="outlined-required" label="Email" />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
        />
      </form>
    </>
  );
}
export default Register;

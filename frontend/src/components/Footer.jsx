import { Box, Typography, Container, Link as MuiLink } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "primary.main",
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Typography variant="body2" color="white">
          {"© "}
          <MuiLink
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            sx={{ textDecoration: "underline", color: "white" }}
            className="hover:cursor-pointer"
          >
            Zaid Shalabyeh
          </MuiLink>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
}

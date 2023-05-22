import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        台化
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  let navigate = useNavigate();

  const [NotesID, setNotesID] = React.useState("");
  const [Password, setPassword] = React.useState("");

  const [msg, setMsg] = React.useState("");

  const handleTextFieldChange = (e) => {
    switch (e.target.id) {
      case "notesID":
        setNotesID(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/login", { NotesID, Password })
      .then((res) => {
        console.log(res);
        navigate("/item");
      })
      .catch((err) => setMsg(err.response.data.msg));
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src="fcfc.png" alt={`FCFC LOGO`} loading="lazy" width="50%" />
          <Typography
            component="h1"
            variant="h4"
            sx={{
              marginTop: 3,
            }}
          >
            台化公司MI查核作業管理
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="notesID"
              label="NotesID"
              value={NotesID}
              autoFocus
              onChange={handleTextFieldChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="密碼"
              type="password"
              id="password"
              value={Password}
              autoComplete="current-password"
              onChange={handleTextFieldChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              登入
            </Button>
            <Typography color="error">{msg}</Typography>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

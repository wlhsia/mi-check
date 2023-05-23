import * as React from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CreateProjectModal(props) {
  const { open, toggle } = props;

  const handleSubmit = () => {};

  const [currentUser, setCurrentUser] = React.useState("");
  React.useEffect(() => {
    axios.get("/api/user").then((res) => {
      setCurrentUser(res.data.Name);
    });
  }, []);

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" component="h2">
          建立查核案件
        </Typography>
        <Box
          sx={{
            "& .MuiTextField-root": { marginTop: 2, width: "100%" },
            "& .MuiFormControl-root": { marginTop: 2, width: "100%" },
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            id="ProjectNo"
            disabled
            label="查核案號"
            required
            defaultValue="Hello World"
          />
          <FormControl>
            <InputLabel id="ProjectType">機能組</InputLabel>
            <Select
              labelId="ProjectType-select-label"
              id="ProjectType-select"
              label="ProjectType"
            >
              <MenuItem value={"R"}>轉機(R)</MenuItem>
              <MenuItem value={"S"}>靜態(S)</MenuItem>
              <MenuItem value={"E"}>電儀(E)</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="InspectedDepartment">受檢單位</InputLabel>
            <Select
              labelId="InspectedDepartment-select-label"
              id="InspectedDepartment-select"
              label="InspectedDepartment"
            >
              <MenuItem value={"H1"}>ARO1廠(H1)</MenuItem>
              <MenuItem value={"H2"}>ARO1廠(H2)</MenuItem>
              <MenuItem value={"H3"}>ARO1廠(H3)</MenuItem>
            </Select>
          </FormControl>
          <TextField id="InspectedPersonID" label="受檢人員NotesID" required />
          <TextField id="Inspector" label="廠(處)主管" required />
          <TextField id="Inspector" label="經理室" required />
          <TextField
            id="Inspector"
            disabled
            label="評核人員"
            required
            defaultValue={currentUser}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 1,
              "& .MuiButton-root": { marginLeft: 1 },
            }}
          >
            <Button variant="contained" color="primary" type="submit">
              確認
            </Button>
            <Button variant="contained" color="error" onClick={toggle}>
              取消
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

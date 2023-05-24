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

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const departments = [
  {
    departmentNo: "H1",
    department: "ARO1",
  },
  {
    departmentNo: "H2",
    department: "ARO2",
  },
  {
    departmentNo: "H3",
    department: "ARO3",
  },
];

export default function CreateProjectModal(props) {
  const { open, toggle } = props;

  const handleSubmit = () => {};

  const [currentUser, setCurrentUser] = React.useState("");
  React.useEffect(() => {
    axios.get("/api/user").then((res) => {
      setCurrentUser(res.data.Name);
      setProjectTemp;
    });
  }, []);

  const [projectTemp, setProjectTemp] = React.useState({
    ProjectNo: `${departments[0].departmentNo}--R`,
    ProjectType: "R",
    InspectedDepartmentNo: departments[0].departmentNo,
    InspectedDate: null,
  });

  const handleFormChange = (e) => {
    setProjectTemp((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setProjectTemp((prev) => ({
      ...prev,
      ProjectNo: `${prev.InspectedDepartmentNo}-${prev.InspectedDate}-${prev.ProjectType}`,
    }));
  };

  const handleDateChange = (newValue) => {
    const formattedDate = `${newValue.$y}${String(newValue.$M + 1).padStart(
      2,
      "0"
    )}${String(newValue.$D).padStart(2, "0")}`;
    setProjectTemp((prev) => ({
      ...prev,
      InspectedDate: newValue,
      ProjectNo: `${prev.InspectedDepartmentNo}-${formattedDate}-${prev.ProjectType}`,
    }));
  };

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
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
            value={projectTemp.ProjectNo}
          />

          <FormControl>
            <InputLabel id="InspectedDepartmentNo" required>
              受檢單位
            </InputLabel>
            <Select
              id="InspectedDepartment-select"
              label="InspectedDepartmentNo"
              name="InspectedDepartmentNo"
              onChange={handleFormChange}
              defaultValue={departments[0].departmentNo}
            >
              {departments.map((department) => {
                return (
                  <MenuItem
                    key={department.departmentNo}
                    value={department.departmentNo}
                  >
                    {department.department}廠({department.departmentNo})
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={"zh-cn"}
          >
            <DatePicker
              label="受檢日期"
              name="InspectedDate"
              value={projectTemp.InspectedDate}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
          <FormControl>
            <InputLabel id="ProjectTypeLabel" required>
              機能組
            </InputLabel>
            <Select
              id="ProjectType-select"
              label="ProjectType"
              name="ProjectType"
              onChange={handleFormChange}
              defaultValue={"R"}
            >
              <MenuItem value={"R"}>轉機(R)</MenuItem>
              <MenuItem value={"S"}>靜態(S)</MenuItem>
              <MenuItem value={"E"}>電儀(E)</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="ProjectTypeLabel" required>
              受檢人員
            </InputLabel>
            <Select
              id="ProjectType-select"
              label="InspectedUser"
              name="InspectedUser"
              onChange={handleFormChange}
            ></Select>
          </FormControl>
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

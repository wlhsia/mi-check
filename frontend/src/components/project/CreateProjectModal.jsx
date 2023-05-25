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

import { context } from "../../App";

const departments = [
  {
    departmentNo: "H1",
    department: "ARO1廠",
  },
  {
    departmentNo: "H2",
    department: "ARO2廠",
  },
  {
    departmentNo: "H3",
    department: "ARO3廠",
  },
  {
    departmentNo: "30",
    department: "設保組",
  },
];

export default function CreateProjectModal(props) {
  const { open, toggle, fetchUserData } = props;
  const userData = React.useContext(context);
  const [inspectedDepartmentNo, setInspectedDepartmentNo] = React.useState(
    departments[0].departmentNo
  );
  const now = dayjs();
  const today = now.startOf("day");
  const [formattedDate, setFormattedDate] = React.useState(
    today.format("YYYYMMDD")
  );
  const [inspectedUsers, setInspectedUsers] = React.useState([]);
  const [projectTemp, setProjectTemp] = React.useState({
    ProjectNo: "",
    ProjectType: "R",
    InspectorID: userData.UserID,
    InspectedUserID: 0,
    InspectedDate: today,
  });

  React.useEffect(() => {
    axios
      .get(
        `api/projects?ProjectNo=${inspectedDepartmentNo}-${formattedDate}-${projectTemp.ProjectType}`
      )
      .then((res) => {
        let index;
        if (res.data.length == 0) {
          index = "001";
        } else {
          index = (parseInt(res.data[0].ProjectNo.slice(-3)) + 1)
            .toString()
            .padStart(3, "0");
        }
        setProjectTemp((prev) => ({
          ...prev,
          ProjectNo: `${inspectedDepartmentNo}-${formattedDate}-${prev.ProjectType}${index}`,
        }));
      });
  }, [inspectedDepartmentNo, formattedDate, projectTemp.ProjectType]);

  const handleFormChange = (e) => {
    switch (e.target.name) {
      case "InspectedDepartmentNo":
        axios.get(`api/users?DepartmentNo=${e.target.value}`).then((res) => {
          setInspectedDepartmentNo(e.target.value);
          setInspectedUsers(res.data);
        });
        break;
      default:
        setProjectTemp((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
    }
  };
  const handleDateChange = (newValue) => {
    setFormattedDate(newValue.format("YYYYMMDD"));
    setProjectTemp((prev) => ({
      ...prev,
      InspectedDate: newValue,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("/api/projects", projectTemp).then(() => {
      toggle();
      fetchUserData();
    });
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
              value={inspectedDepartmentNo}
            >
              {departments.map((department) => {
                return (
                  <MenuItem
                    key={department.departmentNo}
                    value={department.departmentNo}
                  >
                    {department.department}({department.departmentNo})
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
              value={projectTemp.ProjectType}
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
              name="InspectedUserID"
              onChange={handleFormChange}
            >
              {inspectedUsers.map((user) => {
                return (
                  <MenuItem key={user.UserID} value={user.UserID}>
                    {user.UserName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            id="Inspector"
            disabled
            label="評核人員"
            required
            defaultValue={userData.UserName}
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

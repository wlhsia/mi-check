import * as React from "react";
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
    department: "H1",
    departmentName: "ARO1廠",
  },
  {
    department: "H2",
    departmentName: "ARO2廠",
  },
  {
    department: "H3",
    departmentName: "ARO3廠",
  },
  {
    department: "PM",
    departmentName: "SM廠麥寮",
  },
  {
    department: "PH",
    departmentName: "合成酚廠",
  },
  {
    department: "PN",
    departmentName: "SM廠海豐",
  },
  {
    department: "30",
    departmentName: "設保組",
  },
];

export default function PostProjectModal(props) {
  const { open, toggle, userData, postUser, postProject } = props;

  const now = dayjs();
  const today = now.startOf("day");
  const [formattedDate, setFormattedDate] = React.useState(
    today.format("YYYYMMDD")
  );

  const [form, setForm] = React.useState({
    projectNo: "",
    projectType: "E",
    inspectedDepartment: "H1",
    inspectedDate: today,
    inspectedUser: "",
    supervisor: "",
    manager: "",
    inspector: userData.NotesID,
  });

  React.useEffect(() => {
    setForm((prev) => ({
      ...prev,
      projectNo: `${prev.projectType}-${prev.inspectedDepartment}-${formattedDate}`,
    }));
  }, [form.projectType, form.inspectedDepartment, formattedDate]);

  const handleFormChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (newValue) => {
    setFormattedDate(newValue.format("YYYYMMDD"));
    setForm((prev) => ({
      ...prev,
      inspectedDate: newValue,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const inspectedUserID = await postUser(form.inspectedUser);
    const supervisorID = await postUser(form.supervisor);
    const managerID = await postUser(form.manager);
    postProject({
      ProjectNo: form.projectNo,
      ProjectType: form.projectType,
      InspectedDepartment: form.inspectedDepartment,
      InspectedDate: form.inspectedDate,
      InspectedUserID: inspectedUserID,
      SupervisorID: supervisorID,
      ManagerID: managerID,
      InspectorID: userData.UserID,
      IsScheduled: false,
    });
    toggle();
  };

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "40%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" component="h2">
          查核案件基本資料
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
            id="projectNo"
            disabled
            label="查核案號"
            required
            value={form.projectNo}
          />
          <FormControl>
            <InputLabel id="projectTypeLabel" required>
              機能組
            </InputLabel>
            <Select
              id="projectType-select"
              label="projectType"
              name="projectType"
              onChange={handleFormChange}
              value={form.projectType}
            >
              <MenuItem value={"E"}>電儀(E)</MenuItem>
              <MenuItem value={"R"}>轉機(R)</MenuItem>
              <MenuItem value={"S"}>靜態(S)</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="inspectedDepartment" required>
              受檢單位
            </InputLabel>
            <Select
              id="inspectedDepartment-select"
              label="inspectedDepartment"
              name="inspectedDepartment"
              onChange={handleFormChange}
              value={form.inspectedDepartment}
            >
              {departments.map((department) => {
                return (
                  <MenuItem
                    key={department.department}
                    value={department.department}
                  >
                    {department.departmentName}({department.department})
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
              name="inspectedDate"
              value={form.inspectedDate}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
          <TextField
            id="inspectedUser"
            name="inspectedUser"
            label="經辦NotesID"
            required
            value={form.inspectedUser}
            onChange={handleFormChange}
          />
          <TextField
            id="supervisor"
            name="supervisor"
            label="主管NotesID"
            required
            value={form.supervisor}
            onChange={handleFormChange}
          />
          <TextField
            id="manager"
            name="manager"
            label="經理室NotesID"
            required
            value={form.manager}
            onChange={handleFormChange}
          />
          <TextField
            id="inspector"
            disabled
            label="評核人員NotesID"
            required
            value={form.inspector}
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

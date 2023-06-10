import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { Context } from "../App";

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

export default function SummaryPage() {
  const { userData } = React.useContext(Context);
  const now = dayjs();
  const today = now.startOf("day");
  const [projectTypeNo, setProjectTypeNo] = React.useState("E");
  const [departmentNo, setDepartmentNo] = React.useState("H1");
  const [inspectedDate, setInspectedDate] = React.useState(today);

  const [projectItems, setProjectItems] = React.useState([]);

  React.useEffect(() => {
    setProjectItems([]);
    if (Object.keys(userData).length !== 0) {
      const project = userData.Projects.find((project) => {
        return (
          project.ProjectNo ===
          `${departmentNo}-${inspectedDate.format(
            "YYYYMMDD"
          )}-${projectTypeNo}001`
        );
      });
      if (project !== undefined) {
        axios.get(`/api/projects/${project.ProjectID}`).then((res) => {
          setProjectItems(res.data.ProjectItems);
        });
      }
    }
  }, [projectTypeNo, departmentNo, inspectedDate]);

  const handleTypeChange = (e) => {
    setProjectTypeNo(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setDepartmentNo(e.target.value);
  };

  const handleDateChange = (newValue) => {
    setInspectedDate(newValue);
  };

  return (
    <>
      <Box sx={{ my: 2, display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ "& .MuiFormControl-root": { ml: 2 } }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel htmlFor="grouped-native-select">機能組</InputLabel>
            <Select
              value={projectTypeNo}
              id="grouped-native-select"
              label="機能組"
              onChange={handleTypeChange}
            >
              <MenuItem value="E">電儀(E)</MenuItem>
              <MenuItem value="R">轉機(R)</MenuItem>
              <MenuItem value="S">靜態(S)</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel htmlFor="grouped-native-select">受檢單位</InputLabel>
            <Select
              value={departmentNo}
              id="grouped-native-select"
              label="受檢單位"
              onChange={handleDepartmentChange}
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
              value={inspectedDate}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      <SummaryDatagrid projectItems={projectItems} />
    </>
  );
}

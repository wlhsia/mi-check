import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "dayjs/locale/zh-cn";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

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

export default function ProjectPage() {
  return (
    <>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ "& .MuiFormControl-root": { marginRight: 2 } }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel htmlFor="grouped-native-select">機能組</InputLabel>
            <Select defaultValue="E" id="grouped-native-select" label="機能組">
              <MenuItem value="E">電儀(E)</MenuItem>
              <MenuItem value="R">轉機(R)</MenuItem>
              <MenuItem value="S">靜態(S)</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel htmlFor="grouped-native-select">受檢單位</InputLabel>
            <Select
              defaultValue={departments.No}
              id="grouped-native-select"
              label="受檢單位"
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
            />
          </LocalizationProvider>
        </Box>
      </Box>
    </>
  );
}

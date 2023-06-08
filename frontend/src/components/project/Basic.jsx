import * as React from "react";
import PropTypes from "prop-types";
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

Basic.propTypes = {
  project: PropTypes.object,
};

export default function Basic(props) {
  const { project } = props;
  return (
    <Box
      sx={{
        width: "40%",
        bgcolor: "background.paper",
        p: 4,
        "& .MuiTextField-root": { marginTop: 2, width: "100%" },
        "& .MuiFormControl-root": { marginTop: 2, width: "100%" },
      }}
    >
      <TextField
        id="projectNo"
        disabled
        label="查核案號"
        value={project.ProjectNo}
      />
      <TextField
        id="projectType"
        disabled
        label="機能組"
        value={project.ProjectType}
      />
      <TextField
        id="inspectedDepartment"
        disabled
        label="受檢單位"
        value={project.InspectedDepartment}
      />
      <TextField
        id="inspectedDate"
        disabled
        label="受檢日期"
        value={project.InspectedDate}
      />
      <TextField
        id="inspectedUser"
        disabled
        label="經辦"
        required
        value={project.InspectedUser.Name}
      />
      <TextField
        id="supervisor"
        disabled
        label="主管"
        required
        value={project.Supervisor.Name}
      />
      <TextField
        id="manager"
        disabled
        label="經理室"
        required
        value={project.Manager.Name}
      />
      <TextField
        id="inspector"
        disabled
        label="評核人員"
        required
        value={project.Inspector.Name}
      />
    </Box>
  );
}

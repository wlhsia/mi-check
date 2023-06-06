import * as React from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CreateProjectModal(props) {
  const { open, toggle, projectItemID } = props;

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" component="h2">
          查核主題(例:MI查核缺失管理)
        </Typography>
        <div>
          <img src={`/api/photo/${projectItemID}`} width="300" height="200" />
        </div>
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
    </Modal>
  );
}

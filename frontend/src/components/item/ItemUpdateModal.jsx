import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

export default function Md(props) {
  const { open, action, item, setItem, handleClose } = props;

  const handleTextFieldChange = (event) => {
    const { id, value } = event.target;
    setItem((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    delete item.id;
    axios.post("/api/items", item).then(() => {
      handleClose();
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
        <Typography id="add-modal-title" variant="h6" component="h2">
          {action}查核項目
        </Typography>
        <Box
          sx={{
            "& .MuiTextField-root": { marginTop: 2, width: "100%" },
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            id="ItemNo"
            label="評核項目序號"
            required
            value={item.ItemNo}
            onChange={handleTextFieldChange}
          />
          <TextField
            id="Item"
            label="評核項目"
            required
            value={item.Item}
            onChange={handleTextFieldChange}
          />
          <TextField
            id="StandardNo"
            label="評核標準序號"
            required
            value={item.StandardNo}
            onChange={handleTextFieldChange}
          />
          <TextField
            id="Standard"
            label="評核標準"
            required
            multiline
            rows={10}
            value={item.Standard}
            onChange={handleTextFieldChange}
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
            <Button variant="contained" color="error" onClick={handleClose}>
              取消
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

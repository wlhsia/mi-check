import * as React from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
// import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import DataGird from "./Datagrid";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Item() {
  // Tab
  const [tabValue, setTabValue] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // DataGird
  const [rows, setRows] = React.useState([]);

  const columns = [
    { field: "id", headerName: "項次", width: 50 },
    { field: "ItemNumber", headerName: "評核項目序號", width: 100 },
    { field: "Item", headerName: "評核項目", width: 100 },
    { field: "StandardNumber", headerName: "評核標準序號", width: 100 },
    { field: "Standard", headerName: "評核標準", width: 950 },
    {
      field: "edit",
      type: "actions",
      headerName: "編輯",
      width: 50,
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(row.ItemID)}
            color="inherit"
          />,
        ];
      },
    },
    {
      field: "delete",
      type: "actions",
      headerName: "刪除",
      width: 50,
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(row.ItemID)}
            color="error"
          />,
        ];
      },
    },
  ];

  const [temp, setTemp] = React.useState({});

  const handleAddClick = () => {
    setModalAction("新增");
    setTemp({
      ItemNumber: null,
      Item: null,
      StandardNumber: null,
      Standard: null,
    });
    setModalOpen(true);
  };

  const handleEditClick = (ItemID) => () => {
    setModalAction("編輯");
    setTemp(rows.find((row) => row.ItemID === ItemID));
    setModalOpen(true);
  };

  const handleDeleteClick = (ItemID) => () => {
    axios.delete(`/api/items/${ItemID}`).then(() => {
      fetchRows();
    });
  };

  React.useEffect(() => {
    fetchRows();
  }, []);

  const fetchRows = () => {
    axios.get("/api/items").then((response) => {
      const rows = response.data.map((item, index) => {
        return { ...item, id: index + 1 };
      });
      setRows(rows);
    });
  };

  // Modal
  const [modalAction, setModalAction] = React.useState("新增");
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalClose = () => setModalOpen(false);
  const handleTextFieldChange = (event) => {
    const { id, value } = event.target;
    setTemp((prev) => ({ ...prev, [id]: value }));
  };
  const handleSubmitClick = () => {
    delete temp.id;
    axios.post("/api/items", temp).then(() => {
      setModalOpen(false);
      fetchRows();
    });
  };
  
  return (
    <Container maxWidth="xl">
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        sx={{ marginY: 2 }}
      >
        查核項目基本資料
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="電儀" />
            <Tab label="轉機" />
            <Tab label="靜態" />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleAddClick}
            >
              新增查核項目
            </Button>
          </Box>
          <DataGird type="E" />
          {/* <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10]}
          /> */}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleAddClick}
            >
              新增查核項目
            </Button>
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleAddClick}
            >
              新增查核項目
            </Button>
          </Box>
        </TabPanel>
      </Box>
      {/* Modal */}
      <Modal open={modalOpen}>
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
            {modalAction}查核項目
          </Typography>
          <Box
            sx={{
              flexDirection: "column",
              "& .MuiTextField-root": { width: "100%", marginTop: 2 },
            }}
          >
            <TextField
              id="ItemNumber"
              label="評核項目序號"
              value={temp.ItemNumber}
              onChange={handleTextFieldChange}
            />
            <TextField
              id="Item"
              label="評核項目"
              value={temp.Item}
              onChange={handleTextFieldChange}
            />
            <TextField
              id="StandardNumber"
              label="評核標準序號"
              value={temp.StandardNumber}
              onChange={handleTextFieldChange}
            />
            <TextField
              id="Standard"
              label="評核標準"
              multiline
              rows={10}
              value={temp.Standard}
              onChange={handleTextFieldChange}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 1,
              "& .MuiButton-root": { marginLeft: 1 },
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitClick}
            >
              確認
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleModalClose}
            >
              取消
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}

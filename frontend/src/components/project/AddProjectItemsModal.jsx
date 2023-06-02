import * as React from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";

export default function AddProjectItemsModal(props) {
  const { open, toggle, project, projectItemsRows, setProjectItemsRows } =
    props;
  const [rows, setRows] = React.useState([]);
  const columns = [
    { field: "id", headerName: "項次", width: 50 },
    { field: "ItemNo", headerName: "評核項目序號", width: 100 },
    { field: "Item", headerName: "評核項目", width: 100 },
    { field: "StandardNo", headerName: "評核標準序號", width: 100 },
    { field: "Standard", headerName: "評核標準", width: 950 },
  ];

  React.useEffect(() => {
    axios.get(`/api/items?itemType=${project.ProjectType}`).then((res) => {
      const rows = res.data.map((item, index) => {
        return { ...item, id: index + 1 };
      });
      setRows(rows);
    });
  }, [project]);

  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const handleAddClick = () => {
    const rowsTemp = rows.filter((item) => {
      return rowSelectionModel.includes(item.id);
    });
    // const newRows = [...projectItemsRows, ...rowsTemp].map((item, index) => {
    //   return { ...item, id: index + 1 };
    // });
    setProjectItemsRows((prev) => {
      return [...prev, ...rowsTemp].map((item, index) => {
        return { ...item, id: index + 1 };
      });
    });
    // setProjectItemsRows(newRows);
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
          width: 1500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 1,
            "& .MuiButton-root": { marginLeft: 1 },
          }}
        >
          {" "}
          <Button variant="contained" color="primary" onClick={handleAddClick}>
            加入
          </Button>
          <Button variant="contained" color="error" onClick={toggle}>
            取消
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

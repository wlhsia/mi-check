import * as React from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";

AddModal.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  items: PropTypes.array,
  setProjectItemsTemp: PropTypes.func,
};

export default function AddModal(props) {
  const { open, toggle, items, setProjectItemsTemp } = props;

  const columns = [
    { field: "id", headerName: "項次", flex: 1 },
    { field: "ItemNo", headerName: "評核項目序號", flex: 1.5 },
    { field: "Item", headerName: "評核項目", flex: 3 },
    { field: "StandardNo", headerName: "評核標準序號", flex: 1.5 },
    { field: "Standard", headerName: "評核標準", flex: 10 },
  ];

  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const handleAddClick = () => {
    const itemsTemp = items.filter((item) => {
      return rowSelectionModel.includes(item.id);
    });
    setProjectItemsTemp((prev) => {
      return [...prev, ...itemsTemp].map((item, index) => {
        return { ...item, id: index + 1 };
      });
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
          width: "95%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <DataGrid
          rows={items}
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

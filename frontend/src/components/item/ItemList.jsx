import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import ItemUpdateModal from "./ItemUpdateModal";

export default function ItemList(props) {
  const { itemTypeNo, itemType } = props;

  // Modal
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalAction, setModalAction] = React.useState("");
  const [item, setItem] = React.useState({});
  const handleModalClose = () => {
    setModalOpen(false);
    fetchRows(itemTypeNo);
  };

  // Datagrid
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    fetchRows(itemTypeNo);
  }, []);

  const fetchRows = (itemTypeNo) => {
    axios.get(`/api/items?itemTypeNo=${itemTypeNo}`).then((response) => {
      const rows = response.data.map((item, index) => {
        return { ...item, id: index + 1 };
      });
      setRows(rows);
    });
  };

  const columns = [
    { field: "id", headerName: "項次", flex: 1 },
    { field: "ItemNo", headerName: "評核項目序號", flex: 1.5 },
    { field: "Item", headerName: "評核項目", flex: 3 },
    { field: "StandardNo", headerName: "評核標準序號", flex: 1.5 },
    { field: "Standard", headerName: "評核標準", flex: 10 },
    {
      field: "edit",
      type: "actions",
      headerName: "編輯",
      flex: 1,
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
      flex: 1,
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            id="delete"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(row.ItemID)}
            color="error"
          />,
        ];
      },
    },
  ];

  const handleAddClick = () => {
    setModalAction("新增");
    setItem({
      ItemTypeNo: itemTypeNo,
      ItemType: itemType,
      ItemNo: "",
      Item: "",
      StandardNo: "",
      Standard: "",
    });
    setModalOpen(true);
  };

  const handleEditClick = (ItemID) => () => {
    setItem(rows.find((row) => row.ItemID === ItemID));
    setModalAction("編輯");
    setModalOpen(true);
  };

  const handleDeleteClick = (ItemID) => () => {
    axios.delete(`/api/items/${ItemID}`).then(() => {
      fetchRows(itemType);
    });
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <Button variant="contained" color="success" onClick={handleAddClick}>
          新增查核項目
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10]}
      />
      <ItemUpdateModal
        open={modalOpen}
        action={modalAction}
        item={item}
        setItem={setItem}
        handleClose={handleModalClose}
      />
    </>
  );
}

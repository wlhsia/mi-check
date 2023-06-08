import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

ProjectItems.propTypes = {
  toggleModal: PropTypes.func,
  project: PropTypes.object,
  getItems: PropTypes.func,
};

export default function ProjectItems(props) {
  const { toggleModal, project, getItems } = props;
  const [rows, setRows] = React.useState([]);
  let columns = [
    { field: "id", headerName: "項次", flex: 1 },
    { field: "ItemNo", headerName: "評核項目序號", flex: 1.5 },
    { field: "Item", headerName: "評核項目", flex: 3 },
    { field: "StandardNo", headerName: "評核標準序號", flex: 1.5 },
    { field: "Standard", headerName: "評核標準", flex: 8 },
    {
      field: "ReferenceScore",
      headerName: "參考配分",
      flex: 1,
      type: "number",
      editable: true,
    },
  ];

  columns = project.IsScheduled
    ? columns
    : [
        ...columns,
        {
          field: "delete",
          type: "actions",
          headerName: "刪除",
          flex: 1,
          getActions: ({ id }) => {
            return [
              <GridActionsCellItem
                key={id}
                id="delete"
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => {
                  const newRows = rows
                    .filter((row) => {
                      return row.id !== id;
                    })
                    .map((item, index) => {
                      return { ...item, id: index + 1 };
                    });
                  setRows(newRows);
                }}
                color="error"
              />,
            ];
          },
        },
      ];

  const handleAddClick = () => {
    toggleModal();
    getItems(project.ProjectType);
  };

  const processRowUpdate = (newRow) => {
    setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));
    return newRow;
  };

  return (
    <>
      <Box>
        <DataGrid
          sx={{ backgroundColor: "white", position: "relative" }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10]}
          processRowUpdate={processRowUpdate}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        {project.IsScheduled ? (
          <Button
            sx={{ ml: 1 }}
            variant="contained"
            color="success"
            // onClick={handleScheduleClick}
          >
            匯出csv
          </Button>
        ) : (
          <>
            <Button variant="contained" onClick={handleAddClick}>
              加入項目
            </Button>
            <Button
              sx={{ ml: 1 }}
              variant="contained"
              color="success"
              // onClick={handleScheduleClick}
            >
              排定完成
            </Button>
          </>
        )}
      </Box>
    </>
  );
}

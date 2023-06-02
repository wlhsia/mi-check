import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import AddProjectItemsModal from "./AddProjectItemsModal";

export default function ProjectItems(props) {
  const { project, setProject } = props;
  const [rows, setRows] = React.useState([]);
  const columns = [
    { field: "id", headerName: "項次", width: 50 },
    { field: "ItemNo", headerName: "評核項目序號", width: 100 },
    { field: "Item", headerName: "評核項目", width: 100 },
    { field: "StandardNo", headerName: "評核標準序號", width: 100 },
    { field: "Standard", headerName: "評核標準", width: 950 },
    {
      field: "ReferenceScore",
      headerName: "參考配分",
      width: 100,
      type: "number",
      editable: true,
    },
    {
      field: "delete",
      type: "actions",
      headerName: "刪除",
      width: 50,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
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

  const handleScheduleClick = () => {
    const newRows = rows.map((row) => {
      return { ...row, ProjectID: project.ProjectID };
    });
    axios.post("/api/project_items", newRows);
    axios
      .put(`/api/projects/${project.ProjectID}`, {
        ProjectID: project.ProjectID,
        IsScheduled: true,
      })
      .then((res) => {
        setProject(res.data);
      });
  };

  const processRowUpdate = (newRow) => {
    setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));
    return newRow;
  };

  React.useEffect(() => {
    axios
      .get(`/api/project_items?prjectID=${project.ProjectID}`)
      .then((res) => {
        const rows = res.data.map((row, index) => {
          return {
            ...row,
            id: index + 1,
            ItemNo: row.ItemDetail.ItemNo,
            Item: row.ItemDetail.Item,
            StandardNo: row.ItemDetail.StandardNo,
            Standard: row.ItemDetail.Standard,
          };
        });
        setRows(rows);
      });
  }, [project.ProjectID]);

  // Modal
  const [modalOpen, setModelOpen] = React.useState(false);
  const toggleModal = () => {
    setModelOpen(!modalOpen);
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
            onClick={handleScheduleClick}
          >
            排定完成
          </Button>
        ) : (
          <>
            <Button variant="contained" onClick={() => toggleModal()}>
              加入項目
            </Button>
            <Button
              sx={{ ml: 1 }}
              variant="contained"
              color="success"
              onClick={handleScheduleClick}
            >
              排定完成
            </Button>
          </>
        )}
      </Box>
      <AddProjectItemsModal
        open={modalOpen}
        toggle={toggleModal}
        project={project}
        setProjectItemsRows={setRows}
      />
    </>
  );
}

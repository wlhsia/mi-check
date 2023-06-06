import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Typography from "@mui/material/Typography";

import ProjectItemDetailModal from "./ProjectItemDetailModal";

export default function SummaryDatagrid(props) {
  const { projectItems } = props;

  const [rows, setRows] = React.useState([]);

  const fileInputRefs = React.useRef([]);

  React.useEffect(() => {
    setRows(
      projectItems.map((item, index) => {
        return {
          ...item.ItemDetail,
          ProjectItemID: item.ProjectItemID,
          ReferenceScore: item.ReferenceScore,
          CheckDescription: item.CheckDescription,
          CheckClass: item.CheckClass,
          DangerLevel: item.DangerLevel,
          CheckPhotoName: item.CheckPhotoName,
          id: index + 1,
        };
      })
    );
  }, [projectItems]);

  const handleAddPhotoClick = (id) => {
    fileInputRefs.current[id].click();
  };

  const handleFileChange = (event) => {
    const formData = new FormData();
    formData.append("photo", event.target.files[0]);
    axios.put(`/api/photo/${event.target.name}`, formData);
    setRows(
      rows.map((row) =>
        row.id == event.target.id
          ? { ...row, CheckPhotoName: event.target.files[0].name }
          : row
      )
    );
  };

  const processRowUpdate = (newRow) => {
    axios.put(`/api/project_items/${newRow.ProjectItemID}`, newRow);
    setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));
    return newRow;
  };

  // Modal
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalProjectItemID, setModalProjectItemID] = React.useState(false);
  const toggleModal = (projectItemID) => {
    setModalProjectItemID(projectItemID);
    setModalOpen(!modalOpen);
  };

  const columns = [
    {
      field: "Detail",
      headerName: "",
      width: 50,
      renderCell: (param) => {
        return (
          <IconButton onClick={() => toggleModal(param.row.ProjectItemID)}>
            <AspectRatioIcon />
          </IconButton>
        );
      },
    },
    {
      field: "ItemNo",
      headerName: "查核項目序號",
      width: 100,
    },
    { field: "Item", headerName: "查核項目", width: 250 },
    { field: "StandardNo", headerName: "查核標準序號", width: 100 },
    { field: "Standard", headerName: "查核標準", width: 500 },
    { field: "ReferenceScore", headerName: "參考配分", width: 100 },
    {
      field: "Order",
      headerName: "項次",
      width: 50,
      renderCell: (param) => {
        return (
          <IconButton>
            <AddCircleOutlineIcon />
          </IconButton>
        );
      },
    },
    {
      field: "CheckDescription",
      headerName: "查核說明",
      width: 500,
      editable: true,
    },
    {
      field: "CheckClass",
      headerName: "說明分類",
      width: 100,
      type: "singleSelect",
      valueOptions: ["", "缺失", "優點", "紀錄", "建議"],
      editable: true,
    },
    {
      field: "DangerLevel",
      headerName: "危害程度分類",
      width: 100,
      type: "singleSelect",
      valueOptions: ["", "A", "B", "C"],
      editable: true,
    },
    {
      field: "CheckPhotoName",
      headerName: "查核照片",
      width: 200,
      renderCell: (param) => {
        return (
          <Box
          // onDragOver={handleDragOver}
          // onDrop={handleDrop}
          >
            <IconButton onClick={() => handleAddPhotoClick(param.id)}>
              <AddPhotoAlternateIcon />
            </IconButton>
            {param.value}
            <input
              id={param.id}
              name={param.row.ProjectItemID}
              onChange={handleFileChange}
              ref={(input) => (fileInputRefs.current[param.id] = input)}
              style={{ display: "none" }}
              type="file"
              accept="image/*"
            />
          </Box>
        );
      },
    },
  ];
  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={rows}
          processRowUpdate={processRowUpdate}
          rowHeight={40}
        />
      </div>
      <ProjectItemDetailModal
        open={modalOpen}
        toggle={toggleModal}
        projectItemID={modalProjectItemID}
      />
    </>
  );
}

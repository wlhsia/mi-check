import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { yellow, blue, green } from "@mui/material/colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

CheckImproveList.propTypes = {
  project: PropTypes.object,
  putProject: PropTypes.func,
  projectItems: PropTypes.array,
  setProjectItems: PropTypes.func,
  getProjectItem: PropTypes.func,
  putProjectItem: PropTypes.func,
  toggleDetailModal: PropTypes.func,
  putProjectItemPhoto: PropTypes.func,
};

export default function CheckImproveList(props) {
  const {
    project,
    putProject,
    projectItems,
    setProjectItems,
    getProjectItem,
    putProjectItem,
    toggleDetailModal,
    putProjectItemPhoto,
  } = props;
  const CheckPhotoInputRefs = React.useRef([]);
  const ImprovePhotoInputRefs = React.useRef([]);

  const handleDetailClick = (projectItemID) => {
    getProjectItem(projectItemID);
    toggleDetailModal();
  };
  const handleAddCheckPhotoClick = (id) => {
    CheckPhotoInputRefs.current[id].click();
  };
  const handleAddImprovePhotoClick = (id) => {
    ImprovePhotoInputRefs.current[id].click();
  };
  const handleCheckPhotoChange = (event) => {
    const formData = new FormData();
    formData.append("photo", event.target.files[0]);
    const projectItemID = event.target.name;
    putProjectItemPhoto(projectItemID, "check", formData);
    setProjectItems(
      projectItems.map((row) =>
        row.id == event.target.id
          ? { ...row, CheckPhoto: event.target.files[0].name }
          : row
      )
    );
  };
  const handleImprovePhotoChange = (event) => {
    const formData = new FormData();
    formData.append("photo", event.target.files[0]);
    const projectItemID = event.target.name;
    putProjectItemPhoto(projectItemID, "improve", formData);
    setProjectItems(
      projectItems.map((row) =>
        row.id == event.target.id
          ? { ...row, ImprovePhoto: event.target.files[0].name }
          : row
      )
    );
  };
  const processRowUpdate = (newRow) => {
    putProjectItem(newRow.ProjectItemID, newRow);
    setProjectItems(
      projectItems.map((row) => (row.id === newRow.id ? newRow : row))
    );
    return newRow;
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e, photoType, rowID, projectItemID) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      const formData = new FormData();
      formData.append("photo", droppedFile);
      putProjectItemPhoto(projectItemID, photoType, formData);
      setProjectItems(
        projectItems.map((row) => {
          if (photoType == "check") {
            return row.id == rowID
              ? { ...row, CheckPhoto: droppedFile.name }
              : row;
          } else {
            return row.id == rowID
              ? { ...row, ImprovePhoto: droppedFile.name }
              : row;
          }
        })
      );
    } else {
      alert("請上傳圖像");
    }
  };
  const columns = [
    {
      field: "Detail",
      headerName: "",
      width: 50,
      renderCell: (param) => {
        return (
          <IconButton
            onClick={() => handleDetailClick(param.row.ProjectItemID)}
          >
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
      headerClassName: "check",
      cellClassName: "check",
    },
    {
      field: "CheckDescription",
      headerName: "查核說明",
      width: 500,
      editable: !project.IsChecked,
      headerClassName: "check",
      cellClassName: "check",
    },
    {
      field: "CheckClass",
      headerName: "說明分類",
      width: 100,
      type: "singleSelect",
      valueOptions: ["", "缺失", "優點", "紀錄", "建議"],
      editable: !project.IsChecked,
      headerClassName: "check",
      cellClassName: "check",
    },
    {
      field: "DangerLevel",
      headerName: "危害程度分類",
      width: 100,
      type: "singleSelect",
      valueOptions: ["", "A", "B", "C"],
      editable: !project.IsChecked,
      headerClassName: "check",
      cellClassName: "check",
    },
    {
      field: "CheckPhoto",
      headerName: "查核照片",
      width: 200,
      renderCell: (param) => {
        return (
          <Box
            sx={{ height: "100%", width: "100%" }}
            id={param.id}
            onDragOver={handleDragOver}
            onDrop={(e) =>
              project.IsChecked
                ? null
                : handleDrop(e, "check", param.id, param.row.ProjectItemID)
            }
            disabled={!project.IsChecked}
          >
            <IconButton
              onClick={() => handleAddCheckPhotoClick(param.id)}
              disabled={project.IsChecked}
            >
              <AddPhotoAlternateIcon />
            </IconButton>
            {param.value}
            <input
              id={param.id}
              name={param.row.ProjectItemID}
              onChange={handleCheckPhotoChange}
              ref={(input) => (CheckPhotoInputRefs.current[param.id] = input)}
              style={{ display: "none" }}
              type="file"
              accept="image/*"
            />
          </Box>
        );
      },
      headerClassName: "check",
      cellClassName: "check",
    },
    {
      field: "Score",
      headerName: "評核分數",
      width: 100,
      editable: !project.IsChecked,
      headerClassName: "check",
      cellClassName: "check",
    },
    {
      field: "ImproveDescription",
      headerName: "改善說明",
      width: 500,
      editable: project.IsChecked && !project.IsImproved,
      headerClassName: "improve",
      cellClassName: "improve",
    },
    {
      field: "ImprovePhoto",
      headerName: "改善照片",
      width: 200,
      renderCell: (param) => {
        return (
          <Box
            sx={{ height: "100%", width: "100%" }}
            onDragOver={handleDragOver}
            onDrop={(e) =>
              !project.IsChecked || project.IsImproved
                ? e.preventDefault()
                : handleDrop(e, "improve", param.id, param.row.ProjectItemID)
            }
          >
            <IconButton
              onClick={() => handleAddImprovePhotoClick(param.id)}
              disabled={!project.IsChecked || project.IsImproved}
            >
              <AddPhotoAlternateIcon />
            </IconButton>
            {param.value}
            <input
              id={param.id}
              name={param.row.ProjectItemID}
              onChange={handleImprovePhotoChange}
              ref={(input) => (ImprovePhotoInputRefs.current[param.id] = input)}
              style={{ display: "none" }}
              type="file"
              accept="image/*"
            />
          </Box>
        );
      },
      headerClassName: "improve",
      cellClassName: "improve",
    },
    {
      field: "ImproveDepartment",
      headerName: "責任部門",
      width: 100,
      editable: project.IsChecked && !project.IsImproved,
      headerClassName: "improve",
      cellClassName: "improve",
    },
    {
      field: "ImprovePerson",
      headerName: "責任人員",
      width: 100,
      editable: project.IsChecked && !project.IsImproved,
      headerClassName: "improve",
      cellClassName: "improve",
    },
    {
      field: "ImproveSupervisor",
      headerName: "責任主管",
      width: 100,
      editable: project.IsChecked && !project.IsImproved,
      headerClassName: "improve",
      cellClassName: "improve",
    },
    {
      field: "MissingFace",
      headerName: "缺失面相",
      width: 100,
      type: "singleSelect",
      valueOptions: ["", "設計面", "保養面", "操作面", "管理面"],
      editable: project.IsChecked && project.IsImproved && !project.IsManaged,
      headerClassName: "manage",
      cellClassName: "manage",
    },
    {
      field: "MissingReason",
      headerName: "缺失原因",
      width: 500,
      editable: project.IsChecked && project.IsImproved && !project.IsManaged,
      headerClassName: "manage",
      cellClassName: "manage",
    },
    {
      field: "MissingaAttribution",
      headerName: "缺失歸屬",
      width: 100,
      type: "singleSelect",
      valueOptions: ["", "不想做", "不會做", "忘記做", "沒時間做(負荷大)"],
      editable: project.IsChecked && project.IsImproved && !project.IsManaged,
      headerClassName: "manage",
      cellClassName: "manage",
    },
    {
      field: "AttributionSideNote",
      headerName: "缺失歸屬補充說明",
      width: 300,
      editable: project.IsChecked && project.IsImproved && !project.IsManaged,
      headerClassName: "manage",
      cellClassName: "manage",
    },
    {
      field: "ImproveCompleteDate",
      headerName: "改善實完日",
      width: 200,
    },
  ];

  const handleCheckClick = () => {
    putProject(project.ProjectID, {
      IsChecked: true,
    });
  };

  const handleImproveClick = () => {
    putProject(project.ProjectID, {
      IsImproved: true,
    });
  };

  const handleManageClick = () => {
    putProject(project.ProjectID, {
      IsManaged: true,
    });
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        "& .check": {
          bgcolor: yellow[100],
        },
        "& .improve": {
          bgcolor: blue[100],
        },
        "& .manage": {
          bgcolor: green[100],
        },
      }}
    >
      <DataGrid
        columns={columns}
        rows={projectItems}
        processRowUpdate={processRowUpdate}
        // rowHeight={40}
        sx={{ bgcolor: "background.paper" }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 2,
          "& .MuiButton-root": { ml: 1 },
        }}
      >
        <Button
          variant="contained"
          color="warning"
          disabled={project.IsChecked}
          onClick={handleCheckClick}
          startIcon={project.IsChecked ? <CheckCircleIcon /> : null}
        >
          查核完成
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!project.IsChecked || project.IsImproved}
          onClick={handleImproveClick}
          startIcon={project.IsImproved ? <CheckCircleIcon /> : null}
        >
          改善完成
        </Button>
        <Button
          variant="contained"
          color="success"
          disabled={
            !project.IsChecked || !project.IsImproved || project.IsManaged
          }
          onClick={handleManageClick}
          startIcon={project.IsManaged ? <CheckCircleIcon /> : null}
        >
          經理室覆核完成
        </Button>
      </Box>
    </Box>
  );
}

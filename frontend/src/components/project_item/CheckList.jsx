import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

CheckList.propTypes = {
    projectItems: PropTypes.array,
    setProjectItems: PropTypes.func,
    getProjectItem: PropTypes.func,
    putProjectItem: PropTypes.func,
    toggleDetailModal: PropTypes.func,
    putProjectItemPhoto: PropTypes.func,

}

export default function CheckList(props) {
    const { projectItems, setProjectItems, getProjectItem, putProjectItem, toggleDetailModal, putProjectItemPhoto } = props;
    const CheckPhotoInputRefs = React.useRef([]);
    const ImprovePhotoInputRefs = React.useRef([]);

    const handleDetailClick = (projectItemID) => {
        getProjectItem(projectItemID);
        toggleDetailModal()
    }

    const handleAddCheckPhotoClick = (id) => {
        CheckPhotoInputRefs.current[id].click();
    };
    const handleAddImprovePhotoClick = (id) => {
        ImprovePhotoInputRefs.current[id].click();
    };

    const handleCheckPhotoChange = (event) => {
        const formData = new FormData();
        formData.append("photo", event.target.files[0]);
        const projectItemID = event.target.name
        putProjectItemPhoto(projectItemID, 'check', formData)
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
        const projectItemID = event.target.name
        putProjectItemPhoto(projectItemID, 'improve', formData)
        setProjectItems(
            projectItems.map((row) =>
                row.id == event.target.id
                    ? { ...row, ImprovePhoto: event.target.files[0].name }
                    : row
            )
        );
    };

    const processRowUpdate = (newRow) => {
        putProjectItem(newRow.ProjectItemID, newRow)
        setProjectItems(projectItems.map((row) => (row.id === newRow.id ? newRow : row)));
        return newRow;
    };

    const columns = [
        {
            field: "Detail",
            headerName: "",
            width: 50,
            renderCell: (param) => {
                return (
                    <IconButton onClick={() => handleDetailClick(param.row.ProjectItemID)}>
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
            field: "CheckPhoto",
            headerName: "查核照片",
            width: 200,
            renderCell: (param) => {
                return (
                    <Box
                    // onDragOver={handleDragOver}
                    // onDrop={handleDrop}
                    >
                        <IconButton onClick={() => handleAddCheckPhotoClick(param.id)}>
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
        },
        {
            field: "Score",
            headerName: "評核分數",
            width: 100,
            editable: true,
        },
        {
            field: "ImproveDescription",
            headerName: "改善說明",
            width: 500,
            editable: true,
        },
        {
            field: "ImprovePhoto",
            headerName: "改善照片",
            width: 200,
            renderCell: (param) => {
                return (
                    <Box
                    // onDragOver={handleDragOver}
                    // onDrop={handleDrop}
                    >
                        <IconButton onClick={() => handleAddImprovePhotoClick(param.id)}>
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
        },
        {
            field: "ImproveDepartment",
            headerName: "責任部門",
            width: 100,
            editable: true,
        },
        {
            field: "ImprovePerson",
            headerName: "責任人員",
            width: 100,
            editable: true,
        },
        {
            field: "ImproveSupervisor",
            headerName: "責任主管",
            width: 100,
            editable: true,
        },
    ];

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <DataGrid
                columns={columns}
                rows={projectItems}
                processRowUpdate={processRowUpdate}
                // rowHeight={40}
                sx={{ bgcolor: "background.paper" }}
            />
            <Button
                sx={{ mt: 1 }}
                variant="contained"
                color="success"
                disabled
            >
                查核完成
            </Button>
        </div>
    );
}

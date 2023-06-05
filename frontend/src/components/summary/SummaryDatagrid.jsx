import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

export default function SummaryDatagrid(props) {
  const { projectItems } = props;

  const [rows, setRows] = React.useState([]);
  // console.log(projectItems);

  React.useEffect(() => {
    setRows(
      projectItems.map((item, index) => {
        return {
          ...item.ItemDetail,
          ProjectItemID: item.ProjectItemID,
          ReferenceScore: item.ReferenceScore,
          id: index + 1,
        };
      })
    );
  }, [projectItems]);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    console.log(files);
  };

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
  };

  const columns = [
    {
      field: "ItemNo",
      headerName: "查核項目序號",
      width: 100,
      // renderCell: (param) => {
      //   return (
      //     <Box
      //       sx={{
      //         width: "100%",
      //         height: "100%",
      //         display: "flex",
      //         alignItems: "center",
      //         justifyContent: "center",
      //         bgcolor: "red",
      //       }}
      //     >
      //       {param.value}
      //     </Box>
      //   );
      // },
    },
    { field: "Item", headerName: "查核項目", width: 250 },
    { field: "StandardNo", headerName: "查核標準序號", width: 100 },
    { field: "Standard", headerName: "查核標準", width: 500 },
    { field: "ReferenceScore", headerName: "參考配分", width: 100 },
    { field: "Order", headerName: "項次", width: 50 },
    { field: "Description", headerName: "查核說明", width: 500 },
    {
      field: "DescriptionType",
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
      field: "photo",
      headerName: "查核照片",
      width: 200,
      renderCell: () => {
        return (
          <Box
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input onChange={handleFileChange} type="file" accept="image/*" />
          </Box>
        );
      },
    },
  ];
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
}

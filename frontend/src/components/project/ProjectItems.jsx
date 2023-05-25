import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";

export default function ProjectItems(props) {
  const [rows, setRows] = React.useState([
    {
      id: 1,
      ItemNo: "R01",
      Item: "8R.0 上次設保組查核缺失複查",
      StandardNo: "R01-001",
      Standard: "複查上次文書相關缺失，是否落實改善完成(每項總分扣3分)。",
      ReferenceScore: null,
    },
  ]);
  const columns = [
    { field: "id", headerName: "項次", width: 50 },
    { field: "ItemNo", headerName: "評核項目序號", width: 100 },
    { field: "Item", headerName: "評核項目", width: 100 },
    { field: "StandardNo", headerName: "評核標準序號", width: 100 },
    { field: "Standard", headerName: "評核標準", width: 950 },
    { field: "ReferenceScore", headerName: "參考配分", width: 100 },
  ];
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <DataGrid
          sx={{ backgroundColor: "white", position: "relative" }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10]}
        />
        <Button
          sx={{
            position: "absolute",
            top: "75%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          variant="contained"
        >
          加入項目
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        <Button variant="contained" color="success">
          排訂完成
        </Button>
      </Box>
    </>
  );
}

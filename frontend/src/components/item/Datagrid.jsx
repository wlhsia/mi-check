import * as React from "react";
import axios from "axios";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

export default function DataGird(props) {
  const { type } = props;
  console.log(type);
  //   const [rows, setRows] = React.useState([]);
  //   const columns = [
  //     { field: "id", headerName: "項次", width: 50 },
  //     { field: "ItemNumber", headerName: "評核項目序號", width: 100 },
  //     { field: "Item", headerName: "評核項目", width: 100 },
  //     { field: "StandardNumber", headerName: "評核標準序號", width: 100 },
  //     { field: "Standard", headerName: "評核標準", width: 950 },
  //     {
  //       field: "edit",
  //       type: "actions",
  //       headerName: "編輯",
  //       width: 50,
  //       getActions: ({ row }) => {
  //         return [
  //           <GridActionsCellItem
  //             icon={<EditIcon />}
  //             label="Edit"
  //             onClick={handleEditClick(row.ItemID)}
  //             color="inherit"
  //           />,
  //         ];
  //       },
  //     },
  //     {
  //       field: "delete",
  //       type: "actions",
  //       headerName: "刪除",
  //       width: 50,
  //       getActions: ({ row }) => {
  //         return [
  //           <GridActionsCellItem
  //             icon={<DeleteIcon />}
  //             label="Delete"
  //             onClick={handleDeleteClick(row.ItemID)}
  //             color="error"
  //           />,
  //         ];
  //       },
  //     },
  //   ];

    React.useEffect(() => {
      fetchRows(type);
    }, []);

    const fetchRows = (t) => {
      axios.get(`/api/items?type=${t}`).then((response) => {
        const rows = response.data.map((item, index) => {
          return { ...item, id: index + 1 };
        });
        setRows(rows);
      });
    };

  return (
    // <DataGrid
    //   rows={rows}
    //   columns={columns}
    //   initialState={{
    //     pagination: { paginationModel: { pageSize: 10 } },
    //   }}
    //   pageSizeOptions={[10]}
    // />
    <p>test {type}</p>
  );
}

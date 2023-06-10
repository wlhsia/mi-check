import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

ScheduleList.propTypes = {
  toggleModal: PropTypes.func,
  project: PropTypes.object,
  getItems: PropTypes.func,
  projectItems: PropTypes.array,
  projectItemsTemp: PropTypes.array,
  setProjectItemsTemp: PropTypes.func,
  getProjectItems: PropTypes.func,
  postProjectItems: PropTypes.func,
  putProject: PropTypes.func,
  deleteProjectItem: PropTypes.func,
};

export default function ScheduleList(props) {
  const {
    toggleModal,
    project,
    getItems,
    projectItems,
    projectItemsTemp,
    setProjectItemsTemp,
    getProjectItems,
    postProjectItems,
    putProject,
    deleteProjectItem
  } = props;

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
        getActions: ({id ,row}) => {
          return [
            <GridActionsCellItem
              key={id}
              id="delete"
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => {
                const newProjectItemsTemp = projectItemsTemp
                  .filter((row) => {
                    return row.id !== id;
                  })
                  .map((item, index) => {
                    return { ...item, id: index + 1 };
                  });
                setProjectItemsTemp(newProjectItemsTemp);
                deleteProjectItem(row.ProjectItemID)
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

  const handleScheduleClick = async () => {
    const newProjectItemsTemp = projectItemsTemp.map((item) => ({
      ...item,
      ProjectID: project.ProjectID,
    }));
    await postProjectItems(newProjectItemsTemp);
    await putProject(project.ProjectID, { IsScheduled: true });
    await getProjectItems(project.ProjectID);
  }

  const handleEditClick = async () => {
    await putProject(project.ProjectID, { IsScheduled: false });
    // const newProjectItemsTemp = projectItems.map((item) => ({})
    setProjectItemsTemp(projectItems)
  }

  const processRowUpdate = (newRow) => {
    setProjectItemsTemp(
      projectItemsTemp.map((item) => (item.id === newRow.id ? newRow : item))
    );
    return newRow;
  };

  return (
    <>
      <Box>
        <DataGrid
          sx={{ backgroundColor: "white", position: "relative" }}
          rows={project.IsScheduled ? projectItems : projectItemsTemp}
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
            onClick={handleEditClick}
          >
            修改項目
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
              onClick={handleScheduleClick}
            >
              排定項目
            </Button>
          </>
        )}
      </Box>
    </>
  );
}

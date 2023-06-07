import * as React from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CreateProjectModal(props) {
  const { open, toggle, projectItemID } = props;
  const [isLoading, setIsLoading] = React.useState(true);
  const [projectItem, setProjectItem] = React.useState({});

  React.useEffect(() => {
    axios.get(`/api/project_items/${projectItemID}`).then((res) => {
      setProjectItem(res.data);
      setIsLoading(false);
    });
  }, [projectItemID]);

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            my: 1,
          }}
        >
          <Typography variant="h4">MI查核缺失管理</Typography>
        </Box>
        {isLoading ? null : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h5" component="h2">
                  案號： {projectItem.ProjectDetail.ProjectNo}
                </Typography>
                <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                  檢核日期： {projectItem.ProjectDetail.InspectedDate}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" component="h2">
                  缺失面相
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                width: "100%",
              }}
            >
              <Box
                bgcolor="warning.light"
                sx={{
                  px: 3,
                  pb: 3,
                }}
              >
                <Typography variant="h6" component="h2">
                  查核時
                </Typography>
                <img
                  src={`/api/photo/${projectItemID}`}
                  width="100%"
                  height="400"
                />
              </Box>
              <Box
                bgcolor="error.light"
                sx={{
                  px: 3,
                }}
              >
                <Typography variant="h6" component="h2">
                  改善後
                </Typography>
                <img  width="100%" height="400" alt="未上傳照片" />
              </Box>
              <Box>
                <Typography variant="h6" component="h2">
                  查核說明：
                </Typography>
                <Box
                  bgcolor="warning.light"
                  sx={{
                    p: 2,
                  }}
                >
                  {projectItem.CheckDescription}
                </Box>
              </Box>
              <Box>
                <Typography variant="h6" component="h2">
                  改善說明：
                </Typography>
                <Box bgcolor="error.light"></Box>
              </Box>
            </Box>
          </>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 1,
            "& .MuiButton-root": { marginLeft: 1 },
          }}
        >
          <Button variant="contained" color="primary" type="submit">
            確認
          </Button>
          <Button variant="contained" color="error" onClick={toggle}>
            取消
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

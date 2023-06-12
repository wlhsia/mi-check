import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { yellow, blue } from "@mui/material/colors";

DetailModal.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  projectItem: PropTypes.object,
};

export default function DetailModal(props) {
  const { open, toggle, projectItem } = props;

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
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
              缺失面相： {projectItem.MissingFace} / 缺失類別：{" "}
              {projectItem.DangerLevel}
            </Typography>
            <Typography variant="h6" component="h2">
              責任人員：{projectItem.ImprovePerson} 責任主管：
              {projectItem.ImproveSupervisor}
            </Typography>
            <Typography variant="h6" component="h2">
              實完日期：
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
            bgcolor={yellow[100]}
            sx={{
              px: 3,
              pb: 3,
            }}
          >
            <Typography variant="h6" component="h2">
              查核時
            </Typography>
            <img
              src={`/api/photo/${projectItem.ProjectItemID}?photoType=check`}
              width="100%"
              height="400"
              alt="未上傳照片"
            />
          </Box>
          <Box
            bgcolor={blue[100]}
            sx={{
              px: 3,
            }}
          >
            <Typography variant="h6" component="h2">
              改善後
            </Typography>
            <img
              src={`/api/photo/${projectItem.ProjectItemID}?photoType=improve`}
              width="100%"
              height="400"
              alt="未上傳照片"
            />
          </Box>
          <Box>
            <Typography variant="h6" component="h2">
              查核說明：
            </Typography>
            <Box
              bgcolor={yellow[100]}
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
            <Box
              bgcolor={blue[100]}
              sx={{
                p: 2,
              }}
            >
              {projectItem.ImproveDescription}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 1,
            "& .MuiButton-root": { marginLeft: 1 },
          }}
        >
          <Typography variant="h6" component="h2">
            經理室專人：{projectItem.ProjectDetail.Manager.Name}
          </Typography>
          <Typography variant="h6" component="h2">
            主管：{projectItem.ProjectDetail.Supervisor.Name}
          </Typography>
          <Typography variant="h6" component="h2">
            經辦：{projectItem.ProjectDetail.InspectedUser.Name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 1,
            "& .MuiButton-root": { marginLeft: 1 },
          }}
        >
          <Button variant="contained" color="error" onClick={toggle}>
            關閉
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { DataGrid } from "@mui/x-data-grid";

import ListItems from "./ListItems";

const columns = [
  { field: "id", headerName: "項次", width: 70 },
  { field: "factory", headerName: "受檢廠", width: 70 },
  { field: "itemId", headerName: "評核項目序號", width: 130 },
  { field: "item", headerName: "評核項目", width: 130 },
  { field: "stdId", headerName: "評核標準序號", width: 130 },
  { field: "std", headerName: "評核標準", width: 520 },
  { field: "type", headerName: "缺失分類", width: 130 },
  { field: "score1", headerName: "參考配分", width: 130 },
  { field: "score2", headerName: "得分", width: 130 },
  { field: "description", headerName: "優缺點說明", width: 520 },
];

const rows = [
  {

    id: 1,
    itemId: "E01",
    item: "電氣室",
    stdId: "E01-001",
    std: "電氣室內備置連身工作服(至少1套)或電弧防護衣(至少1套)，供承包廠商或外稽人員使用。",
  },
  {
    id: 2,
    itemId: "E01",
    item: "電氣室",
    stdId: "E01-002",
    std: "電氣室內備置連身工作服(至少1套)或電弧防護衣(至少1套)，供承包廠商或外稽人員使用。",
  },
  {
    id: 3,
    itemId: "E01",
    item: "電氣室",
    stdId: "E01-003",
    std: "電氣室內備置連身工作服(至少1套)或電弧防護衣(至少1套)，供承包廠商或外稽人員使用。",
  },
  {
    id: 4,
    itemId: "E01",
    item: "電氣室",
    stdId: "E01-004",
    std: "電氣室內備置連身工作服(至少1套)或電弧防護衣(至少1套)，供承包廠商或外稽人員使用。",
  },
  {
    id: 5,
    itemId: "E01",
    item: "電氣室",
    stdId: "E01-005",
    std: "電氣室內備置連身工作服(至少1套)或電弧防護衣(至少1套)，供承包廠商或外稽人員使用。",
  },
  {
    id: 6,
    itemId: "E01",
    item: "電氣室",
    stdId: "E01-006",
    std: "電氣室內備置連身工作服(至少1套)或電弧防護衣(至少1套)，供承包廠商或外稽人員使用。",
  },
  {
    id: 7,
    itemId: "E01",
    item: "電氣室",
    stdId: "E01-007",
    std: "電氣室內備置連身工作服(至少1套)或電弧防護衣(至少1套)，供承包廠商或外稽人員使用。",
  },
  {
    id: 8,
    itemId: "E01",
    item: "電氣室",
    stdId: "E01-008",
    std: "電氣室內備置連身工作服(至少1套)或電弧防護衣(至少1套)，供承包廠商或外稽人員使用。",
  },
  {
    id: 9,
    itemId: "E01",
    item: "電氣室",
    stdId: "E01-009",
    std: "電氣室內備置連身工作服(至少1套)或電弧防護衣(至少1套)，供承包廠商或外稽人員使用。",
  },
];
const drawerWidth = "20rem";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <Button>建立專案</Button>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItems />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Typography></Typography>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="查核項目排訂" />
            <Tab label="查核&改善彙總" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box sx={{
            display: "flex",
            justifyContent: 'flex-end'
          }}>
            <Button variant="contained" color="warning" sx={{
              mr: 1
            }}>
              排定查核項目
            </Button>
            <Button variant="contained" color="success">
              匯出
            </Button>
          </Box>
          <Box sx={{ height: 500, width: '100%', mt: 1, backgroundColor: "white" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <Box sx={{
            display: "flex",
            justifyContent: 'flex-end'
          }}>
            <Button variant="contained" color="warning" sx={{
              mr: 1
            }}>
              查核上傳
            </Button>
            <Button variant="contained" color="success">
              改善上傳
            </Button>
          </Box>
          <Box sx={{ height: 500, width: '100%', mt: 1, backgroundColor: "white" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            /></Box>
        </TabPanel>
      </Box>
    </Box>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

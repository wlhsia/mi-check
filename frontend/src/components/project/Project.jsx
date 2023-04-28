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
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { DataGrid } from "@mui/x-data-grid";

import ListItems from "./ListItems";

const columns = [
  { field: "id", headerName: "項次", width: 70 },
  { field: "itemId", headerName: "評核項目序號", width: 130 },
  { field: "item", headerName: "評核項目", width: 130 },
  { field: "stdId", headerName: "評核標準序號", width: 130 },
  { field: "std", headerName: "評核標準", width: 520 },
  // { field: "type", headerName: "缺失分類", width: 130 },
  { field: "score1", headerName: "參考配分", width: 130 },
  // { field: "score2", headerName: "得分", width: 130 },
  // { field: "description", headerName: "優缺點說明", width: 520 },
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
    std: "防電弧服裝備設置完整，張貼著裝SOP照片。",
  },
  {
    id: 3,
    itemId: "E01",
    item: "電氣室",
    stdId: "E01-003",
    std: "清點絕緣防護器具清單與實物一致(一項扣0.5分):(1)外觀檢視、定期檢驗記錄及實測功能正常。(2)若採定期更新，請附領料單確認(不可逾期)。",
  },
  {
    id: 4,
    itemId: "E01",
    item: "電氣室",
    stdId: "E01-004",
    std: "盤體散熱風扇正常運轉、風向正確(抽查數量):(1)盤門上方排風扇對外排風(2)若風扇設置盤頂，需有防落水或異物掉入防護(3)下方進氣孔需有濾網且功能完整(盤門需蓋上)",
  },
  {
    id: 5,
    itemId: "E01",
    item: "電氣室",
    stdId: "E01-005",
    std: "防電弧鎖固螺絲完整上鎖(每1PC扣0.25分，每盤最多扣0.5分，扣完為止)(用手旋轉螺絲，不得轉動)",
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
          <Button variant="contained">建立查核案</Button>
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
            <Tab label="查核案設定" />
            <Tab label="查核項目排訂" />
            <Tab label="查核&改善彙總" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              "& .MuiTextField-root": { width: "25ch" },
            }}
          >
            <TextField
              label="案號"
              margin="normal"
              value={`PN-20230112-R001`}
            />
            <TextField label="受檢廠" margin="normal" />
            <TextField label="評核人員" margin="normal" />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="warning"
              sx={{
                mr: 1,
              }}
            >
              排定查核項目
            </Button>
            <Button variant="contained" color="success">
              匯出
            </Button>
          </Box>
          <Box
            sx={{ height: 500, width: "100%", mt: 1, backgroundColor: "white" }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="warning"
              sx={{
                mr: 1,
              }}
            >
              查核上傳
            </Button>
            <Button variant="contained" color="success">
              改善上傳
            </Button>
          </Box>
          <Box sx={{ width: "100%", mt: 1, backgroundColor: "white" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ border: 1 }} colSpan={14}>
                      設保組(各經理室)
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }} colSpan={6}>
                      生產廠
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" sx={{ border: 1 }}>
                      項次
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      機能別
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      評核日期
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      受檢事業部
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      受檢廠
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      評核項目
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      評核細目
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      評核標準
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      得分
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      查核說明
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      查核照片
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      缺失面相
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      缺失類別
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      缺失改善預完日期
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      缺失改善說明
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      缺失改善照片
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      缺失改善實完日期
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      改善部門
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      責任人員
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      責任主管
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center" sx={{ border: 1 }}>
                      1
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      電儀
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      2023/1/10
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      化二部
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      SM海豐
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      電器室
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      盤體器具燈號
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      盤體器具燈號、儀表指示正確，不得發生:異味、異音、異常跳脫、顯示文字不完整(每1PC扣0.25分)
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}></TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      燈號不亮
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      PN-20230110-E001B.jpg
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      例：管理面(下拉選單)
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      A/B/C
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      (2023/1/20)
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      檢修燈具
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      PN-20230110-E001A.jpg
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      2023/1/18
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}>
                      保養課
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1 }}></TableCell>
                    <TableCell align="center" sx={{ border: 1 }}></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

import * as React from "react";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "項次", width: 70 },
  { field: "itemId", headerName: "評核項目序號", width: 130 },
  { field: "item", headerName: "評核項目", width: 130 },
  { field: "stdId", headerName: "評核標準序號", width: 130 },
  { field: "std", headerName: "評核標準", width: 520 },
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

export default function Orders() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        sx={{ marginY: 2 }}
      >
        查核項目基本資料
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="電儀" />
            <Tab label="轉機" />
            <Tab label="靜態" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </Container>
  );
}

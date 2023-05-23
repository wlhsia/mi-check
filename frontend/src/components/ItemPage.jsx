import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";

import ItemList from "./item/ItemList";

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

export default function ItemPage() {
  // Tab
  const [tabValue, setTabValue] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="電儀" />
            <Tab label="轉機" />
            <Tab label="靜態" />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <ItemList itemTypeNo="E" itemType="電儀" />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <ItemList itemTypeNo="R" itemType="轉機" />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <ItemList itemTypeNo="S" itemType="靜態" />
        </TabPanel>
      </Box>
    </Container>
  );
}

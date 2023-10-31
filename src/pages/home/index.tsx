// Made by Poukam Pierre

import { Box, Tab, Tabs, Divider } from "@mui/material";
import App from "../../App";
import { useState } from "react";
import SendingTest from "../../components/sendingTest";
// import SendingPay from "../../components/sendingPay";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Home() {
  const [value, setValue] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <App />
      <Divider />
      <Box padding="20px">
        <Tabs value={value} onChange={handleChange} indicatorColor="primary">
          <Tab {...a11yProps(0)} label="Teste" />
          <Tab {...a11yProps(1)} label="Payant" />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <SendingTest />
        </CustomTabPanel>
        {/* <CustomTabPanel value={value} index={1}>
          <SendingPay />
        </CustomTabPanel> */}
      </Box>
    </>
  );
}

export default Home;

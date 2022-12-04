import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from "@mui/material";
import { useState } from "react";
import { TabPanel } from "@chakra-ui/react";

const CreatePage = () => {
  const [age, setAge] = useState("");
  const [seats, setSeats] = useState("");
  const [tab, setTab] = useState();

  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };

  const handleChangeSeats = (event) => {
    setSeats(event.target.value);
  };

  return (
    <div className="pt-10">
      <h1 className="text-center text-3xl">Create Route</h1>

      <div className="p-4 space-y-4">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Destination</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChangeAge}
          >
            <MenuItem value={10}>U.S Stel</MenuItem>
            <MenuItem value={20}>TUKE</MenuItem>
            <MenuItem value={30}>T-systems</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Free seats</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={seats}
            label="Age"
            onChange={handleChangeSeats}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </div>
    </div>
  );
};

export default CreatePage;

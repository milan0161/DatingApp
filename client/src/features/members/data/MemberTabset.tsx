import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Box from "@mui/material/Box";
import MemberTabPanel from "./MemberTabPanel";

type MemberTabsetProps = {
  username: string;
  introduction: string;
  lookingFor: string;
  interests: string;
};

const MemberTabSet = ({
  username,
  interests,
  introduction,
  lookingFor,
}: MemberTabsetProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", margin: "0 0 0 50px" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          TabIndicatorProps={{
            sx: {
              backgroundColor: "#ea580c",
            },
          }}
          sx={{
            color: "#ea580c",
            "& button:focus": { color: "black" },
            "& button:hover": { color: "#000" },
            "& button": { fontWeight: "bold" },
          }}
          value={value}
          onChange={handleChange}
          textColor="inherit"
        >
          <Tab label={`About ${username}`} value={0} />
          <Tab label="Interest" value={1} />
          <Tab label="Photos" value={2} />
          <Tab label="Messages" value={3} />
        </Tabs>
      </Box>
      <MemberTabPanel value={value} index={0}>
        <h4 className="text-[30px] text-bold mb-4">Description</h4>
        <p>{introduction}</p>
        <h4 className="text-[30px] text-bold my-4">Looking for</h4>
        <p>{lookingFor}</p>
      </MemberTabPanel>
      <MemberTabPanel value={value} index={1}>
        <h4 className="text-[30px] text-bold mb-4">Interests</h4>
        <p>{interests}</p>
      </MemberTabPanel>
      <MemberTabPanel value={value} index={2}>
        <p>Photos will go here</p>
      </MemberTabPanel>
      <MemberTabPanel value={value} index={3}>
        <p>Messages will go here</p>
      </MemberTabPanel>
    </Box>
  );
};

export default MemberTabSet;

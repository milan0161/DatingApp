import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Box from '@mui/material/Box';

type MemberTabsetProps = {
  username: string;
  children?: React.ReactNode;
  value: number;
  setValue: (num: number) => void;
  labels: string[];
};

const MemberTabSet = ({
  children,
  value,
  setValue,
  labels,
}: MemberTabsetProps) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', margin: '0 0 0 50px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          TabIndicatorProps={{
            sx: {
              backgroundColor: '#ea580c',
            },
          }}
          sx={{
            color: '#ea580c',
            '& button:focus': { color: 'black' },
            '& button:hover': { color: '#000' },
            '& button': { fontWeight: 'bold' },
          }}
          value={value}
          onChange={handleChange}
          textColor="inherit"
        >
          {labels.map((label, index) => {
            return <Tab key={index} label={`${label}`} value={index} />;
          })}
          {/* <Tab label={`About ${username}`} value={0} />
          <Tab label="Interest" value={1} />
          <Tab label="Photos" value={2} />
          <Tab label="Messages" value={3} /> */}
        </Tabs>
      </Box>
      {children}
    </Box>
  );
};

export default MemberTabSet;

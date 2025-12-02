import { FC } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type Props = {
  priority: string;
  onFilterPriority: (priority: string) => void;
};

const PriorityFilter: FC<Props> = ({ priority, onFilterPriority }) => {
  return (
    <Box my={2}>
      <FormControl fullWidth variant="standard">
        <InputLabel>優先度でフィルター</InputLabel>
        <Select
          value={priority}
          onChange={(e) => onFilterPriority(e.target.value)}
          label="優先度でフィルター"
        >
          <MenuItem value="all">すべて</MenuItem>
          <MenuItem value="high">高</MenuItem>
          <MenuItem value="medium">中</MenuItem>
          <MenuItem value="low">低</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default PriorityFilter;

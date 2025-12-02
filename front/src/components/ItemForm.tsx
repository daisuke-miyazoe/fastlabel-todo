import { FC, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

type Props = {
  onAddItem: (itemContent: string, priority: string) => Promise<void>;
};

const ItemForm: FC<Props> = ({ onAddItem }) => {
  const [itemContent, setItemContent] = useState("");
  const [priority, setPriority] = useState("medium");

  const onClickAdd = async () => {
    await onAddItem(itemContent, priority);
    setItemContent("");
    setPriority("medium");
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
      <TextField
        label="TODOを入力してください"
        value={itemContent}
        fullWidth
        onChange={(e) => setItemContent(e.target.value)}
        variant="standard"
      />
      <FormControl variant="standard" sx={{ minWidth: 120 }}>
        <InputLabel>優先度</InputLabel>
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          label="優先度"
        >
          <MenuItem value="high">高</MenuItem>
          <MenuItem value="medium">中</MenuItem>
          <MenuItem value="low">低</MenuItem>
        </Select>
      </FormControl>
      <IconButton onClick={() => onClickAdd()} color="primary">
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default ItemForm;

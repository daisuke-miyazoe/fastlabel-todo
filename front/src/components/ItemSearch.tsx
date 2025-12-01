import { FC } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

type Props = {
  keyword: string;
  onSearchItem: (keyword: string) => Promise<void>;
};

const ItemSearch: FC<Props> = ({ keyword, onSearchItem }) => {
  return (
    <Box>
      <TextField
        label="検索ワードを入力してください"
        value={keyword}
        variant="outlined"
        size="small"
        fullWidth
        onChange={(e) => {
          onSearchItem(e.target.value);
        }}
      />
    </Box>
  );
};

export default ItemSearch;

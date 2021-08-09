import React, { useState } from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { noop } from "../utils";

export interface ManualAccountInputProps {
  onChange?: (key: string) => void;
}

export default function ManualAccountInput({
  onChange = noop,
}: ManualAccountInputProps) {
  const [key, setKey] = useState("");
  const handleChange: TextFieldProps["onChange"] = (event) => {
    setKey(event.target.value);
  };

  return (
    <TextField
      id="key"
      label="Key"
      value={key}
      onChange={handleChange}
      variant="outlined"
      fullWidth
    />
  );
}

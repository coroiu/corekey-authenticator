import React, { useState } from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import { noop } from "../utils";
import { AppTheme } from "../Theme";

const useStyles = makeStyles((theme: AppTheme) => ({
  textInput: {
    marginBottom: theme.spacing(2),
  },
}));

export interface ManualAccountInputProps {
  onChange?: (key: string) => void;
}

export interface AccountInformation {
  account: string;
  issuer: string;
  key: string;
}

export default function ManualAccountInput({
  onChange = noop,
}: ManualAccountInputProps) {
  const classes = useStyles();
  const [accountInformation, setAccountInformation] =
    useState<AccountInformation>({
      account: "",
      issuer: "",
      key: "",
    });
  const handleChange =
    (property: keyof AccountInformation): TextFieldProps["onChange"] =>
    (event) => {
      setAccountInformation((accountInformation) => ({
        ...accountInformation,
        [property]: event.target.value,
      }));
    };

  return (
    <>
      <TextField
        className={classes.textInput}
        id="issuer"
        label="Issuer"
        value={accountInformation.issuer}
        onChange={handleChange("issuer")}
        variant="outlined"
        fullWidth
      />
      <TextField
        className={classes.textInput}
        id="account"
        label="Account"
        value={accountInformation.account}
        onChange={handleChange("account")}
        variant="outlined"
        fullWidth
      />
      <TextField
        className={classes.textInput}
        id="key"
        label="Key"
        value={accountInformation.key}
        onChange={handleChange("key")}
        variant="outlined"
        fullWidth
      />
    </>
  );
}
import { makeStyles } from '@material-ui/core';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import React, { useState } from 'react';

import { Key } from '../../modules/crypto/core/ports/account.service/key.model';
import { NewAccount } from '../../modules/crypto/core/ports/account.service/new-account.model';
import { AppTheme } from '../Theme';
import { noop } from '../utils';

const useStyles = makeStyles((theme: AppTheme) => ({
  textInput: {
    marginBottom: theme.spacing(2),
  },
}));

export interface ManualAccountInputProps {
  onChange?: (key: NewAccount) => void;
}

export default function ManualAccountInput({
  onChange = noop,
}: ManualAccountInputProps) {
  const classes = useStyles();
  const [accountInformation, setAccountInformation] = useState<NewAccount>({
    name: "",
    issuer: "",
    key: {
      type: "tkey",
      secret: "",
    },
  });
  const handleChange =
    (property: keyof NewAccount): TextFieldProps["onChange"] =>
    (event) => {
      setAccountInformation((accountInformation) => ({
        ...accountInformation,
        [property]: event.target.value,
      }));
      onChange(accountInformation);
    };

  const handleKeyChange =
    (property: keyof Key): TextFieldProps["onChange"] =>
    (event) => {
      setAccountInformation((accountInformation) => ({
        ...accountInformation,
        key: {
          ...accountInformation.key,
          [property]: event.target.value,
        },
      }));
      onChange(accountInformation);
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
        id="name"
        label="Name"
        value={accountInformation.name}
        onChange={handleChange("name")}
        variant="outlined"
        fullWidth
      />
      <TextField
        className={classes.textInput}
        id="secret"
        label="secret"
        value={accountInformation.key.secret}
        onChange={handleKeyChange("secret")}
        variant="outlined"
        fullWidth
      />
    </>
  );
}

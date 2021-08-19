import { makeStyles } from '@material-ui/core';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import React, { useState } from 'react';

import { Key } from '../../modules/crypto/core/ports/account.service/key.model';
import { NewAccount } from '../../modules/crypto/core/ports/account.service/new-account.model';
import { AppTheme } from '../Theme';
import { ReactState } from '../utils';

const useStyles = makeStyles((theme: AppTheme) => ({
  textInput: {
    marginBottom: theme.spacing(2),
  },
}));

export interface ManualAccountInputProps {
  accountState: ReactState<NewAccount>;
}

export default function ManualAccountInput({
  accountState: [account, setAccount],
}: ManualAccountInputProps) {
  const classes = useStyles();
  const handleChange =
    (property: keyof NewAccount): TextFieldProps["onChange"] =>
    (event) => {
      setAccount((a) => ({
        ...a,
        [property]: event.target.value,
      }));
    };

  const handleKeyChange =
    (property: keyof Key): TextFieldProps["onChange"] =>
    (event) => {
      setAccount((accountInformation) => ({
        ...accountInformation,
        key: {
          ...accountInformation.key,
          [property]: event.target.value,
        },
      }));
    };

  return (
    <>
      <TextField
        className={classes.textInput}
        id="issuer"
        label="Issuer"
        value={account.issuer}
        onChange={handleChange("issuer")}
        variant="outlined"
        fullWidth
      />
      <TextField
        className={classes.textInput}
        id="name"
        label="Name"
        value={account.name}
        onChange={handleChange("name")}
        variant="outlined"
        fullWidth
      />
      <TextField
        className={classes.textInput}
        id="secret"
        label="Secret"
        value={account.key.secret}
        onChange={handleKeyChange("secret")}
        variant="outlined"
        fullWidth
      />
    </>
  );
}

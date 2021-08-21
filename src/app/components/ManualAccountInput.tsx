import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useState } from 'react';

import { Key } from '../../modules/crypto/core/ports/account.service/key.model';
import { NewAccount } from '../../modules/crypto/core/ports/account.service/new-account.model';
import { AppTheme } from '../Theme';
import { ReactState } from '../utils';

const useStyles = makeStyles((theme: AppTheme) => ({
  input: {
    marginBottom: theme.spacing(2),
    "&:last-child": {
      marginBottom: "none",
    },
  },
  advanced: {
    margin: theme.spacing(0, 0, 2, 0),
    borderRadius: theme.shape.borderRadius,
    "&.Mui-expanded": {
      margin: theme.spacing(0, 0, 2, 0),
    },
    "&::before": {
      display: "none",
    },
    "& .MuiAccordionDetails-root": {
      flexDirection: "column",
    },
  },
}));

type ChangeHandler = (event: { target: { value: unknown } }) => void;

export interface ManualAccountInputProps {
  accountState: ReactState<NewAccount>;
}

function parseInt(value: string): number | undefined {
  const int = Number.parseInt(value);
  return int === NaN ? undefined : int;
}

export default function ManualAccountInput({
  accountState: [account, setAccount],
}: ManualAccountInputProps) {
  const classes = useStyles();
  const handleChange =
    (property: keyof NewAccount): ChangeHandler =>
    (event) => {
      setAccount((a) => ({
        ...a,
        [property]: event.target.value,
      }));
    };

  const handleKeyChange =
    (property: keyof Key): ChangeHandler =>
    (event) => {
      setAccount((accountInformation) => ({
        ...accountInformation,
        key: {
          ...accountInformation.key,
          [property]: event.target.value,
        },
      }));
    };

  const handleLengthChange: ChangeHandler = (event) => {
    setAccount((accountInformation) => ({
      ...accountInformation,
      key: {
        ...accountInformation.key,
        length: parseInt(event.target.value as string),
      },
    }));
  };

  return (
    <>
      <TextField
        className={classes.input}
        id="issuer"
        label="Issuer"
        value={account.issuer}
        onChange={handleChange("issuer")}
        variant="outlined"
        fullWidth
      />
      <TextField
        className={classes.input}
        id="name"
        label="Name"
        value={account.name}
        onChange={handleChange("name")}
        variant="outlined"
        fullWidth
      />
      <TextField
        className={classes.input}
        id="secret"
        label="Secret"
        value={account.key.secret}
        onChange={handleKeyChange("secret")}
        variant="outlined"
        fullWidth
      />

      <Accordion className={classes.advanced}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="advanced-settings"
          id="advanced-settings"
        >
          <Typography>Advanced</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            className={classes.input}
            id="code-length"
            label="Code length"
            type="number"
            value={account.key.length}
            onChange={handleLengthChange}
            variant="outlined"
            fullWidth
          />
          <FormControl className={classes.input} variant="outlined" fullWidth>
            <InputLabel htmlFor="key-method">Method</InputLabel>
            <Select
              value={account.key.length}
              onChange={handleKeyChange("method")}
              label="Method"
              inputProps={{
                name: "method",
                id: "key-method",
              }}
            >
              <MenuItem value={undefined}>
                <em>Auto</em>
              </MenuItem>
              <MenuItem value="sha1">SHA-1</MenuItem>
              <MenuItem value="sha256">SHA-256</MenuItem>
              <MenuItem value="sha512">SHA-512</MenuItem>
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

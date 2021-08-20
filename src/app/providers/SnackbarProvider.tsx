import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { AppTheme } from '../Theme';

export interface SnackbarContent {
  message: string;
}

export interface SnackbarContext {
  showSnackbar: (content: SnackbarContent) => void;
}

const Context = createContext<SnackbarContext | null>(null);

const useStyles = makeStyles((theme: AppTheme) => ({}));

export function SnackbarProvider({ children }: PropsWithChildren<{}>) {
  const classes = useStyles();
  const [content, setContent] = useState<SnackbarContent | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const context: SnackbarContext = {
    showSnackbar: (content) => {
      setContent(content);
      setOpen(true);
    },
  };

  const handleClose = (
    event: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Context.Provider value={context}>
      {children}
      <Snackbar
        key={content?.message}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={content?.message}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Context.Provider>
  );
}

export function useSnackbar() {
  const value = useContext(Context);
  if (value === null) {
    throw new Error("A required provider is not present in this context.");
  }

  return { showSnackbar: value.showSnackbar };
}

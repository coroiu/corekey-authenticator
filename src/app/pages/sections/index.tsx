import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react';

import { AppTheme } from '../../Theme';
import NewAccountSection from './NewAccountSection';

const useStyles = makeStyles((theme: AppTheme) => ({
  menuButton: {},
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    height: "100%",
  },
}));

interface SectionHeaderProps {
  title: string;
  isOpen: boolean;
  close: () => void;
}

function SectionHeader({ title, isOpen, close }: SectionHeaderProps) {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <IconButton
          edge="end"
          className={classes.menuButton}
          color="inherit"
          aria-label="close"
          onClick={close}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default function Sections() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition={true}
      PaperProps={{
        className: classes.drawerPaper,
      }}
    >
      <SectionHeader
        title="New Account"
        isOpen={open}
        close={() => setOpen(false)}
      />
      <NewAccountSection />
    </Drawer>
  );
}

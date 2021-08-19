import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React, { useContext } from 'react';
import { PropsWithChildren, useState } from 'react';

import { AppTheme } from '../Theme';

export interface SlideProps {}

export interface Slide {
  title: string;
  element: (props: SlideProps) => JSX.Element;
}

const useStyles = makeStyles((theme: AppTheme) => ({
  menuButton: {},
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    height: "100%",
  },
}));

interface SlideHeaderProps {
  title: string;
  close: () => void;
}

function SlideHeader({ title, close }: SlideHeaderProps) {
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

export interface SlidesContext {
  showSlide: (slide: Slide) => void;
}

const Context = React.createContext<SlidesContext | null>(null);

export function SlidesProvider({ children }: PropsWithChildren<{}>) {
  const classes = useStyles();
  const [slide, setSlide] = useState<Slide | null>(null);

  const context: SlidesContext = {
    showSlide: setSlide,
  };
  return (
    <Context.Provider value={context}>
      {children}
      {slide === null ? null : (
        <Drawer
          anchor="bottom"
          open={slide !== null}
          onClose={() => setSlide(null)}
          PaperProps={{
            className: classes.drawerPaper,
          }}
        >
          <SlideHeader title={slide.title} close={() => setSlide(null)} />
          <slide.element />
        </Drawer>
      )}
    </Context.Provider>
  );
}

export function useSlides() {
  const value = useContext(Context);
  if (value === null) {
    throw new Error("A required provider is not present in this context.");
  }

  return { showSlide: value.showSlide };
}

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React, { useContext } from 'react';
import { PropsWithChildren, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { AppTheme } from '../Theme';

export interface SlideProps<ComponentProps = unknown> {
  close: () => void;
  componentProps: ComponentProps;
}

export interface Slide<ComponentProps = unknown> {
  title: string;
  props: ComponentProps;
  paper?: "normal" | "inverted";
  element: (slideProps: SlideProps<ComponentProps>) => JSX.Element | null;
}

const useStyles = makeStyles((theme: AppTheme) => ({
  menuButton: {},
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    height: "100%",
  },
  drawerPaperInverted: {
    height: "100%",
    background: theme.palette.background.default,
  },
  content: {
    height: "100%",
    transition: theme.transitions.create(["transform"], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
  },
  covered: {
    transform: "scale(0.85, 0.85)",
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
  showSlide: (
    slide: Slide<any>,
    options?: { replaceCurrentSlide?: boolean }
  ) => void;
}

interface SlidesProviderState {
  stack: Slide[];
}

const initialState: SlidesProviderState = {
  stack: [],
};

const Context = React.createContext<SlidesContext | null>(null);

export function SlidesProvider({ children }: PropsWithChildren<{}>) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation<{ currentSlide?: number }>();
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useState<SlidesProviderState>(initialState);

  const currentSlideInState = location.state?.currentSlide;
  let currentSlideIndex: number;
  if (
    currentSlideInState === undefined ||
    currentSlideInState < 0 ||
    state.stack.length === 0
  ) {
    currentSlideIndex = -1;
  } else if (currentSlideInState > state.stack.length - 1) {
    currentSlideIndex = state.stack.length - 1;
  } else {
    currentSlideIndex = currentSlideInState;
  }

  const context: SlidesContext = {
    showSlide: (slide, { replaceCurrentSlide = false } = {}) => {
      setState((oldState) => {
        if (replaceCurrentSlide) {
          if (currentSlideIndex < 0) {
            throw new Error("There is no slide to replace.");
          }
          history.replace({
            state: { currentSlide: currentSlideIndex },
          });
          return {
            stack: [
              ...oldState.stack.slice(0, Math.max(0, currentSlideIndex)), // throw away the rest of the forward history and the current slide
              slide,
            ],
          };
        } else {
          history.push({
            state: { currentSlide: currentSlideIndex + 1 },
          });
          return {
            stack: [
              ...oldState.stack.slice(0, Math.max(0, currentSlideIndex + 1)), // throw away the rest of the forward history
              slide,
            ],
          };
        }
      });
      setOpen(true);
    },
  };

  function onExited() {
    if (open === false) {
      setState(initialState);
    }
  }

  function close() {
    setOpen(false);
  }

  const slide = currentSlideIndex < 0 ? null : state.stack[currentSlideIndex];

  if (slide === null && open) {
    close();
  }

  return (
    <Context.Provider value={context}>
      <div className={`${classes.content} ${open ? classes.covered : ""}`}>
        {children}
      </div>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={close}
        PaperProps={{
          className:
            slide?.paper === "inverted"
              ? classes.drawerPaperInverted
              : classes.drawerPaper,
        }}
        SlideProps={{
          onExited,
        }}
      >
        {slide === null ? null : (
          <>
            <SlideHeader title={slide.title} close={close} />
            <slide.element componentProps={slide.props} close={close} />
          </>
        )}
      </Drawer>
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

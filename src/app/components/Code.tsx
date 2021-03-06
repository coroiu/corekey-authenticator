import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { animated, useTransition } from 'react-spring';

import { AppTheme } from '../Theme';
import { noop } from '../utils';

const segmentGap = "0.5rem";

const useSegmentStyles = makeStyles((theme: AppTheme) => ({
  root: {
    position: "relative",
    maxWidth: ({ size }: SegmentProps) =>
      size === "large" ? largeCodeHeight : codeHeight,
    marginRight: ({ gap }: SegmentProps) => (gap ? segmentGap : 0),
    flex: "1 1",
  },
  animatedDiv: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  segment: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    background: ({ color }: SegmentProps) => color ?? theme.palette.grey[300],
  },
  character: {
    fontSize: ({ size }: SegmentProps) =>
      size === "normal" ? "1rem" : "1.25rem",
    fontWeight:
      theme.palette.type === "light"
        ? theme.typography.fontWeightBold
        : theme.typography.fontWeightLight,
  },
}));

interface SegmentProps {
  character: string;
  gap: boolean;
  index: number;
  animateInitial: boolean;
  codeKey: string;
  size: "normal" | "large";
  color?: string;
}

function Segment(props: SegmentProps) {
  const { character } = props;
  const classes = useSegmentStyles(props);

  return (
    <Paper className={classes.segment} elevation={0}>
      <div className={classes.character}>{character}</div>
    </Paper>
  );
}

function AnimatedSegment(props: SegmentProps) {
  const { index, animateInitial } = props;
  const classes = useSegmentStyles(props);

  const transitions = useTransition(props, {
    initial: animateInitial ? undefined : { opacity: 1, y: "0%" },
    from: { opacity: 0, y: "-100%" },
    enter: { opacity: 1, y: "0%" },
    leave: { opacity: 0, y: "50%" },
    delay: index * 50,
    key: props.codeKey,
  });

  return (
    <div className={classes.root}>
      {transitions((style, value) => (
        <animated.div style={style} className={classes.animatedDiv}>
          <Segment {...value} />
        </animated.div>
      ))}
    </div>
  );
}

export const codeHeight: string = "2.5rem";
export const largeCodeHeight: string = "3rem";

const useCodeStyles = makeStyles((theme: AppTheme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    height: ({ size }: CodeProps) =>
      size === "large" ? largeCodeHeight : codeHeight,
    gap: segmentGap,
  },
}));

export interface CodeProps {
  code: string;
  size?: "normal" | "large";
  animateInitial?: boolean;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export default function Code(props: CodeProps) {
  const {
    code,
    color,
    size = "normal",
    animateInitial = false,
    className = "",
    onClick = noop,
  } = props;
  const classes = useCodeStyles(props);
  const characters = Array.from(code);

  function handleOnClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
    onClick();
  }

  return (
    <div onClick={handleOnClick} className={`${classes.root} ${className}`}>
      {characters.map((character, index) => (
        <AnimatedSegment
          character={character}
          index={index}
          color={color}
          animateInitial={animateInitial}
          codeKey={code}
          size={size}
          gap={Math.floor((characters.length - 1) / 2) === index}
        />
      ))}
    </div>
  );
}

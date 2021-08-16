import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { animated, useTransition } from 'react-spring';

import { AppTheme } from '../Theme';

const segmentGap = "0.5rem";

const useSegmentStyles = makeStyles((theme: AppTheme) => ({
  root: {
    position: "relative",
    aspectRatio: "1 / 1",
    marginRight: ({ gap }: SegmentProps) => (gap ? segmentGap : 0),
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
    background: ({ color }: SegmentProps) => color ?? theme.palette.grey[100],
  },
  character: {
    fontSize: "1rem",
    fontWeight: theme.typography.fontWeightBold,
  },
}));

interface SegmentProps {
  codeKey: string;
  character: string;
  gap: boolean;
  index: number;
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
  const { codeKey, index } = props;
  const classes = useSegmentStyles(props);

  const transitions = useTransition(props, {
    initial: { opacity: 1, y: "0%" },
    from: { opacity: 0, y: "-100%" },
    enter: { opacity: 1, y: "0%" },
    leave: { opacity: 0, y: "50%" },
    delay: index * 50,
    key: codeKey,
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

const useCodeStyles = makeStyles((theme: AppTheme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    height: "2.5rem",
    gap: segmentGap,
  },
}));

export interface CodeProps {
  code: {
    generatedAt: Date;
    value: string;
  };
  color?: string;
}

export default function Code({ code, color }: CodeProps) {
  const classes = useCodeStyles();
  const characters = Array.from(code.value);

  return (
    <div className={classes.root}>
      {characters.map((character, index) => (
        <AnimatedSegment
          codeKey={code.generatedAt.toString()}
          character={character}
          index={index}
          color={color}
          gap={Math.floor((characters.length - 1) / 2) === index}
        />
      ))}
    </div>
  );
}

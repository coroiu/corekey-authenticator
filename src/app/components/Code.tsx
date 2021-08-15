import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import { AppTheme } from '../Theme';

const segmentGap = "0.5rem";

const useSegmentStyles = makeStyles((theme: AppTheme) => ({
  segment: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: "1 / 1",
    marginRight: ({ gap }: SegmentProps) => (gap ? segmentGap : 0),
    background: ({ color }: SegmentProps) => color ?? theme.palette.grey[100],
  },
  character: {
    fontSize: "1rem",
    fontWeight: theme.typography.fontWeightBold,
  },
}));

interface SegmentProps {
  character: string;
  gap: boolean;
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

const useCodeStyles = makeStyles((theme: AppTheme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    height: "2.5rem",
    gap: segmentGap,
  },
}));

export interface CodeProps {
  code: string;
  color?: string;
}

export default function Code({ code, color }: CodeProps) {
  const classes = useCodeStyles();
  const characters = Array.from(code);

  return (
    <div className={classes.root}>
      {characters.map((character, index) => (
        <Segment
          character={character}
          color={color}
          gap={Math.floor((characters.length - 1) / 2) === index}
        />
      ))}
    </div>
  );
}

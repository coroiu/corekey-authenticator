import { makeStyles } from '@material-ui/core';
import QrScanner from 'qr-scanner';
import { useEffect, useRef, useState } from 'react';

import { Slide, SlideProps, useSlides } from '../providers/SlidesProvider';
import { useSnackbar } from '../providers/SnackbarProvider';
import { AppTheme } from '../Theme';
import NewAccountManualInputSlide from './NewAccountManualInputSlide';

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: theme.palette.common.black,
  },
}));

function NewAccountCodeScanSlide({ close }: SlideProps) {
  const classes = useStyles();
  const { showSlide } = useSlides();
  const { showSnackbar } = useSnackbar();
  const videoElRef = useRef<HTMLVideoElement | null>(null);
  const qrScannerRef = useRef<QrScanner | null>();

  useEffect(() => {
    (async () => {
      if (videoElRef.current === null) return;

      qrScannerRef.current = new QrScanner(videoElRef.current, (result) =>
        console.log("decoded qr code:", result)
      );

      try {
        await qrScannerRef.current.start();
      } catch (ex) {
        showSnackbar({ message: "Camera not available, using manual input." });
        showSlide(NewAccountManualInputSlide);
      }
    })();

    return () => qrScannerRef.current?.stop();
  }, [videoElRef.current]);

  return (
    <div className={classes.root}>
      NewAccountCodeScanSlide
      <video ref={videoElRef} className={classes.video}></video>
    </div>
  );
}

export default {
  title: "New account",
  element: NewAccountCodeScanSlide,
} as Slide;

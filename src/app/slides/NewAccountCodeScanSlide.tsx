import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SwitchCameraOutlinedIcon from '@material-ui/icons/SwitchCameraOutlined';
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
  camera: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    backgroud: "rgba(0, 0, 0, 0.25)",

    "& .MuiSvgIcon-root": {
      color: theme.palette.common.white,
    },
  },
  manual: {
    position: "absolute",
    bottom: theme.spacing(2),
    left: "50%",
    transform: "translate(-50%, 0)",
  },
}));

function NewAccountCodeScanSlide({ close }: SlideProps) {
  const classes = useStyles();
  const { showSlide } = useSlides();
  const { showSnackbar } = useSnackbar();
  const videoElRef = useRef<HTMLVideoElement | null>(null);
  const qrScannerRef = useRef<QrScanner | null>();
  const [cameras, setCameras] = useState<QrScanner.Camera[]>([]);
  const [cameraMenuAnchorEl, setCameraMenuAnchorEl] =
    useState<HTMLElement | null>(null);

  const handleCameraClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCameraMenuAnchorEl(event.currentTarget);
  };

  const handleCameraClose = () => {
    setCameraMenuAnchorEl(null);
  };

  const handleCameraChange = (camera: QrScanner.Camera) => {
    handleCameraClose();
    qrScannerRef.current?.setCamera(camera.id);
  };

  useEffect(() => {
    (async () => {
      if (videoElRef.current === null) return;

      qrScannerRef.current = new QrScanner(
        videoElRef.current,
        (result) => console.log("decoded qr code:", result),
        undefined,
        undefined,
        "environment"
      );

      try {
        setCameras(await QrScanner.listCameras(true));
        await qrScannerRef.current.start();
      } catch (ex) {
        showSnackbar({ message: "Camera not available, using manual input." });
        showSlide(NewAccountManualInputSlide);
      }
    })();

    return () => qrScannerRef.current?.stop();
  }, [videoElRef.current, setCameras]);

  return (
    <div className={classes.root}>
      NewAccountCodeScanSlide
      <video ref={videoElRef} className={classes.video}></video>
      {cameras.length <= 1 ? null : (
        <>
          <IconButton
            aria-label="switch camera"
            className={classes.camera}
            onClick={handleCameraClick}
          >
            <SwitchCameraOutlinedIcon fontSize="large" />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={cameraMenuAnchorEl}
            keepMounted
            open={Boolean(cameraMenuAnchorEl)}
            onClose={handleCameraClose}
          >
            {cameras.map((c) => (
              <MenuItem onClick={() => handleCameraChange(c)}>
                {c.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
      <Button
        className={classes.manual}
        variant="contained"
        onClick={() => showSlide(NewAccountManualInputSlide)}
      >
        Input code manually
      </Button>
    </div>
  );
}

export default {
  title: "New account",
  element: NewAccountCodeScanSlide,
} as Slide;

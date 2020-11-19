import React, { useState } from 'react';

import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Fade,
  Grid,
  Icon,
  IconButton,
  Typography,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { IDocument } from 'modules/Candidates/views/DocumentsView/typings';
import { Document, Page, pdfjs } from 'react-pdf';
import KButton from 'components/KButton/';
import Link from '@material-ui/core/Link';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    minWidth: '30vw',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  pdfViewer: {
    backgroundColor: 'grey',
    boxShadow: 'inset 0px 0px 10px 0px rgba(0,0,0,0.6)',
    position: 'relative',
  },
  pdfControls: {
    zIndex: 'auto',
    color: '#ffffffb8',
    backgroundColor: 'rgba(0,0,0,0.5)',
    boxShadow: '0px 3px 2px 0px rgba(0,0,0,0.39)',
    marginBottom: '-50px',
    '& > button': {
      color: '#ffffffb8',
    },
  },
  pdfContainer: {
    overflow: 'auto',
  },
  pdfPage: {
    position: 'absolute',
    marginTop: '60px',
    boxShadow: `0px 2px 1px -1px rgba(0,0,0,0.2),
      0px 1px 1px 0px rgba(0,0,0,0.14),
      0px 1px 3px 0px rgba(0,0,0,0.12)`,
    display: 'inline-block',
  },
}));

export interface DocumentPreviewProps {
  open: boolean;
  handleClose: () => void;
  documentClicked: IDocument | null;
}

interface DialogTitleProps {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
  setPageNumber: any;
}

const DialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, setPageNumber, ...other } = props;
  const classes = useStyles();

  return (
    <MuiDialogTitle
      disableTypography
      className={classes.root}
      {...other}
    >
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => {
            setPageNumber(1);
            onClose();
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  open,
  handleClose,
  documentClicked,
}) => {
  const [scale, setScale] = useState<number>(1);
  const [checked, setChecked] = useState<boolean>(false);
  const [numberPages, setNumberPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const classes = useStyles();

  const handlePreviousClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    const prev = pageNumber - 1;
    setPageNumber(prev);
  };

  const handleNextClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    const next = pageNumber + 1;
    setPageNumber(next);
  };

  const onDocumentLoadSuccess = (
    { numPages }: React.ComponentState,
    setNumberPages: React.ComponentState,
  ) => {
    setNumberPages(numPages);
  };

  return (
    <Dialog
      onClose={() => {
        setPageNumber(1);
        handleClose();
      }}
      aria-labelledby="customized-dialog-title"
      open={open}
      style={{ zIndex: 9999 }}
      maxWidth={false}
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
        setPageNumber={setPageNumber}
      >
        {documentClicked?.name}
      </DialogTitle>
      <DialogContent dividers>
        {documentClicked?.type === 'application/pdf' ? (
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            {documentClicked ? (
              <Grid
                item
                container
                direction="column"
                justify="flex-start"
                className={classes.pdfViewer}
                onMouseEnter={() => {
                  setChecked(true);
                }}
                onMouseLeave={() => setChecked(false)}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: '0px',
                    top: '50%',
                    zIndex: 1,
                  }}
                >
                  {checked && numberPages > 1 && (
                    <KButton
                      variant="contained"
                      disabled={pageNumber <= 1}
                      onClick={handlePreviousClick}
                    >
                      Previous
                    </KButton>
                  )}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    right: '0px',
                    top: '50%',
                    zIndex: 1000,
                  }}
                >
                  {checked && numberPages > 1 && (
                    <KButton
                      variant="contained"
                      disabled={pageNumber >= numberPages}
                      onClick={handleNextClick}
                    >
                      Next
                    </KButton>
                  )}
                </div>
                <Fade in={checked}>
                  <Grid
                    item
                    container
                    justify="space-around"
                    alignItems="center"
                    className={classes.pdfControls}
                    style={{ zIndex: 2 }}
                  >
                    <p>
                      Page {pageNumber || 1} of {numberPages || '--'}{' '}
                    </p>
                    Scale: {scale}
                    <IconButton
                      onClick={() => setScale((prev) => prev + 0.5)}
                    >
                      <Icon>zoom_in</Icon>
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        setScale((prev) =>
                          prev > 0.75 ? prev - 0.5 : prev,
                        )
                      }
                    >
                      <Icon>zoom_out</Icon>
                    </IconButton>
                    <Link
                      href={documentClicked?.path}
                      download={documentClicked?.name}
                      target="_blank"
                      rel="noopener"
                    >
                      <KButton size="small">Download</KButton>
                    </Link>
                  </Grid>
                </Fade>
                <Grid item>
                  <Container className={classes.pdfContainer}>
                    <Document
                      file={documentClicked.path}
                      onLoadSuccess={(event) =>
                        onDocumentLoadSuccess(event, setNumberPages)
                      }
                    >
                      <Page
                        className={classes.pdfPage}
                        pageNumber={pageNumber}
                        scale={scale}
                        renderAnnotationLayer={false}
                      />
                    </Document>
                  </Container>
                </Grid>
              </Grid>
            ) : (
              <Grid item>
                <p>Click on a Document to view a bigger preview</p>
              </Grid>
            )}
          </Grid>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Link
              href={documentClicked?.path}
              download={documentClicked?.name}
              target="_blank"
              rel="noopener"
            >
              <KButton>Download</KButton>
            </Link>
          </div>
        )}
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default DocumentPreview;

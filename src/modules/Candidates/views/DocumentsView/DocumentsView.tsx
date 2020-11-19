import {
  Grid,
  GridList,
  makeStyles,
  GridListTile,
  createStyles,
} from '@material-ui/core/';

import { useSelector } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import { Document, Page, pdfjs } from 'react-pdf';
import React, { FC, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteDocument } from 'store/documents/thunks';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import KButton from 'components/KButton/';
import KModalCard from 'components/KModalCard';
import UploadDialog from './partials/UploadDialog';
import DocumentPreview from './partials/DocumentPreview';
import { selectorDocumentData } from 'store/documents/selectors';
import { IDocument } from 'modules/Candidates/views/DocumentsView/typings';
import { DOCUMENT_URL } from 'config';
import styles from './DocumentsView.module.scss';
import documentService from 'services/document.service';
import { getRole } from 'utils/helpers';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'space-around',
      // flexGrow: 1,
    },
    container: {
      margin: '24px 0',
    },

    gridList: {
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      overflow: 'auto',
      width: '100%',
      transform: 'translateZ(0)',
    },

    smallPdf: {
      boxShadow: `0px 2px 1px -1px rgba(0,0,0,0.2),
      0px 1px 1px 0px rgba(0,0,0,0.14),
      0px 1px 3px 0px rgba(0,0,0,0.12)`,
      display: 'inline-block',
    },
  }),
);
interface IDocumentViewProps {}

const DocumentsView: FC<IDocumentViewProps> = () => {
  const classes = useStyles();
  const docs: IDocument[] = useSelector(selectorDocumentData);
  const [
    documentClicked,
    setDocumentClicked,
  ] = useState<IDocument | null>(null);
  const [open, setOpen] = useState(false);
  const [openDocument, setOpenDocument] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deleteId, setdeleteId] = useState<number | null>(null);
  const [shownDocs, setShownDocs] = useState<IDocument[]>([]);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDocument = () => {
    setOpenDocument(false);
  };

  const updateDocument = async (document: IDocument) => {
    const {
      id,
      name,
      description,
      candidateId,
      type,
      file,
    } = document;

    const path = await documentService.getDocument(
      `${DOCUMENT_URL}/${document.path}`,
    );

    const newDocument = {
      id,
      name,
      description,
      type,
      candidateId,
      path,
      file,
    };
    return newDocument;
  };

  useEffect(() => {
    async function getUpdatedDocuments() {
      const newDocuments = await Promise.all(
        docs.map(async (document) => await updateDocument(document)),
      );
      setShownDocs(newDocuments);
    }
    getUpdatedDocuments();
  }, [docs]);

  const handleDocumentClick = (event: unknown, pdf: IDocument) => {
    setDocumentClicked(pdf);
    setOpenDocument(true);
  };

  return (
    <div className={classes.container}>
      <KModalCard
        open={openModal}
        onClose={() => setOpenModal(false)}
        type={'confirmation'}
        confirmFn={() => {
          dispatch(deleteDocument(deleteId as number));
        }}
        confirmMsg={'You will not be able to recover this file!'}
        confirmBtn={'Delete File!'}
        setOpenModal={setOpenModal}
      />
      <div className={styles.uploadButton}>
        <KButton onClick={handleClickOpen}>UPLOAD</KButton>
      </div>

      <Grid
        item
        container
        direction="row"
        spacing={2}
        justify="space-between"
        wrap="nowrap"
      >
        <Grid item container justify="flex-end" spacing={1}>
          <UploadDialog open={open} handleClose={handleClose} />
          <DocumentPreview
            open={openDocument}
            handleClose={handleCloseDocument}
            documentClicked={documentClicked}
          />
          <Grid item container direction="column" spacing={2}>
            <Grid item className={classes.root}>
              <GridList
                className={classes.gridList}
                style={{ margin: '0 40px' }}
                cols={5}
                cellHeight="auto"
                spacing={5}
              >
                {!shownDocs.length
                  ? Array(5)
                      .fill(null)
                      .map((el: any, id: number) => {
                        return (
                          <GridListTile key={id}>
                            <Skeleton
                              variant="rect"
                              width={110}
                              height={150}
                            />
                          </GridListTile>
                        );
                      })
                  : shownDocs.map((document: IDocument) => {
                      return (
                        <GridListTile key={document.id}>
                          {getRole() !== 'INTERVIEWER' && (
                            <div
                              className={styles.delete}
                              onClick={() => {
                                setOpenModal(true);
                                setdeleteId(document.id as number);
                              }}
                            >
                              &times;
                            </div>
                          )}
                          <div
                            className={styles.document}
                            onClick={(event) => {
                              handleDocumentClick(event, document);
                            }}
                          >
                            {document.type === 'application/pdf' ? (
                              <Document
                                loading={<Skeleton />}
                                file={document.path}
                              >
                                <Page
                                  className={classes.smallPdf}
                                  width={120}
                                  scale={1}
                                  pageNumber={1}
                                  renderTextLayer={false}
                                  renderAnnotationLayer={false}
                                />
                              </Document>
                            ) : (
                              <div className={styles.documentPreview}>
                                <DescriptionOutlinedIcon />
                                <p>{`${document.name}`}</p>
                              </div>
                            )}
                          </div>
                        </GridListTile>
                      );
                    })}
              </GridList>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default DocumentsView;

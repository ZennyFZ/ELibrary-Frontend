import { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./PDFViewer.scss";
import { Box, Button, Modal } from "@mui/material";
import { useLocation } from "react-router-dom";
import { summarize } from "../../apis/SummarizationService";
import MarkdownPreview from "@uiw/react-markdown-preview";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/"
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
};
const PDFViewer = () => {
  const pdf = useLocation().state.Link;
  const bookName = useLocation().state.name;
  const path = useLocation().pathname;
  const [summarizedBook, setSummarizedBook] = useState();
  const [file, setFile] = useState(pdf || "pdfs/sample.pdf");
  const [numPages, setNumPages] = useState();

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  };

  const summerizeBook = () => {
    summarize(bookName).then(res => {
      setSummarizedBook(res.data.summarizedText);
    });
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    summerizeBook();
  }, []);

  useEffect(() => {
    setSummarizedBook("");
  }, [path]);

  return (
    <div className="PDFViewer">
      <header>
        <h1>{bookName}</h1>
      </header>
      <div className="PDFViewer__container">
        <div className="PDFViewer__container__uploadFile">
          <Button variant="contained" color="primary" component="span" onClick={handleOpen}>
            Summarize
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 600 }}>
              <h2 id="parent-modal-title">Summarize</h2>
              <MarkdownPreview style={{ maxHeight: "500px", overflowY: "auto" }} source={summarizedBook} />
            </Box>
          </Modal>
        </div>
        <div className="PDFViewer__container__pdf">
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} width="800" />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;

import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './PDFViewer.scss';
import { Button } from '@mui/material';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const PDFViewer = () => {
  const [file, setFile] = useState('pdfs/sample.pdf');
  const [numPages, setNumPages] = useState();

  const onFileChange = (event) => {
    const { files } = event.target;
    console.log(files);

    if (files && files[0]) {
      setFile(files[0] || null);
    }
  }

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  }

  return (
    <div className="PDFViewer">
      <header>
        <h1>PDF Viewer</h1>
      </header>
      <div className="PDFViewer__container">
        <div className="PDFViewer__container__uploadFile">
          <input onChange={onFileChange} type="file" />
          <Button variant="contained" color="primary" component="span" onClick={() => alert("Coming soon")}>Summarize</Button>
        </div>
        <div className="PDFViewer__container__pdf">
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width="800"
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}

export default PDFViewer;
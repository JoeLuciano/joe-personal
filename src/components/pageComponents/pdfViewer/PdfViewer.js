import styles from './PdfViewer.module.css';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useContext } from 'react';
import { PageContext } from 'contexts/GlobalContexts';

export const PdfViewer = ({ file }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const filename = file.split('.')[0].split('/').slice(-1);

  const { isMobile } = useContext(PageContext);

  return (
    <>
      <h2 className={isMobile ? styles.mobileHeader : styles.header}>
        {filename}
      </h2>
      <div className={isMobile ? styles.mobileDocument : styles.document}>
        {file ? (
          <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js'>
            <Viewer
              fileUrl={file}
              plugins={[defaultLayoutPluginInstance]}></Viewer>
          </Worker>
        ) : (
          <>No file is selected</>
        )}
      </div>
    </>
  );
};

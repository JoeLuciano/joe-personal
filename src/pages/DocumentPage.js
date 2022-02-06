import { useParams } from 'react-router-dom';
import { BasePage } from 'pages/BasePage';
import { PdfViewer } from 'components/pageComponents/pdfViewer/PdfViewer';

export const DocumentPage = (props) => {
  const { filename } = useParams();
  return (
    <BasePage
      {...props}
      pageContent={<PdfViewer file={`/files/${filename}`} />}
    />
  );
};

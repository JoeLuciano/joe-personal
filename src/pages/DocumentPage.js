import { useParams } from 'react-router-dom';
import { BasePage } from 'pages/BasePage';
import { PdfViewer } from 'components/pageComponents/pdfViewer/PdfViewer';
import MsProject from 'files/MS Project Report.pdf';
import Resume from 'files/Resume_02-17-22.pdf';
import VPPs from 'files/Virtual Power Plants.pdf';

export const DocumentPage = (props) => {
  let file;
  let { document } = useParams();
  if (props.file) {
    document = props.file;
  }
  if (document === 'resume') {
    file = Resume;
  } else if (document === 'msProjectReport') {
    file = MsProject;
  } else if (document === 'virtualPowerPlants') {
    file = VPPs;
  }

  return (
    <BasePage
      {...props}
      pageContent={<PdfViewer file={file} isMobile={props.isMobile} />}
    />
  );
};

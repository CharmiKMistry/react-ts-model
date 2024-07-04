import * as React from 'react';
import './style.css';
import Button from '@mui/material/Button';
import DialogFactory from './DialogFactory';
import Modal from './Modal';
import BasicModal from './BasicModal';

export default function App() {
  const [open, setOpen] = React.useState(false);

  const meesageConst = {
    messageCode: 'MSGERROR01',
    messageType: 'Error',
    message: 'Are you sure want to continue?',
  };

  // Show an error dialog
  const resultModalError = () => {
    DialogFactory.error({
      messageContent: meesageConst,
    }).then(() => {
      console.log('Close Clicked!');
    });
  };

  // Show a confirmation dialog
  const resultModalConfirm = () => {
    DialogFactory.confirm({
      messageContent: meesageConst,
    }).then((cancelClicked) => {
      if (!cancelClicked) {
        console.log('Close Clicked!');
      } else {
        console.log('Cancel Clicked!');
      }
    });
  };

  return (
    <div>
      <Button
        sx={{ marginRight: '15px' }}
        variant="contained"
        onClick={resultModalError}
      >
        Open Error Modal
      </Button>
      <Button
        sx={{ marginRight: '15px' }}
        variant="contained"
        onClick={resultModalConfirm}
      >
        Open Confirm Modal
      </Button>
      <Button
        sx={{ marginRight: '15px' }}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Open Custom Modal
      </Button>
      {open && <BasicModal open={open} onClose={setOpen} />}
    </div>
  );
}

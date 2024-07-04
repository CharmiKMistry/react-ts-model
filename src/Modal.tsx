import * as React from 'react';
import { render } from 'react-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type DialogProps = {
  messageContent: string;
  onClose?: (isCancel: boolean) => void;
};

const ErrorDialog: React.FC<DialogProps> = ({ messageContent, onClose }) => {
  const [open, setOpen] = React.useState(true);

  const handleCancelClick = () => {
    setOpen(false);
    onClose(false);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <DialogContentText>{messageContent}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelClick}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

const ConfirmDialog: React.FC<DialogProps> = ({ messageContent, onClose }) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = (isCancel) => {
    setOpen(false);
    onClose(isCancel);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText>{messageContent}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClick(false)}>Close</Button>
        <Button onClick={() => handleClick(true)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

type DialogFactoryType = {
  error: (dialogProps: DialogProps) => Promise<void>;
  confirm: (dialogProps: DialogProps) => Promise<boolean>;
  closeAll: () => void;
  close: () => void;
};

const DialogFactory: DialogFactoryType = {
  error: ({ messageContent }) => {
    return new Promise<void>((resolve) => {
      const handleClose = () => {
        resolve();
      };

      const dialog = (
        <ErrorDialog messageContent={messageContent} onClose={handleClose} />
      );

      const container = document.createDocumentFragment();
      // create a new element with a unique ID
      const element = document.createElement('div');
      element.setAttribute('id', 'dialog-root');
      // add the new element to the DocumentFragment
      container.appendChild(element);
      render(dialog, container);
    });
  },
  confirm: ({ messageContent }) => {
    return new Promise<boolean>((resolve) => {
      const handleClose = (isCancel) => {
        resolve(isCancel);
      };

      const dialog = (
        <ConfirmDialog messageContent={messageContent} onClose={handleClose} />
      );
      const container = document.createDocumentFragment();
      // create a new element with a unique ID
      const element = document.createElement('div');
      element.setAttribute('id', 'dialog-root');
      // add the new element to the DocumentFragment
      container.appendChild(element);
      render(dialog, container);
    }).then((cancelClicked) => cancelClicked);
  },
  closeAll: () => {
    // ReactDOM.unmountComponentAtNode(document.getElementById('dialog-root')!);
  },
  close: () => {
    // ReactDOM.unmountComponentAtNode(document.getElementById('dialog-root')!);
  },
};

export default DialogFactory;

import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
} from '@mui/material';
import { DialogProps, DialogFactoryType } from './DialogFactoryProps';

const btnClass = { backgroundColor: 'snow' };

const Div = styled('div')(
  () => `
    .dynamic-msg-body {
      font-size: 18px;
      padding-top: 10px;
      line-height: normal;
    }
    .dialog-error-msg {
      padding: 10px;
      border: 1px solid lightgrey;
      border-radius: 4px;
      background: lightgray;
    }
`
);

const ErrorDialog: React.FC<DialogProps> = ({
  messageContent,
  isConfirm,
  okText,
  cancelText,
  onClose,
}) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = (isCancel) => {
    setOpen(false);
    onClose(isCancel);
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose?.(true)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>
        {messageContent?.messageType}
        {messageContent?.messageCode ? `: ${messageContent?.messageCode}` : ''}
      </DialogTitle>
      <DialogContent dividers>
        <Div>
          <DialogContentText
            id="alert-dialog-description"
            className="dynamic-msg-body"
            dangerouslySetInnerHTML={{ __html: messageContent?.message }}
          ></DialogContentText>
          {messageContent?.err?.message ? (
            <pre
              className="dialog-error-msg"
              id="alert-dialog-description"
              dangerouslySetInnerHTML={{ __html: messageContent?.err?.message }}
            ></pre>
          ) : (
            <div></div>
          )}
        </Div>
      </DialogContent>
      <DialogActions>
        {isConfirm && (
          <Button
            className="modal-cancel-btn"
            //autoFocus
            disableRipple
            sx={btnClass}
            id="cancelBtn"
            variant="contained"
            color="inherit"
            size="small"
            onClick={() => handleClick(false)}
          >
            {cancelText || 'Cancel'}
          </Button>
        )}
        <Button
          className="modal-ok-btn"
          disableRipple
          //autoFocus={!okCancel}
          sx={btnClass}
          id="okBtn"
          variant="contained"
          color="inherit"
          size="small"
          onClick={() => handleClick(true)}
        >
          {okText || 'Ok'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const DialogFactory: DialogFactoryType = {
  error: ({ messageContent, okText }) => {
    return new Promise<void>((resolve) => {
      const handleClose = () => {
        resolve();
      };

      const dialog = (
        <ErrorDialog
          messageContent={messageContent}
          onClose={handleClose}
          okText={okText}
        />
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
  confirm: ({ messageContent, okText, cancelText }) => {
    return new Promise<boolean>((resolve) => {
      const handleClose = (isCancel) => {
        resolve(isCancel);
      };

      const dialog = (
        <ErrorDialog
          messageContent={messageContent}
          onClose={handleClose}
          isConfirm={true}
          okText={okText}
          cancelText={cancelText}
        />
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
    // CP: Need to change logic into next segement
    unmountComponentAtNode(
      document.getElementById('unique-id-error-dialog-root')!
    );
  },
  close: () => {
    // CP: Need to change logic into next segement
    unmountComponentAtNode(
      document.getElementById('unique-id-error-dialog-root')!
    );
  },
};

export default DialogFactory;

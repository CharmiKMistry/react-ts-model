interface MessageContentProps {
  messageType: string | React.ReactNode;
  messageCode: string | React.ReactNode;
  message: any;
  err?: {
    message: any;
  };
}

export interface DialogProps {
  messageContent?: MessageContentProps;
  onClose?: (isCancel?: boolean) => void;
  okText?: string | React.ReactNode;
  cancelText?: string | React.ReactNode;
  isConfirm?: boolean;
}

export type DialogFactoryType = {
  error: (dialogProps: DialogProps) => Promise<void>;
  confirm: (dialogProps: DialogProps) => Promise<boolean>;
  closeAll: () => void;
  close: () => void;
};

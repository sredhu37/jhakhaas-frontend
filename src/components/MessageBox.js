import React from "react";
import { Alert } from "react-bootstrap";

const MessageBox = (props) => {
  const { message, variant, displayMessageBox, setDisplayMessageBox } = props;

  const handleClose = () => setDisplayMessageBox(false);

  if(displayMessageBox) {
    return (
      <Alert className="MessageBox" variant={ variant } onClose={ handleClose } dismissible>
        {message}
      </Alert>
    );
  } else {
    return null;
  }
};

export default MessageBox;
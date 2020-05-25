import React from "react";
import { Alert } from "react-bootstrap";

const MessageBox = (props) => {
  const { message, variant, displayMessageBox, setDisplayMessageBox } = props;

  const handleClose = () => setDisplayMessageBox(false);

  if(displayMessageBox) {
    return (
      <Container fluid>
        <Row>
          <Col xs={1} sm={3} />
          <Col xs={10} sm={6}>
            <Alert className="MessageBox" variant={ variant } onClose={ handleClose } dismissible>
              {message}
            </Alert>
          </Col>
          <Col xs={1} sm={3} />
        </Row>
      </Container>
    );
  } else {
    return null;
  }
};

export default MessageBox;
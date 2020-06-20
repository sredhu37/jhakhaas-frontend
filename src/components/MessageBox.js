import React from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";

const MessageBox = (props) => {
  const { message, variant, displayMessageBox, setDisplayMessageBox } = props;

  const handleClose = () => {
    setDisplayMessageBox(false);
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={1} sm={3} />
        <Col xs={10} sm={6}>
          <Modal
            show={ displayMessageBox }
            onHide={ handleClose }
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
          >
            <Modal.Header closeButton>
              <Modal.Title>Result</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
              <Button variant={variant} onClick={handleClose}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
        <Col xs={1} sm={3} />
      </Row>
    </Container>
  );
};

export default MessageBox;
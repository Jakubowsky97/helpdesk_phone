import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function LoginModal(props) {
    const handleClose = () => {
        props.onHide();
    };

    return (
        <Modal 
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Logowanie konsultanta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <p>W kokpicie konsultanta kliknij "Pokaż kod logowania", następnie przepisz go poniżej.</p>
                <Form.Label>Kod</Form.Label>
                <Form.Control
                  type="text"
                  inputMode='numeric'
                  placeholder="123456"
                  autoFocus
                  maxLength={6}
                  id='loginCode'
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Potwierdź
            </Button>
          </Modal.Footer>
        </Modal>
    );
}
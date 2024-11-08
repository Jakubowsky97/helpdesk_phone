import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { LoginConsultantAPI } from '@/api/apiServices';
import { useRouter } from "next/navigation";

export default function LoginModal(props) {
  const router = useRouter();
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
            <Modal.Title className='fs-4 text-dark'>Połącz się z panelem konsultanta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <p className='text-secondary'>W panelu konsultanta kliknij "Pokaż kod logowania", następnie przepisz go poniżej.</p>
                <Form.Control
                  type="text"
                  inputMode='numeric'
                  placeholder="Tutaj wprowadź kod"
                  autoFocus
                  maxLength={6}
                  id='loginCode'
                  className='text-secondary bg-light placeholder-secondary'
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => {
              handleClose();
              LoginConsultantAPI().then(function (response) {
                localStorage.setItem('name', response.data.name);
              }).catch(function (error) {console.error(error);});
              router.refresh();
            }}>
              Potwierdź
            </Button>
          </Modal.Footer>
        </Modal>
    );
}
import { Button } from "react-bootstrap";
import LoginModal from "./LoginModal";
import { useState } from "react";

export default function LoginConsultant() {
    const [modalShow, setModalShow] = useState(false);

    function handleClearLocalStorage() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('clientId');
        localStorage.removeItem('clientSecret');
        router.refresh();
    }

    return (
        <div>
          <h1>Status: Połączony</h1>
          <Button onClick={handleClearLocalStorage} className="me-3">Clear localStorage</Button>
          <Button onClick={() => setModalShow(true)}>Zaloguj się</Button>
          <LoginModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
    );
}
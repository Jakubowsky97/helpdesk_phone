import { Button } from "react-bootstrap";
import LoginModal from "./LoginModal";
import { useState } from "react";
import { handleClearLocalStorage } from "./ClearLocalStorage";
import { useRouter } from "next/navigation";

export default function LoginConsultant() {
    const [modalShow, setModalShow] = useState(false);
    const router = useRouter();

    return (
        <div>
          <h1>Status: Połączony</h1>
          <Button onClick={() => {
            handleClearLocalStorage();
            router.refresh();
          }} className="me-3">Clear localStorage</Button>
          <Button onClick={() => setModalShow(true)}>Zaloguj się</Button>
          <LoginModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
    );
}
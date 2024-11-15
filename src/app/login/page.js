"use client";
import React, { useEffect} from 'react';
import Header from "../../components/Header";
import { useRouter } from "next/navigation";
import { LoginConsultantAPI } from '@/api/apiServices';
import { Button } from "react-bootstrap";
import { handleClearLocalStorage } from "../../components/ClearLocalStorage";

export default function LoginConsultant() {
  const router = useRouter();
  let isSubmitted = false;

  useEffect(() => {
    if (localStorage.getItem('accessToken') == null) {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    if (localStorage.getItem('name') != null) {
      router.push('/call');
    }
  }, [isSubmitted]);

    return (
      <div className="container-fluid min-vh-100 d-flex flex-column bg-light px-0">
      <div className="d-flex flex-column h-100">
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <div className="d-flex justify-content-center align-items-center flex-grow-1 py-5">
          <div className="w-100" style={{ maxWidth: '960px' }}>
            <div className="px-3">
              <h1 className="fs-4 fw-bold text-dark">Połącz się z panelem konsultanta</h1>
              <p className="text-muted">W panelu konsultanta kliknij "Pokaż kod logowania", następnie przepisz go poniżej.</p>
            </div>
            
            {/* Input Section */}
            <div className="d-flex flex-wrap gap-3 px-3 py-3">
              <label className="flex-fill">
                <input
                  type="text"
                  inputMode='numeric'
                  placeholder="Tutaj wprowadź kod"
                  autoFocus
                  maxLength={6}
                  id='loginCode'
                  className="form-control rounded"
                />
              </label>
            </div>

            {/* Button Section */}
            <div className="d-flex px-3 py-3 justify-content-between">
              <Button
                className="btn btn-primary w-25"
                onClick={() => {
                  LoginConsultantAPI().then(function (response) {
                    localStorage.setItem('name', response.data.name);
                    window.location.reload(false);
                    isSubmitted = true;
                  }).catch(function (error) {
                    console.error(error);
                  });
                }}
              >
                Połącz się
              </Button>
              <Button variant="outline-dark" className="btn" onClick={() => {
              handleClearLocalStorage();
              window.location.reload(false);
              }}>Wyczyść pamięć podręczną</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}
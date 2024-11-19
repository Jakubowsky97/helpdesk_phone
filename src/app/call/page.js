"use client";
import { Button } from "react-bootstrap";
import { logOutConsultant } from "@/components/ClearLocalStorage";
import { UpdateStatusAPI } from "@/api/apiServices";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

const CallPage = () => {
    const [status, setStatus] = useState();
    const router = useRouter();
  
    useEffect(() => {
      if (localStorage.getItem('userId') == null) {
        router.push('/');
      }
    }, [router]);

    return (
        <div className="position-relative d-flex vh-100 flex-column bg-light overflow-hidden">
            <div className="container-fluid d-flex flex-column h-100 px-0">
            <Header />
                <div className="px-5 d-flex flex-grow-1 justify-content-center py-3">
                    <div className="container d-flex flex-column" style={{ maxWidth: '960px'}}>

                        <div className="d-flex flex-wrap justify-content-between gap-3 p-4">
                            <div className="d-flex flex-column gap-2" style={{ minWidth: '18rem' }}>
                                <p className="text-dark fs-2 fw-bold mb-0" style={{ color: '#0d151c' }}>Symulator telefonu</p>
                                <p className="text-muted mb-0" style={{ color: '#49779c' }}>Testuj przychodzące i wychodzące połączenia</p>
                            </div>
                        </div>

                        <div className="d-flex flex-wrap align-items-end gap-4 p-3" style={{ maxWidth: '480px' }}>
                            <label className="d-flex flex-column flex-grow-1" style={{ minWidth: '10rem' }}>
                                <p className="text-dark fs-5 fw-medium pb-2" style={{ color: '#0d151c' }}>Wprowadź numer telefonu</p>
                                <input
                                placeholder="Wprowadź numer telefonu"
                                className="form-control rounded-xl"
                                style={{ backgroundColor: '#e7eef4', color: '#0d151c', height: '56px' }}
                                id="phoneNumber"
                                maxLength={9}
                                />
                            </label>
                        </div>

                        <div className="d-flex px-3 py-2">
                            <Button 
                            className="btn w-100 rounded-xl text-white fw-bold" 
                            style={{ backgroundColor: '#2094f3', height: '48px' }}
                            onClick={() => {
                                if(document.getElementById('phoneNumber').value.length == 9) {
                                UpdateStatusAPI('ringing').then(function (response) {
                                    setStatus('Dzwonienie');
                                    if(response.status == 200) {
                                        UpdateStatusAPI('offhook');
                                        setStatus('W trakcie rozmowy');
                                        localStorage.setItem('status', 'offhook');
                                    }
                                });;
                                }
                            }}
                            >Zadzwoń</Button>
                        </div>
                        <div className="d-flex px-3 py-2">
                            <Button 
                            className="btn w-100 rounded-xl text-dark fw-bold" 
                            style={{ backgroundColor: '#e7eef4', height: '48px', borderColor: '#e7eef4' }}
                            onClick={() => {
                                UpdateStatusAPI('idle');
                                setStatus('idle');
                                localStorage.setItem('status', 'idle');
                            }}
                            >Rozłącz się</Button>
                        </div>

                        
                        <div className="d-flex align-items-center gap-4 px-3 py-2" style={{ minHeight: '72px' }}>
                            <div className="d-flex align-items-center justify-content-center rounded-lg" style={{ backgroundColor: '#e7eef4', width: '48px', height: '48px', borderRadius: '8px' }}>
                                {/* SVG Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                                <path
                                    d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z"
                                ></path>
                                </svg>
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                                <p className="text-dark fw-medium mb-0">Status połączenia: {localStorage.getItem('status')}</p>
                                <p className="text-muted small mb-1" style={{ color: '#49779c' }}>Przychodzące połączenie od 123-456-789</p>
                            </div>
                        </div>

                        <div className="d-flex px-3 py-2">
                            <Button
                                className="btn w-100 rounded-xl text-dark fw-bold"
                                style={{ backgroundColor: 'transparent', fontSize: '0.875rem', borderColor: 'transparent' }}
                                onClick={() => {
                                    UpdateStatusAPI('idle');
                                    setStatus('idle');
                                    localStorage.setItem('status', 'idle');
                                }}
                            >
                                Przełącz na idle
                            </Button>
                        </div>
                        
                        <div className="d-flex px-3 py-2">
                            <Button className="btn w-100 rounded-xl text-white fw-bold" 
                            style={{ backgroundColor: 'red', fontSize: '0.875rem', borderColor: 'transparent' }} 
                            onClick={() => {
                                logOutConsultant();
                                window.location.reload(false);
                            }}
                            >
                                Wyloguj się
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallPage;
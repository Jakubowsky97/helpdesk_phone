"use client";
import { SendHistoryAPI } from '@/api/apiServices';
import Header from '@/components/Header';
import React, { useState } from 'react';
import { Form, Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SendHisory = () => { 
    const [callType, setCallType] = useState(1);
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const number = document.getElementById('number').value;
        const date = document.getElementById('date').value;
        const duration = document.getElementById('duration').value;
    
        SendHistoryAPI(name, number, callType, date, duration);
      };

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
                    <h2 className="fs-4 fw-medium text-dark">Symulacja wysyłania historii połączenia</h2>
                    <Form>
                        <Form.Group className="mb-3 mt-3">
                        <Form.Label>Nazwa kontaktu</Form.Label>
                        <Form.Control type="text" id='name' placeholder="Jan Kowalski" style={{ backgroundColor: '#e7eef4', color: '#0d151c'}}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                        <Form.Label>Numer telefonu</Form.Label>
                        <Form.Control type="text" id='number' placeholder="+48 123 456 789" style={{ backgroundColor: '#e7eef4', color: '#0d151c'}}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                        <Form.Label>Data</Form.Label>
                        <Form.Control type="text" id='date' placeholder="2024-11-12" style={{ backgroundColor: '#e7eef4', color: '#0d151c'}}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                        <Form.Label>Czas trwania</Form.Label>
                        <Form.Control type="text" id='duration' placeholder="00:01:23" style={{ backgroundColor: '#e7eef4', color: '#0d151c'}}/>
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex flex-column">
                        <Form.Label>Typ połącznia</Form.Label>
                        <ButtonGroup>
                            <ToggleButton
                            type="radio"
                            variant="outline-secondary"
                            name="callType"
                            value={1}
                            checked={callType === 1}
                            onChange={(e) => setCallType(e.currentTarget.value)}
                            >
                            Wychodzące
                            </ToggleButton>
                            <ToggleButton
                            type="radio"
                            variant="outline-secondary"
                            name="callType"
                            value={2}
                            checked={callType === 2}
                            onChange={(e) => setCallType(e.currentTarget.value)}
                            >
                            Przychodzące
                            </ToggleButton>
                            <ToggleButton
                            type="radio"
                            variant="outline-secondary"
                            name="callType"
                            value={3}
                            checked={callType === 3}
                            onChange={(e) => setCallType(e.currentTarget.value)}
                            >
                            Nieodebrane
                            </ToggleButton>
                        </ButtonGroup>
                        </Form.Group>

                        <Button variant="primary" type="submit" className='btn btn-primary w-25 mt-2' onSubmit={handleSubmit}>
                        Wyślij
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default SendHisory;
"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/components/css/button.css'
import React from 'react';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import PairingCodeModal from '../components/PairingCodeModal';
import { getPairingCode, checkIfPaired, generateOAuthToken, getInfoAboutPhone } from '../api/apiServices';
import LoginConsultant from '../components/LoginConsultant';
import axios from 'axios';
import { handleClearLocalStorage } from '@/components/ClearLocalStorage';
import CallPage from '@/components/CallPage';

const helpDesk = () => {
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const [pairingCode, setPairingCode] = useState('');
  const [expiry_time, setExpiryTime] = useState('');
  const [abortController, setAbortController] = useState(null);
  const [userId, setUserId] = useState('');

  function handleGetPairingCode() {
    if(modalShow == true) {
      getPairingCode()
      .then(function (response) {
        const code = response.data.code;
        setPairingCode(code);
        localStorage.setItem('pairingCode', code);
        setExpiryTime(response.data.expiry_at);

        const controller = new AbortController();
        setAbortController(controller);

        handleCheckIfPaired(code, controller);
        setModalShow(true); 
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function handleCheckIfPaired(code, controller) {
    checkIfPaired(code, controller.signal)
      .then(async function (response) {
        while(response.data.config == null) {
          await sleep(10000);
          response = await checkIfPaired(code, controller.signal);
        }

        localStorage.setItem('clientId', response.data.config.client_id);
        localStorage.setItem('clientSecret', response.data.config.client_secret);

        handleGenerateOAuthToken(response.data.config.client_id, response.data.config.client_secret);

        router.refresh();
      })
      .catch(function (error) {
        console.log("Error checking if paired:", error); 
      });
  }

  function handleGenerateOAuthToken(clientId, clientSecret) {
    generateOAuthToken(clientId, clientSecret)
      .then(function (response) {
        localStorage.setItem('accessToken', response.data.access_token);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function handleModalHide() {
    setModalShow(false);
    setPairingCode('');
    setExpiryTime('');
    localStorage.removeItem('pairingCode');

    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
  }

  function handleInfoAboutPhone() {
    getInfoAboutPhone().then(function (response) {
      setUserId(response.data.user_id);
      localStorage.setItem('userId', response.data.user_id);
      router.refresh();
    }).catch(function (error) {
      console.error(error);
    })
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      
      const fetchPhoneInfo = async () => {
        try {
          await handleInfoAboutPhone();
          router.refresh();
        } catch (error) {
          console.error("Error fetching phone info:", error);
        }
      };

      fetchPhoneInfo();
    }
  }, []);
  
  return (
    <div>
      {localStorage.getItem('accessToken') || localStorage.getItem('clientId') ? (
        userId == 0 ? (
          <LoginConsultant/>
        ) : (
          <CallPage/>
        )
      ) : (
        <div>
          <h1>Status: Rozłączony</h1>
          <Button onClick={() => {
            handleGetPairingCode();
            setModalShow(true);
          }}>Wyświetl kod</Button>
          <PairingCodeModal
            show={modalShow}
            onHide={handleModalHide}
            code={pairingCode}
            expiry_time={expiry_time}
            get_new_code={handleGetPairingCode}
          />
        </div>
      )}
    </div>
  );
};

export default helpDesk;
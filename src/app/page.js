"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getPairingCode, checkIfPaired, generateOAuthToken, getInfoAboutPhone } from '../api/apiServices';
import axios from 'axios';
import PairingCodePage from '../components/PairingCodePage';

const helpDesk = () => {
  const router = useRouter();
  const [pairingCode, setPairingCode] = useState('');
  const [expiry_time, setExpiryTime] = useState('');
  const [abortController, setAbortController] = useState(null);
  const [userId, setUserId] = useState('');

  function handleGetPairingCode() {
      getPairingCode()
      .then(function (response) {
        const code = response.data.code;
        setPairingCode(code);
        localStorage.setItem('pairingCode', code);
        setExpiryTime(response.data.expiry_at);

        const controller = new AbortController();
        setAbortController(controller);

        handleCheckIfPaired(code, controller);
      })
      .catch(function (error) {
        console.log(error);
      });
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
      
      const fetchPhoneInfo = async () => {
        try {
          await handleInfoAboutPhone();
         console.log("Phone info fetched");
        } catch (error) {
          console.error("Error fetching phone info:", error);
        }
      };

      fetchPhoneInfo();
    } else {
      console.log("No access token");
    }
  }, [localStorage.getItem('accessToken')]);

  useEffect(() => {
    if (localStorage.getItem('accessToken') || localStorage.getItem('clientId')) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
      router.push('/login');
    }
  }, [localStorage.getItem('accessToken'), localStorage.getItem('clientId'), router]);
  
  return (
    <div>
      {localStorage.getItem('accessToken') || localStorage.getItem('clientId') ? (
          <div>Loading...</div>
      ) : (
          <PairingCodePage
            code={pairingCode}
            expiry_time={expiry_time}
            get_new_code={handleGetPairingCode}
          />
      )}
    </div>
  );
};

export default helpDesk;
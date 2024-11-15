import ProgressBar from 'react-bootstrap/ProgressBar';
import { useEffect, useState, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Header from './Header';

export default function PairingCodePage({ code, expiry_time, get_new_code }) {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [startTime, setStartTime] = useState(Date.now());
  const [codeGenerated, setCodeGenerated] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateProgress = useCallback(() => {
    const startTimeSec = startTime;
    const expiryTime = expiry_time * 1000;

    const totalDuration = expiryTime - startTimeSec;
    const elapsedTime = currentTime - startTimeSec;

    if (totalDuration <= 0) return 100;

    return Math.min(100, (elapsedTime / totalDuration) * 100);
  }, [expiry_time, currentTime]);

  const calculateRemainingTime = useCallback(() => {
    const expiryTime = expiry_time * 1000;

    const remainingTime = Math.max(0, Math.floor((expiryTime - currentTime) / 1000));

    if (remainingTime <= 0 && !codeGenerated) {
      get_new_code();
      setCodeGenerated(true);
      setStartTime(Date.now());
    }
    return remainingTime;
  }, [expiry_time, currentTime, codeGenerated, get_new_code, startTime]);

  useEffect(() => {
    if (codeGenerated) {
      const resetTimer = setTimeout(() => setCodeGenerated(false), 1000);
      return () => clearTimeout(resetTimer);
    }
  }, [codeGenerated]);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light overflow-hidden">
      <div className="container-fluid d-flex flex-column h-100 justify-content-center px-0">
         {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="container d-flex flex-column align-items-baseline justify-content-center py-5">
          <h1 className="text-dark fs-4 fw-bold text-center pb-4">Wprowadź kod parowania</h1>
          <p className="text-dark fs-6 text-center">Wpisz ten kod w zakładce "Urządzenia", klikając przycisk "Paruj" wybierz jedną z dostępnych opcji.</p>
          
          <h3 className="text-dark fs-5 fw-bold pb-2 pt-3">Kod </h3>
          <div className="d-flex flex-wrap align-items-end gap-3 py-2">
          <label className="w-100">
            <input
              className="form-control border-0 rounded-lg text-dark py-2"
              placeholder="Wprowadź kod"
              style={{ backgroundColor: '#e7eef4'}}
              value={code}
              disabled
            />
          </label>
        </div>
        <p className="text-muted fs-6 pt-2 pb-4">Ten kod straci ważność za 2 minuty</p>
        
        {/* ProgressBar Section */}
        <h5 className="text-dark fw-medium mb-0 pb-3">Czekam na parowanie</h5>
          <div className="d-flex justify-content-center w-100">
            <ProgressBar now={calculateProgress()} max={100} label={`${calculateRemainingTime()} s`} className="w-100 mb-3" />
          </div>

          {/* Button Section */}
          <div className="d-flex justify-content-end w-100 mt-4">
            <Button variant="outline-dark" className="me-2" onClick={() => {
              get_new_code();
              setStartTime(Date.now());
              }}>Odśwież kod</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

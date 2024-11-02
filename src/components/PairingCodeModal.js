import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ClipLoader from "react-spinners/ClipLoader";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useEffect, useState, useCallback } from 'react';

export default function PairingCodeModal(props) {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [start_time, setStartTime] = useState(Date.now());
  const [codeGenerated, setCodeGenerated] = useState(false);

  useEffect(() => {
    let interval;

    if (props.show) {
      setStartTime(Date.now());
      setCodeGenerated(false);
      interval = setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [props.show]);

  const calculateProgress = useCallback(() => {
    const startTimeSec = start_time;
    const expiryTime = props.expiry_time * 1000;
    const now = currentTime;

    const totalDuration = expiryTime - startTimeSec;
    const elapsedTime = now - startTimeSec;

    if (totalDuration <= 0) return 100;

    return Math.min(100, (elapsedTime / totalDuration) * 100);
  }, [props.expiry_time, currentTime]);

  const calculateRemainingTime = useCallback(() => {
    const expiryTime = props.expiry_time * 1000;
    const now = currentTime;

    const remainingTime = Math.max(0, Math.floor((expiryTime - now) / 1000));
    if (remainingTime <= 0 && !codeGenerated) {
      props.get_new_code();
      setCodeGenerated(true);
      setStartTime(Date.now());
    }
    return remainingTime;
  }, [props.expiry_time, currentTime, codeGenerated, props]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Przepisz wyświetlony kod.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Wpisz ten kod w zakładce "Urządzenia", klikając przycisk "Paruj" wybierz jedną z dostępnych opcji.
        </p>
        <div className='my-5' style={{ display: "flex", justifyContent: "center" }}> 
          <ClipLoader color="#019dd7" loading size={150} />
        </div> 
      </Modal.Body>
      <div className='flex justify-content-start ms-3 mb-1 me-3 '>
        <ProgressBar now={calculateProgress()} max={100} label={`${calculateRemainingTime()} s`} />
        <h5 className='mt-3'>Wprowadź kod: {props.code}</h5>
      </div>
    </Modal>
  );
}

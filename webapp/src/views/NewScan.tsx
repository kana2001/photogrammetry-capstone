import React from 'react';
import Button from '../components/Button';
import { moveMotor, turnOff, turnOn, sendImages } from '../services/API';

function NewScan() {
  return (
    <div>
      <h1>New Scan</h1>
      <body>
        <p>test</p>
        <Button text={'Start Scan'} onClick={() => alert('Scan has commenced!')}></Button>
        <Button text={'Turn On'} onClick={() => turnOn()}></Button>
        <Button text={'Turn Off'} onClick={() => turnOff()}></Button>
        <Button text={'Move Motor'} onClick={() => moveMotor()}></Button>
        <Button text={'Send Images'} onClick={() => sendImages()}></Button>
      </body>
    </div>
  );
}

export default NewScan;

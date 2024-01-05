import React, { useState } from 'react';
import Button from '../components/Button';
import { moveMotor, turnOff, turnOn, sendImages } from '../services/API';
import InputBox from '../components/InputBox';

function NewScan() {
  const [imageServerIP, setimageServerIP] = useState<string>('');

  const handleServerIPChange = (value: string) => {
    setimageServerIP(value);
  };

  return (
    <div>
      <h1>New Scan</h1>
      <body>
        <p>test</p>
        <Button text={'Start Scan'} onClick={() => alert('Scan has commenced!')}></Button>
        <Button text={'Turn On'} onClick={() => turnOn()}></Button>
        <Button text={'Turn Off'} onClick={() => turnOff()}></Button>
        <Button text={'Move Motor'} onClick={() => moveMotor()}></Button>
        <Button text={'Send Images'} onClick={() => sendImages(imageServerIP)}></Button>
        <InputBox onInputChange={handleServerIPChange}/>

      </body>
    </div>
  );
}

export default NewScan;

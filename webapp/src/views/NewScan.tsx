import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { moveMotor, turnOff, turnOn, sendImages } from '../services/API';
import InputBox from '../components/InputBox';

function NewScan() {
  const [imageServerIP, setimageServerIP] = useState<string>('');
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [listOfImages, setListOfImages] = useState<string[]>([]);

  useEffect(() => {
    // import all captured images for image gallery
    const importAll = (r: any) => r.keys().map(r);
    setListOfImages(importAll(require.context('../../../sampleImages/', false, /\.(png|jpe?g|svg)$/)));
  }, []);

  const handleServerIPChange = (value: string) => {
    setimageServerIP(value);
  };

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
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
        <Button text={'View Images'} onClick={togglePopup}></Button>
        <InputBox onInputChange={handleServerIPChange} />

        {/*TODO: Refactor image gallery into its own component  */}
        {isPopupOpen && (
          <>
            <div className="overlay" onClick={togglePopup}></div>
            <div className="popup">
              <h2>Image Gallery</h2>
              <div className="image-gallery">
                {listOfImages.map((image, index) => (
                  <img key={index} src={image} alt={`info-${index}`} style={{ width: '100px', height: "auto" }} />
                ))}
              </div>
              <button onClick={togglePopup}>Image Gallery</button>
            </div>
          </>
        )}

      </body>
    </div>
  );
}

export default NewScan;

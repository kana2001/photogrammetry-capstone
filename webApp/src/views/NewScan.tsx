import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { moveMotor, turnOff, turnOn, sendImages, captureImage, setManualFocus, setAutoFocus, autoRoute } from '../services/API';
import InputBox from '../components/InputBox';
import Popup from '../components/Popup';

function NewScan() {
  const [imageServerIP, setimageServerIP] = useState<string>('');
  const [isImageGalleryOpen, setImageGalleryOpen] = useState(false);
  const [listOfImages, setListOfImages] = useState<string[]>([]);
  const [isScanScreenOpen, setScanScreenOpen] = useState(false);
  const [lensPosition, setLensPosition] = useState<string>('');

  useEffect(() => {
    // import all captured images for image gallery
    const importAll = (r: any) => r.keys().map(r);
    setListOfImages(importAll(require.context('../../../piServer/capturedImages/', false, /\.(png|jpe?g|svg)$/)));
  }, []);

  const handleServerIPChange = (value: string) => {
    setimageServerIP(value);
  };

  const handleLensPositionChange = (value: string) => {
    setLensPosition(value);
  };

  const toggleImageGallery = () => {
    setImageGalleryOpen(!isImageGalleryOpen);
  };

  const toggleScanScreen = () => {
    setScanScreenOpen(!isScanScreenOpen);
  };

  // TODO: Refactor apiPrefix into a importable const
  const apiPrefix = "http://127.0.0.1:5000"

  return (
    <div>
      <h1>New Scan</h1>
      <body>
        <p>test</p>
        <Button text={'Auto'} onClick={() => autoRoute()}></Button>
        <Button text={'Start Scan'} onClick={toggleScanScreen}></Button>
        <Button text={'Turn On'} onClick={() => turnOn()}></Button>
        <Button text={'Turn Off'} onClick={() => turnOff()}></Button>
        <Button text={'Move Motor'} onClick={() => moveMotor()}></Button>
        <Button text={'Send Images'} onClick={() => sendImages(imageServerIP)}></Button>
        <Button text={'View Images'} onClick={toggleImageGallery}></Button>
        <InputBox onInputChange={handleServerIPChange} placeHolder={'Server IP Address'} />

        {isImageGalleryOpen && (
          <Popup togglePopup={toggleImageGallery}>
            <h2>Image Gallery</h2>
            <div className="image-gallery">
              {listOfImages.map((image, index) => (
                <img key={index} src={image} alt={`info-${index}`} style={{ width: '100px', height: "auto" }} />
              ))}
            </div>
          </Popup>
        )}

        {isScanScreenOpen && (
          <Popup togglePopup={toggleScanScreen}>
            <h2>Scan Screen</h2>
            <img src={`${apiPrefix}/video_feed`} width={'50%'} alt='Video_Feed' />
            <div>
              <Button text={'Take a picture'} onClick={() => captureImage()}></Button>
            </div>
            <InputBox onInputChange={handleLensPositionChange} placeHolder={'Lens Position'} />
            <Button text={'Set Focal Length'} onClick={() => setManualFocus(lensPosition)}></Button>
            <Button text={'Auto Focus Mode'} onClick={() => setAutoFocus()}></Button>


          </Popup>
        )}

      </body>
    </div>
  );
}

export default NewScan;

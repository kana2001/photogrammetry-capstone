import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { moveMotor, sendImages, captureImage, setManualFocus, setAutoFocus, moveSlider, moveTilt, moveTilt2, moveTilt3, resetTilt, deleteImages } from '../services/API';
import InputBox from '../components/InputBox';
import Popup from '../components/Popup';
import ReactLoading, { LoadingType } from 'react-loading';
import Shutter from '../components/Shutter';


function NewScan() {
  const [imageServerIP, setimageServerIP] = useState<string>('');
  const [modelName, setModelName] = useState<string>('');
  const [isImageGalleryOpen, setImageGalleryOpen] = useState(false);
  const [listOfImages, setListOfImages] = useState<string[]>([]);
  const [isCameraControlScreenOpen, setCameraControlScreenOpen] = useState(false);
  const [isSendImagesScreenOpen, setSendImagesScreenOpen] = useState(false);
  const [lensPosition, setLensPosition] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [showShutter, setShowShutter] = useState(false);

  useEffect(() => {
    // import all captured images for image gallery
    const importAll = (r: any) => r.keys().map(r);
    setListOfImages(importAll(require.context('../../../piServer/capturedImages/', false, /\.(png|jpe?g|svg)$/)));
  }, []);

  const handleServerIPChange = (value: string) => {
    setimageServerIP(value);
  };

  const handleModelNameChange = (value: string) => {
    setModelName(value);
  };

  const handleLensPositionChange = (value: string) => {
    setLensPosition(value);
  };

  const toggleImageGallery = () => {
    setImageGalleryOpen(!isImageGalleryOpen);
  };

  const toggleCameraControlScreen = () => {
    setCameraControlScreenOpen(!isCameraControlScreenOpen);
  };

  const toggleSendImagesScreen = () => {
    setSendImagesScreenOpen(!isSendImagesScreenOpen);
  };

  async function scanOperation() {
    setIsScanning(true);
    for (let i = 0; i < 24; i++) {
      await captureImage(setShowShutter)
      await moveMotor()
    }
    setIsScanning(false);
  }

  async function scanOperationFull() {
    setIsScanning(true);
    
    for (let i = 0; i < 24; i++) {
      await captureImage(setShowShutter)
      await moveMotor()
      await delay(500); 
    }
    await moveTilt();

    for (let i = 0; i < 24; i++) {
      await captureImage(setShowShutter)
      await moveMotor()
      await delay(500); 
    }
    await moveTilt2();
    
    for (let i = 0; i < 24; i++) {
      await captureImage(setShowShutter)
      await moveMotor()
      await delay(500); 
    }
    await moveTilt3();

    setIsScanning(false);
  }

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  interface ExampleProps {
    type: LoadingType;
    color: string;
  }

  const Example: React.FC<ExampleProps> = ({ type, color }) => (
    // <div className='loading'>
    <ReactLoading type={type} color={color} height={375} width={375} className='loading' />
    // </div>

  );

  // TODO: Refactor apiPrefix into a importable const
  const apiPrefix = "http://127.0.0.1:5000"

  return (
    <div>
      <h1>New Scan</h1>
      <body>
        <Shutter show={showShutter} duration={20}></Shutter>
        <Button text={'Start Scan'} onClick={() => scanOperation()}></Button>
        <Button text={'Start Scan Full'} onClick={() => scanOperationFull()}></Button>
        <Button text={'Camera Control'} onClick={(toggleCameraControlScreen)}></Button>
        {/* <Button text={'Turn On Motor'} onClick={() => turnOn()}></Button>
        <Button text={'Turn Off Motor'} onClick={() => turnOff()}></Button> */}
        {/* <Button text={'Move Slider'} onClick={() => moveSlider()}></Button> */}
        <Button text={'Move Motor'} onClick={() => moveMotor()}></Button>
        <Button text={'Move Tilt'} onClick={() => moveTilt()}></Button>
        <Button text={'Move Tilt2'} onClick={() => moveTilt2()}></Button>
        <Button text={'Move Tilt3'} onClick={() => moveTilt3()}></Button>
        <Button text={'Reset Tilt'} onClick={() => resetTilt()}></Button>
        <Button text={'Model Generation'} onClick={toggleSendImagesScreen}></Button>
        <Button text={'View Images'} onClick={toggleImageGallery}></Button>
        <img src={`${apiPrefix}/video_feed`} width={'90%'} style={{'paddingTop':'5px'}} alt='Video_Feed' />
        {/* {isScanning &&
          (
            <div>
              <div className="overlay" ></div>
              <Example type={'spin'} color={'black'}></Example>
             </div>)} */}
        {isImageGalleryOpen && (
          <Popup togglePopup={toggleImageGallery}>
            <h2>Image Gallery</h2>
            <div className="image-gallery">
              {listOfImages.map((image, index) => (
                <img key={index} src={image} alt={`info-${index}`} style={{ width: '100px', height: "auto" }} />
              ))}
            </div>
            <Button text={'Delete Images'} onClick={() => deleteImages()}></Button>
          </Popup>
        )}

        {isCameraControlScreenOpen && (
          <Popup togglePopup={toggleCameraControlScreen}>
            <h2>Camera Control</h2>
            <img src={`${apiPrefix}/video_feed`} width={'100%'} alt='Video_Feed' />
            <div>
              <Button text={'Take a picture'} onClick={() => captureImage(setShowShutter)}></Button>
            </div>
            <InputBox onInputChange={handleLensPositionChange} placeHolder={'Lens Position'} />
            <Button text={'Set Focal Length'} onClick={() => setManualFocus(lensPosition)}></Button>
            <Button text={'Auto Focus Mode'} onClick={() => setAutoFocus()}></Button>
          </Popup>
        )}

        {isSendImagesScreenOpen && (
          <Popup togglePopup={toggleSendImagesScreen}>
            <h2>Send Images</h2>
            <Button text={'Send Images'} onClick={() => sendImages(imageServerIP, modelName)}></Button>
            <InputBox onInputChange={handleServerIPChange} placeHolder={'Server IP Address'} />
            <InputBox onInputChange={handleModelNameChange} placeHolder={'Model Name'} />
          </Popup>
        )}
      </body>
    </div>
  );
}

export default NewScan;

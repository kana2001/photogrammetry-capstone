import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { moveMotor, sendImages, captureImage, setManualFocus, setAutoFocus, moveSlider, moveTilt } from '../services/API';
import InputBox from '../components/InputBox';
import Popup from '../components/Popup';
import ReactLoading, { LoadingType } from 'react-loading';


function NewScan() {
  const [imageServerIP, setimageServerIP] = useState<string>('');
  const [isImageGalleryOpen, setImageGalleryOpen] = useState(false);
  const [listOfImages, setListOfImages] = useState<string[]>([]);
  const [isScanScreenOpen, setScanScreenOpen] = useState(false);
  const [lensPosition, setLensPosition] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);

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

  async function scanOperation() {
    setIsScanning(true);
    for (let i = 0; i < 24; i++) {
      await captureImage()
      await moveMotor()
    }
    setIsScanning(false);
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
        <Button text={'Start Scan'} onClick={() => scanOperation()}></Button>
        <Button text={'Camera Control'} onClick={(toggleScanScreen)}></Button>
        {/* <Button text={'Turn On Motor'} onClick={() => turnOn()}></Button>
        <Button text={'Turn Off Motor'} onClick={() => turnOff()}></Button> */}
        <Button text={'Move Slider'} onClick={() => moveSlider()}></Button>
        <Button text={'Move Motor'} onClick={() => moveMotor()}></Button>
        <Button text={'Move TIlt'} onClick={() => moveTilt()}></Button>
        <Button text={'Send Images'} onClick={() => sendImages(imageServerIP)}></Button>
        <Button text={'View Images'} onClick={toggleImageGallery}></Button>
        <InputBox onInputChange={handleServerIPChange} placeHolder={'Server IP Address'} />
        <img src={`${apiPrefix}/video_feed`} width={'90%'} alt='Video_Feed' />
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
          </Popup>
        )}

        {isScanScreenOpen && (
          <Popup togglePopup={toggleScanScreen}>
            <h2>Camera Control</h2>
            <img src={`${apiPrefix}/video_feed`} width={'100%'} alt='Video_Feed' />
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

import React from 'react';
import Popup from './Popup';
import ModelGLB from './ModelGLB';

interface Model {
  name: string;
  jpg_url: string;
  glb_path: string;
  scanComplete: boolean;
  usdz_path: string;
}

interface ModelPopupProps {
  image: Model;
  onClose: () => void;
}

const ModelPopup: React.FC<ModelPopupProps> = ({ image, onClose }) => {
  return (
    
    <Popup togglePopup={onClose}>
      <ModelGLB src={image.glb_path} iosSrc={image.usdz_path} poster={image.jpg_url}></ModelGLB>
      <p>{image.name}</p>
    </Popup>
  );
};

export default ModelPopup;

import React from 'react';
import Popup from './Popup';
import ModelGLB from './ModelGLB';

interface Model {
  title: string;
  thumbnailUrl: string;
  modelUrl: string;
}

interface ModelPopupProps {
  image: Model;
  onClose: () => void;
}

const ModelPopup: React.FC<ModelPopupProps> = ({ image, onClose }) => {
  return (
    
    <Popup togglePopup={onClose}>
      {/* <img src={image.thumbnailUrl} alt={image.title} /> */}
      <ModelGLB></ModelGLB>
      <p>{image.title}</p>
    </Popup>
  );
};

export default ModelPopup;

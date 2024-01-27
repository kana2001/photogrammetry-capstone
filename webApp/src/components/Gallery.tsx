import React, { useState } from 'react';
import ModelPopup from './ModelPopup';

interface Model {
  name: string;
  jpg_url: string;
  glb_path: string;
  scanComplete: boolean;
  usdz_path: string;
}

interface GalleryProps {
  models: Model[];
}

const Gallery: React.FC<GalleryProps> = ({models }) => {
  const [selectedModel, setSelectedImage] = useState<Model | null>(null);

  const handleThumbnailClick = (image: Model) => {
    setSelectedImage(image);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="thumbnails">
        {models.map((model, index) => (
          <img
            key={index}
            src={model.jpg_url}
            alt={model.name}
            onClick={() => handleThumbnailClick(model)}
            style={{maxWidth:'25%', padding:'2px'}}
            className={'model-thumbnail'}
          />
        ))}
      </div>
      {selectedModel && (
          <ModelPopup image={selectedModel} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default Gallery;

import React, { useState } from 'react';
import ModelPopup from './ModelPopup';

interface Model {
  title: string;
  thumbnailUrl: string;
  modelUrl: string;
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
            src={model.thumbnailUrl}
            alt={model.title}
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

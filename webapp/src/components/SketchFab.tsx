import React from 'react';
interface IProps {
    link: string
  }
const SketchfabViewer = ({link} : IProps) => {
  return (
    <div>
      <h2>Sketchfab Viewer</h2>
      <iframe
        title="Sketchfab Viewer"
        width="800"
        height="600"
        src={link}
        allow="autoplay; fullscreen; vr"
      ></iframe>
    </div>
  );
};

export default SketchfabViewer;

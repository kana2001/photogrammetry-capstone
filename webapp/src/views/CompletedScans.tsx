import React, { useState } from 'react';
import SketchfabViewer from '../components/SketchFab';

interface ISketchFabModel {
  title: string,
  url: string
}

function CompletedScans() {
  const [currentModel, setCurrentModel] = useState<ISketchFabModel>();

  const changeModel = (title: string) => {
    console.log(sketchFabLinks.find((model) => model.title === title));
    setCurrentModel(sketchFabLinks.find((model) => model.title === title));
  }

  const sketchFabLinks: ISketchFabModel[] = [
    {
      title: 'ARWProcessDyno',
      url: 'https://sketchfab.com/models/57426b0a8253495a81cdb36550cd859f/embed?autostart=1&preload=1&api_version=1.0.0',
    },
    {
      title: 'A super Bob model',
      url: 'https://sketchfab.com/models/07a74f2302f9478f8986f13f86353ac6/embed?autostart=1&preload=1&api_version=1.0.0',
    }
  ]

  return (
    <div>
      <h1>Completed Scans</h1>
      <ul style={{listStyleType: 'none', padding: 0}}>
        {sketchFabLinks.map((model) => <li><button onClick={() => changeModel(model.title)}>{model.title}</button></li>)}
      </ul>


      {currentModel && <SketchfabViewer link={currentModel.url} />}
    </div>
  );
}

export default CompletedScans;

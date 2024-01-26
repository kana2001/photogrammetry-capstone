import React, { useEffect, useState } from "react";
import SketchfabViewer from "../components/SketchFab";
import Gallery from "../components/Gallery";

interface ISketchFabModel {
  title: string;
  url: string;
}
// TODO: Refactor getScannedModels api into services module
const apiPrefix = "http://127.0.0.1:5000"

function CompletedScans() {
  const [currentModel, setCurrentModel] = useState<ISketchFabModel>();
  const [sketchFabData, setSketchFabData] = useState<ISketchFabModel[]>();

  useEffect(() => {
    // Make a GET request to your backend API
    fetch(`${apiPrefix}/getScannedModels`) // Replace with your API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        setSketchFabData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // // use default
        // setSketchFabData(sketchFabLinks)
      });
  }, []);

  const changeModel = (title: string) => {
    console.log(sketchFabData?.find((model) => model.title === title));
    setCurrentModel(sketchFabData?.find((model) => model.title === title));
  };

  // const sketchFabLinks: ISketchFabModel[] = [
  //   {
  //     title: "ARWProcessDyno",
  //     url: "https://sketchfab.com/models/57426b0a8253495a81cdb36550cd859f/embed?autostart=1&preload=1&api_version=1.0.0",
  //   },
  //   {
  //     title: "A super Bob model",
  //     url: "https://sketchfab.com/models/07a74f2302f9478f8986f13f86353ac6/embed?autostart=1&preload=1&api_version=1.0.0",
  //   },
  // ];


  const test = `aa.glb`;

  const kaws = [{ 
    title: "aa", thumbnailUrl: "aa.jpg", modelUrl: test },
  { title: "aa1", thumbnailUrl: "aa.jpg", modelUrl: test },
  { title: "bb", thumbnailUrl: "bb.jpg", modelUrl: test }]

  return (
    <div>
      <h1>Completed Scans</h1>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {sketchFabData?.map((model) => {
          return (
            <li>
              <button onClick={() => changeModel(model.title)}>
                {model.title}
              </button>
              {currentModel?.title === model.title && <SketchfabViewer link={currentModel.url} />}
            </li>
          );
        })}
      </ul>

      <div>
        <div> Models </div>
        <Gallery models={kaws}></Gallery>
      </div>
    </div>
  );
}

export default CompletedScans;

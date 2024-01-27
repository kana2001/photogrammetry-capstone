import React, { useEffect, useState } from "react";
import Gallery from "../components/Gallery";
import { fetchModels } from "../services/API";

function CompletedScans() {
  const [models, setModels] = useState([]);
  useEffect(() => {
      async function fetchData() {
        try {
          const data = await fetchModels();
          setModels(data);
          // setLoading(false);
        } catch (error) {
          console.error(error);
          // setLoading(false);
        }
      }
      fetchData();
  }, []);

  
  return (
    <div>
      <h1>Completed Scans</h1>

      <div>
        <div> Models </div>
        <Gallery models={models}></Gallery>
      </div>
    </div>
  );
}

export default CompletedScans;

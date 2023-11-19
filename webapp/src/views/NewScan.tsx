import React from 'react';
import Button from '../components/Button';

function NewScan() {
  return (
    <div>
      <h1>New Scan</h1>
      <body>
        <p>test</p>
        <Button text={'Start Scan'} onClick={() => alert('Scan has commenced!')}></Button>
      </body>
    </div>
  );
}

export default NewScan;

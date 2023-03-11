import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WorkExp from './component/WorkExp/WorkExp';

import Education from './component/Education/Education';
import LeaveApp from './component/LeaveApp/LeaveApp';

function App() {
  return (
    <div>

      <Education />
      {/* <WorkExp /> */}
      {/* <LeaveApp /> */}

    </div>

  );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import FileSelector from './components/FileSelector/FileSelector';
import Loader from './components/Loader/Loader';
import Uploaded from './components/Uploaded/Uploaded';

const App = () => {
  const [state, setState] = useState({ isFileSelected: false, url: '', errorMsg: ''});
  return <div className='app'>
  {!state.isFileSelected && (
  <FileSelector state={state} setState={setState} />
  )}
  {state.isFileSelected && !state.url && <Loader />}
  {state.isFileSelected && state.url &&
  <Uploaded state={state} />
  }
  </div>
};

export default App;

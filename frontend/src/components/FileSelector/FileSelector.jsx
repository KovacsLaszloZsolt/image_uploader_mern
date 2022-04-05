import './FileSelector.css';
import upImage from '../../images/image.svg';
import axios from 'axios';

const FileSelector = ({ state, setState }) => {
  const handleUploadImg = (e) => {
    setState((prevState) => ({...prevState, isFileSelected: true, errorMsg: ''}));
   
    e.stopPropagation();
    e.preventDefault();

    const target = e.target;
    let formData;
    if (target instanceof HTMLInputElement) {
      if (target.files) {
        formData = target.files[0];
      }
    } else {
      formData = e.dataTransfer.files[0];
    }

    const data = new FormData();

    data.append('image', formData);
    void sendImage(data);
  };

  const sendImage = async (data) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3001/',
        data: data
      });
      setState((prevState)=>({...prevState, url: response.data.url}))
    } catch (err) {
      console.log(err.response)
      setState((prevState) => ({...prevState, isFileSelected: false, errorMsg: err.response.data.error}));
    }
  };

  return (
    <div className="uploadCtn">
      <h3 className="title">Upload your image</h3>
      <p className="helpText">File should be Jpeg or Png</p>
      {state.errorMsg && (
        <p className='error'>{state.errorMsg}</p>
      )}
      <div className="dropCtn" onDrop={handleUploadImg} onDragOver={(e) => e.preventDefault()}>
        <img className="upImage" src={upImage} alt="upload"></img>
        <p className="dropText">Drag & Drop your image here</p>
      </div>
      <span className="or">Or</span>
      <input type="file" name="image" id="image" hidden onInput={handleUploadImg} />
      <label className="button" htmlFor="image">
        Choose a file
      </label>
    </div>
  );
};

export default FileSelector;

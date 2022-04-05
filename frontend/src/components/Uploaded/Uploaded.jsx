import './Uploaded.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Uploaded = ({state}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(state.url);
  }
  return (
    <div className='uploadedCtn'>
      <CheckCircleIcon color="success" sx={{ fontSize: '2.1875rem'  }}/>
      <p className='uploadedText'>Uploaded Successfully!</p>
      <img className='uploadedImg' src={state.url} alt="uploaded" />
      <div className='imageUrlCtn'>
        <input className='imageUrl' type='text' value={state.url} />
        <button className='copyBtn' onClick={handleCopy}>Copy Link</button>
      </div>
    </div>
  )
}

export default Uploaded
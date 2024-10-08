import React from 'react';
import { ReactMic } from 'react-mic';
import './App.css'; // Import your CSS file

// Audio Timer Component
const AudioTimer = ({ isRunning, elapsedTime, setElapsedTime }) => {
  React.useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, setElapsedTime]);

  return (
    <div className="text-2xl font-bold mb-4">
      {isRunning ? (
        <span>{elapsedTime}s</span>
      ) : (
        <span className="text-gray-400">00:00</span>
      )}
    </div>
  );
};

// Main Recorder Component
const ReactRecorder = () => {
  const [isRunning, setIsRunning] = React.useState(false);
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [voice, setVoice] = React.useState(false);
  const [recordBlobLink, setRecordBlobLink] = React.useState(null);

  const onStop = (recordedBlob) => {
    setRecordBlobLink(recordedBlob.blobURL);
    setIsRunning(false);
  };

  const startHandle = () => {
    setElapsedTime(0);
    setIsRunning(true);
    setVoice(true);
  };

  const stopHandle = () => {
    setIsRunning(false);
    setVoice(false);
  };

  const clearHandle = () => {
    setIsRunning(false);
    setVoice(false);
    setRecordBlobLink(null);
    setElapsedTime(0);
  };

  return (
    <div className="bg-audio-recorder">
      <div className="card-container">
        <h2 className="header">🎤 Audio Recorder</h2>

        <AudioTimer
          isRunning={isRunning}
          elapsedTime={elapsedTime}
          setElapsedTime={setElapsedTime}
        />

        <div className="my-6">
          <ReactMic
            record={voice}
            className="sound-wave w-full rounded-lg overflow-hidden"
            onStop={onStop}
            strokeColor="#6C63FF"
            backgroundColor="#EBF4FF"
          />
        </div>

        <div className="flex justify-center space-x-4 mt-4">
          {!voice ? (
            <button
              onClick={startHandle}
              className="button button-start"
            >
              Start
            </button>
          ) : (
            <button
              onClick={stopHandle}
              className="button button-stop"
            >
              Stop
            </button>
          )}
          {recordBlobLink && (
            <button
              onClick={clearHandle}
              className="button button-clear"
            >
              Clear
            </button>
          )}
        </div>

        {recordBlobLink && (
          <div className="mt-8">
            <audio controls src={recordBlobLink} className="audio-preview" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReactRecorder;

import React from 'react';

const AudioTimer = ({ isRunning, elapsedTime, setElapsedTime }) => {
    React.useEffect(() => {
        let intervalId;
        if (isRunning) {
            // Update the timer every 10 milliseconds
            intervalId = setInterval(() => setElapsedTime(elapsedTime + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, elapsedTime, setElapsedTime]);

    // Calculate hours, minutes, seconds, and milliseconds
    const hours = Math.floor(elapsedTime / 360000);
    const minutes = Math.floor((elapsedTime % 360000) / 6000);
    const seconds = Math.floor((elapsedTime % 6000) / 100);
    const milliseconds = elapsedTime % 100;

    return (
        <div className="text-3xl font-bold mb-4">
            <div className="time">
                {hours}:{minutes.toString().padStart(2, "0")}:
                <span className="w-[25px] inline-block">{seconds.toString().padStart(2, "0")}:</span>
                <span className="w-[25px] inline-block ml-3">{milliseconds.toString().padStart(2, "0")}</span>
            </div>
        </div>
    );
};

export default AudioTimer;

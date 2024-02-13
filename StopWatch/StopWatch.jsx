import React from 'react'

const StopWatch = () => {
    // state to store time
    const [time, setTime] = useState(0);

    // state to check if stopwatch is running or not
    const [isRunning, setIsRunning] = useState(false);

    // state to store description
    const [description, setDescription] = useState('');

    useEffect(() => {
        let intervalId;
        if (isRunning) {
            intervalId = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time]);

    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;

    const startAndStop = () => {
        setIsRunning(!isRunning);
    };

    const saveTime = () => {
        if (!isRunning) {
            const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
            localStorage.setItem('stoppedTime', JSON.stringify({ time: formattedTime, description }));
        }
    };

    // Method to reset timer back to 0
    const reset = () => {
        setTime(0);
    };

    return (
    <>
        <p className="stopwatch-time">
                {hours}:{minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}:
                {milliseconds.toString().padStart(2, "0")}
        </p>
        <div className="stopwatch-container">
            <div className="stopwatch-buttons">
                <button className="stopwatch-button" onClick={startAndStop}>
                    {isRunning ? "Stop" : "Start"}
                </button>
                <button className="stopwatch-button" onClick={reset}>
                    Reset
                </button>
                <button className="stopwatch-button" onClick={saveTime}>
                    Save Time
                </button>
            </div>
            <div className="stopwatch-description">
                <input 
                    type="text" 
                    placeholder="Add a description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                />
            </div>
        </div>
        </>
    )};

export default StopWatch;
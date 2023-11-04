"use client";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useRouter } from "next/navigation";

function Home() {
  const [pomodoro, setPomodoro] = useState<number>(25 * 60);
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [breakTime, setBreakTime] = useState<number>(5 * 60);
  const [breakTimeActive, setBreakTimeActive] = useState<boolean>(false);
  const [isGreen, setIsGreen] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/login");
    }
  }, [auth.currentUser, router]);

  useEffect(() => {
    let pomodoroTimer: NodeJS.Timeout;
    let breakTimer: NodeJS.Timeout;

    if (startTimer && pomodoro > 0) {
      pomodoroTimer = setInterval(() => {
        setPomodoro((prevPomodoro) => prevPomodoro - 1);
      }, 1000);
    }

    if (pomodoro === 0) {
      setBreakTimeActive(true);
    }

    if (breakTime && pomodoro === 0) {
      breakTimer = setInterval(() => {
        setBreakTime((prevBreakTime) => prevBreakTime - 1);
      }, 1000);
    }

    if (breakTime === 0) {
      setBreakTimeActive(false);
    }

    return () => {
      clearInterval(pomodoroTimer);
      clearInterval(breakTimer);
    };
  }, [breakTime, pomodoro, startTimer]);

  const reset = () => {
    setPomodoro(25 * 60);
    setBreakTime(5 * 60);
    setBreakTimeActive(false);
  };

  const toggleColorAndTimer = () => {
    setIsGreen((prevIsGreen) => !prevIsGreen);
    setStartTimer((prevStartTimer) => !prevStartTimer);
  };

  const buttonColor = isGreen ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-500 hover:bg-yellow-600';

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <div className="min-h-full h-screen bg-pink-50 flex flex-col items-center justify-center py-2 px-4 sm:px-6 lg:px-8">
      <div className="mb-20">
        <h1 className="mt-2 text-center text-4xl font-black text-gray-900">
          Welcome to Pomodoro Timer
        </h1>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm flex flex-col items-center">
      <div>{breakTimeActive && "Break Time"}</div>
      <div className="text-7xl text-center font-bold mb-12">
        {!breakTimeActive ? formatTime(pomodoro) : formatTime(breakTime)}
      </div>
      <div className="flex items-center justify-between gap-4">
        <button
          className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${buttonColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-5`}
          onClick={toggleColorAndTimer}
        >
          {startTimer ? "Pause" : "Start"}
        </button>
        <button
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover.bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-5"
          onClick={reset}
        >
          Reset
        </button>
      </div>
      </div>
    </div>
  );
}

export default Home;

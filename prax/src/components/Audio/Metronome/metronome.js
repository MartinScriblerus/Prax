import { useEffect, useState } from "react";
import _strongTick from "./strongTick.wav";
import _weakTick from "./weakTick.wav";
// WAIT----- WHAT ARE THE TICKS HERE? ARE THEY FILES?

const FIRST_BEAT = 1;
const DEFAULT_BPM = 60;
const DEFAULT_BEATS_PER_MEASURE = 4;

export const useMetronome = (
  initialBpm = DEFAULT_BPM,
  initialBeatsPerMeasure = DEFAULT_BEATS_PER_MEASURE,
  initialTickSounds = [_weakTick, _strongTick]
) => {
  const [isTicking, setIsTicking] = useState(false);
  const [bpm, setBpm] = useState(initialBpm);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(
    initialBeatsPerMeasure
  );
  const [sounds, setSounds] = useState(initialTickSounds);

  const startMetronome = () => {
    setIsTicking(true);
  };

  const stopMetronome = () => {
    setIsTicking(false);
  };

  useEffect(() => {
    let interval;
    let beat = 1;
    const strongTick = new Audio(sounds[1]);
    const weakTick = new Audio(sounds[0]);
    const resetSounds = () => {
      strongTick.pause();
      strongTick.currentTime = 0;
      weakTick.pause();
      weakTick.currentTime = 0;
    };
    const tick = () => {
      resetSounds();
      if (beat === FIRST_BEAT) {
        strongTick.play();
        console.log("BOOP");
      } else {
        weakTick.play();
        console.log("BEEP");
      }

      if (beat === beatsPerMeasure) {
        beat = FIRST_BEAT;
      } else {
        beat++;
      }
    };

    if (isTicking) {
      tick();
      interval = setInterval(tick, (60 / bpm) * 1000);
    }

    return () => clearInterval(interval);
  }, [isTicking, bpm, beatsPerMeasure, sounds]);

  return {
    startMetronome,
    stopMetronome,
    isTicking,
    setBpm,
    bpm,
    beatsPerMeasure,
    setBeatsPerMeasure,
    setSounds
  };
};
"use client";

import styles from "./MusicPlayer.module.css";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export default function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(false);

  // استخدام useSound (بيشتغل تلقائياً)
  const [play, { stop, sound }] = useSound("/background-music.mp3", {
    loop: true,
    volume: 0.2,
    onload: () => console.log("Music loaded"),
  });

  // تشغيل الموسيقى تلقائياً أول ما المستخدم يتفاعل
  useEffect(() => {
    const enableAudio = () => {
      play();
      document.removeEventListener("click", enableAudio);
      document.removeEventListener("keydown", enableAudio);
    };

    document.addEventListener("click", enableAudio);
    document.addEventListener("keydown", enableAudio);

    return () => {
      document.removeEventListener("click", enableAudio);
      document.removeEventListener("keydown", enableAudio);
      stop();
    };
  }, [play, stop]);

  // كتم / إلغاء كتم الصوت
  const toggleMute = () => {
    if (sound) {
      if (isMuted) {
        sound.volume(0.3); // رجوع الصوت لـ 30%
      } else {
        sound.volume(0); // كتم الصوت
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className={styles.audioButtonContainer}>
      <button
        onClick={toggleMute}
        className={styles.audioButton}
        title={isMuted ? "Unmute Audio" : "Mute Audio"}
      >
        {isMuted ? <FaVolumeMute size={22} /> : <FaVolumeUp size={22} />}
      </button>
    </div>
  );
}

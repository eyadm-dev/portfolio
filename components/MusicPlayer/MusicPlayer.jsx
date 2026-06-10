"use client";

import { useEffect, useState } from "react";
import useSound from "use-sound";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export default function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(false);

  // استخدام useSound (بيشتغل تلقائياً)
  const [play, { stop, sound }] = useSound("/background-music.mp3", {
    loop: true,
    volume: 0.3,
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
        sound.volume(0.3);  // رجوع الصوت لـ 30%
      } else {
        sound.volume(0);     // كتم الصوت
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-4 right-70 z-50">
      <button
        onClick={toggleMute}
        className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center text-white transition shadow-lg"
        title={isMuted ? "Unmute Audio" : "Mute Audio"}
        style={{ background: " var(--gradient-btn-cv);" }}
      >
        {isMuted ? <FaVolumeMute size={22} /> : <FaVolumeUp size={22} />}
      </button>
    </div>
  );
}
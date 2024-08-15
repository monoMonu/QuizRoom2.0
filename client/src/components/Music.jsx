import React from "react";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useQuiz } from "../context/quizContext/useQuiz";


export const Music = () => {

   const {musicState} = useQuiz();
   const musicRef = useRef(null);

   useEffect(() => {
      if (musicState) {
         if(!musicRef.current.paused) {
            musicRef.current.pause();
            toast.info("Music is OFF");
         }
      } else {
         musicRef.current.play();
         toast.info("Music is ON");
      }
   }, [musicState])

   return (
      <>
         <audio ref={musicRef} autoPlay={musicState} loop>
            <source 
               src="https://dl.dropbox.com/scl/fi/05c0hsny94nfvf6t9m2hz/inside-you.mp3?rlkey=mxfag9596how8jtchi39sceew&st=p78zv8xv" 
               type="audio/mpeg" 
            />
            <source 
               src="https://dl.dropbox.com/scl/fi/c9k4xa7nkfkcjyp506agz/inside-you.ogg?rlkey=gvdz4jdx22wmejvtpumrmaffg&st=e3yx2cki" 
               type="audio/ogg" 
            />
         </audio>
      </>
   )
}
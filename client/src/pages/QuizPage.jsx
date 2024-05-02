import { PreviewSheet } from "../components/PreviewSheet"
import { EditProfileSec } from "./QuizPageSections/EditProfileSec"
import { ProfileSec } from "./QuizPageSections/ProfileSec"
import { QuestionSec } from "./QuizPageSections/QuestionSec"
import { ResultSec } from "./QuizPageSections/ResultSec"
import { StartSec } from "./QuizPageSections/StartSec"


function QuizPage(){
   return (
      <>
         <StartSec />
         <QuestionSec />
         <ResultSec />
         <PreviewSheet />
         <EditProfileSec />
         <ProfileSec />
      </>
   )
}


export { QuizPage }
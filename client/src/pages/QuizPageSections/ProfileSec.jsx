

function ProfileSec(){
   return (
      <section id="profile_sec">
         <div className="profile_box">
            <button title="Close Profile" type="button" className="profile_close_btn fas fa-xmark"></button>
            <div className="upper_profile">
               <img src="https://i.ibb.co/r7P3mGQ/fox-6249911.png" id="avatar" alt="avatar" />
               <p id="username">username</p>
               <p id="fullname">fullname</p>
            </div>
            <div className="lower_profile">
               <p className="profile_high_score">High Score : <span className="hs">0</span></p>
               <p id="email">Email : <span>monu@gamil.com</span></p>
               <button type="button" id="edit_profile_btn">Edit Profile...<b className="fas fa-pencil"></b></button>
            </div>
         </div>
      </section>
   )
}

export { ProfileSec }
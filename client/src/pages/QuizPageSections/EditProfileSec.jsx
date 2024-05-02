
function EditProfileSec(){
   return (
      <section id="edit_profile_form">
         <h3>...Edit Profile Details</h3>
         <form action="#" method="post">
            <div className="input_box">
               <label htmlFor="name_field">Full Name :</label>
               <input type="text" id="name_field"/>
            </div>
            <div className="input_box">
               <label htmlFor="username_field">Username :</label>
               <input type="text" id="username_field"/>
            </div>
            <div className="input_box">
               <label htmlFor="email_field">Email :</label>
               <input type="text" id="email_field"/>
            </div>
            <div className="hz_box">
               <button type="button" id="profile_cancel_btn" className="btn1">Cancel</button>
               <button type="submit" className="btn1">Save</button>
            </div>
         </form>
      </section>
   )
}


export { EditProfileSec }
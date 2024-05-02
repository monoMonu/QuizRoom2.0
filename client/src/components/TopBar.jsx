
function TopBar(){
   return (
      <div className="top_bar">
         <div className="top_bar_left">
            <p className="hs_box">Highest Score : <span className="hs">0</span></p>
         </div>
         <div className="top_bar_right">
            <p className="mode_box">
               <button title="moonIcon" type="button" className="mode_btn fas fa-moon"></button>
               <span id="explosive_box"></span>
            </p>
            <button title="Profile button" type="button" className="profile_btn">
               <img src="https://i.ibb.co/r7P3mGQ/fox-6249911.png" alt="Profile Button"/>
            </button>
         </div>
      </div>
   )
}


export default TopBar;

function LoaderCover({msg}){
   return (
      <section className="loaderCover">
         <div className="loader"></div>
         <p className="loaderMsg">{msg || "Loading..."}</p>
      </section>
   )
}


export { LoaderCover }
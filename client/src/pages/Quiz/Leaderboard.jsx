import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { fetchLeaderboard } from "../../actions/quizAction.js";
import { Loader } from "../../components/Loader.jsx";
import SideMenu from "../../components/sideMenu/SideMenu.jsx";

export const Leaderboard = () => {
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(true);
   const [leaders, setLeaders] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(2);
   const [pageSize, setPageSize] = useState(10);

   useEffect(() => {
      const queryParams = new URLSearchParams(window.location.search);
      const page = parseInt(queryParams.get("page")) || 1;
      const limit = parseInt(queryParams.get("limit")) || 10;

      setCurrentPage(page);
      setPageSize(limit);

      const fetchData = async () => {
         setIsLoading(true);
         try {
            const res = await fetchLeaderboard(page, limit);
            if(res.data.length == 0) 
               navigate(-1, { replace: true });

            setLeaders(res.data);
            setTotalPages(res.totalPages);
         } catch (error) {
            console.error("Error fetching leaderboard:", error);
         } finally {
            setIsLoading(false);
         }
      };

      fetchData();
   }, [currentPage, pageSize]);

   const handlePageChange = (page) => {
      navigate(`?page=${page}&limit=${pageSize}`, { replace: true });
      setCurrentPage(page);
   };

   if (isLoading) return <Loader text={"Loading Data..."} />;

   return (
      <section className="leaderboardPage">
         <SideMenu />
         <div className="leaderboard">
            <div className="topBar">
               <button 
                  className="l-back" 
                  onClick={() => navigate(-1)}
               >
                  <i className="fas fa-arrow-left"></i>
               </button>
               <h1 className="l-title">Leaderboard</h1>
            </div>
            <div className="leaderboard-container">
               <div className="leaderboard">
                  {leaders.map((user, i) => (
                     <div key={i} className="leaderboard-item">
                        <span className="l-rank">{i + 1}.</span>
                        <div className="l-user">
                           <img src={user.avatar} alt={`profile pic of ${user.username}`} />
                           <span className="l-name">
                              <b>
                                 &nbsp;{user.fullname}
                                 {["🥇", "🥈", "🥉"][i]}
                              </b> 
                              <i>
                                 &nbsp;{user.username}
                              </i>
                           </span>
                        </div>
                        <span className="l-score">{user.highScore}</span>
                     </div>
                  ))}
               </div>
            </div>
            <div className="pagination">
               {Array.from({ length: totalPages }, (_, index) => (
                  <span key={index + 1}>
                     <button
                        onClick={() => handlePageChange(index + 1)}
                        disabled={currentPage === index + 1}
                        style={{
                           color: currentPage === index + 1 ? "var(--text-1)" : "var(--primary-color)"
                        }}
                     >
                        {index + 1}
                     </button>
                     {index + 1 === totalPages ? " " : <>,&nbsp;&nbsp;</>}
                  </span>
               ))}
            </div>
         </div>
      </section>
   );
};

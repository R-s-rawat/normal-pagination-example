import React, { useState, useEffect } from 'react';
import './App.css';
import Pagination from './Pagination';

function App() {
  
   // STEP 1: a new  state variable called "currentPage", for USER 1st response
   const [currentPage, setCurrentPage] = useState(1);

   // STEP 1: useState hook (preserves values b/w function calls(takes only single @arg i.e initial state))

   // STEP 2: useEffect hook - perform side effects, eg. call api

   // GO TO PAGINATION.js for next steps followed STEP 3 - 9

   // STEP 10: STEP 1: into action ;SET CURRENT PAGE to =1; and set DATA into ARRAY, & set UI PAGE limit 5,(for only 5 page numbers on UI)
   const pageNumberLimit = 5;
   const [passengersData, setData] = useState([])
   const [loading, setLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);


  // STEP 11: take STEP 2: into action;
  useEffect(()=>{
    setLoading(true);
    fetch(`https://api.instantwebtools.net/v1/passenger?currentPage=${currentPage}&size=5`)
    .then((response) => response.json())
    .then((json) => { setData(json); setLoading(false);});

  },[currentPage]);

  // STEP 12: Finale 
  const onPageChange= (pageNumber)=>{
    setCurrentPage(pageNumber);
  }
  const onPrevClick = ()=>{
      if((currentPage-1) % pageNumberLimit === 0){
          setMaxPageLimit(maxPageLimit - pageNumberLimit);
          setMinPageLimit(minPageLimit - pageNumberLimit);
      }
      setCurrentPage(prev=> prev-1);
   }

  const onNextClick = ()=>{
       if(currentPage+1 > maxPageLimit){
           setMaxPageLimit(maxPageLimit + pageNumberLimit);
           setMinPageLimit(minPageLimit + pageNumberLimit);
       }
       setCurrentPage(prev=>prev+1);
    }

    const paginationAttributes = {
      currentPage,
      maxPageLimit,
      minPageLimit,
      response: passengersData,
    };

    
  return (
    <div className="App">
      <div className='App-header'>
      <h2>Passenger List</h2>
        {!loading ? <Pagination {...paginationAttributes} 
                          onPrevClick={onPrevClick} 
                          onNextClick={onNextClick}
                          onPageChange={onPageChange}/>
        : <div> Loading... </div>
        }
      </div>
    </div>
  );
}

export default App;

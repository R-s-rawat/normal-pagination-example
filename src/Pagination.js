import React from 'react';
import './Pagination.css';

// STEP 3: pagination reusable component; gets input from parent component e.g App.js


// STEP 4: Initialize the variables for pagination logic

const Pagination = (props) => {
    const { currentPage, maxPageLimit, minPageLimit } = props;
    const totalPages = props.response.totalPages - 1;
    const data = props.response.data;

    // STEP 5: build pages ARRAY, which will hold total/ALL page numbers
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const handlePrevClick = ()=>{
        props.onPrevClick();
    }
    const handleNextClick = ()=>{
        props.onNextClick();
    }
    const handlePageClick = (e)=>{
        props.onPageChange(Number(e.target.id));
    }

      // STEP 6: Create UI for ALL page numbers b/w limits, using ARRAY(if iteration page matches current page, make it active)
     const pageNumbers = pages.map(page=>{
        if(page<= maxPageLimit && page>minPageLimit){
            return(
                <li key={page} id={page} onClick={handlePageClick} 
                className={currentPage===page?'active':null}
                >
                    {page}
                </li>
            )
        }
     })

     // STEP 7: Previous, Next buttons for pagination,-> page ellipses &hellip;
     let pageIncrementEllipses = null;
     if(pages.length > maxPageLimit){
         pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>
     }
     let pageDecremenEllipses = null;
     if(minPageLimit >=1){
         pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li> 
     }



     // STEP 8: Render ---- API Response in list format (listing) 
     const renderData = (data)=>{
        return(
            <ul>
            {data.map((d)=> 
            <li key={d['_id']}> The passenger having id {d['_id'].slice(d['_id'].length-5)} using {d.airline[0].name} airlines</li>)
            }
        </ul>
        )
     }

     // STEP 9: COMBINE Logic and UI and return to parent (along with Prev and Next buttons)

    return (
        // Passenger DATA ---API
        /*
        Pager COMPONENT
        1. Prev button
        2. Page decrement ellipses
        3. Page numbers with current page selection
        4. Page increment ellipses
        5. Next button
        */
         <div className='main'>
            <div className='mainData'>
                {/* // consume data */}
                {renderData(data)}
            </div>
            {/* // page Numbers */}
            <ul className='pageNumbers'>
                <li>
                    <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>Prev</button>
                </li>
                {pageDecremenEllipses}
                {pageNumbers}
                {pageIncrementEllipses}
                <li>
                   <button onClick={handleNextClick} disabled={currentPage === pages[pages.length-1]}>&gt;Next</button>
               </li>
            </ul>
            {/* //  END OF API CONSUMPTion */}
         </div>
    )
}
export default Pagination;
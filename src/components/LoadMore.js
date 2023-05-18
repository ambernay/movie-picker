
function LoadMore({ currentPage, setCurrentPage, moviesArray, totalPages }){

    // removes button section from dom when no result are available
    const buttonContainerClass = (moviesArray.length < 1) ? "make-display-none" : "load-button-container";

    //  disables buttons when there are no more available pages
    let backButton = (currentPage === 1) ? "disabled-button" : '';
    let forwardButton = (currentPage === totalPages) ? "disabled-button" : '';

    const handleButtons = (e) => {
        // get parent button
        const buttonClass = e.target.closest('button').className;

        // set new page only if page is available
        if (buttonClass === 'back-button' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
        else if(buttonClass === 'forward-button' && currentPage < totalPages){
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <section className="load-buttons-section">
            <div className="wrapper">
                <div className={buttonContainerClass}>
                    <button onClick={handleButtons} className="back-button">
                        <figure >
                            <svg xmlns="http://www.w3.org/2000/svg" className={"ionicon " + backButton} viewBox="0 0 512 512"><path d="M321.94 98L158.82 237.78a24 24 0 000 36.44L321.94 414c15.57 13.34 39.62 2.28 39.62-18.22v-279.6c0-20.5-24.05-31.56-39.62-18.18z" /></svg>
                            <figcaption className="sr-only">back arrow</figcaption>
                        </figure>
                    </button>
                    <h3 className={forwardButton}>{`${currentPage} / ${totalPages}`}</h3>
                    <button onClick={handleButtons} className="forward-button">
                        <figure>
                            <svg xmlns="http://www.w3.org/2000/svg" className={"ionicon " + forwardButton} viewBox="0 0 512 512"><path d="M190.06 414l163.12-139.78a24 24 0 000-36.44L190.06 98c-15.57-13.34-39.62-2.28-39.62 18.22v279.6c0 20.5 24.05 31.56 39.62 18.18z" /></svg>
                            <figcaption className="sr-only">forward arrow</figcaption>
                        </figure>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default LoadMore;
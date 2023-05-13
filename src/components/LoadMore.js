
function LoadMore({ currentPage, setCurrentPage, moviesArray }){

    const buttonClass = (moviesArray.length < 1) ? "make-display-none" : "load-button-container";

    const handleButtons = (e) => {
        const buttonClass = e.target.closest('button').className;

        if (buttonClass === 'back-button' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }else if(buttonClass === 'forward-button'){
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <section className="load-buttons-section">
            <div className="wrapper">
                <div className={buttonClass}>
                    <button onClick={handleButtons} className="back-button">
                        <figure >
                            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><path d="M321.94 98L158.82 237.78a24 24 0 000 36.44L321.94 414c15.57 13.34 39.62 2.28 39.62-18.22v-279.6c0-20.5-24.05-31.56-39.62-18.18z" /></svg>
                            <figcaption className="sr-only">back arrow</figcaption>
                        </figure>
                    </button>
                    <h3>Load More</h3>
                    <button onClick={handleButtons} className="forward-button">
                        <figure>
                            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><path d="M190.06 414l163.12-139.78a24 24 0 000-36.44L190.06 98c-15.57-13.34-39.62-2.28-39.62 18.22v279.6c0 20.5 24.05 31.56 39.62 18.18z" /></svg>
                            <figcaption className="sr-only">forward arrow</figcaption>
                        </figure>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default LoadMore;
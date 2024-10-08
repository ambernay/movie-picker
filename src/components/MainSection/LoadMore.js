import { RightArrowIcon, LeftArrowIcon } from '../Icons';

function LoadMore({ currentPage, setCurrentPage, moviesArrayLength, 
    totalPages, currentTranslation, isFormVisible }) {

    const iconDescription = currentTranslation['sr-only'];

    // removes button section from dom when no result are available
    const buttonContainerClass = (moviesArrayLength < 1) ? "make-display-none" : "load-button-container";

    //  disables buttons when there are no more available pages
    let backButton = (currentPage === 1) || isFormVisible ? "disabled-button" : '';
    let forwardButton = (currentPage === totalPages) || isFormVisible ? "disabled-button" : '';

    const handleButtons = (e) => {
        // get parent button
        const buttonClass = e.target.closest('button').className;

        // set new page only if page is available
        if (buttonClass === 'back-button' && currentPage > 1 
            && !isFormVisible) {
            setCurrentPage(currentPage - 1);
        }
        else if (buttonClass === 'forward-button' && currentPage < totalPages 
            && !isFormVisible) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <section className="load-buttons-section"
            // prevents click on main background from capturing loadmore
            onClick={(e) => {
                e.stopPropagation(); document.querySelector('.gallery-items').scrollIntoView(false);
            }}>
            <div className="wrapper">
                <div className={buttonContainerClass}>
                    <button onClick={handleButtons} className="back-button">
                        <figure className='load-arrow-figs'>
                            <LeftArrowIcon
                                arrowClass={backButton}
                            />
                            <figcaption className="sr-only">{iconDescription.back_arrow}</figcaption>
                        </figure>
                    </button>
                    {currentPage && totalPages ? 
                        <h3 className={forwardButton}>{`${currentPage} / ${totalPages}`}</h3> 
                        : null
                    }
                    <button onClick={handleButtons} className="forward-button">
                        <figure className='load-arrow-figs'>
                            <RightArrowIcon
                                arrowClass={forwardButton}
                            />
                            <figcaption className="sr-only">{iconDescription.forward_arrow}</figcaption>
                        </figure>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default LoadMore;
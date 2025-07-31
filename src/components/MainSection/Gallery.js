import { useState, useRef, useEffect, use, useMemo, memo, Suspense } from 'react';
import { useInView } from "react-intersection-observer";
import {isMobile} from 'react-device-detect';
import GalleryItems from './GalleryItems.js';
import LoadMore from './LoadMore.js';
import { MoviesApiCall } from '../MovieApiCache.js';
import { TransObj } from '../TranslationObjects.js';

function Gallery({ userSelections, setUserSelections, currentPage,
     setCurrentPage, isFormVisible, tvMovieToggle, currentRegion, 
     currentLanguage, searchState, setSearchState, isSearchbarOpen }) {

    const firstElementRef = useRef(null);

    const capFirstChar = (string) => {return string.charAt(0).toUpperCase() + string.slice(1);}

    const currentTranslation = TransObj[`${currentLanguage[0]}`];
    const noResults = capFirstChar(currentTranslation.status_messages.no_results);
    const loadingMessage = `${capFirstChar(currentTranslation.status_messages.loading)}...`;
    const failedToLoad = capFirstChar(currentTranslation.status_messages.failed_to_load);
    const trending = capFirstChar(currentTranslation.trending);

    const [moviesToDisplay, setMoviesToDisplay] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [statusMessage, setStatusMessage] = useState(loadingMessage);
    const [personSearchState, setPersonSearchState] = useState([]);
    
    // stops background scroll when using tab keys
    const tabIndex = isFormVisible ? '-1' : '0';
    const autoLoadMode = isMobile && searchState !== 'person';
    const activeList = (currentPage < totalPages) && (totalPages !== 1 );
    
    const moviePromiseResults = use(MoviesApiCall(currentPage, tvMovieToggle, currentLanguage,
        userSelections, searchState));

    const {ref: loadContainerRef, inView} = useInView({
        threshold: 0.8, // Trigger when % of the element is visible
    });

    useEffect(() => {
        if(inView && activeList){
            setCurrentPage(prevPage => prevPage + 1);
        }
    },[inView])

    function removeDuplicateIds(movieResults, id) {
        return movieResults.reduce((accumulator, current) => {

            let movie = accumulator.find(item => item[id] === current[id]);

            //  #region for person search duplicates
            if(searchState === 'person') {
                // push if movie doesn't already exist in object
                if (!movie) {
                    // if key: 'job' exists change value to array
                    if(current.job) { current.job = [current.job]; }
                    accumulator.push(current);
                }
                // if movie already exists... 
                else {
                    // ...and character is present in current, add to existing movie
                    if (current.character && !movie.character){
                        movie.character = current.character;
                    }
                    // ...add key: 'job'
                    if(current.job && !movie.job) { 
                        movie.job = [current.job]; 
                    }
                    else if (current.job && movie.job){
                        // ...and push job info from discarded data to object
                        movie.job.push(current.job);
                    }
                }
            }
            //  #endregion for person search duplicates
            else if (!movie) {
                accumulator.push(current);
            }
            return accumulator;
        }, []);
    }  
    useEffect(() => {
        // scroll to top unless on autoLoadMode
        if(currentPage === 1 || !autoLoadMode){firstElementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });}
       
        // #region re-saving state on person search as element unmounts
        if (searchState === 'person') {setPersonSearchState(userSelections[2])}
        // #endregion re-saving state on person search as element unmounts
        if (!isSearchbarOpen) {
            setStatusMessage(loadingMessage);
    
            // list of user selections for 'no results' message
            let messageArr = userSelections[2]?.join(' / ');
            let mediaType = tvMovieToggle === 'movie' ? 'movies' : 'TV shows';  

            if (moviePromiseResults) {
                const movieResults = searchState === 'person' ? 
                    removeDuplicateIds(moviePromiseResults.movieResults, 'id') 
                    : moviePromiseResults.movieResults
                
                setTotalPages(moviePromiseResults.totalPages);
                // for continuous load on phones
                if(autoLoadMode && (currentPage > 1 && currentPage <= totalPages)){
                    const multiPageGallery = removeDuplicateIds([...moviesToDisplay, ...moviePromiseResults.movieResults], 'id');

                    setMoviesToDisplay(multiPageGallery);
                    // scroll to top on fresh load
                    if(multiPageGallery.length < 20){firstElementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });}
                }
                else{setMoviesToDisplay(movieResults);}

                // message for no results
                if (movieResults < 1) {setStatusMessage(`${noResults}:\n\n${messageArr}`)};
            }
            else {
                // message for no results
                if (searchState === 'trending'){setStatusMessage(`${failedToLoad} ${trending} ${mediaType}`)}
                else if (searchState !== 'trending'){setStatusMessage(`${failedToLoad}:\n\n${messageArr}`)}
            }
        }
    }, [userSelections, currentPage, currentRegion, currentLanguage, 
        tvMovieToggle, searchState, isSearchbarOpen, setTotalPages, setMoviesToDisplay]);

    const LoadingStatusMessage = () => {
        if (!moviesToDisplay || (moviesToDisplay.length < 1)) {
            return(
                <div className="message-container">
                    <h4>{statusMessage}</h4>
                </div>
            )
        }
        else if (autoLoadMode && activeList) {
            return (
                <div ref={loadContainerRef} className={'scroll-load'} >
                    <h4>{loadingMessage}</h4>
                    <h4>{`${currentPage} / ${totalPages}`}</h4>
                </div>
            )
        } 
        else if (autoLoadMode) {
            return (
                <div className={'gallery-end-list'} >
                    <h4>{`${currentPage} / ${totalPages}`}</h4>
                </div>
            )
        }
    }

    const createGalleryPropsObj = useMemo(() => {
        return {
            currentLanguage: currentLanguage,
            currentTranslation: currentTranslation,
            tvMovieToggle: tvMovieToggle,
            setUserSelections: setUserSelections,
            setSearchState: setSearchState,
            personSearchState: personSearchState
        }
    },[currentLanguage, currentTranslation, tvMovieToggle, 
        setUserSelections, setSearchState, personSearchState])

    return (
        <>
            <div className='wrapper main-wrapper'>
                <Suspense fallback={<LoadingStatusMessage/>}>
                    <div className="gallery-container">
                        <ul className='gallery-list-container'>
                            {moviesToDisplay?.map((movie, index) => {
                                const imageURL = 'https://image.tmdb.org/t/p/w500';
                                /* if image not available, use icon */
                                const imagePath = movie.poster_path ? (imageURL + movie.poster_path) : null;
                               
                                return (
                                    <GalleryItems
                                        key={movie.id}
                                        itemRef={index === 0 ? firstElementRef : null}
                                        tabIndex={tabIndex}
                                        movieTitle={movie.title || movie.name}
                                        overview={
                                            movie.overview ||
                                            "No description available"}
                                        imagePath={imagePath}
                                        audienceRating={(movie.vote_average)?.toFixed(1)}
                                        currentRegion={currentRegion}
                                        galleryPropsObj={createGalleryPropsObj}
                                        movieInfoObj={movie}
                                    />
                                )
                            })}
                        </ul>
                        {LoadingStatusMessage()}
                    </div>
                </Suspense>
            </div>{/* wrapper */}
            {(!autoLoadMode && searchState !== 'person') ?
                <LoadMore
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    moviesArrayLength={moviesToDisplay?.length}
                    totalPages={totalPages}
                    currentTranslation={currentTranslation}
                    isFormVisible={isFormVisible}
                />
            : null}
        </>
    )
}

export default memo(Gallery);
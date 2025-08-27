import { useState, useEffect } from 'react';
import { ErrorBoundary } from "react-error-boundary";
import { LanguagesObj, TransObj } from './components/TranslationObjects.js';
import Header from './components/HeaderSection/Header.js';
import Gallery from './components/MainSection/Gallery.js';
import Form from './components/FormSection/Form.js';

function App() {

    const [userSelections, setUserSelections] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [tvMovieToggle, setTvMovieToggle] = useState('movie');
    const [searchState, setSearchState] = useState('trending');
    // [region-code, native-name]
    const storedRegion = [localStorage.getItem('stored-country-code'), localStorage.getItem('stored-country-name')];
    const [currentRegion, setCurrentRegion] = useState(storedRegion);
    // default language from navigator
    const defaultLanguage = LanguagesObj.langList.some(item => 
        item.iso_639_1 === navigator.language.substring(0,2)) 
        ? [navigator.language.substring(0,2), navigator.language]
        : ['en', 'en-US'];
    const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);
        
    function evaluateScreenSize() {
        // height has to be lower to allow for search bar pop-up
        if(window.innerWidth <= 460 && window.innerHeight > 400) { return 'narrowScreen';} 
        // 740 matches css media query
        else if ((window.innerWidth > 460 && window.innerWidth <= 990) && window.innerHeight > 400) { return 'midScreen';}
        else if (window.innerWidth > 990 && window.innerHeight > 400) { return 'wideScreen';};
    }
    // screen size state for for toggle button
    const [screenSize, setScreenSize] = useState(evaluateScreenSize());

    // evaluates screen size on load
    useEffect(() => {
        window.addEventListener('resize', () => setScreenSize(evaluateScreenSize()));
    }, [setScreenSize]);

    const handleDropdown = (e) => {
        const headerRegionDropdown = document.querySelector('.header-region');
        (!isFormVisible && document.activeElement !== headerRegionDropdown) ? 
        setIsFormVisible(true) : setIsFormVisible(false);

        if (isSearchbarOpen) { setIsSearchbarOpen(false);}

        localStorage.setItem('did-open-form', JSON.stringify('true'));

        return false;
    }

    const GalleryErrorDefault = () => {
        return (
            <div className="message-container">
                <h4>{`${TransObj[`${currentLanguage[0]}`].status_messages.no_results}`}</h4>
            </div>
        )
    }

    return (
        <>
            <Header
                handleDropdown={handleDropdown}
                isFormVisible={isFormVisible}
                setIsFormVisible={setIsFormVisible}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                currentRegion={currentRegion} 
                setCurrentRegion={setCurrentRegion}
                currentLanguage={currentLanguage}
                setCurrentLanguage={setCurrentLanguage}
                tvMovieToggle={tvMovieToggle}
                setTvMovieToggle={setTvMovieToggle}
                screenSize={screenSize}
                searchState={searchState}
                setSearchState={setSearchState}
                setUserSelections={setUserSelections}
                isSearchbarOpen={isSearchbarOpen}
                setIsSearchbarOpen={setIsSearchbarOpen}
            />
            <main className={searchState}>
            
            <ErrorBoundary fallback={<GalleryErrorDefault/>}>
                <Gallery
                    userSelections={userSelections}
                    currentRegion={currentRegion}
                    setCurrentRegion={setCurrentRegion}
                    currentLanguage={currentLanguage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isFormVisible={isFormVisible}
                    tvMovieToggle={tvMovieToggle}
                    setTvMovieToggle={setTvMovieToggle}
                    searchState={searchState}
                    setSearchState={setSearchState}
                    isSearchbarOpen={isSearchbarOpen}
                    setUserSelections={setUserSelections}
                />
            </ErrorBoundary>
            </main>
            {isFormVisible ?
                <Form
                    setUserSelections={setUserSelections}
                    isFormVisible={isFormVisible}
                    setIsFormVisible={setIsFormVisible}
                    currentRegion={currentRegion}
                    setCurrentRegion={setCurrentRegion}
                    currentLanguage={currentLanguage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    tvMovieToggle={tvMovieToggle}
                    screenSize={screenSize}
                    searchState={searchState}
                    setSearchState={setSearchState}
                />
            : null}
        </>
    );
}

export default App;

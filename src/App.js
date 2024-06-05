import { useState, useEffect } from 'react';
import Header from './components/HeaderSection/Header.js';
import Gallery from './components/MainSection/Gallery.js';
import Form from './components/FormSection/Form.js';

function App() {

    const [isTrending, setIsTrending] = useState(true);
    const [userSelections, setUserSelections] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [tvMovieToggle, setTvMovieToggle] = useState('movie');
    const [searchType, setSearchType] = useState('movie');
    const [currentRegion, setCurrentRegion] = useState(["CA", "Canada", "Canada"]);
    const [currentLanguage, setCurrentLanguage] = useState(["en", "English", "English"]);
    const [sortOption, setSortOption] = useState("vote_average.desc");

    const [searchState, setSearchState] = useState(''); 

    function evaluateScreenSize() {
        // height has to be lower to allow for search bar pop-up
        if(window.innerWidth <= 430 && window.innerHeight > 400) return 'narrowScreen'; 
        // 740 matches css media query
        else if ((window.innerWidth > 430 && window.innerWidth <= 990) && window.innerHeight > 400) return 'midScreen';
        else if (window.innerWidth > 990 && window.innerHeight > 400) return 'wideScreen';
    }

    // screen size state for for toggle button
    const [screenSize, setScreenSize] = useState(evaluateScreenSize());

    useEffect(() => {
        window.addEventListener('resize', () => setScreenSize(evaluateScreenSize()));
    }, []);

    // stop background scroll when form is visible
    useEffect(() => {
        const bodyEl = document.querySelector('body');
        isDropdownVisible ? bodyEl.classList.add('stop-scroll') : bodyEl.classList.remove('stop-scroll');
    }, [isDropdownVisible]);

    const handleDropdown = (e) => {
        const headerRegionDropdown = document.querySelector('.header-region');
        (!isDropdownVisible && document.activeElement !== headerRegionDropdown) ? setIsDropdownVisible(true) : setIsDropdownVisible(false);
        return false;
    }

    return (
        <>
            <Header
                handleDropdown={handleDropdown}
                isDropdownVisible={isDropdownVisible}
                setIsDropdownVisible={setIsDropdownVisible}
                isTrending={isTrending}
                setIsTrending={setIsTrending}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                currentLanguage={currentLanguage}
                setCurrentLanguage={setCurrentLanguage}
                currentRegion={currentRegion}
                setCurrentRegion={setCurrentRegion}
                setSortOption={setSortOption}
                tvMovieToggle={tvMovieToggle}
                setTvMovieToggle={setTvMovieToggle}
                screenSize={screenSize}
                searchState={searchState}
                setSearchState={setSearchState}
                searchType={searchType}
                setSearchType={setSearchType}
                setUserSelections={setUserSelections}
            />
            <main onClick={handleDropdown}>
                <Gallery
                    userSelections={userSelections}
                    isTrending={isTrending}
                    currentRegion={currentRegion}
                    setCurrentRegion={setCurrentRegion}
                    currentLanguage={currentLanguage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    sortOption={sortOption}
                    isDropdownVisible={isDropdownVisible}
                    tvMovieToggle={tvMovieToggle}
                    setTvMovieToggle={setTvMovieToggle}
                    searchState={searchState}
                    searchType={searchType}
                />
            </main>
            <Form
                setUserSelections={setUserSelections}
                isDropdownVisible={isDropdownVisible}
                setIsTrending={setIsTrending}
                setIsDropdownVisible={setIsDropdownVisible}
                currentRegion={currentRegion}
                setCurrentRegion={setCurrentRegion}
                currentLanguage={currentLanguage}
                sortOption={sortOption}
                setSortOption={setSortOption}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                tvMovieToggle={tvMovieToggle}
                screenSize={screenSize}
                searchState={searchState}
                setSearchState={setSearchState}
            />
        </>
    );
}

export default App;

import { useState, useEffect } from 'react';
import { GeoLocationApiCall } from './components/MovieApiCache.js';
import { LanguagesObj } from './components/TranslationObjects.js';
import Header from './components/HeaderSection/Header.js';
import Gallery from './components/MainSection/Gallery.js';
import Form from './components/FormSection/Form.js';

function App() {

    const [isTrending, setIsTrending] = useState(true);
    const [userSelections, setUserSelections] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [tvMovieToggle, setTvMovieToggle] = useState('movie');
    // [region-code, name, native-name]
    const [currentRegion, setCurrentRegion] = useState(["US", "United States", "United States"]);
    const [currentLanguage, setCurrentLanguage] = useState(['en', 'en-US']);
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

    // default settings on load
    useEffect(() => {
        window.addEventListener('resize', () => setScreenSize(evaluateScreenSize()));
        //  get user's location on load
        GeoLocationApiCall().then(result => {
            const defaultCountry = result.country;
            setCurrentRegion([`${defaultCountry.iso_code}`, `${defaultCountry.name}`, `${defaultCountry.name_native}`]);
        });
        // setLanguage by browser settings if exist else EN default
        const defaultLanguage = LanguagesObj.langList.some(item => 
        item.iso_639_1 === navigator.language.substring(0,2)) 
        ? [navigator.language.substring(0,2), navigator.language]
        : ['en', 'en-US'];

        setCurrentLanguage(defaultLanguage)
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
            />
            <main>
                <Gallery
                    userSelections={userSelections}
                    isTrending={isTrending}
                    currentRegion={currentRegion}
                    setCurrentRegion={setCurrentRegion}
                    currentLanguage={currentLanguage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isDropdownVisible={isDropdownVisible}
                    tvMovieToggle={tvMovieToggle}
                    setTvMovieToggle={setTvMovieToggle}
                    searchState={searchState}
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

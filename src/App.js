import { useState, useEffect } from 'react';
import Header from './components/HeaderSection/Header.js';
import Gallery from './components/MainSection/Gallery.js';
import Form from './components/FormSection/Form.js';
import Footer from './components/Footer.js';

function App() {

    const [isTrending, setIsTrending] = useState(true);
    const [userSelections, setUserSelections] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [tvMovieToggle, setTvMovieToggle] = useState('movie');
    const [currentRegion, setCurrentRegion] = useState(["CA", "Canada"]);
    const [currentActiveElement, setCurrentActiveElement] = useState();
    const [searchState, setSearchState] = useState(''); 

    function evaluateScreenSize() {
        // height has to be lower to allow for search bar pop-up
        return (window.innerWidth <= 430 && window.innerHeight > 400) ? 'narrowScreen' : 'wideScreen';
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

        (!isDropdownVisible && currentActiveElement !== headerRegionDropdown) ? setIsDropdownVisible(true) : setIsDropdownVisible(false);

        setCurrentActiveElement(document.activeElement);
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
                setCurrentPage={setCurrentPage}
                currentRegion={currentRegion}
                setCurrentRegion={setCurrentRegion}
                tvMovieToggle={tvMovieToggle}
                setTvMovieToggle={setTvMovieToggle}
                screenSize={screenSize}
                setCurrentActiveElement={setCurrentActiveElement}
                setSearchState={setSearchState}
                setUserSelections={setUserSelections}
            />
            <main onClick={handleDropdown}>
                <Gallery
                    userSelections={userSelections}
                    isTrending={isTrending}
                    currentRegion={currentRegion}
                    setCurrentRegion={setCurrentRegion}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isDropdownVisible={isDropdownVisible}
                    tvMovieToggle={tvMovieToggle}
                    setTvMovieToggle={setTvMovieToggle}
                    currentActiveElement={currentActiveElement}
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
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                tvMovieToggle={tvMovieToggle}
                screenSize={screenSize}
                setSearchState={setSearchState}
            />

            <Footer />
        </>
    );
}

export default App;

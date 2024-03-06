import { useState, useEffect } from 'react';
import Header from './components/HeaderSection/Header.js';
import Gallery from './components/MainSection/Gallery.js';
import Form from './components/FormSection/Form.js';
import Footer from './components/Footer.js';

function App() {

    const [isTrending, setIsTrending] = useState(true);
    const [newURL, setNewURL] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [tvMovieToggle, setTvMovieToggle] = useState('movie');
    const [currentRegion, setCurrentRegion] = useState(["CA", "Canada"]);

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
        !isDropdownVisible ? setIsDropdownVisible(true) : setIsDropdownVisible(false);
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
            />
            <main onClick={handleDropdown}>
                <Gallery
                    newURL={newURL}
                    isTrending={isTrending}
                    currentRegion={currentRegion}
                    setCurrentRegion={setCurrentRegion}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isDropdownVisible={isDropdownVisible}
                    tvMovieToggle={tvMovieToggle}
                    setTvMovieToggle={setTvMovieToggle}
                />
            </main>

            <Form
                setNewURL={setNewURL}
                isDropdownVisible={isDropdownVisible}
                setIsTrending={setIsTrending}
                setIsDropdownVisible={setIsDropdownVisible}
                currentRegion={currentRegion}
                setCurrentRegion={setCurrentRegion}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isTrending={isTrending}
                tvMovieToggle={tvMovieToggle}
                screenSize={screenSize}
            />

            <Footer />
        </>
    );
}

export default App;

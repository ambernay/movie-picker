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

    // screen size state for for toggle button
    const [screenSize, setScreenSize] = useState((window.innerWidth <= 400 && window.innerHeight > 500) ? 'narrowScreen' : 'wideScreen');

    useEffect(() => {

        window.addEventListener('resize', () => setScreenSize((window.innerWidth <= 400 && window.innerHeight > 500) ? 'narrowScreen' : 'wideScreen'));

    }, []);

    // stop background scroll when form is visible
    useEffect(() => {
        const bodyEl = document.querySelector('body');
        isDropdownVisible ? bodyEl.classList.add('stop-scroll') : bodyEl.classList.remove('stop-scroll');
    }, [isDropdownVisible])

    const handleDropdown = () => {
        !isDropdownVisible ? setIsDropdownVisible(true) : setIsDropdownVisible(false);
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
                tvMovieToggle={tvMovieToggle}
                setTvMovieToggle={setTvMovieToggle}
                screenSize={screenSize}
            />
            <main>
                <Gallery
                    newURL={newURL}
                    isTrending={isTrending}
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
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isTrending={isTrending}
                tvMovieToggle={tvMovieToggle}
            />

            <Footer />
        </>
    );
}

export default App;

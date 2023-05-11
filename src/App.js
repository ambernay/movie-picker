import { useState, useEffect } from 'react';
import Header from './components/Header.js';
import Gallery from './components/Gallery.js';
import Form from './components/Form.js';
import LoadMore from './components/LoadMore.js';
import Footer from './components/Footer.js';

function App() {

    const [movies, setMovies] = useState([]);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [newURL, setNewURL] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // stop background scroll when form is visible
    useEffect(() => {
        const bodyEl = document.querySelector('body');
        isDropdownVisible ? bodyEl.classList.add('stop-scroll') : bodyEl.classList.remove('stop-scroll');
    },[isDropdownVisible])

    return (
    <>
        <Header
            isDropdownVisible = {isDropdownVisible}
            setIsDropdownVisible = {setIsDropdownVisible}
        />
        <Gallery
            newURL = {newURL}
            setMoviesToDisplay = {setMovies}
            moviesToDisplay = {movies}
            isFormSubmitted = {isFormSubmitted}
        />
        <Form
            setNewURL={setNewURL}
            isDropdownVisible={isDropdownVisible}
            setIsFormSubmitted={setIsFormSubmitted}
            setIsDropdownVisible={setIsDropdownVisible}
            currentPage={currentPage}
            isFormSubmitted={isFormSubmitted}
            setCurrentPage={setCurrentPage}
        />
        <LoadMore
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            newURL = {newURL}
        />
        <Footer />
    </>
    );
}

export default App;

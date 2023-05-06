import { useState } from 'react';
import Header from './components/Header.js';
import Gallery from './components/Gallery.js';
import Form from './components/Form.js';
import Footer from './components/Footer.js';

function App() {

    const [movies, setMovies] = useState([]);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [newURL, setNewURL] = useState('');
    const [isDropdownHovered, setIsDropdownHovered] = useState(false);

    return (
    <>
        <Header
            setIsDropdownHovered = {setIsDropdownHovered}
        />
        <Gallery
            newURL = {newURL}
            setMoviesToDisplay = {setMovies}
            moviesToDisplay = {movies}
            isFormSubmitted = {isFormSubmitted}
        />
        <Form
            setNewURL = {setNewURL}
            setIsFormSubmitted = {setIsFormSubmitted}
            isDropdownHovered = {isDropdownHovered}
        />
        <Footer />
    </>
    );
}

export default App;

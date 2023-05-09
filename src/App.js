import { useState } from 'react';
import Header from './components/Header.js';
import Gallery from './components/Gallery.js';
import Form from './components/Form.js';
import Footer from './components/Footer.js';

function App() {

    const [movies, setMovies] = useState([]);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [newURL, setNewURL] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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
        {
            isDropdownVisible ?
            <Form
                setNewURL={setNewURL}
                setIsFormSubmitted={setIsFormSubmitted}
                setIsDropdownVisible={setIsDropdownVisible}
            />
            :null
        }

        <Footer />
    </>
    );
}

export default App;

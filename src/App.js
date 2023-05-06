import { useState } from 'react';
import Header from './components/Header.js';
import Gallery from './components/Gallery.js';
import Form from './components/Form.js';
import Footer from './components/Footer.js';

function App() {

    const [movies, setMovies] = useState([]);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [newURL, setNewURL] = useState('');

    return (
    <>
        <Header />
        <Gallery
            newURL = {newURL}
            setMoviesToDisplay = {setMovies}
            moviesToDisplay = {movies}
            isFormSubmitted = {isFormSubmitted}
        />
        <Form
            setNewURL = {setNewURL}
            setIsFormSubmitted = {setIsFormSubmitted}
        />
        <Footer />
    </>
    );
}

export default App;

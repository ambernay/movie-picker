import { useState, useEffect } from 'react';
import FormButtons from './FormButtons.js';

function Form({ setNewURL, setIsFormSubmitted, setIsDropdownVisible }) {

    const [radioButtonList, setRadioButtonList] = useState([]);

    const apiKey = '0a093f521e98a991f4e4cc2a12460255';
    const baseURL = 'https://api.themoviedb.org/3';
    const url = new URL(baseURL + "/discover/movie");

    url.search = new URLSearchParams({
        "with_genres": 878,
        "api_key": apiKey,
        "primary_release_year" : 1950,
    })

    // url.search = new URLSearchParams({
    //     "with_genres": 18,
    //     "sort_by": "vote_average.desc",
    //     "vote_count.gte": 10,
    //     "api_key": apiKey
    // })

    // const genreListURL = "https://api.themoviedb.org/3/genre/movie/list?api_key=0a093f521e98a991f4e4cc2a12460255&language=en-US";

    const genreListURL = new URL ("https://api.themoviedb.org/3/genre/movie/list?");

    genreListURL.search = new URLSearchParams({
        "api_key": apiKey,
        "language": "en-US",
    })

    console.log(genreListURL);
    // get genre list from api
    useEffect(() => {
        fetch(genreListURL)
            .then(results => {
                return results.json();
            })
            .then(data => {
                console.log(data.results);
                // setRadioButtonList(data.results);
                // console.log(radioButtonList);
            })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setNewURL(url);
        setIsFormSubmitted(true);
        setIsDropdownVisible(false);
    }

    return (
        <section className="form-section">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <div onClick={() => setIsDropdownVisible(false)} className="x-div-container">
                        <div className="lines a"></div>
                        <div className="lines b"></div>
                    </div>
                    <FormButtons />
                    <button>Get Movies</button>
                </form>
            </div>
        </section>
    )
}

export default Form;
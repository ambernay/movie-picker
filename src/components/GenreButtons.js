import { useState, useEffect } from 'react';

function GenreButtons({ buttonType, setButtonType }) {

    const [genreRadioButtons, setGenreRadioButtons] = useState([]);

    const genreListURL = "https://api.themoviedb.org/3/genre/movie/list?api_key=0a093f521e98a991f4e4cc2a12460255&language=en-US";

    // const genreListURL = new URL ("https://api.themoviedb.org/3/genre/movie/list?");

    // genreListURL.search = new URLSearchParams({
    //     "api_key": apiKey,
    //     "language": "en-US",
    // })

    // get genre list from api
    useEffect(() => {
        fetch(genreListURL)
            .then(results => {
                return results.json();
            })
            .then(data => {
                setGenreRadioButtons(data.genres);
            })
        setButtonType("genre");
        console.log('definitely not looping');
    }, []);

    // const buttonsToRender = buttonType === "genre" ? genreRadioButtons : null;

    // const formClass = isDropdownVisible ? "form-section" : "make-display-none";
    // console.log(genreRadioButtons);
    // const buttonsToRender = buttonType === "genre" ? genreRadioButtons : buttontype === "decade" ? decadesObj.decades : buttonType === "provider" ? providersObj.providers : null;
    // if(buttonType === 'genre') {console.log(buttonType);}


    return (
        <fieldset>
            <legend id={buttonType}>{buttonType}:</legend>
            {genreRadioButtons.map((genre) => {
                return (
                    <div className="radioButtonContainer genreButtons" key={genre.id}>
                        <input type="radio" id={genre.id} value={genre.id} name="genre"></input>
                        <label htmlFor={genre.id}>{genre.name}</label>
                    </div>
                )
            })}
        </fieldset>
    )
}
export default GenreButtons;
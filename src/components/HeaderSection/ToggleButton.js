function ToggleButton({ tvMovieToggle, setTvMovieToggle, setCurrentPage }) {

    const handleTvMovieToggle = () => {
        if (tvMovieToggle === 'movie') {
            setTvMovieToggle('tv');
        } else {
            setTvMovieToggle('movie');
        }
        setCurrentPage(1);
    }

    return (
        <button id={tvMovieToggle === 'movie' ? "movie-option" : "tv-option"} className="toggle-button-container" onClick={handleTvMovieToggle}>
            <span className="slider"></span>
            <figure className="toggle-left movie-icon">
                <svg className="ionicon" viewBox="0 0 512 512"><path d="M436 80H76a44.05 44.05 0 00-44 44v264a44.05 44.05 0 0044 44h360a44.05 44.05 0 0044-44V124a44.05 44.05 0 00-44-44zM112 388a12 12 0 01-12 12H76a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12zm0-80a12 12 0 01-12 12H76a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12zm0-80a12 12 0 01-12 12H76a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12zm0-80a12 12 0 01-12 12H76a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12zm241.68 124H158.32a16 16 0 010-32h195.36a16 16 0 110 32zM448 388a12 12 0 01-12 12h-24a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12zm0-80a12 12 0 01-12 12h-24a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12zm0-80a12 12 0 01-12 12h-24a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12zm0-80a12 12 0 01-12 12h-24a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12z" /></svg>
                <figcaption className="sr-only">film reel, for movie option</figcaption>
            </figure>
            <figure className="toggle-right tv-icon">
                <svg className="ionicon" viewBox="0 0 512 512"><path d="M447.86 384H64.14A48.2 48.2 0 0116 335.86V128.14A48.2 48.2 0 0164.14 80h383.72A48.2 48.2 0 01496 128.14v207.72A48.2 48.2 0 01447.86 384z" /><path strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M128 416h256" /></svg>
                <figcaption className="sr-only">TV screen, for TV option</figcaption>
            </figure>
        </button>
    )
};

export default ToggleButton;
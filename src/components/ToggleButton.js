function ToggleButton({ tvMovieToggle, setTvMovieToggle }) {

    const handleTvMovieToggle = () => {
        if (tvMovieToggle === 'movie') {
            setTvMovieToggle('tv');
        } else {
            setTvMovieToggle('movie');
        }
    }

    return (
        <div className="toggle-button-container" onClick={handleTvMovieToggle}>
            <div id={tvMovieToggle === 'movie' ? "activated-option" : "deactivated-option"} className="toggle-left">
                <svg className="ionicon" viewBox="0 0 512 512"><path d="M464 384.39a32 32 0 01-13-2.77 15.77 15.77 0 01-2.71-1.54l-82.71-58.22A32 32 0 01352 295.7v-79.4a32 32 0 0113.58-26.16l82.71-58.22a15.77 15.77 0 012.71-1.54 32 32 0 0145 29.24v192.76a32 32 0 01-32 32zM268 400H84a68.07 68.07 0 01-68-68V180a68.07 68.07 0 0168-68h184.48A67.6 67.6 0 01336 179.52V332a68.07 68.07 0 01-68 68z" /></svg>
            </div>
            <div id={tvMovieToggle === 'tv' ? "activated-option" : "deactivated-option"} className="toggle-right">
                <svg className="ionicon" viewBox="0 0 512 512"><path d="M447.86 384H64.14A48.2 48.2 0 0116 335.86V128.14A48.2 48.2 0 0164.14 80h383.72A48.2 48.2 0 01496 128.14v207.72A48.2 48.2 0 01447.86 384z" /><path strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M128 416h256" /></svg>
            </div>
        </div>
    )
};

export default ToggleButton;
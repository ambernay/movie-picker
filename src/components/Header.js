function Header({ isDropdownVisible, setIsDropdownVisible, isTrending, setIsTrending, setCurrentPage, tvMovieToggle, setTvMovieToggle }) {

    const subHeading = isTrending ? "Trending" : "Back to Trending";

    // toggle visibility and orientation of arrow image
    let arrowClass = isDropdownVisible ? "arrow-up" : "arrow-down";

    let toggleArrow = isTrending ? "make-display-none" : '';
    let styleClass = !isTrending ? "hover-animation" : '';

    const handleDropdown = () => {
        !isDropdownVisible ? setIsDropdownVisible(true) : setIsDropdownVisible(false);
    }

    const handleTrendingButton = () => {
        if (!isTrending) {
            setIsTrending(true);
            setIsDropdownVisible(false);
            setCurrentPage(1);
        }
    }

    const handleTvMovieToggle = () => {
        if (tvMovieToggle === 'movie') {
            setTvMovieToggle('tv');
        } else {
            setTvMovieToggle('movie');
        }
        console.log()
    }

    return (
        <header>
            <section className="main-heading">
                <div className="wrapper">
                    <div className="heading-container">
                        <h1>Movie Picker</h1>
                        <div className="header-buttons-container">
                            <button className="find-movie-button" onClick={handleDropdown} >
                                <figure>
                                    <span className="hover-animation">
                                        <h2>Find
                                            <span> {tvMovieToggle === 'movie' ? ' Movies' : ' Shows'} </span>
                                        </h2>
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={"ionicon " + arrowClass} viewBox="0 0 512 512"><path d="M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z" /></svg>
                                    <figcaption className="sr-only">{arrowClass}</figcaption>
                                </figure>
                            </button>

                            <div className="toggle-button-container" onClick={handleTvMovieToggle}>
                                <div id={tvMovieToggle === 'movie' ? "activated-option" : "deactivated-option"} className="toggle-left">
                                    <svg class="ionicon" viewBox="0 0 512 512"><path d="M464 384.39a32 32 0 01-13-2.77 15.77 15.77 0 01-2.71-1.54l-82.71-58.22A32 32 0 01352 295.7v-79.4a32 32 0 0113.58-26.16l82.71-58.22a15.77 15.77 0 012.71-1.54 32 32 0 0145 29.24v192.76a32 32 0 01-32 32zM268 400H84a68.07 68.07 0 01-68-68V180a68.07 68.07 0 0168-68h184.48A67.6 67.6 0 01336 179.52V332a68.07 68.07 0 01-68 68z" /></svg>
                                </div>
                                <div id={tvMovieToggle === 'tv' ? "activated-option" : "deactivated-option"} className="toggle-right">
                                    <svg class="ionicon" viewBox="0 0 512 512"><path d="M447.86 384H64.14A48.2 48.2 0 0116 335.86V128.14A48.2 48.2 0 0164.14 80h383.72A48.2 48.2 0 01496 128.14v207.72A48.2 48.2 0 01447.86 384z" /><path stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M128 416h256" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{/* wrapper */}
            </section>
            <section className="sub-heading">
                <div className="result-container">
                    <div className="wrapper">
                        <div className="result-heading-container">
                            <button className="trending-button"
                                onClick={handleTrendingButton}>
                                <figure >
                                    <figcaption className="sr-only">Back arrow</figcaption>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={"ionicon " + toggleArrow} viewBox="0 0 512 512"><path d="M321.94 98L158.82 237.78a24 24 0 000 36.44L321.94 414c15.57 13.34 39.62 2.28 39.62-18.22v-279.6c0-20.5-24.05-31.56-39.62-18.18z" /></svg>
                                    <span className={styleClass}>
                                        <h4 className="result-heading">{subHeading}</h4>
                                    </span>
                                </figure>
                            </button>
                            <button className='toggle-state-text'>{tvMovieToggle === 'movie' ? 'Movies' : 'TV'}</button>
                        </div>
                    </div>{/* wrapper */}
                </div>
            </section>
        </header>
    )
}

export default Header;
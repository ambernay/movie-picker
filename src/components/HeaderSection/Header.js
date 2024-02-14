import ToggleButton from './ToggleButton';
import FindMovieButton from './FindMovieButton';

function Header({ handleDropdown, isDropdownVisible, setIsDropdownVisible, isTrending, setIsTrending, setCurrentPage, tvMovieToggle, setTvMovieToggle, screenSize }) {

    const subHeading = isTrending ? "Trending" : "Back to Trending";

    // toggle visibility and orientation of arrow image
    let arrowClass = isDropdownVisible ? "arrow-up" : "arrow-down";

    let toggleArrow = isTrending ? "make-display-none" : '';
    let styleClass = !isTrending ? "hover-animation" : '';

    const handleTrendingButton = () => {
        if (!isTrending) {
            setIsTrending(true);
            setIsDropdownVisible(false);
            setCurrentPage(1);
        }
    }

    return (
        <header>
            <section className="main-heading">
                <div className="wrapper">
                    <div className="heading-container">
                        <button type='button' className="main-title"
                            onClick={handleTrendingButton}>Movie Picker</button>
                        <div className="header-buttons-container">
                            {screenSize === 'wideScreen' ?
                                <FindMovieButton
                                    handleDropdown={handleDropdown}
                                    arrowClass={arrowClass}
                                    tvMovieToggle={tvMovieToggle}
                                />
                                : null
                            }
                            <ToggleButton
                                tvMovieToggle={tvMovieToggle}
                                setTvMovieToggle={setTvMovieToggle}
                                setCurrentPage={setCurrentPage}
                            />
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
                            {screenSize === 'narrowScreen' ?
                                <FindMovieButton
                                    handleDropdown={handleDropdown}
                                    arrowClass={arrowClass}
                                    tvMovieToggle={tvMovieToggle}
                                />
                                : null
                            }

                        </div>
                    </div>{/* wrapper */}
                </div>
            </section>
        </header>
    )
}

export default Header;
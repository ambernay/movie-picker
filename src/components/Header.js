function Header({ isDropdownClicked, setIsDropdownClicked } ){

    const handleDropdown = () => {
        !isDropdownClicked ? setIsDropdownClicked(true) : setIsDropdownClicked(false);
    }

    let arrowClass = isDropdownClicked ? "arrow-up" : "arrow-down";

    return(
        <header>
            <div className="wrapper">
                <div className="heading-container">
                    <h1>Movie Picker</h1>
                    <figure onClick={handleDropdown}>
                        <h2>Find a movie</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" className={"ionicon " + arrowClass} viewBox="0 0 512 512"><path d="M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z" /></svg>
                        <figcaption className="sr-only">{arrowClass}</figcaption>
                    </figure>
                </div>
            </div>
        </header>
    )
}

export default Header;
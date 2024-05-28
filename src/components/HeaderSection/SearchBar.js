import { useState, useRef, memo, useEffect } from 'react';
import { MagnifyerIcon, FilmIcon, TvIcon, PersonIcon } from '../Icons';
import { TransObj } from '../TranslationObjects.js';
import RegionDropdown from '../FormSection/Dropdowns/RegionDropdown';
import SortByDropdown from '../FormSection/Dropdowns/SortByDropdown';

function SearchBar({ searchState, setSearchState, searchType, setSearchType, 
    setUserSelections, setIsTrending, currentLanguage, currentPage, setCurrentPage, 
    currentRegion, setCurrentRegion, setSortOption, screenSize }) {
    const [isOpen, setIsOpen] = useState(false);
    const [newValue, setNewValue] = useState('');
    const [emptyModalClass, setEmptyModalClass] = useState('hidden');

    const inputClass = isOpen ? 'search-bar-form' : 'hidden';
    const searchCacheKey = `${newValue.split(' ').join('_')}/${searchType}/${currentLanguage}/
    ${currentPage}`;
    const currentTranslation = TransObj[`${currentLanguage[0]}`];
    const iconDescription = currentTranslation['sr-only'];

    let placeholder;
        if (searchType === 'movie') {placeholder = currentTranslation.movie_title}
        else if (searchType === 'tv') {placeholder = currentTranslation.tv_series}
        else if (searchType === 'person') {placeholder = currentTranslation.person}

    const searchInput = useRef(null);

    // sets focus when window opens
    useEffect(() => {
        if (isOpen && searchInput.current) {
            searchInput.current.focus();
        }
    }, [isOpen]);

    // reset userSelections on dependencies on search
    // useEffect(() => {
    //     if (isOpen && searchState === 'searchBar') 
    //     setUserSelections([newValue, searchCacheKey, [newValue]]);
    // },[searchType, searchType, currentLanguage, currentPage])

    const handleInput = (e) => {
        setNewValue(e.target.value);
    }
    const handleIconClick = (e) => {
        setIsOpen(!isOpen);
        searchInput.current.focus();
        setEmptyModalClass('hidden');
        document.querySelector('input').blur();
    }
  
    const handleSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        setIsTrending(false);
        // selection query / cache key / result message
        setUserSelections([newValue, `${newValue.split(' ').join('_')}/${searchType}`, [newValue]]);
        setSearchState('searchBar');
        setEmptyModalClass('hidden');
    }
    // displays modal whenever input is focused
    const handleInputFocus = (e) => {
        e.target.select();
        setEmptyModalClass('empty-modal');
    }
    // hides modal and input form when modal is clicked
    const handleModalClick = (e) => {
        setEmptyModalClass('hidden'); 
        if(isOpen) setIsOpen(false);
    }

    const handleSelection = (e) => {
        e.preventDefault();
        setSearchType(e.target.closest('button').id);
    }

    return (
        <div className='search-container' >
            <div className='wrapper'>
                <figure className={'search-icon-container'} onClick={handleIconClick}>
                    <MagnifyerIcon />
                    <figcaption className='sr-only'>{iconDescription.search_bar}</figcaption>
                </figure>
                <form  className={inputClass} onSubmit={handleSubmit}>
                    <div className='searchbar-form-wrapper'>
                        <div className='input-container'>
                            <label name={'movie search'} className={'sr-only'}>Search movies by keyword</label>
                            <input
                                placeholder={`${placeholder}...`}
                                name={'movie search'}
                                value={newValue}
                                onChange={handleInput}
                                onFocus={handleInputFocus}
                                onSelect={e => setEmptyModalClass('empty-modal')}
                                ref={searchInput}>
                            </input>
                            <button className='search-button' >
                                <MagnifyerIcon />
                            </button>
                        </div>
                        <div className='searchbar-selections-container'>
                            <RegionDropdown
                                positionClass={'search-bar'}
                                currentRegion={currentRegion}
                                setCurrentRegion={setCurrentRegion}
                                currentLanguage={currentLanguage}
                                screenSize={screenSize}
                                currentTranslation={currentTranslation}
                            />
                            <ul className='search-type-list'>
                                <li>
                                    <button id='movie' 
                                        className={searchType === 'movie' ? 'active-button' : undefined} 
                                        onClick={handleSelection}>
                                        <figure className="movie-icon">
                                            <FilmIcon/>
                                            {/* <figcaption className="sr-only">{iconDescription.film_icon}</figcaption> */}
                                        </figure>
                                    </button>
                                </li>
                                <li>
                                    <button id='tv' 
                                        className={searchType === 'tv' ? 'active-button' : undefined} 
                                        onClick={handleSelection}>
                                        <figure className="tv-icon">
                                            <TvIcon/>
                                            {/* <figcaption className="sr-only">{iconDescription.film_icon}</figcaption> */}
                                        </figure>
                                    </button>
                                </li>
                                <li>
                                    <button id='person' 
                                        className={searchType === 'person' ? 'active-button' : undefined} 
                                        onClick={handleSelection}>   
                                        <figure className="person-icon">
                                            <PersonIcon/>
                                            {/* <figcaption className="sr-only">{iconDescription.film_icon}</figcaption> */}
                                        </figure>
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <SortByDropdown
                            positionClass={'search-bar'}
                            setSortOption={setSortOption}
                            currentLanguage={currentLanguage}
                            currentTranslation={currentTranslation}
                        />
                    </div>
                </form>
                <div 
                className={emptyModalClass}
                onClick={handleModalClick}
                >
                </div>
            </div>
        </div>
    )
}

export default memo(SearchBar);
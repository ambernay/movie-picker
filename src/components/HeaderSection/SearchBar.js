import { useState, useRef, memo, useEffect } from 'react';
import { MagnifyerIcon } from '../Icons';
import ToggleButton from './ToggleButton';
import { TransObj } from '../TranslationObjects.js';

function SearchBar({ handleTvMovieToggle, searchState, setSearchState, tvMovieToggle,
    setTvMovieToggle, setUserSelections, setIsTrending, currentLanguage, 
    currentPage, setCurrentPage, isSearchbarOpen, setIsSearchbarOpen, 
    isFormVisible, setIsFormVisible }) {

    const [newValue, setNewValue] = useState('');

    const inputClass = isSearchbarOpen ? 'searchbar-form' : 'hidden';
    const searchCacheKey = `${newValue.split(' ').join('_')}/${tvMovieToggle}/${currentLanguage}/
    ${currentPage}`;
    const currentTranslation = TransObj[`${currentLanguage[0]}`];
    const iconDescription = currentTranslation['sr-only'];
    const placeholder = tvMovieToggle === 'movie' ? currentTranslation.movie_title : currentTranslation.tv_series;

    const searchInput = useRef(null);

    const emptyModalClass = isSearchbarOpen ? 'empty-modal' : 'hidden';

    // sets focus when window opens
    useEffect(() => {
        if (isSearchbarOpen && searchInput.current) {
            searchInput.current.focus();
        }
    }, [isSearchbarOpen]);

    const capitalize = (string) => {
        if (string === 'tv') {return string.toUpperCase();}
        else {return string.charAt(0).toUpperCase() + string.slice(1);}
    }

    // reset userSelections on dependencies on search
    useEffect(() => {
        if (searchState === 'searchBar') {
             // selection query / cache key / result message
            setUserSelections([newValue, searchCacheKey, [capitalize(newValue), capitalize(tvMovieToggle)]]);
        }
    },[tvMovieToggle, currentLanguage, currentPage])

    const handleInput = (e) => {
        setNewValue(e.target.value);
    }
    const handleIconClick = (e) => {
        setIsSearchbarOpen(!isSearchbarOpen);
        if (isFormVisible) {setIsFormVisible(false)};
        searchInput.current.focus();
        document.querySelector('input').blur();
    }
  
    const handleSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        setIsTrending(false);
        setIsSearchbarOpen(false);
        // selection query / cache key / result message
        setUserSelections([newValue, `${newValue.split(' ').join('_')}/${tvMovieToggle}`, [capitalize(newValue), capitalize(tvMovieToggle)]]);
        setSearchState('searchBar');
    }
   
    return (
        <div className='search-container' >
            <div className='wrapper'>
                <figure className={'search-icon-container'} onClick={handleIconClick}>
                    <MagnifyerIcon />
                    <figcaption className='sr-only'>{iconDescription.search_bar}</figcaption>
                </figure>
                <form className={inputClass} onSubmit={handleSubmit}>
                    <section className='searchbar-input-container'>
                        <label name={'movie search'} className={'sr-only'}>Search movies by keyword</label>
                        <input
                            placeholder={`${placeholder}...`}
                            name={'movie search'}
                            value={newValue}
                            onChange={handleInput}
                            onFocus={(e) => e.target.select()}
                            // onSelect={e => setEmptyModalClass('empty-modal')}
                            ref={searchInput}>
                        </input>
                        <button className='search-button'>
                            <figure className={'search-icon-container'}>
                                <MagnifyerIcon />
                                <figcaption className='sr-only'>{currentTranslation.search}</figcaption>
                            </figure>
                        </button>
                        
                    </section>
                    <section className='searchbar-selections-container'>
                        <ToggleButton
                            handleTvMovieToggle={handleTvMovieToggle}
                            tvMovieToggle={tvMovieToggle}
                            iconDescription={iconDescription}
                        />
                    </section> 
                </form>
                
                <div className={emptyModalClass}
                onClick={() => {setIsSearchbarOpen(false)}}>
                </div>
            </div>
        </div>
    )
}

export default memo(SearchBar);
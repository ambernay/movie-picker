import { useState, useRef, memo, useEffect } from 'react';
import { MagnifyerIcon } from '../Icons';

function SearchBar({ searchState, setSearchState, setUserSelections, setIsTrending, 
    tvMovieToggle, currentLanguage, currentPage }) {
    const [isOpen, setIsOpen] = useState(false);
    const [newValue, setNewValue] = useState('');
    const [emptyModalClass, setEmptyModalClass] = useState('hidden');

    const inputClass = isOpen ? 'input-container' : 'hidden';
    const searchCacheKey = `${newValue.split(' ').join('_')}/${tvMovieToggle}/${currentLanguage}/
    ${currentPage}`;

    const searchInput = useRef(null);

    // sets focus when window opens
    useEffect(() => {
        if (isOpen && searchInput.current) {
            searchInput.current.focus();
        }
    }, [isOpen]);

    // reset userSelections on dependencies on search
    useEffect(() => {
        if (isOpen && searchState === 'searchBar') 
        setUserSelections([newValue, searchCacheKey, [newValue]]);
    },[tvMovieToggle, currentLanguage, currentPage])

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
        setIsTrending(false);
        // selection query / cache key / result message
        setUserSelections([newValue, `${newValue.split(' ').join('_')}/${tvMovieToggle}`, [newValue]]);
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

    return (
        <div className='search-container' >
            <div className='wrapper'>
                <div className={'search-icon-container'} onClick={handleIconClick}>
                    <MagnifyerIcon />
                </div>
                <form className={inputClass} onSubmit={handleSubmit}>
                    <label name={'movie search'} className={'sr-only'}>Search movies by keyword</label>
                    <input
                        placeholder={`Search ${tvMovieToggle.toUpperCase()} title...`}
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
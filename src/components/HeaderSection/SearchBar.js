import { useState, useRef, memo, useEffect } from 'react';
import { MagnifyerIcon } from '../Icons';

function SearchBar({ setSearchState, setUserSelections, setIsTrending, tvMovieToggle }) {
    const [isOpen, setIsOpen] = useState(false);
    const [newValue, setNewValue] = useState('');
    const [emptyModalClass, setEmptyModalClass] = useState('hidden');

    const inputClass = isOpen ? 'input-container' : 'hidden';

    const searchInput = useRef(null);

    // sets focus when window opens
    useEffect(() => {
        if (isOpen && searchInput.current) {
            searchInput.current.focus();
        }
    }, [isOpen]);

    // reset userSelections on movie toggle
    useEffect(() => {
        if (isOpen) setUserSelections([newValue, `${newValue.split(' ').join('_')}/${tvMovieToggle}`]);
    },[tvMovieToggle])

    const handleInput = (e) => {
        setNewValue(e.target.value);
        e.target.focus();
    }
    const handleIconClick = (e) => {
        setIsOpen(!isOpen);
        searchInput.current.focus();
    }
  
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsTrending(false);
        setUserSelections([newValue, `${newValue.split(' ').join('_')}/${tvMovieToggle}`]);
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
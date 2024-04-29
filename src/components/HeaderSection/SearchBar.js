import { useState, useRef, memo, useEffect } from 'react';
import { MagnifyerIcon } from '../Icons';

function SearchBar({ setSearchState, setUserSelections, setIsTrending, tvMovieToggle }) {
    const [isOpen, setIsOpen] = useState(false);
    const [newValue, setNewValue] = useState('');

    const inputClass = isOpen ? 'input-container' : 'hidden';

    const searchInput = useRef(null);

    useEffect(() => {
        if (isOpen && searchInput.current) {
            searchInput.current.focus();
        }
    }, [isOpen]);

    // reset userSelections on movie toggle
    useEffect(() => {
        setUserSelections([newValue, `${newValue.split(' ').join('_')}/${tvMovieToggle}`]);
    },[tvMovieToggle])

    const handleInput = (e) => {
        setNewValue(e.target.value);
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
                        // onBlur setIsOpen causes infinite loop
                        ref={searchInput}>
                    </input>
                    <button className='search-button' >
                        <MagnifyerIcon />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default memo(SearchBar);
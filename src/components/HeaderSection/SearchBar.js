import { useState, useRef, memo, useEffect } from 'react';
import { MagnifyerIcon } from '../Icons';

function SearchBar({ setSearchState, setUserSelections, setIsTrending }) {
    const [isOpen, setIsOpen] = useState('');
    const [newValue, setNewValue] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const inputClass = isOpen ? 'input-container' : 'hidden';

    const searchInput = useRef(null);

    // useEffect(() => {
    //     if (isOpen && searchInput.current) {
    //         searchInput.current.focus();
    //     }
    // }, [isOpen]);


    const handleInput = (e) => {
        setNewValue(e.target.value);
        console.log(newValue);
    }
    const handleIconClick = (e) => {
        setIsOpen(!isOpen);
        searchInput.current.focus();
    }
  
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsTrending(false);
        setUserSelections([newValue, newValue.split(' ').join('_')]);
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
                        placeholder={'Search by keyword...'}
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
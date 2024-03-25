// 'https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=0a093f521e98a991f4e4cc2a12460255'

import { useState, useRef, memo } from 'react';
import { MagnifyerIcon } from '../Icons';

function SearchBar() {
    const [newValue, setNewValue] = useState('');
    const [isOpen, setIsOpen] = useState('');

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

    return (
        <div className='search-container' >
            <div className='wrapper'>
                <div className={'search-icon-container'} onClick={handleIconClick}>
                    <MagnifyerIcon />
                </div>
                <div className={inputClass}>
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
                </div>
            </div>
        </div>
    )
}

export default memo(SearchBar);
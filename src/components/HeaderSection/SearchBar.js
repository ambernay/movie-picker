// 'https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=0a093f521e98a991f4e4cc2a12460255'

import { useState, memo } from 'react';
import { MagnifyerIcon } from '../Icons';

function SearchBar() {

    const [newValue, setNewValue] = useState('');
    const [isOpen, setIsOpen] = useState('');

    const inputClass = isOpen ? 'input-container' : 'hidden';

    const handleInput = (e) => {
        setNewValue(e.target.value);
        console.log(newValue);
    }
    const handleIconClick = (e) => {
        setIsOpen(!isOpen);
    }

    return (
        <div className='search-container' onClick={handleIconClick}>
            <div className='wrapper'>
                <MagnifyerIcon />
                <div className={inputClass}>
                    <input value={newValue} onChange={handleInput}></input>
                    <button className='search-button' >
                        <MagnifyerIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default memo(SearchBar);
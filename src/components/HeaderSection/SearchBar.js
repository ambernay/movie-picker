import { useState, useRef, memo, useEffect } from 'react';
import { MagnifyerIcon } from '../Icons';
import { searchApiCall } from '../MovieApiCache.js';

function SearchBar() {
    const [isOpen, setIsOpen] = useState('');
    const [newValue, setNewValue] = useState('');
    const [searchValue, setSearchValue] = useState(''); 
    const [statusMessage, setStatusMessage] = useState('');

    const inputClass = isOpen ? 'input-container' : 'hidden';

    const searchInput = useRef(null);

    // useEffect(() => {
    //     if (isOpen && searchInput.current) {
    //         searchInput.current.focus();
    //     }
    // }, [isOpen]);

    useEffect(() => {
        searchApiCall(searchValue, setStatusMessage).then(result => {
            console.log(result);
        });
    },[searchValue])

    const handleInput = (e) => {
        setNewValue(e.target.value);
        console.log(newValue);
    }
    const handleIconClick = (e) => {
        setIsOpen(!isOpen);
        searchInput.current.focus();
    }

    const handleSubmit = (e) => {
        console.log(newValue);
        setSearchValue(newValue);
    }

    return (
        <div className='search-container' >
            <div className='wrapper'>
                <div className={'search-icon-container'} onClick={handleIconClick}>
                    <MagnifyerIcon />
                </div>
                <form className={inputClass}>
                    <label name={'movie search'} className={'sr-only'}>Search movies by keyword</label>
                    <input
                        placeholder={'Search by keyword...'}
                        name={'movie search'}
                        value={newValue}
                        onChange={handleInput}
                        onSubmit={handleSubmit}
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
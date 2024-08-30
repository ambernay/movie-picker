import { useState, useRef, memo, useEffect } from 'react';
import { RoomIcon } from '../Icons';

function RoomForm({ headerModalState, setHeaderModalState }){
    const formClass = headerModalState === 'room-form' ? 'room-form' : 'hidden';

    const handleRoomIcon = (e) => {
        if (headerModalState === 'searchbar') {setHeaderModalState('hidden');}
        else {setHeaderModalState('searchbar');}
        if (isFormVisible) {setIsFormVisible(false)};
        searchInput.current.focus();
        document.querySelector('input').blur();
    }

    return(
        <section className='room-form-container'>
            <div className='wrapper'>
                <button type='button'className='room-icon'>
                    <figure>
                        {/* <figcaption className="sr-only">{iconDescription.back_arrow}</figcaption> */}
                        <RoomIcon/>
                    </figure>
                </button>
                <form className={formClass}>
                    <button type='button'>Create Room</button>
                    <button type='button'>Join Room</button>
                </form>
            </div>
        </section>
    )
}

export default memo(RoomForm);
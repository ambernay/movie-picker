import { useState, useRef, memo, useEffect } from 'react';
import { RoomIcon } from '../Icons';

function RoomForm({ headerModalState, setHeaderModalState, isFormVisible, setIsFormVisible }){
    const formClass = headerModalState === 'room-form' ? 'room-form' : 'hidden';

    const handleRoomIcon = (e) => {
        if (headerModalState === 'room-form') {setHeaderModalState('hidden');}
        else {setHeaderModalState('room-form');}
        if (isFormVisible) {setIsFormVisible(false)};
    }

    return(
        <section className='room-section-container'>
            <button type='button'
            className='room-icon-button'
            onClick={handleRoomIcon}>
                <figure>
                    {/* <figcaption className="sr-only">{iconDescription.back_arrow}</figcaption> */}
                    <RoomIcon/>
                </figure>
            </button>
            <div className='wrapper'>
                <form className={formClass}>
                    <section className='room-form-button-container'>
                        <button type='button' className='room-form-buttons'>Create Room</button>
                        <button type='button' className='room-form-buttons'>Join Room</button>
                    </section>
                </form>
            </div>
        </section>
    )
}

export default memo(RoomForm);
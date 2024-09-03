import { useState, useRef, memo, useEffect } from 'react';
import { RoomIcon } from '../Icons';

function RoomForm({ headerModalState, setHeaderModalState, isFormVisible, setIsFormVisible }){
    const joinInput = useRef(null);
    
    const [roomState, setRoomState] = useState('none');
    const [newValue, setNewValue] = useState('');
    const roomChoice = 'none';
    
    const formClass = headerModalState === 'room-form' ? 'room-form' : 'hidden';
    const sectionClass = roomState === 'none' ? 'room-form-button-container' : 'hidden';

    // sets focus when window opens
    useEffect(() => {
        if (headerModalState && joinInput.current) {
            joinInput.current.focus();
        }
    }, [roomState]);

    const handleRoomIcon = (e) => {
        if (headerModalState === 'room-form') {setHeaderModalState('hidden');}
        else {setHeaderModalState('room-form');}
        if (isFormVisible) {setIsFormVisible(false)};
    }

    const handleJoinButton = (e) => {
        setRoomState('join');
        joinInput.current.focus();
    }

    const handleInput = (e) => {
        setNewValue(e.target.value);
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
                    <section className={roomState === 'none' ? 'room-form-button-container' : 'hidden'}>
                        <button type='button' className='room-form-buttons'>Create Room</button>
                        <button type='button' className='room-form-buttons' onClick={handleJoinButton}>Join Room</button>
                    </section>

                    <section className={roomState === 'join' ? 'room-form-button-container' : 'hidden'}>
                        <label name={'join button'} className={'sr-only'}>Add room number</label>
                        <input 
                            type='text'
                            placeholder='room #'
                            name={'join button'}
                            value={newValue}
                            onChange={handleInput}
                            onFocus={(e) => e.target.select()}
                            ref={joinInput}>
                        </input>
                        <button type='button' className='room-form-buttons' onClick={handleJoinButton}>Join Room</button>
                    </section>
                </form>
            </div>
        </section>
    )
}

export default memo(RoomForm);
import { useState, memo, useRef } from 'react';
import RoomFormSections from './RoomFormSections.js';
import { RoomIcon } from '../Icons';

function RoomForm({ headerModalState, setHeaderModalState, isFormVisible, 
    setIsFormVisible }){

    const roomInputRef = useRef(null);

    const [newValue, setNewValue] = useState('');
    const [roomState, setRoomState] = useState('none');
    const [roomName, setRoomName] = useState('');
    const [roomID, setRoomID] = useState('');
    
    const formClass = headerModalState === 'room-form' ? 'room-form' : 'hidden';
    const sectionClass = roomState === 'none' ? 'room-form-button-container' : 'hidden';

    const handleRoomIcon = (e) => {
        setRoomState('none');
        setNewValue('');
        if (headerModalState === 'room-form') {setHeaderModalState('hidden');}
        else {setHeaderModalState('room-form');}
        if (isFormVisible) {setIsFormVisible(false)};
        console.log(headerModalState);
    }

    const handleJoinButton = (e) => {
        setRoomState('join');
    }

    const handleCreateButton = (e) => {
        if (roomState !== 'create') {
            setRoomState('create');
        }else if (roomState === 'create') {
            setRoomName(newValue);
            setRoomID(roomName + Date.now());
            setRoomState('room code');
            console.log(roomID);
            console.log('create room');
        }  
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
                {roomState === 'none' ?

                    <section className={roomState === 'none' ? 'room-form-button-container' : 'hidden'}>
                        <button type='button' className='room-form-buttons' onClick={handleCreateButton}>Create Room</button>
                        <button type='button' className='room-form-buttons' onClick={handleJoinButton}>Join Room</button>
                    </section>

                    : roomState === 'create' ?
                    <RoomFormSections
                        roomInputRef={roomInputRef}
                        headerModalState={headerModalState} 
                        roomState={roomState}
                        handleCreateButton={handleCreateButton}
                        handleJoinButton={handleJoinButton}
                        newValue={newValue}
                        setNewValue={setNewValue}
                    />
                    :
                        <h4>{roomID}</h4>
                }

                    {/* <section className={roomState === 'join' ? 'room-form-button-container' : 'hidden'}>
                        <label name={'join button'} className={'sr-only'}>Add room number</label>
                        <input 
                            type='text'
                            placeholder='room #'
                            name={'join button'}
                            value={newValue}
                            onChange={handleInput}
                            onFocus={(e) => e.target.select()}
                            ref={roomInput}>
                        </input>
                        <button type='button' className='room-form-buttons' onClick={handleJoinButton}>Join Room</button>
                    </section>

                    <section className={roomState === 'create' ? 'room-form-button-container' : 'hidden'}>
                        <label name={'join button'} className={'sr-only'}>Choose room name</label>
                        <input 
                            type='text'
                            placeholder='choose room name'
                            name={'create button'}
                            value={newValue}
                            onChange={handleInput}
                            onFocus={(e) => e.target.select()}
                            ref={roomInput}>
                        </input>
                        <button type='button' className='room-form-buttons' onClick={handleCreateButton}>Create Room</button>
                    </section> */}
                </form>
            </div>
        </section>
    )
}

export default memo(RoomForm);
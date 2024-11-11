import { useState, memo, useRef } from 'react';
import RoomFormSections from './RoomFormSections.js';
import { RoomIcon, CopyIcon } from '../Icons';

function RoomForm({ headerModalState, setHeaderModalState, isFormVisible, 
    setIsFormVisible, currentTranslation }){

    const roomInputRef = useRef(null);

    const [newValue, setNewValue] = useState('');
    const [roomState, setRoomState] = useState('none');
    const [roomName, setRoomName] = useState('');
    const [roomID, setRoomID] = useState('');
    
    const formClass = headerModalState === 'room-form' ? 'room-form' : 'hidden';
    const failedMessage = `${currentTranslation.status_messages.failed_to_load}`;
    const sectionClass = roomState === 'none' ? 'room-form-section' : 'hidden';

    const handleRoomIcon = (e) => {
        setRoomState('none');
        setNewValue('');
        if (headerModalState === 'room-form') {setHeaderModalState('hidden');}
        else {setHeaderModalState('room-form');}
        if (isFormVisible) {setIsFormVisible(false)};
    }

    const handleJoinButton = (e) => {
        setRoomState('join');
        console.log(roomState);
    }

    const handleCreateButton = (e) => {
        if (roomState !== 'create') {
            setRoomState('create');
        }else if (roomState === 'create') {
            setRoomName(newValue);
            setRoomID(newValue + Date.now());
            setRoomState('room-code');
            console.log(roomID);
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
                <section className={headerModalState === 'room-form' ? 'room-form-section' : 'hidden'}>
                {roomState === 'none' ?
                    <>
                        <button type='button' className='room-form-buttons' onClick={handleCreateButton}>Create Room</button>
                        <button type='button' className='room-form-buttons' onClick={handleJoinButton}>Join Room</button>
                    </>

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
                    : roomState === 'create' ?
                    <div className='room-code-section'>
                        <h5 className='room-code'>Login code:</h5>
                        <div className='room-code-container'>
                            <h5 className='room-code' >{roomID}</h5>
                            <figure>
                                {/* <figcaption className="sr-only">{iconDescription.back_arrow}</figcaption> */}
                                <CopyIcon/>
                            </figure>
                        </div>
                    </div>
                    :
                    <h4 className='error-message'>{failedMessage}</h4>
                }
                </section>

                    {/* <section className={roomState === 'join' ? 'room-form-section' : 'hidden'}>
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

                    <section className={roomState === 'create' ? 'room-form-section' : 'hidden'}>
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
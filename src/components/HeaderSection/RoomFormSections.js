import { useState, useEffect, useRef, memo } from 'react';

function RoomFormSections ({ headerModalState, roomState, 
    handleCreateButton, handleJoinButton, roomInputRef, 
    newValue, setNewValue }){

    

     // sets focus when window opens
     useEffect(() => {
        if (headerModalState && roomInputRef.current) {
            roomInputRef.current.focus();
        }
    }, [roomState]);

    const handleInput = (e) => {
        setNewValue(e.target.value);
    }

    const sectionInfo = {
        inputLabel: roomState === 'create' ? 'Choose room name' : 'Add room number',
        placeholderText: roomState === 'create' ? 'Choose room name' : 'room #',
        nameLabel: roomState === 'create' ? 'create button' : 'join button',
        buttonText: roomState === 'create' ? 'Create Room' : 'Join Room',
        handlerFunction: roomState === 'create' ? handleCreateButton : handleJoinButton
    }

    // const sectionInfo = () => {
    //     if(roomState === 'create') {
    //         return({
    //             inputLabel: 'Choose room name',
    //             placeholderText: 'Choose room name',
    //             nameLabel: 'create button',
    //             buttonText: 'Create Room'
    //         })
    //     }else if (roomState === 'join') {
    //         inputLabel = 'Add room number';
    //         placeholderText =  'room #';
    //         nameLabel = 'join button';
    //         buttonText = 'Join Room';
    //     }

    // }

    return (
        <section className={roomState !== 'none' ? 'room-form-button-container' : 'hidden'}>
            <label name={sectionInfo.nameLabel} className={'sr-only'}>{sectionInfo.inputLabel}</label>
            <input 
                type='text'
                placeholder={sectionInfo.placeholderText}
                name={sectionInfo.nameLabel}
                value={newValue}
                onChange={handleInput}
                onFocus={(e) => e.target.select()}
                ref={roomInputRef}>
            </input>
            <button type='button' className='room-form-buttons' onClick={sectionInfo.handlerFunction}>{sectionInfo.buttonText}</button>
        </section>
    )
}

export default memo(RoomFormSections);
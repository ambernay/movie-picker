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
        inputLabel: roomState === 'create' ? 'Choose room name' : 'join' ? 'Add room number' : none,
        placeholderText: roomState === 'create' ? 'Choose room name' : 'join' ? 'room #' : none,
        nameLabel: roomState === 'create' ? 'create button' : 'join' ? 'join button' : none,
        buttonText: roomState === 'create' ? 'Create Room' : 'join' ? 'Join Room' : none,
        handlerFunction: roomState === 'create' ? handleCreateButton : 'join' ? handleJoinButton : none
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
        <>
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
        </>
    )
}

export default memo(RoomFormSections);
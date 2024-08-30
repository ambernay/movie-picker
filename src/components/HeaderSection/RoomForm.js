import { useState, useRef, memo, useEffect } from 'react';

function RoomForm({ headerModalState, setHeaderModalState }){
    const formClass = headerModalState === 'room-form' ? 'room-form' : 'hidden';

    return(
        <section className='room-form-container'>
            <div className='wrapper'>
                <form className={formClass}>
                    <button>Create Room</button>
                    <button>Join Room</button>
                </form>
            </div>
        </section>
    )
}

export default memo(RoomForm);
import { memo } from 'react';

function FormModal({ isValidRequest, submitAttempted, currentTranslation }) {
    
    const modalMessage = currentTranslation.error_messages.form_modal;

    const modalClass = (submitAttempted && !isValidRequest) ? "modal" : "make-display-none";
    return (
        <div className={modalClass}>
            <p>{modalMessage}</p>
        </div>
    )
}

export default memo(FormModal);
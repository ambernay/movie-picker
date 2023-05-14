function FormModal({ isValidRequest, submitAttempted } ) {

    const modalClass = (submitAttempted && !isValidRequest) ? "modal" : "make-display-none";
    return(
        <div className={modalClass}>
            <p>Make a selection</p>
        </div>
    )
}

export default FormModal;
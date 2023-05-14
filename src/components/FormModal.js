function FormModal({ isValidRequest, submitAttempted } ) {

    const modalClass = (submitAttempted && !isValidRequest) ? "modal" : "make-display-none";
    return(
        <div className={modalClass}>
            <p>Please select a genre</p>
        </div>
    )
}

export default FormModal;
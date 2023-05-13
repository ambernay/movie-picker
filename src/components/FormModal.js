function FormModal({ isGenreSelected, submitAttempted } ) {

    const modalClass = (!submitAttempted || isGenreSelected) ? "make-display-none" : "modal";
    return(
        <div className={modalClass}>
            <p>Please select a genre</p>
        </div>
    )
}

export default FormModal;
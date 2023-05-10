function FormButtons({genres}) {

    return(
        <fieldset>
            <legend>Genre:</legend>
            {genres.map((genre) => {
                return (
                    <div className="radioButtonContainer">
                        <input type="radio" id={genre.id} name={genre.name}></input>
                        <label htmlFor={genre.name}>{genre.name}</label>
                    </div>
                )
            })}
        </fieldset>
    )
}

export default FormButtons;

function ProviderButtons() {

    const imageURL = 'https://image.tmdb.org/t/p/w500';

    const providersObj =  {
        "providers": [
            {
                "display_priority": 0,
                "logo_path": "/9A1JSVmSxsyaBK4SUFsYVqbAYfW.jpg",
                "provider_name": "Netflix",
                "provider_id": 8
            },
            {
                "display_priority": 1,
                "logo_path": "/68MNrwlkpF7WnmNPXLah69CR5cb.jpg",
                "provider_name": "Amazon Prime Video",
                "provider_id": 119
            },
            {
                "display_priority": 1,
                "logo_path": "/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg",
                "provider_name": "Disney Plus",
                "provider_id": 337
            },
            {
                "display_priority": 4,
                "logo_path": "/vlrNqT2tFHRY6oGh1Bt7HIOHsjF.jpg",
                "provider_name": "Crave",
                "provider_id": 230
            }
        ]
     }

    return (
        <fieldset className="providers-fieldset">
            <legend id="providers">Providers:</legend>
            {providersObj.providers.map((provider) => {
                return (
                    <div className="radioButtonContainer providerButtons" key={provider.provider_id}>
                        <input type="radio" id={provider.provider_id} value={provider.provider_id} name="provider"></input>
                        <label htmlFor={provider.provider_id}>{provider.provider_name}</label>
                    </div>
                )
            })}
        </fieldset>
    )
}

export default ProviderButtons;
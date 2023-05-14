import { useState, useEffect } from "react";

function ProviderButtons({ setProvider, setIsValidRequest }) {

    const [providerRadioButtons, setProviderRadioButtons] = useState([]);

    const providersList = "https://api.themoviedb.org/3/watch/providers/movie?api_key=0a093f521e98a991f4e4cc2a12460255&language=en-US&language=en-US";

    useEffect(() => {
        fetch(providersList)
            .then(results => {
                return results.json();
            })
            .then(data => {
                // filter api request for specific providers
                const selectionOfProviders = data.results.filter(makeProvidersList);

                function makeProvidersList(provider) {

                    switch (provider.provider_id) {
                        case 8: /* netflix */
                        case 119: /* amazon */
                        case 337: /* disney */
                        case 230: /* crave */
                            return provider
                        default:
                    }
                }
                // adds an All button
                selectionOfProviders.push({ "provider_id": "all", "provider_name": "All" });

                setProviderRadioButtons(selectionOfProviders);
            })
    }, [setProviderRadioButtons]);

    const handleChange = (e) => {
        setProvider(e.target.value);
        setIsValidRequest(true);
    }

    return (
        <fieldset className="providers-fieldset">
            <legend id="provider">Provider:</legend>
            {providerRadioButtons.map((provider) => {
                return (
                    <div className="radioButtonContainer providerButtons" key={provider.provider_id}>
                        <input onChange={handleChange} type="radio" id={provider.provider_id} value={provider.provider_id} name="provider"></input>
                        <label htmlFor={provider.provider_id}>{provider.provider_name}</label>
                    </div>
                )
            })}
        </fieldset>
    )
}

export default ProviderButtons;
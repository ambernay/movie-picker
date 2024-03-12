import { useState, useEffect, memo } from "react";
import { ProviderButtonsApiCall } from '../../MovieApi';

function ProviderButtons({ setProvider, setIsValidRequest }) {

    const [providerRadioButtons, setProviderRadioButtons] = useState([]);

    useEffect(() => {
        console.log(ProviderButtonsApiCall());
        ProviderButtonsApiCall().then(result => setProviderRadioButtons(result));
    }, [setProviderRadioButtons]);

    const handleChange = (e) => {
        setProvider(e.target.value);
        setIsValidRequest(true);
    }

    const trimmedName = (str) => {
        return (str.indexOf(' ') !== -1) ? str.slice(0, str.indexOf(' ')) : str;
    };

    return (
        <fieldset className="providers-fieldset">
            <legend id="provider">Provider:</legend>
            {providerRadioButtons.map((provider) => {
                return (
                    <div className="radio-button-container provider-buttons" key={provider.provider_id}>
                        <input onChange={handleChange} type="radio" id={provider.provider_id} value={provider.provider_id} name="provider"></input>
                        <label htmlFor={provider.provider_id}>{trimmedName(provider.provider_name)}</label>
                    </div>
                )
            })}
        </fieldset>
    )
}

export default memo(ProviderButtons);
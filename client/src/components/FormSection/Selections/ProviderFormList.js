import { useState, useEffect, memo } from "react";
import { ProviderListApiCall } from '../../MovieApiCache';

function ProviderFormList({ setProvider, setIsValidRequest }) {

    const [providerFormList, setProviderFormList] = useState([]);

    useEffect(() => {
        ProviderListApiCall().then(result => setProviderFormList(result));
    }, [setProviderFormList]);

    const handleChange = (e) => {
        setProvider(e.target);
        setIsValidRequest(true);
    }

    const trimmedName = (str) => {
        return (str.indexOf(' ') !== -1) ? str.slice(0, str.indexOf(' ')) : str;
    };

    return (
        <fieldset className="providers-fieldset">
            <legend id="provider">Provider:</legend>
            {providerFormList ? providerFormList.map((provider) => {
                return (
                    <div className="radio-button-container provider-buttons" key={provider.provider_id}>
                        <input onChange={handleChange} type="radio" id={provider.provider_id} value={provider.provider_name} name="provider"></input>
                        <label htmlFor={provider.provider_id}>{trimmedName(provider.provider_name)}</label>
                    </div>
                )
            })
                :
                <div className="error-message-container">
                    <h4>Failed to load streaming options</h4>
                </div>
            }
        </fieldset>
    )
}

export default memo(ProviderFormList);
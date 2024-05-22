import { useState, useEffect, memo } from "react";
import { ProviderListApiCall } from '../../MovieApiCache';

function ProviderFormList({ setProvider, setIsValidRequest, currentLanguage, sectionLabel, currentTranslation }) {

    const [providerFormList, setProviderFormList] = useState([]);

    useEffect(() => {
        ProviderListApiCall(currentLanguage).then(result => setProviderFormList(result));
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
            <legend id="provider">{sectionLabel}:</legend>
            {providerFormList.length > 0 ? providerFormList.map((provider) => {
                const imageURL = 'https://image.tmdb.org/t/p/w500';
                return (
                    <div className="radio-button-container provider-buttons" key={provider.provider_id}>
                        <input onChange={handleChange} type="radio" id={provider.provider_id} value={provider.provider_name} name="provider"></input>
                        <label htmlFor={provider.provider_id}>
                            <img className='provider-icons' src={imageURL + provider.logo_path} alt={provider.provider_name}/>
                        </label>
                    </div>
                )
            })
                :
                <div className="error-message-container">
                    <h4>{
                        `${currentTranslation.status_messages.failed_to_load} 
                        ${currentTranslation.section_labels.provider}`}
                    </h4>
                </div>
            }
        </fieldset>
    )
}

export default memo(ProviderFormList);
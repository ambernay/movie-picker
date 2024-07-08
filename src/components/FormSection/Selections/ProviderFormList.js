import { useState, useEffect, memo } from "react";
import { ProviderListApiCall } from '../../MovieApiCache';

function ProviderFormList({ setProviders, setIsValidRequest, sectionLabel,
    currentRegion, currentLanguage, currentTranslation }) {

    const [providerFormList, setProviderFormList] = useState([]);

    useEffect(() => {
        let displayAmount = Math.round(window.innerWidth / 150) * 3;
        
        ProviderListApiCall(currentLanguage, currentRegion, displayAmount).then(result => setProviderFormList(result));
    }, [setProviderFormList]);

    const handleChange = (e) => {
        let newValue = [e.target.value, e.target.id];
        
        if (e.target.checked) setProviders(pre => [...pre, newValue]);
        else if (!e.target.checked) setProviders(pre => pre.filter(item => item[1] !== newValue[1]))
        setIsValidRequest(true);
    }

    return (
        <fieldset id='provider-list' className="providers-fieldset">
            <legend id="provider">{sectionLabel}:</legend>
            {providerFormList?.length > 0 ? providerFormList.map((provider) => {
                const imageURL = 'https://image.tmdb.org/t/p/w500';
                return (
                    <div className="radio-button-container provider-buttons" key={provider.provider_id}>
                        <input onChange={handleChange} type="checkbox" id={provider.provider_id} value={provider.provider_name} name="provider"></input>
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
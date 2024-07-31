import { useState, useEffect, memo } from "react";
import { ProviderListApiCall } from '../../MovieApiCache';
import { UpDownArrowIcon } from '../../Icons.js';

function ProviderFormList({ setProviders, setIsValidRequest, sectionLabel,
    currentRegion, currentLanguage, currentTranslation }) {

    const [providerFormList, setProviderFormList] = useState([]);
    const [selectionOfProviders, setSelectionOfProviders] = useState(null);
    const [currentNumDisplaySets, setCurrentNumDisplaySets] = useState(1);
    const [arrowClass, setArrowClass] = useState('arrow-down');
    
    const upArrow = currentTranslation['sr-only'].up_arrow;
    const downArrow = currentTranslation['sr-only'].down_arrow;
    
    useEffect(() => {
        const providerListEl = document.querySelector('.provider-list-container');
        const fieldsetWidth = Math.round(providerListEl?.clientWidth);
        
        if (fieldsetWidth > 0) {
            const displaySet = Math.floor((fieldsetWidth / 105)) * 3;
            console.log(displaySet);

            ProviderListApiCall(currentLanguage, currentRegion).then(result => {
                const sortedList = result.results?.sort((a, b) => a.display_priorities.CA)
                setProviderFormList(sortedList); 
                setSelectionOfProviders(sortedList?.slice(0, displaySet));
                setArrowClass('down-arrow');
            });
        }
    }, [setProviderFormList, setSelectionOfProviders, currentRegion, currentLanguage]);

    // useEffect(() => {
    //     const el = document.getElementById('331');
    //     console.log(el);
    //     el.scrollTop;
    // },[currentNumDisplaySets]);
    
    const handleChange = (e) => {
        let newValue = [e.target.value, e.target.id];
        if (e.target.checked) setProviders(pre => [...pre, newValue]);
        else if (!e.target.checked) setProviders(pre => pre.filter(item => item[1] !== newValue[1]))
        setIsValidRequest(true);
    }

    const handleMoreProvidersButton = (e) => {
        e.preventDefault();
        let newNumDisplaySets = currentNumDisplaySets + 1;
        let newProviderSelections = providerFormList?.slice(0, (displaySet * (newNumDisplaySets)))
        setSelectionOfProviders(newProviderSelections);
        setCurrentNumDisplaySets(newNumDisplaySets);
        if (newProviderSelections.length === providerFormList.length) {
            setArrowClass('down-arrow disabled');
        }
    }
 
    return (
        <fieldset id='provider-list' className="providers-fieldset">
            <legend id="provider">{sectionLabel}:</legend>
                <ul className='provider-list-container'>
                {selectionOfProviders?.length > 0 ? selectionOfProviders.map((provider) => {
                    const imageURL = 'https://image.tmdb.org/t/p/w500';
                    return (
                        <li className="radio-button-container provider-buttons" key={provider.provider_id}>
                            <input onChange={handleChange} type="checkbox" id={provider.provider_id} value={provider.provider_name} name="provider"></input>
                            <label title={provider.provider_name} htmlFor={provider.provider_id}>
                                <img className='provider-icons' src={imageURL + provider.logo_path} alt={provider.provider_name}/>
                            </label>
                        </li>
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
            </ul>
            {selectionOfProviders?.length > 0 ?
                <button title={currentTranslation['sr-only'].more_options} className='more-providers-button' onClick={handleMoreProvidersButton}>
                <figure>
                    <UpDownArrowIcon
                        arrowClass={arrowClass}
                    />
                    <figcaption className="sr-only">{arrowClass === 'arrow-up' ? upArrow : downArrow}</figcaption>
                </figure>
            </button>
            : null}
        </fieldset>
    )
}

export default memo(ProviderFormList);
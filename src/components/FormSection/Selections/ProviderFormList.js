import { useState, useEffect, memo } from "react";
import { ProviderListApiCall } from '../../MovieApiCache';
import { UpDownArrowIcon } from '../../Icons.js';

function ProviderFormList({ setProviders, setIsValidRequest, sectionLabel,
    currentRegion, currentLanguage, currentTranslation, isFormVisible }) {

    const [providerFormList, setProviderFormList] = useState([]);
    const [selectionOfProviders, setSelectionOfProviders] = useState(null);
    const [displaySet, setDisplaySet] = useState(0);
    const [currentNumDisplaySets, setCurrentNumDisplaySets] = useState(1);
    const [arrowClass, setArrowClass] = useState('arrow-down');
    
    const upArrow = currentTranslation['sr-only'].up_arrow;
    const downArrow = currentTranslation['sr-only'].down_arrow;

    const capFirstChar = (string) => {return string.charAt(0).toUpperCase() + string.slice(1);}
    const loadingMessage = capFirstChar(currentTranslation.status_messages.loading);
    const [callStatusMessage, setCallStatusMessage] = useState(`${loadingMessage}...`);
    
    useEffect(() => {
        const providerListEl = document.querySelector('.provider-list-container');
        
        if (isFormVisible) {
            setCallStatusMessage(`${loadingMessage}...`);
            const fieldsetWidth = Math.round(providerListEl?.clientWidth);
            let newDisplaySet = Math.floor((fieldsetWidth / 105)) * 3;

            ProviderListApiCall(currentLanguage, currentRegion).then(result => {
                if (result) {
                    const sortedList = result.results?.sort((a, b) => a.display_priorities.currentRegion);
                    setProviderFormList(sortedList); 
                    setSelectionOfProviders(sortedList?.slice(0, newDisplaySet)); 
                }
                else {
                    setCallStatusMessage(
                        `${currentTranslation.status_messages.failed_to_load} 
                        ${currentTranslation.section_labels.provider}`
                    );
                }
            });
            setArrowClass('down-arrow');
            setDisplaySet(newDisplaySet);
        }
    }, [setProviderFormList, setSelectionOfProviders, setCallStatusMessage,
         currentRegion, currentLanguage, isFormVisible]);   
    
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

    // const handleScroll = (e) => {
    //     const inputEl = e.currentTarget.childNodes[0];
    //     const topElID = selectionOfProviders[displaySet * currentNumDisplaySets - displaySet].provider_id;
    //     // if (inputEl.id === )
    //     console.log(e.currentTarget.childNodes[0].id, topElID);
    // }

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
                        <h4>{`${callStatusMessage} `}</h4>
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
import { useState, useEffect, memo } from "react";
import { ProviderFormListApiCall } from '../../MovieApiCache';
import { UpDownArrowIcon } from '../../Icons.js';

function ProviderFormList({ setProviders, setIsValidRequest, sectionLabel,
    currentRegion, currentLanguage, currentTranslation, isFormVisible }) {

    const [providerFormList, setProviderFormList] = useState([]);
    const [selectionOfProviders, setSelectionOfProviders] = useState([]);
    const [displaySet, setDisplaySet] = useState(0);
    const [currentNumDisplaySets, setCurrentNumDisplaySets] = useState(1);
    
    const isDisabledClass = selectionOfProviders.length === providerFormList.length ?
        'disabled' : '';

    const capFirstChar = (string) => {return string.charAt(0).toUpperCase() + string.slice(1);}
    const loadingMessage = capFirstChar(currentTranslation.status_messages.loading);
    const [callStatusMessage, setCallStatusMessage] = useState(`${loadingMessage}...`);

    const listContainer = document.querySelector('.provider-list-container');

    const sortByUserPreferences = (unsortedList, regionCode) => {
        
        const userPreferences = JSON.parse(localStorage.getItem('preferredProviders'));
        let priorityNumber = -1;
     
        if(userPreferences){
            userPreferences.forEach((preference) => {
                
                let preferenceId = Number(preference.id);
                let userPriority = unsortedList.find(provider => provider.provider_id === preferenceId);
                // change default priority numbers to descending negative numbers 
                userPriority.display_priorities[`${regionCode}`] = priorityNumber;
                priorityNumber = priorityNumber - 1;
            })
        }
        let sortByRegionPriorities = unsortedList.sort((a, b) => a.display_priorities[`${regionCode}`] - b.display_priorities[`${regionCode}`])

        return sortByRegionPriorities;
    }
    
    useEffect(() => {
        const providerListEl = document.querySelector('.provider-list-container');
        
        if (isFormVisible) {
            setCallStatusMessage(`${loadingMessage}...`);
            const fieldsetWidth = Math.round(providerListEl?.clientWidth);
            let newDisplaySet = Math.floor((fieldsetWidth / 105)) * 3;

            ProviderFormListApiCall(currentLanguage, currentRegion).then(result => {
                if (result) {
                    const sortedList = sortByUserPreferences(result.results, currentRegion[0]);
                    
                    setCurrentNumDisplaySets(1);
                    // full list of providers
                    setProviderFormList(sortedList);
                    // top X providers based on screen height and user request 
                    setSelectionOfProviders(sortedList?.slice(0, newDisplaySet)); 
                }
                else {
                    setCallStatusMessage(
                        `${currentTranslation.status_messages.failed_to_load} 
                        ${currentTranslation.section_labels.provider}`
                    );
                }
            });
            setDisplaySet(newDisplaySet);
        }
    }, [setProviderFormList, setSelectionOfProviders, setCallStatusMessage,
        setCurrentNumDisplaySets, currentRegion, currentLanguage, isFormVisible]);
         
    const handleProviderSelections = (e) => {
        let newValue = [e.target.value, e.target.id];
    
        if (e.target.checked) setProviders(pre => [...pre, newValue]);
        else if (!e.target.checked) setProviders(pre => pre.filter(item => item[1] !== newValue[1]))
        setIsValidRequest(true);
    }

    const handleMoreProvidersButton = (e) => {
        e.preventDefault();
        let newNumDisplaySets = currentNumDisplaySets + 1;
        let newProviderSelections = providerFormList?.slice(0, (displaySet * (newNumDisplaySets)));

        if (selectionOfProviders.length !== providerFormList.length) {
            setSelectionOfProviders(newProviderSelections);
            setCurrentNumDisplaySets(newNumDisplaySets);
        }
    }

    const handleScroll = (e) => {
        // checks onload when element size changes 
        // then scrolls once the scrollHeight can accomodate the full visible height
        // * unless it's the last scroll
        if (e.currentTarget.scrollHeight % e.currentTarget.clientHeight === 0
            || selectionOfProviders.length % displaySet !== 0){
            e.currentTarget.scrollBy({
                left: 0, 
                top: listContainer.clientHeight,
                behavior: "smooth"
            });
        }
    }

    return (
        <fieldset id='provider-list' className="providers-fieldset">
            <legend id="provider">{sectionLabel}:</legend>
            {/* {doesn't match genre fieldset because <ul> required to determine provider list} */}
            {selectionOfProviders?.length > 0 ?
            <ul id='provider-container' className='provider-list-container' onLoad={handleScroll}>
                {selectionOfProviders.map((provider) => {
                    const imageURL = 'https://image.tmdb.org/t/p/w500';
                    return (
                        <li className="radio-button-container provider-buttons" key={provider.provider_id}>
                            <label title={provider.provider_name} htmlFor={provider.provider_id}
                                onChange={handleProviderSelections}
                            >
                                <input  type="checkbox" id={provider.provider_id} value={provider.provider_name} name="provider"></input>
                                <img className='provider-icons' src={imageURL + provider.logo_path} alt={provider.provider_name}/>
                            </label>
                        </li>
                    )
                    })
                }
            </ul>
            :<div className="error-message-container provider-list-container">
                <h4>{`${callStatusMessage} `}</h4>
            </div>
            }
            {selectionOfProviders?.length > 0 ?
                <button title={currentTranslation['sr-only'].more_options} 
                    className={`more-providers-button ${isDisabledClass}`} 
                    onClick={handleMoreProvidersButton}
                >
                <figure>
                    <UpDownArrowIcon
                        arrowClass={'arrow-down'}
                    />
                    <figcaption className="sr-only">{currentTranslation['sr-only'].down_arrow}</figcaption>
                </figure>
            </button>
            : null}
        </fieldset>
    )
}

export default memo(ProviderFormList);
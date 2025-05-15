import { memo, use } from 'react';
import { ProviderPosterApiCall, ProviderLinkInfoCall } from '../../MovieApiCache.js';

function ProviderIconsList({ movieID, tvMovieToggle, currentRegion, 
    currentTranslation, capFirstChar }) {

    const sectionLabel = currentTranslation.provider_options;

    const viewingOptionsResults = use(ProviderPosterApiCall(tvMovieToggle, movieID, currentRegion));
    const justWatchLink = viewingOptionsResults.link;
    
    const filteredKey = (key) => {
        switch (key) {
            case 'flatrate' || 'stream':
                key = `${sectionLabel.stream}:`;
                break;
            case 'ads':
                key = `${sectionLabel.with_ads}:`;
                break;
            case 'buy_rent':
                key = `${sectionLabel.buy}/${sectionLabel.rent}:`;
                break;
            case 'buy':
                key = `${sectionLabel.buy}`;
            case 'rent':
                key = `${sectionLabel.rent}`;
            default:
                key = (key.charAt(0).toUpperCase() + key.slice(1) + ':');
        }
        
        return key;
    }
    
    const filteredViewingOptions = (result) => {
        let newObj = {...result}
        
        delete (newObj.link);
        
        const hasBuy = Object.keys(newObj).includes('buy');
        const hasRent = Object.keys(newObj).includes('rent');
        if (!hasBuy || !hasRent) { return newObj; }

        const buyImages = newObj.buy?.map(i => i.logo_path) || [];
        const rentImages = newObj.rent?.map(i => i.logo_path) || [];

        // if buy and rent have same item, merge into buy/rent array
        const mergedBuyRentArr = {
            buy: newObj.buy?.filter(i => !rentImages.includes(i.logo_path)) || [],
            rent: newObj.rent?.filter(i => !buyImages.includes(i.logo_path)) || [],
            buy_rent: newObj.buy?.filter(i => rentImages.includes(i.logo_path)) || []
        }
        // if merged array not empty replace viewing options and delete duplicates
        if (mergedBuyRentArr.buy_rent.length > 0) {
            newObj.buy_rent = mergedBuyRentArr.buy_rent;
            delete newObj.buy;
            delete newObj.rent;
        }

        if (mergedBuyRentArr.buy.length > 0) {
            newObj.buy = mergedBuyRentArr.buy;
        } else {
            delete mergedBuyRentArr.buy;
        }

        if (mergedBuyRentArr.rent.length > 0) {
            newObj.rent = mergedBuyRentArr.rent;
        } else {
            delete mergedBuyRentArr.rent;
        }
       
        newObj = { ...newObj, ...mergedBuyRentArr };
        return newObj;
    }

    let viewingOptions = filteredViewingOptions(viewingOptionsResults);

    const FailedFetchsMessage = () => {
        return(
            <div className='icon-message-container'>
                <h4>{`${capFirstChar(currentTranslation.status_messages.failed_to_load)}`}</h4>
            </div>
        )
    }

    function getElementWithChild(parent, childSelector) {
        const child = parent.querySelector(childSelector);
        return child ? parent : null;
    }

    const linkToProvider = (e) => {
        const logoPath = e.target.closest('img').src;
        const logoId = logoPath.substring(logoPath.lastIndexOf('/'), logoPath.length);
        const baseURL = 'https://media.themoviedb.org/t/p/original';
        const providerURL = `${baseURL}${logoId}`;
        console.log(logoPath, logoId, justWatchLink, providerURL);
        const justWatchInfo = ProviderLinkInfoCall(movieID, justWatchLink).then(result => {
            
            const html = result;
            const tempElement = document.createElement('div');
            tempElement.innerHTML = html;
            const providerIcons = tempElement.querySelectorAll(`[src="${providerURL}"]`);
            console.log(providerIcons);
                // Convert HTMLCollection to an array for easier manipulation
            const elementsArray = Array.from(providerIcons);

            const selectedIcon = elementsArray.find(element => element.parentElement.tagName === 'A');
            const justWatchLink = selectedIcon.parentElement.href;
            console.log(justWatchLink);
            return justWatchLink;
        });
    }

    return (
        <>
        <ul className='movie-info-list-container movie-info-middle'>
            {Object.keys(viewingOptions).length < 1 ? 
                <FailedFetchsMessage />
            :Object.keys(viewingOptions).sort().map((key) => {
                const imageURL = 'https://image.tmdb.org/t/p/w500';
                // create lists
                const optionKey = key + '/' + movieID;
                return (
                    <li key={optionKey} onClick={linkToProvider}>
                        <fieldset className='movie-info-list-fieldsets'>
                            <legend>{filteredKey(key)}</legend>
                            <ul className='movie-info-list'>
                                {/* create icons */}
                                {viewingOptions[key]?.map((key, i) => {
                                    const iconKey = i + '/' + movieID + '/' + key.provider_id + key.logo_path;

                                    return (
                                        <li key={iconKey} title={key.provider_name}
                                            className={key.logo_path !== 'N/A' ? 'provider-icon-list' : null}
                                        >
                                            {(key.logo_path === 'N/A') ?
                                                <h4>{key.logo_path}</h4>
                                                :
                                                <img className='provider-icons' src={imageURL + key.logo_path} alt={key.provider_name} />
                                            }
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </fieldset>
                    </li>
                )
            })
            }
        </ul>
        </>
    )
}

export default memo(ProviderIconsList);
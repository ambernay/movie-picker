import { memo, use, Suspense } from 'react';
import { ViewingOptionsApiCall, ProviderLinkInfoCall } from '../../MovieApiCache.js';

function ViewingOptions({ movieID, currentRegion, galleryPropsObj, 
    capFirstChar, LoadingStatusMessage  }) {

    const { currentTranslation, tvMovieToggle } = galleryPropsObj;
    
    const sectionLabel = currentTranslation.provider_options;

    const viewingOptionsResults = use(ViewingOptionsApiCall(tvMovieToggle, movieID, currentRegion));
    const TMDBMovieLink = viewingOptionsResults.link;
    const justWatchPage = use(ProviderLinkInfoCall(movieID, TMDBMovieLink));
    
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

    const linkToProvider = (key, justWatchPage) => {
        const providerName = key.provider_name;
        const logoPath = key.logo_path;
        const logoId = logoPath.substring(logoPath.lastIndexOf('/'), logoPath.length);
        const baseURL = 'https://media.themoviedb.org/t/p/original';
        const providerURL = `${baseURL}${logoId}`;
        
        // converting data to iterable html
        const html = justWatchPage;
        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;
        // HTMLCollection of elements matching clicked element
        const providerIcons = tempElement.querySelectorAll(`[src="${providerURL}"]`);
        // Convert HTMLCollection to an array for easier manipulation
        const elementsArray = Array.from(providerIcons);
        // find first element in array that has an href
        const selectedIcon = elementsArray.find(element => element.parentElement.tagName === 'A');
        const redirectLink = selectedIcon.parentElement.href;
        const defaultURL = redirectLink.substring(redirectLink.lastIndexOf('https'), redirectLink.lastIndexOf('&uct'));
        
        const disneyURL = decodeURIComponent(redirectLink.substring(redirectLink.lastIndexOf('https'), redirectLink.lastIndexOf('%26')));
        // disney has different last index and double encoded
        const finalURL = providerName === 'Disney Plus' ? disneyURL
            // justwatch needs no alteration
            : providerName === 'JustWatchTV' ? redirectLink
            : defaultURL

        return decodeURIComponent(finalURL);
    }

    const FailedFetchsMessage = () => {
        return(
            <div className='icon-message-container'>
                <h4>{`${capFirstChar(currentTranslation.status_messages.failed_to_load)}`}</h4>
            </div>
        )
    }

    return (
        <>
        <Suspense fallback={<LoadingStatusMessage />}>
        <ul className='movie-info-list-container movie-info-middle'>
            {Object.keys(viewingOptions).length < 1 ? 
                <FailedFetchsMessage />
            :Object.keys(viewingOptions).sort().map((key) => {
                const imageURL = 'https://image.tmdb.org/t/p/w500';
                // create lists
                const optionKey = key + '/' + movieID;
                return (
                    <li key={optionKey}>
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
                                            <a href={`${linkToProvider(key, justWatchPage)}`} target="_blank">
                                                {(key.logo_path === 'N/A') ?
                                                    <h4>{key.logo_path}</h4>
                                                    :
                                                    <img className='provider-icons' 
                                                        src={imageURL + key.logo_path}
                                                        alt={key.provider_name}   
                                                    />
                                                }
                                            </a>
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
        </Suspense>
        </>
    )
}

export default memo(ViewingOptions);
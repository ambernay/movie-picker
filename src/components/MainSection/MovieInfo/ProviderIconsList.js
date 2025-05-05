import { memo, use } from 'react';
import { ProviderPosterApiCall } from '../../MovieApiCache.js';

function ProviderIconsList({ movieID, tvMovieToggle, currentRegion, 
    currentTranslation, capFirstChar }) {

    const sectionLabel = currentTranslation.provider_options;

    const viewingOptionsResults = use(ProviderPosterApiCall(tvMovieToggle, movieID, currentRegion));

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
        delete result.link;

        const hasBuy = Object.keys(result).includes('buy');
        const hasRent = Object.keys(result).includes('rent');
        if (!hasBuy || !hasRent) { return result; }

        const buyImages = result.buy?.map(i => i.logo_path) || [];
        const rentImages = result.rent?.map(i => i.logo_path) || [];

        // if buy and rent have same item merge into buy/rent array
        const mergedBuyRentArr = {
            buy: result.buy?.filter(i => !rentImages.includes(i.logo_path)) || [],
            rent: result.rent?.filter(i => !buyImages.includes(i.logo_path)) || [],
            buy_rent: result.buy?.filter(i => rentImages.includes(i.logo_path)) || [],
        }
        // if merged array not empty replace viewing options and delete duplicates
        if (mergedBuyRentArr.buy_rent.length > 0) {
            result.buy_rent = mergedBuyRentArr.buy_rent;
            delete result.buy;
            delete result.rent;
        }

        if (mergedBuyRentArr.buy.length > 0) {
            result.buy = mergedBuyRentArr.buy;
        } else {
            delete mergedBuyRentArr.buy;
        }

        if (mergedBuyRentArr.rent.length > 0) {
            result.rent = mergedBuyRentArr.rent;
        } else {
            delete mergedBuyRentArr.rent;
        }

        result = { ...result, ...mergedBuyRentArr };
        return result;
    }

    let viewingOptions = filteredViewingOptions(viewingOptionsResults);

    const FailedFetchsMessage = () => {
        return(
            <div className='icon-message-container'>
                <h4>{`${capFirstChar(currentTranslation.status_messages.failed_to_load)}`}</h4>
            </div>
        )
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
                    <li key={optionKey}>
                        <fieldset className='movie-info-list-fieldsets'>
                            <legend>{filteredKey(key)}</legend>
                            <ul className='movie-info-list'>
                                {/* create icons */}
                                {viewingOptions[key]?.map((key, i) => {
                                    const iconKey = i + '/' + movieID + '/' + key.provider_id + key.logo_path;

                                    return (
                                        <li className={key.logo_path !== 'N/A' ? 'provider-icon-list' : null} key={iconKey}>
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
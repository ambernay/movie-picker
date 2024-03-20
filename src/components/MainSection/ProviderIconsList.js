import { memo } from 'react';
import { useState, useEffect } from 'react';
import { ProviderIconsApiCall } from '../MovieApiCache.js';

function ProviderIconsList({ movieTitle, movieID, tvMovieToggle, currentRegion, infoState }) {

    const [viewingOptions, setViewingOptions] = useState();
    const [fetchStatus, setFetchStatus] = useState('Loading...');

    useEffect(() => {
        ProviderIconsApiCall(tvMovieToggle, movieID, currentRegion, setFetchStatus).then(result => setViewingOptions(filteredViewingOptions(result)));

    }, [setViewingOptions, movieID, tvMovieToggle, currentRegion])

    const filteredKey = (key) => {
        switch (key) {
            case 'flatrate':
                key = 'Stream:';
                break;
            case 'ads':
                key = 'With Ads:';
                break;
            case 'buy_rent':
                key = 'Buy/Rent:';
                break;
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

    return (
        <div className={infoState === 'provider-info' ? 'movie-info' : 'hidden'}>
            <div className='wheretowatch-container'>
                <h4 className='wheretowatch-heading'>{movieTitle}</h4>
                <ul className='viewing-options-list-container'>
                    {viewingOptions ? Object.keys(viewingOptions).sort().map((key) => {
                        const imageURL = 'https://image.tmdb.org/t/p/w500';
                        // create lists
                        const optionKey = key + '/' + movieID;
                        return (
                            <li className='option' key={optionKey}>
                                <fieldset className='provider-list-fieldsets'>
                                    <legend>{filteredKey(key)}</legend>
                                    <ul className='provider-options-list-container'>
                                        {/* create icons */}
                                        {viewingOptions[key]?.map((key, i) => {
                                            const iconKey = i + '/' + movieID + '/' + key.provider_id + key.logo_path;

                                            return (
                                                <li key={iconKey}>
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
                    }) :
                        <div className='icon-message-container'>
                            <h4>{fetchStatus}</h4>
                        </div>
                    }
                </ul>
            </div>
        </div>
    )
}

export default memo(ProviderIconsList);
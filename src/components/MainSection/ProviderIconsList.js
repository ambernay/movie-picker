import { memo } from 'react';

function ProviderIconsList({ movieTitle, movieID, viewingOptions }) {

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

    const filteredViewingOptions = (viewingOptions) => {
        const buyImages = viewingOptions.buy?.map(i => i.logo_path) || [];
        const rentImages = viewingOptions.rent?.map(i => i.logo_path) || [];

        const mergedViewingOptions = {
            buy: viewingOptions.buy?.filter(i => !rentImages.includes(i.logo_path)) || [],
            rent: viewingOptions.rent?.filter(i => !buyImages.includes(i.logo_path)) || [],
            buy_rent: viewingOptions.buy?.filter(i => rentImages.includes(i.logo_path)) || [],
        }

        if (mergedViewingOptions.buy_rent.length > 0) {
            viewingOptions.buy_rent = mergedViewingOptions.buy_rent;
            delete viewingOptions.buy;
            delete viewingOptions.rent;
        }

        if (mergedViewingOptions.buy.length > 0) {
            viewingOptions.buy = mergedViewingOptions.buy;
        } else {
            delete mergedViewingOptions.buy;
        }

        if (mergedViewingOptions.rent.length > 0) {
            viewingOptions.rent = mergedViewingOptions.rent;
        } else {
            delete mergedViewingOptions.rent;
        }

        viewingOptions = { ...viewingOptions, ...mergedViewingOptions };

        return viewingOptions;
    }

    const hasBuy = Object.keys(viewingOptions).includes('buy');
    const hasRent = Object.keys(viewingOptions).includes('rent');

    viewingOptions = (hasBuy && hasRent) ? viewingOptions = filteredViewingOptions(viewingOptions) : viewingOptions;

    delete viewingOptions.link;

    return (
        <div className='wheretowatch-container'>
            <h4 className='wheretowatch-heading'>{movieTitle}</h4>
            <ul className='viewing-options-list-container'>
                {Object.keys(viewingOptions).sort().map((key) => {
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
                })}
            </ul>
        </div>
    )
}

export default memo(ProviderIconsList);
import { memo } from 'react';

function ProviderIconsList({ movieTitle, movieID, viewingOptions }) {

    const filteredKey = (key) => {
        // if (key === 'flatrate') {
        //     console.log('Stream:');
        //     return 'Stream:';
        // }
        // else if (key === 'ads') {
        //     console.log('With Ads:');
        //     return 'With Ads:';
        // }
        // else if ( key === 'buy_rent'){

        // }
        // else {
        //     console.log(key.charAt(0).toUpperCase() + key.slice(1) + ':');
        //     return key.charAt(0).toUpperCase() + key.slice(1) + ':';
        // }

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

    return (
        <>
            <div className='wheretowatch-heading'>
                <h5>Where to watch</h5>
                <h4>{movieTitle}:</h4>
            </div>

            <ul className='viewing-options-list-container'>
                {Object.keys(viewingOptions).map((key) => {
                    const imageURL = 'https://image.tmdb.org/t/p/w500';

                    {/* create lists */ }
                    if (key !== 'link') {
                        const optionKey = key + '/' + movieID;
                        return (
                            <li className='option' key={optionKey}>{filteredKey(key)}
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
                            </li>
                        )
                    }
                })}
            </ul>
        </>
    )
}

export default memo(ProviderIconsList);
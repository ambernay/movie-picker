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

    const mergeArrays = (viewingOptions) => {
        const buyArr = viewingOptions.buy?.map(i => i);
        const rentArr = viewingOptions.rent?.map(i => i);
        const hasBuy = Object.keys(viewingOptions).includes('buy');
        const hasRent = Object.keys(viewingOptions).includes('rent');

        let buyRentArr = [];
        // console.log(hasBuy, hasRent, isSame);

        // viewingOptions.buy?.map(i => i.logo_path);
        // console.log(buyArr, rentArr);
        if (hasBuy && hasRent) {
            // looping in reverse as to not effect length by removiing items
            for (let b = buyArr.length - 1; b >= 0; b--) {
                for (let r = rentArr.length - 1; r >= 0; r--) {
                    const isSame = JSON.stringify(buyArr[b]) === JSON.stringify(rentArr[r]);
                    if (isSame) {
                        buyRentArr.push(buyArr[b]);
                        buyArr.splice(b, 1);
                        rentArr.splice(r, 1);
                    }
                }
            }
            if (buyArr.length > 0) console.log(buyArr);
            if (rentArr.length > 0) console.log(rentArr);
            if (buyRentArr.length > 0) console.log(buyRentArr);
        }

        if (hasBuy && hasRent) {
            console.log(buyRentArr);
            // console.log(hasBuy, hasRent, isSame);
        }

    }

    mergeArrays(viewingOptions);

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
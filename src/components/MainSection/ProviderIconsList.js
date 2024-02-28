import { memo } from 'react';

function ProviderIconsList({ movieTitle, movieID, viewingOptions }) {
    return (
        <>
            <h4>Where to watch <span>{movieTitle}</span>:</h4>

            <ul className='viewing-options-list-container'>
                {Object.keys(viewingOptions).map((key) => {
                    const imageURL = 'https://image.tmdb.org/t/p/w500';
                    const heading = key.charAt(0).toUpperCase() + key.slice(1) + ':';
                    {/* create lists */ }
                    if (key !== 'link') {
                        const optionKey = key + '/' + movieID;
                        return (
                            <li className='option' key={optionKey}>{heading}
                                <ul className='provider-options-list-container'>
                                    {/* create icons */}
                                    {viewingOptions[key]?.map((key, i) => {
                                        const iconKey = i + '/' + movieID + '/' + key.provider_id + key.logo_path;

                                        return (
                                            <li key={iconKey}>
                                                <img className='provider-icons' src={imageURL + key.logo_path} alt={key.provider_name} />
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
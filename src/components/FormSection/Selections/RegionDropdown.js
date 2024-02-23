import { useState, useEffect } from 'react';
import CustomDropdown from './CustomDropdown';

function RegionDropdown({ currentRegion, setCurrentRegion, screenSize }) {

    const [isOpen, setIsOpen] = useState(false);
    const [regionList, setRegionList] = useState([]);


    // sorts by english_name (instead of country code) depending on screen size
    const sortRegionsByName = (a, z) => a.english_name.localeCompare(z.english_name);

    const regionAPI = "https://api.themoviedb.org/3/watch/providers/regions?api_key=0a093f521e98a991f4e4cc2a12460255&language=en-US";

    useEffect(() => {
        fetch(regionAPI)
            .then(results => {
                return results.json();
            })
            .then(data => {
                // sorts by english_name (instead of country code) depending on screen size
                screenSize !== 'narrowScreen' ? setRegionList((data.results).sort(sortRegionsByName)) : setRegionList(data.results);
            }).catch(() => {
                alert("Failed to fetch regions");
            })
        // screensize as depencency might be an issue...
    }, [setRegionList, screenSize]);

    const handleChange = (e) => {
        setCurrentRegion([e.target.getAttribute('value'), e.target.getAttribute('name')]);
    }

    const chooseRegionLabel = screenSize !== 'narrowScreen' ? "english_name" : "iso_3166_1";

    const chooseSelectedLabel = () => {

        let selectedLabel = currentRegion[0];

        if (screenSize !== 'narrowScreen') {
            let fullRegionName = currentRegion[1];
            let spaceCount = (fullRegionName.split(" ").length - 1);

            if (spaceCount > 1) {
                let truncatedRegionName = (fullRegionName.slice(0, fullRegionName.lastIndexOf(' ')) + '...');

                selectedLabel = truncatedRegionName;
            }

            selectedLabel = fullRegionName;
        }
        return selectedLabel;
    }

    return (
        <CustomDropdown
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            listClass={'region-list'}
            currentSelectedLabel={chooseSelectedLabel()}
            selectList={regionList}
            itemValue={"iso_3166_1"}
            itemName={'english_name'}
            listHeading={chooseRegionLabel}
            handleChange={handleChange}
        />
    )

}

export default RegionDropdown;
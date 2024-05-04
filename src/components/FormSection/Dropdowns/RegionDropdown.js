import { useState, useEffect, memo } from 'react';
import CustomDropdown from './CustomDropdown';
import { RegionApiCall } from '../../MovieApiCache';

function RegionDropdown({ positionClass, currentRegion, setCurrentRegion, currentLanguage, screenSize }) {

    const [regionList, setRegionList] = useState([]);

    useEffect(() => {
        RegionApiCall(currentLanguage).then(result => setRegionList(result));
    }, [currentLanguage, setRegionList]);

    const handleChange = (e) => {
        setCurrentRegion([e.target.getAttribute('id'), e.target.getAttribute('name')]);
    }
    const chooseSelectedLabel = () => {

        let countryCode = currentRegion[0];

        if ((screenSize !== 'narrowScreen') && (positionClass === 'form-region')) {
            let fullRegionName = currentRegion[1];
            console.log(fullRegionName);
            let spaceCount = (fullRegionName.split(" ").length - 1);

            if (spaceCount > 1) {
                let truncatedRegionName = (fullRegionName.slice(0, fullRegionName.lastIndexOf(' ')) + '...');

                return truncatedRegionName;
            }

            return fullRegionName;
        } else { return countryCode; }
    }

    return (
        <CustomDropdown
            listClass={`region-list ${positionClass}`}
            currentSelectedLabel={chooseSelectedLabel()}
            selectList={regionList}
            itemID={"iso_3166_1"}
            itemValue={'native_name'}
            itemName={'english_name'}
            listHeading={"english_name"}
            handleChange={handleChange}
            errorMessage={'Failed to load regions'}
        />
    )

}

export default memo(RegionDropdown);
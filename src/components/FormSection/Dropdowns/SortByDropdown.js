import { useState, useEffect } from 'react';
import CustomDropdown from './CustomDropdown';

function SortByDropdown({ setSortOption, currentLanguage, currentTranslation }) {
    const [currentSelectedLabel, setCurrentSelectedLabel] = useState('');
    
    const sortOptionsTrans = currentTranslation['sort_by'];
    const failedMessage = `${currentTranslation.status_messages.failed_to_load} ${currentTranslation.section_labels.sort_options}`

    let sortOptions = [
        { "sort-by": sortOptionsTrans.rating_desc, "choice": "vote_average.desc" },
        { "sort-by": sortOptionsTrans.rating_asc, "choice": "vote_average.asc" },
        { "sort-by": sortOptionsTrans.A_Z, "choice": "title.asc" },
        { "sort-by": sortOptionsTrans.Z_A, "choice": "title.desc" },
        { "sort-by": sortOptionsTrans.date_desc, "choice": "primary_release_date.desc" },
        { "sort-by": sortOptionsTrans.date_asc, "choice": "primary_release_date.asc" }
    ]
    // Filter out undefined sort-bys (some languages don't offer alphabetical sort)
    sortOptions = sortOptions.filter(option => option["sort-by"]);
    
    useEffect(() => {
        sortOptions.length > 0 ? setCurrentSelectedLabel(sortOptions[0]['sort-by'])
        : setCurrentSelectedLabel('No options');
    },[currentLanguage])

    const handleChange = (e) => {
        setSortOption(e.target.getAttribute('value'));
        setCurrentSelectedLabel(e.target.getAttribute('name'));
    }

    return (
        <CustomDropdown
            listClass={'sort-by'}
            currentSelectedLabel={currentSelectedLabel}
            selectList={sortOptions}
            itemID={"choice"}
            itemValue={"choice"}
            itemName={"sort-by"}
            listHeading={'sort-by'}
            handleChange={handleChange}
            errorMessage={failedMessage}
        />
    )
}

export default SortByDropdown;
import { useState, useEffect } from 'react';
import CustomDropdown from './CustomDropdown';

function SortByDropdown({ setSortOption, currentLanguage, currentTranslation }) {
    const sortOptionsTrans = currentTranslation['sort_by'];

    let sortOptions = [
        { "sort-by": sortOptionsTrans.rating_desc, "choice": "vote_average.desc" },
        { "sort-by": sortOptionsTrans.rating_asc, "choice": "vote_average.asc" },
        { "sort-by": sortOptionsTrans.A_Z, "choice": "original_title.asc" },
        { "sort-by": sortOptionsTrans.Z_A, "choice": "original_title.desc" },
        { "sort-by": sortOptionsTrans.date_desc, "choice": "primary_release_date.desc" },
        { "sort-by": sortOptionsTrans.date_asc, "choice": "primary_release_date.asc" }
    ]
    // Filter out undefined sort-bys (some languages don't offer alphabetical sort)
    sortOptions = sortOptions.filter(option => option["sort-by"]);

    const [currentSelectedLabel, setCurrentSelectedLabel] = useState(sortOptions[0]['sort-by']);
    
    useEffect(() => {
        setCurrentSelectedLabel(sortOptions[0]['sort-by']);
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
            errorMessage={'Failed to load sort options'}
        />
    )
}

export default SortByDropdown;
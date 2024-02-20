import { memo } from 'react';

function SortBy({ setSortOption }) {

    const sortMenuObj = {
        "sortOptions": [
            { "sort-by": "Rating: High to Low", "choice": "vote_average.desc" },
            { "sort-by": "Rating: Low to High", "choice": "vote_average.asc" },
            { "sort-by": "Titles A-Z", "choice": "original_title.asc" },
            { "sort-by": "Titles Z-A", "choice": "original_title.desc" },
            { "sort-by": "Release date newest", "choice": "primary_release_date.desc" },
            { "sort-by": "Release date oldest", "choice": "primary_release_date.asc" }
        ]
    };

    const handleChange = (e) => {
        setSortOption(e.target.value);
    }

    return (
        <div className="dropdown-menu sort-by">
            <label className="sr-only" htmlFor="sort" >Sort by:</label>
            <span className="hover-animation">
                <select onChange={handleChange} name="sort" id="sort" tabIndex='0' onFocus={(e) => e.target.size = '6'} onBlur={(e) => e.target.size = '1'}>

                    {sortMenuObj.sortOptions.map((option) => {
                        return (
                            <option onClick={(e) => e.target.parentElement.blur()} key={option["sort-by"]} id={option["sort-by"]} value={option["choice"]}>{option["sort-by"]}</option>
                        )
                    })}
                </select>
            </span>
        </div>
    )
}

export default memo(SortBy);
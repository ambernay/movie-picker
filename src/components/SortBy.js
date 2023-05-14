function SortBy ({ setSortOption }) {

    const sortMenuObj = {
        "sortOptions": [
            { "sort-by": "Rating: High to Low", "choice": "vote_average.desc" },
            { "sort-by": "Rating: Low to High", "choice": "vote_average.asc" },
            { "sort-by": "Titles A-Z", "choice": "original_title.desc" },
            { "sort-by": "Titles Z-A", "choice": "original_title.asc" },
            { "sort-by": "Release date newest", "choice": "primary_release_date.desc" },
            { "sort-by": "Release date oldest", "choice": "primary_release_date.asc" }
        ]
    };

    const handleChange = (e) => {
        setSortOption(e.target.value);
        console.log('changed');

    }

    return (
        <div className="sort-menu">
            <label className="sr-only" for="sort">Sort by:</label>

            <select onChange={handleChange} name="sort" id="sort">

                {sortMenuObj.sortOptions.map((option) => {
                    return (
                        <option id={option["sort-by"]} value={option["choice"]}>{option["sort-by"]}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default SortBy;
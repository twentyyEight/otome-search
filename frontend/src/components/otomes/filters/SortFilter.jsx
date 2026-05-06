export default function SortFilter({ sort, setParams }) {

    return (
        <div>
            <label htmlFor="sort">Sort</label>
            <select onChange={(e) => setParams('sort', e.target.value)} value={sort} id="sort" name="sort">
                <option value="votecount reverse">Most popular</option>
                <option value="votecount">Least popular</option>
                <option value="title">A-Z</option>
                <option value="title reverse">Z-A</option>
                <option value="released reverse">Newest</option>
                <option value="released">Oldest</option>
                <option value="rating reverse">Best rating</option>
                <option value="rating">Worst rating</option>
            </select>
        </div>
    )
}
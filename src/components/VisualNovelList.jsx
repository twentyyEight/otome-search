import { useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import useAllVisualNovels from "../hooks/useAllVisualNovels";
import { FaSearch, FaFilter } from "react-icons/fa";
import FiltersSelection from "./FiltersSelection";

export default function VisualNovelList() {

    const [page, setPage] = useState(1)
    const [showFilters, setShowFilters] = useState(false)
    const { vns, limiter, loading, addFilters, error } = useAllVisualNovels(page)
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate();

    const onSubmit = (data) => {
        addFilters(data)
    }

    return (
        <div className="w-fit mx-auto my-5">
            <form onSubmit={handleSubmit(onSubmit)} className="mb-5">

                {/* Search by name */}
                <div className="flex">
                    <input type="search"
                        placeholder="Search by name"
                        className="border-2 border-gray-300 w-2xs rounded-l-md px-2 py-1.5"
                        {...register('name')} />

                    <button type="submit" className="bg-pink-500 hover:bg-pink-700 p-2 rounded-r-md cursor-pointer">
                        <FaSearch color="white" size={'20px'} />
                    </button>

                    <div 
                    onClick={() => setShowFilters(true)}
                    className="flex items-center bg-pink-600 hover:bg-pink-800 cursor-pointer text-white w-max py-2 px-3 space-x-3 rounded-md ml-2">
                        <p className="font-semibold">Filters</p>
                        <FaFilter />
                    </div>
                </div>

                <FiltersSelection register={register} show={showFilters} setShow={setShowFilters}/>

            </form>

            {loading && <h3>Loading...</h3>}

            {error && <h3>Server Error</h3>}

            {!loading && !error && (
                vns.length > 0 ?
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 space-x-4">
                        {vns.map(vn => (
                            <div className="mb-5" key={vn.id}>
                                <img src={vn.image?.url} className="w-[200px] h-[300px] object-cover rounded-md" />

                                <p className="cursor-pointer" onClick={() => navigate(`/vn/${vn.id}`)}>
                                    {vn.title.length > 24 ? (vn.title.slice(0, 23) + '...') : vn.title}
                                </p>
                            </div>
                        ))}
                    </div>
                    :
                    <h3>No results found</h3>
            )}

            {page > 1 && <button onClick={() => setPage(page - 1)}>Prev</button>}
            {limiter && <button onClick={() => setPage(page + 1)}>Next</button>}
        </div>
    )
}
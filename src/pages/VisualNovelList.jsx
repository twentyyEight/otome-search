import { useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import useAllVisualNovels from "../hooks/useAllVisualNovels";
import { FaSearch, FaFilter } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import FiltersSelection from "../components/FiltersSelection";
import Loading from "../components/Loading";

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
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-5 flex sm:justify-start justify-center">

                {/* Search by name */}
                <div className="flex">
                    <input type="search"
                        placeholder="Search by name"
                        className="border-2 border-gray-300 w-[12rem] sm:w-[15rem] bg-white rounded-l-md px-3 py-1.5"
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

                <FiltersSelection register={register} show={showFilters} setShow={setShowFilters} />

            </form>

            {loading && <Loading />}

            {error && <h3>Server Error</h3>}

            {!loading && !error && (
                vns.length > 0 ?
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:space-x-4 space-y-3 place-items-center">
                            {vns.map(vn => (
                                <div
                                    key={vn.id}
                                    className="group relative border border-gray-300 w-[150px] sm:w-[170px] bg-white rounded-lg cursor-pointer"
                                    onClick={() => navigate(`/vn/${vn.id}`)}
                                >
                                    <img
                                        src={vn.image?.url}
                                        className="w-full h-[240px] object-cover rounded-md transition duration-200 group-hover:brightness-50"
                                    />

                                    <div className="px-3 h-14 pt-2">
                                        <p className="text-sm group-hover:text-gray-700 line-clamp-2">
                                            {vn.title}
                                        </p>
                                    </div>
                                </div>


                            ))}
                        </div>
                        <div className="flex justify-between">
                            {page > 1 && <button onClick={() => setPage(page - 1)} className="flex items-center bg-pink-500 text-white py-1.5 px-3 rounded-md font-semibold space-x-1 cursor-pointer hover:bg-pink-700">
                                <IoIosArrowBack />
                                <p>Prev</p>
                            </button>}

                            {limiter && <button onClick={() => setPage(page + 1)} className="flex items-center bg-pink-500 text-white py-1.5 px-3 rounded-md font-semibold space-x-1 cursor-pointer hover:bg-pink-700">
                                <p>Next</p>
                                <IoIosArrowBack className="rotate-180" />
                            </button>}
                        </div>
                    </>

                    :
                    <h3>No results found</h3>
            )}

        </div >
    )
}
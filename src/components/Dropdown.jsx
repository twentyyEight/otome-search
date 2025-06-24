import { FaAngleDown } from "react-icons/fa";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Dropdown({ title, obj, register }) {

    const [showList, setShowList] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");

    const searchResults = Object.entries(obj).filter(([f]) =>
        f.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="w-xs border-2 border-gray-300 rounded-md py-2 px-3 flex flex-col mt-3">

                <div className="flex w-full items-center justify-between">
                    <h1 className="font-semibold">{title}</h1>
                    <div className="bg-pink-200 rounded-xl p-0.5">
                        <FaAngleDown
                            color="D100A4"
                            className={`cursor-pointer ${showList && 'scale-y-[-1]'}`}
                            onClick={() => setShowList(!showList)} />
                    </div>
                </div>
            </div>

            <div className={`${!showList ? 'hidden' : 'max-h-60 w-xs border-2 border-gray-300 rounded-md mt-1 py-2 px-4'}`}>

                {title != 'Voiced' &&
                    <div className="relative">
                        <FaSearch className="absolute mt-4.5 ml-2" color="gray" />
                        <input type="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={`Search ${title.toLowerCase()}`}
                            className="bg-gray-100 w-full mt-2 mb-3 py-1 pl-7.5 pr-2 rounded-md border-2 border-gray-300"
                        />
                    </div>
                }

                <div className="overflow-y-scroll h-max pr-3 max-h-40 no-scrollbar-arrows">
                    {searchResults.map(([alias, full]) => (

                        <div className="flex flex-col mb-2" key={crypto.randomUUID()}>

                            <div className="flex items-center justify-between">
                                <label htmlFor={alias}>{full}</label>
                                <input type="checkbox"
                                    value={alias}
                                    name={alias}
                                    {...register}
                                    className="size-5 accent-pink-400 cursor-pointer" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}
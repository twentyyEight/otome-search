import { platforms, languages, voiced } from "../utils/filtersDictionaries";
import Dropdown from "./Dropdown";
import { IoClose } from "react-icons/io5";
import { useEffect, useRef } from 'react';

export default function FiltersSelection({ register, show, setShow }) {

    {/* No scrolling */ }
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [show]);

    const checkRef = useRef(null);

    const uncheckAll = () => {
        const checkboxes = checkRef.current.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => cb.checked = false);
    };

    return (
        <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300
        ${show ? 'bg-black/50 opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div
                className={`bg-white px-7 py-5 w-max my-5 rounded-md flex flex-col transition-all duration-300 ease-in-out transform
      ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}
            >
                <div className="flex items-center justify-between">
                    <h1>Filters</h1>
                    <div className="flex space-x-4">
                        <h1 className="underline text-gray-700 cursor-pointer" onClick={uncheckAll}>Clear filters</h1>
                        <IoClose
                            onClick={() => setShow(false)}
                            size={'25px'}
                            className="bg-gray-200 hover:bg-gray-300 rounded-xl p-1 cursor-pointer"
                        />
                    </div>
                </div>

                <div className="overflow-y-scroll pr-3 flex-1 no-scrollbar-arrows mt-2" ref={checkRef}>
                    <Dropdown title="Platform" obj={platforms} register={{ ...register('platform') }}  />
                    <Dropdown title="Voiced" obj={voiced} register={{ ...register('voice') }} />
                    <Dropdown title="Language" obj={languages} register={{ ...register('lang') }} />
                    <Dropdown title="Original Language" obj={languages} register={{ ...register('olang') }} />
                </div>

                <button
                    onClick={() => setShow(false)}
                    type="submit"
                    className="bg-pink-400 hover:bg-pink-600 text-white font-semibold w-full py-2 rounded-md mt-4 cursor-pointer"
                >
                    Apply filters
                </button>
            </div>
        </div>

    )
}
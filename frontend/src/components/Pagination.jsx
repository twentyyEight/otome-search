import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function Pagination({page, total, setSearchParams}) {

    const start = Math.min(Math.max(page - 1, 1), total - 2);
    const end = Math.max(Math.min(page + 1, total), 3);

    const pages = [];

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return <div>
        <button onClick={() => setSearchParams({ page: 1 })}>
            <MdKeyboardDoubleArrowLeft />
        </button>

        {pages.map(p => (
            <button key={p} onClick={() => setSearchParams({ page: p })}>
                {p}
            </button>
        ))}

        <button onClick={() => setSearchParams({ page: total })}>
            <MdKeyboardDoubleArrowRight />
        </button>
    </div>
}
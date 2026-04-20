import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useSearchParams } from 'react-router-dom'

export default function Pagination({ total }) {

    const [searchParams, setSearchParams] = useSearchParams() // Obtiene y modifica parametros URL

    const page = Number(searchParams.get('page') ?? 1)

    const start = Math.min(Math.max(page - 1, 1), total - 2);
    const end = Math.max(Math.min(page + 1, total), 3);

    const pages = [];

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return <div>
        {total > 2 ?
            <>
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
            </>
            :
            <>
                <button onClick={() => setSearchParams({ page: 1 })}>1</button>
                <button onClick={() => setSearchParams({ page: 2 })}>2</button>
            </>
        }
    </div>
}
import Pagination from "./Pagination";
import FiltersOtomes from "../../components/OtomeList/FiltersOtomes";
import { Link } from "react-router-dom";;

export default function OtomeList({ otomes, total }) {

    return <>
        {/* FILTROS */}
        <FiltersOtomes />

        {/* PAGINACIÓN */}
        {total > 1 && <Pagination total={total} />}

        {/* LISTADO OTOMES */}
        {otomes.map((otome) => (
            <Link key={otome.id} to={`/otomes/${otome.id}`}>
                <img src={otome.image?.url} alt={otome.title} />
                <h3>{otome.title}</h3>
            </Link>
        ))}
    </>
}
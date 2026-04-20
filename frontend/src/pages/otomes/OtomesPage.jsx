import useOtomes from '../../hooks/otomes/useOtomes'
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';
import FiltersOtomes from '../../components/filters/OtomesFilters';
import Pagination from '../../components/ui/Pagination';
import { Link } from "react-router-dom";

export default function OtomesPage() {

   const { otomes, total, loading, error } = useOtomes()

   if (loading) return <Loading />
   if (error) return <Error />

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
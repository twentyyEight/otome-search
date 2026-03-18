import useAllOtomes from "../hooks/useAllOtomes"
import Pagination from "../components/Pagination";
import FiltersOtomes from "../components/OtomeList/FiltersOtomes";
import Loading from '../components/Loading'
import Error from "../components/Error";
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import useParamsFilters from "../hooks/useParamsFilters";

export default function OtomeList() {

   const [searchParams, setSearchParams] = useSearchParams() // Obtiene y modifica parametros URL
   const filters = useParamsFilters(searchParams)
   const { page } = filters

   const { otomes, total, loading, error } = useAllOtomes(page, filters) // Obtiene los otomes y el n° total de páginas

   return <>

      <h1>Otomes</h1>

      {!error ?
         <>
            {
               !loading ?
                  <>
                     {/* FILTROS */}
                     <FiltersOtomes setSearchParams={setSearchParams} searchParams={searchParams} />

                     {/* LISTADO OTOMES */}
                     {otomes.map((otome) => (
                        <Link key={otome.id} to={`/otomes/${otome.id}`}>
                           <img src={otome.image?.url} alt={otome.title} />
                           <h3>{otome.title}</h3>
                        </Link>
                     ))}

                     {/* PAGINACIÓN */}
                     {total > 1 && <Pagination page={page} total={total} setSearchParams={setSearchParams} />}
                  </>
                  :
                  <Loading />
            }
         </>
         :
         <Error />
      }
   </>
}
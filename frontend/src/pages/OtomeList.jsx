import useAllOtomes from "../hooks/useAllOtomes"
import Pagination from "../components/OtomeList/Pagination";
import Filters from "../components/OtomeList/Filters";
import Loading from '../components/Loading'
import Error from "../components/Error";
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState } from "react";

export default function OtomeList() {

   const navigate = useNavigate()

   const [searchParams, setSearchParams] = useSearchParams() // Obtiene y modifica parametros URL
   const page = Number(searchParams.get('page') ?? 1) // Obtiene 'page' del parametro de la URL

   const [filters, setFilters] = useState({
      sort: 'votecount',
      reverse: true,
      name: '',
      plat: [],
      lang: [],
      originalLang: [],
      voice: [],
      age: 0
   })

   const { otomes, total, loading, error } = useAllOtomes(page, filters) // Obtiene los otomes y el n° total de páginas

   return <>

      <h1>Otomes</h1>

      {/* FILTROS */}
      <Filters setFilters={setFilters} />

      {!error ?
         <>
            {
               !loading ?
                  <>
                     {/* LISTADO OTOMES */}
                     {otomes.map(otome => (

                        <div key={otome.id}>
                           <img src={otome.image?.url} alt={otome.title} />
                           <h2 onClick={() => navigate(`/otomes/${otome.id}`)}>{otome.title}</h2>
                        </div>
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
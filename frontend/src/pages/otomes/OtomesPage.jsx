import useParamsFilters from "../../hooks/useParamsFilters";
import OtomeList from "../../components/OtomeList/Base"
import useOtomes from '../../hooks/otomes/useOtomes'
import Loading from '../../components/Loading';
import Error from '../../components/Error';

export default function OtomesPage() {

   const filters = useParamsFilters()
   const { page } = filters

   const { otomes, total, loading, error } = useOtomes(page, filters)

   return <>
      {!error ?
         <>
            {!loading ?
               <>
                  <h1>Otomes</h1>
                  <OtomeList otomes={otomes} page={page} total={total} />
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
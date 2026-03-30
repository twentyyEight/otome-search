import OtomeList from "../../components/OtomeList/Base"
import useOtomes from '../../hooks/otomes/useOtomes'
import Loading from '../../components/Loading';
import Error from '../../components/Error';

export default function OtomesPage() {

   const { otomes, total, loading, error } = useOtomes()

   if (loading) return <Loading />
   if (error) return <Error />

   return <>
      <h1>Otomes</h1>
      <OtomeList otomes={otomes} total={total} />
   </>
}
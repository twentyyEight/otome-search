import Error from "../../components/Error"
import Loading from "../../components/Loading"
import { Link } from "react-router-dom"
import Pagination from '../../components/Pagination'
import useStaffs from '../../hooks/staff/useStaffs'

export default function StaffsPage() {

    const { staffs, total, loading, error } = useStaffs()

    if (loading) return <Loading />
    if (error) return <Error />

    return <>
        {staffs.map(staff => (
            <Link to={`${staff.id}`} key={staff.id}>{staff.name}</Link>
        ))}

        {total > 1 && <Pagination total={total} />}
    </>
}
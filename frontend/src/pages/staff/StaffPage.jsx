import useStaff from "../../hooks/staff/useStaff"
import Loading from "../../components/ui/Loading.jsx"
import Error from "../../components/ui/Error.jsx"
import { Link } from "react-router-dom"

export default function StaffPage() {

    const { staff, loading, error } = useStaff()

    if (loading) return <Loading />
    if (error) return <Error />

    return (
        <>
            <h1>{staff.name}</h1>
            <p>{staff.gender}</p>
            <p>{staff.lang}</p>
            <p>Aliases:</p>
            {staff.aliases
                .filter(alias => !alias.ismain)
                .map(alias => (
                    <p key={alias.name}>{alias.latin ?? alias.name}</p>
                ))
            }
            <p>{staff.description}</p>
            {staff.extlinks?.map(link => <Link key={link.id} to={link.url}>{link.label}</Link>)}

            <h2>Works</h2>

            <h3>Credits</h3>
            {staff.roles.others?.map(o => (
                <div key={crypto.randomUUID()}>
                    <img src={o.otome.image} alt={o.otome.title} />
                    <p>{o.otome.title}</p>
                    <p>{o.otome.released}</p>
                    <p>Role: {o.role.type}</p>
                    <p>{o.role.note}</p>
                </div>
            ))}

            <h3>Voiced characters</h3>
            {staff.roles.voice?.map(v => (
                <div key={crypto.randomUUID()}>
                    <img src={v.character.image} alt={v.character.name} />
                    <p>{v.character.name}</p>
                    <p>{v.otome.title}</p>
                    <p>{v.otome.released}</p>
                </div>
            ))}
        </>
    )
}
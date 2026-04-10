import useOtome from "../../hooks/otomes/useOtome.jsx"
import Loading from "../../components/Loading.jsx"
import Error from "../../components/Error.jsx"
import Characters from "../../components/OtomePage/Characters.jsx"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth/AuthContext.jsx"
import Actions from "../../components/OtomePage/Actions.jsx"

export default function OtomePage() {

    const { otome, loading, error } = useOtome()
    const { isAuth } = useContext(AuthContext)

    if (loading) return <Loading />
    if (error) return <Error />

    const { info, releases, characters } = otome

    return <>
        <img src={info.image?.url} alt={info.title} />

        {isAuth && <Actions st={info.state} id={info.id} />}

        <h1>{info.title}</h1>
        {info.released && <p>{info.released}</p>}
        {info.olang}

        {info.developers.map((dev) => (
            <Link to={`/devs/${dev.id}`} key={dev.id}>{dev.name}</Link>
        ))}

        <p>{info.devstatus}</p>
        <p>{info.rating}</p>
        <p>{info.description}</p>

        {info.tags.map((tag) => (
            <Link to='/tags' key={tag.id}>{tag.name}</Link>
        ))}

        <h2>Releases</h2>
        {releases.map(release =>

            <div key={release.id}>
                <h3>{release.title}</h3>
                <p>{release.released}</p>

                {release.platforms.map(platform => <p key={crypto.randomUUID()}>{platform}</p>)}
                {release.languages.map(language => <p key={crypto.randomUUID()}>{language.lang}</p>)}

                <p>{release.voiced}</p>
                <p>{release.freeware}</p>
                <p>+{release.minage}</p>
                <p>{release.official}</p>
                <p>{release.patch}</p>

                {release.extlinks.map(link => <a key={crypto.randomUUID()} href={link.url}>{link.name}</a>)}
            </div>
        )}

        <Characters characters={characters} otome_id={info.id} vas={info.va} />
    </>
}
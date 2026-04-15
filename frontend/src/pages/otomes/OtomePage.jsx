import useOtome from "../../hooks/otomes/useOtome.jsx"
import Loading from "../../components/Loading.jsx"
import Error from "../../components/Error.jsx"
import { useAuth } from "../../contexts/auth/useAuth.jsx"
import Actions from "../../components/OtomePage/Actions.jsx"
import { Link } from "react-router-dom"
import charactersFormarter from "../../utils/formatters/characters.formatter.js"
import descriptionsFormatter from "../../utils/formatters/descriptions.formatter.js"
import CharacterCard from '../../components/characters/CharacterCard.jsx'

export default function OtomePage() {

    const { otome, loading, error } = useOtome()
    const { isAuth } = useAuth()

    if (loading) return <Loading />
    if (error) return <Error />

    const characters = charactersFormarter(otome.characters, otome.id, otome.va)

    return <>
        <img src={otome.image?.url} alt={otome.title} />

        {isAuth && <Actions st={otome.state} id={otome.id} />}

        <h1>{otome.title}</h1>
        {otome.released && <p>{otome.released}</p>}
        {otome.olang}

        {otome.developers.map((dev) => (
            <Link to={`/devs/${dev.id}`} key={dev.id}>{dev.name}</Link>
        ))}

        <p>{otome.devstatus}</p>
        <p>{otome.rating}</p>

        <p dangerouslySetInnerHTML={{ __html: descriptionsFormatter(otome.description) }} />

        {otome.tags.map((tag) => (
            <Link to='/tags' key={tag.id}>{tag.name}</Link>
        ))}

        <h2>Releases</h2>
        {otome.releases.map(release =>

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

        <h2>Characters</h2>
        {characters.map(character => <CharacterCard key={crypto.randomUUID()} character={character} />)}
    </>
}
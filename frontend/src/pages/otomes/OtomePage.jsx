import { useState } from "react"
import { Link } from "react-router-dom"
import useOtome from "../../hooks/otomes/useOtome"
import useSchema from '../../hooks/useSchema'
import Loading from "../../components/ui/Loading"
import Error from "../../components/ui/Error"
import FiltersReleases from "../../components/OtomePage/FiltersReleases"

export default function OtomePage() {

    const { otome, loading: loading_otome, error: error_otome } = useOtome()
    const { schema, loading: loading_schema, error: error_schema } = useSchema()

    const [filteredReleases, setFilteredReleases] = useState(null)

    if (loading_otome || loading_schema) return <Loading />
    if (error_otome || error_schema) return <Error />

    const releases = filteredReleases ?? otome?.releases

    return (
        <>
            <img src={otome.image.url} alt={otome.name} />
            <h1>{otome.title}</h1>
            {otome.developers.map(dev => <p key={dev.id}>{dev.name}</p>)}
            <p>{otome.olang}</p>
            <p>{otome.rating} ({otome.votecount})</p>

            {/* Otomes relacionados */}
            {Object.keys(otome.relations).length > 0 &&
                <div>
                    <h2>Relations</h2>
                    {Object.entries(otome.relations).map(([relation, otomes]) => (
                        <div key={relation}>
                            <h3>{relation}</h3>
                            {otomes.map(otome =>
                                <Link key={otome.id} to={`/otomes/${otome.id}`}>
                                    {otome.title} {!otome.relation_official && <p>(Unofficial)</p>}
                                </Link>)}
                        </div>
                    ))}
                </div>
            }

            {otome.tags.length > 0 &&
                <div>
                    <h2>Tags</h2>
                    {otome.tags.map(tag => <p key={tag.id}>{tag.name}</p>)}
                </div>
            }

            {/* Lanzamientos */}
            <h2>Releases</h2>
            <FiltersReleases schema={schema} original={otome?.releases} setReleases={setFilteredReleases} />
            {releases?.map(release => (
                <div key={release.id}>

                    <h3>{release.title}</h3>
                    <p>{release.released}</p>
                    {release.platforms.map(platform => <p key={crypto.randomUUID()}>{platform}</p>)}
                    {release.languages.map(l => <p key={crypto.randomUUID()}>{l.lang}</p>)}
                    {release.notes && <p>{release.notes}</p>}
                    <p>{release.voiced}</p>

                </div>
            ))}

            {/* Personajes */}
            {Object.keys(otome.characters).length > 0 &&
                <div>
                    <h2>Characters</h2>
                    {Object.entries(otome.characters).map(([role, characters]) => (

                        <div key={role}>
                            <h3>{role}</h3>
                            {characters.map(character =>
                                <div key={character.id}>
                                    <img src={character.image.url} alt={character.name} />
                                    <h4>{character.name}</h4>
                                    <p>{character.sex[0]}</p>
                                    {character.voice && <p>Voiced by: {character.voice}</p>}
                                    {character.traits.length > 0 &&
                                        <div>
                                            <p>Personality:</p>
                                            {character.traits.map(trait =>
                                                <p key={trait.id}>{trait.name}</p>
                                            )}
                                        </div>
                                    }
                                    {character.description && <p>{character.description}</p>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            }
        </>
    )
}
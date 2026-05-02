import useOtome from "../../hooks/otomes/useOtome"
import Loading from "../../components/Loading"
import Error from "../../components/Error"
import { Link } from "react-router-dom"

export default function OtomePage() {

    const { otome, loading, error } = useOtome()

    if (loading) return <Loading />
    if (error) return <Error />

    //console.log(otome)

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
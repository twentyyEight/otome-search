import useOtome from "../hooks/useOtome"
import Loading from "../components/Loading"
import Error from "../components/Error"

export default function OtomeDetail() {

    const { otome, error, loading } = useOtome()

    const characters_roles = [
        { key: 'main', label: 'Protagonista(s)' },
        { key: 'primary', label: 'Principales' },
        { key: 'side', label: 'Secundarios' },
        { key: 'appears', label: 'Terciarios' },
    ]

    return (
        !error ?
            <>
                {
                    !loading ?
                        <>
                            <img src={otome.image?.url} alt="" />
                            <h1>{otome.title}</h1>
                            {otome.released && <p>{otome.released}</p>}
                            {otome.olang}
                            {otome.developers.map((dev) => <p key={dev.id}>{dev.name}</p>)}
                            <p>{otome.devstatus}</p>
                            <p>{otome.rating}</p>
                            <p>{otome.description}</p>

                            {otome.tags.flat().map((tag) => (<p key={tag.id}>{tag.name}</p>))}

                            <h2>Lanzamientos</h2>
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

                            <h2>Personajes</h2>
                            {characters_roles.map(({ key, label }) => (

                                otome.characters[key] &&

                                <div key={key}>

                                    <h3>{label}</h3>
                                    {otome.characters[key].map(char => (

                                        <div key={char.id}>
                                            <img src={char.image?.url} alt={char.name} />
                                            <h4>{char.name}</h4>
                                            <p>{char.voice_actor && 'Actor de voz: ' + char.voice_actor}</p>
                                            <p>Sexo: {char.sex[0]}</p>

                                            {char.traits.map(trait => <p key={trait.id}>{trait.name}</p>)}

                                            <p>{char.description}</p>
                                        </div>
                                    ))}

                                </div>
                            ))}
                        </>
                        :
                        <Loading />
                }
            </>
            :
            <Error />
    )
}
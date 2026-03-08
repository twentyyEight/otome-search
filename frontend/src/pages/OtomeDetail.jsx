import useOtome from "../hooks/useOtome"
import Loading from "../components/Loading"
import Error from "../components/Error"

export default function OtomeDetail() {

    const { otome, error, loading } = useOtome()

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
                        </>
                        :
                        <Loading />
                }
            </>
            :
            <Error />
    )
}
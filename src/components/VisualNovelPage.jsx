import useVisualNovel from "../hooks/useVisualNovel"
import { voiced, replaceFormattingCode } from "../services/filtersDictionaries"

export default function VisualNovelPage() {

    const { vn, releases, loading } = useVisualNovel()

    return (
        <>
            {loading && <h3>Loading...</h3>}

            {!loading &&
                <>
                    <h1>{vn.title}</h1>
                    <img src={vn.image?.url} alt="image" />
                    <p dangerouslySetInnerHTML={{ __html: replaceFormattingCode(vn.description) }}></p>

                    <h2>Releases</h2>
                    {releases.map(release => (
                        <div key={release.id}>
                            <h4>{release.title}</h4>

                            <div style={{ display: "flex" }}>
                                {release.platforms.map(platform => (
                                    <p>{platform}</p>
                                ))}
                            </div>

                            {release.freeware && <p>Freeware</p>}
                            {release.patch && <p>Patch</p>}

                            {release.languages.map(language => (
                                <p>{language.lang}</p>
                            ))}

                            <p>{release.released}</p>
                            <p>{voiced[release.voiced]}</p>
                            <p dangerouslySetInnerHTML={{ __html: replaceFormattingCode(release.notes) }}></p>

                            {release.extlinks.map(extlinks =>
                                <>
                                    <a href={extlinks.url}>{extlinks.name}</a>
                                    <br />
                                </>
                            )}
                        </div>
                    ))}
                </>
            }
        </>
    )
}
import useVisualNovel from "../hooks/useVisualNovel"

export default function VisualNovelPage() {

    const { vn, releases, loading } = useVisualNovel()

    const voiced = { 1: 'Not Voiced', 3: 'Partially Voiced', 4: 'Fully Voiced'}

    console.log(releases)

    return (
        <>
            {loading && <h3>Loading...</h3>}

            {!loading &&
                <>
                    <h1>{vn.title}</h1>
                    <img src={vn.image?.url} alt="image" />
                    <p>{vn.description}</p>

                    <h2>Releases</h2>
                    {releases.map(release => (
                        <div key={release.id}>
                            <h4>{release.title}</h4>
                            <p>{release.released}</p>
                            <p>{voiced[release.voiced]}</p>
                            <p>{release.notes}</p>
                        </div>
                    ))}
                </>
            }
        </>
    )
}
export default function Releases({ releases }) {

    return <>

        <h2>Lanzamientos</h2>
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
    </>
}
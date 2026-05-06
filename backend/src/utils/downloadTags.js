import { Readable } from 'stream'
import zlib from 'zlib'
import Tag from '../models/tag.model.js'

async function download() {
    const res = await fetch('https://dl.vndb.org/dump/vndb-tags-latest.json.gz')
    const gunzip = zlib.createGunzip()
    const chunks = []

    return new Promise((resolve, reject) => {
        Readable.fromWeb(res.body)
            .pipe(gunzip)
            .on('data', chunk => chunks.push(chunk))
            .on('finish', () => resolve(Buffer.concat(chunks).toString('utf-8')))
            .on('error', reject)
    })
}

async function saveToDB(data) {
    const tags = JSON.parse(data)

    for (const tag of tags) {
        try {
            await Tag.updateOne(
                { id: String(tag.id) },
                {
                    id: String(tag.id),
                    name: tag.name,
                    description: tag.description,
                    parents: (tag.parents ?? []).map(String),
                },
                { upsert: true }
            )
        } catch (err) {
            console.error(`Error inserting tag ${tag.id}:`, err.message)
        }
    }

    console.log('Tags saved')
}

export async function downloadTags() {
    console.log('Downloading tags...')
    const data = await download()
    await saveToDB(data)
}
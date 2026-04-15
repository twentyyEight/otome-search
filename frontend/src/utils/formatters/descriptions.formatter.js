export default function descriptionsFormatter(description, spoilerLevel = 0) {
    if (!description) return ''

    return description
        .replace(/\n/g, '<br/>')
        .replace(/\[url=(.*?)\](.*?)\[\/url\]/gs, '<a href="$1" target="_blank" rel="noreferrer">$2</a>')
        .replace(/\[spoiler\](.*?)\[\/spoiler\]/gs, (_, content) => {
            return spoilerLevel >= 2
                ? `<span style="color: red;">${content}</span>`
                : `<span class="hidden">${content}</span>`
        })
}
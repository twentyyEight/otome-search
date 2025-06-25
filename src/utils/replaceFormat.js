export const replaceFormattingCode = (text) => {

    if (text) {
        const no_URL = text.replace(/\[url=(.+?)\](.+?)\[\/url\]/gi, '<a href="$1" class="underline">$2</a>')
        const no_N = no_URL.replace(/\n/g, '<br />')
        return no_N
    } else {
        return null
    }
}
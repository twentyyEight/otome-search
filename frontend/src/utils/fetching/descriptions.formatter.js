export default function descriptionsFormatter(description) {

    return description
        .replace(/\[url=(.*?)\](.*?)\[\/url\]/g, '<a href="$1" target="_blank" class="text-blue-600">$2</a>')
        .replace(/\[spoiler\](.*?)\[\/spoiler\]/g, '<span class="hidden">$1</span>')
        .replace(/\n/g, '<br>')
}
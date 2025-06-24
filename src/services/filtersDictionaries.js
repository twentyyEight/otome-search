export const platforms = {
    "win": "Windows",
    "mac": "macOS",
    "and": "Android",
    "ios": "iOS",
    "swi": "Nintendo Switch",
    "nds": "Nintendo DS",
    "n3d": "Nintendo 3DS",
    "web": "Website",
    "psp": "Playstation Portable",
    "psv": "Playstation Vita",
    "ps1": "Playstation",
    "ps2": "Playstation 2",
    "ps3": "Playstation 3",
    "ps4": "Playstation 4",
    "xbox": "Xbox One",
    "xxs": "Xbox X/S"
}

export const languages = {
    "ja": 'Japanese',
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'ko': 'Korean',
    'zh-Hans': 'Chinese simplified',
    'zh-Hant': 'Chinese tradicional',
    'ru': 'Russian',
    'de': 'German',
    'pt-br': 'Portuguese (Brazil)',
    'pt-pt': 'Portuguese (Portugal)',
    'uk': 'Ukrainian',
    'vi': 'Vietnamese',
    'ar': 'Arabic',
    'eu': 'Basque',
    'be': 'Belarusian',
    'bg': 'Bulgarian',
    'ca': 'Catalan',
    'cs': 'Czech',
    'nl': 'Dutch',
    'fi': 'Finnish',
    'el': 'Greek',
    'hi': 'Hindi',
    'id': 'Indonesian',
    'it': 'Italian',
    'mk': 'Macedonian',
    'ms': 'Malay',
    'no': 'Norwegian',
    'pl': 'Polish',
    'ro': 'Romanian',
    'ta': 'Tagalog',
    'th': 'Thai',
    'tr': 'Turkish'
}

export const voiced = { 1: 'Not Voiced', 3: 'Partially Voiced', 4: 'Fully Voiced' }

export const replaceFormattingCode = (text) => {

    if (text) {

        const no_URL = text.replace(/\[url=(.+?)\](.+?)\[\/url\]/gi, '<a href="$1">$2</a>')
        const no_N = no_URL.replace(/\n/g, '<br />')
        return no_N
    } else {
        return null
    }
}
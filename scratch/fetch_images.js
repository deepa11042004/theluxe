const urls = [
    'https://www.tajhotels.com/en-in/taj/taj-lake-palace-udaipur/',
    'https://www.anandaspa.com/',
    'https://www.oberoihotels.com/hotels-in-agra-amarvilas-resort/',
    'https://soneva.com/resorts/soneva-fushi/',
    'https://www.aman.com/resorts/amanbagh',
    'https://www.theleela.com/the-leela-kovalam-a-raviz-hotel'
];
async function getOgImage(url) {
    try {
        const res = await fetch(url);
        const html = await res.text();
        const match = html.match(/<meta\s+(?:property|name)=['"]og:image['"]\s+content=['"]([^'"]+)['"]/i);
        if (match) {
            console.log(url + ' -> ' + match[1]);
        } else {
            console.log(url + ' -> Not found');
        }
    } catch(e) {
        console.log(url + ' error', e.message);
    }
}
async function run() {
    for (const url of urls) {
        await getOgImage(url);
    }
}
run();

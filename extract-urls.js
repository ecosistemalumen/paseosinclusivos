const https = require('https');

const ids = [
    "I7Xv3tG6_dM",
    "g5R0-L-dC0Q",
    "p0jD-4j175g"
];

function fetchUrl(id) {
    return new Promise((resolve, reject) => {
        const url = `https://unsplash.com/photos/${id}`;
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };

        https.get(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                // Look for property="og:image" content="..."
                const match = data.match(/property="og:image" content="([^"]+)"/);
                if (match && match[1]) {
                    resolve({ id, url: match[1] });
                } else {
                    resolve({ id, error: "No og:image found" });
                }
            });
        }).on('error', (e) => {
            resolve({ id, error: e.message });
        });
    });
}

async function main() {
    console.log("Extracting URLs...");
    const results = await Promise.all(ids.map(fetchUrl));
    console.log(JSON.stringify(results, null, 2));
}

main();

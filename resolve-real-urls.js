const https = require('https');

const ids = [
    "g5NlYt0a2B0", // Saavedra
    "p0jD-4j175g", // Ciencias
    "EyY0zVspG8Y"  // Ciervo
];

function resolveUrl(id) {
    return new Promise((resolve, reject) => {
        const url = `https://unsplash.com/photos/${id}/download`;
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };

        https.get(url, options, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                resolve({ id, url: res.headers.location });
            } else {
                // If not a redirect, maybe we can't use this method.
                resolve({ id, error: `Status ${res.statusCode}` });
            }
        }).on('error', (e) => {
            resolve({ id, error: e.message });
        });
    });
}

async function main() {
    console.log("Resolving URLs...");
    const results = await Promise.all(ids.map(resolveUrl));
    console.log(JSON.stringify(results, null, 2));
}

main();

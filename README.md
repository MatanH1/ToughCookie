Prototype Pollution is a type of security vulnerability that can occur in JavaScript applications, particularly when dealing with objects. Attackers exploit this vulnerability to inject properties into JavaScript objects, which can lead to various malicious activities, including denial of service (DoS), remote code execution (RCE), or manipulating application behavior.

Practical Example of an Attack Using Prototype Pollution
Let's imagine a web application that uses a JavaScript object to manage user settings. An attacker could exploit Prototype Pollution by injecting malicious properties into this object, potentially leading to severe consequences.

Consider the following vulnerable code in a Node.js application:

function merge(target, source) {
    for (let key in source) {
        target[key] = source[key];
    }
}

let userSettings = {
    theme: "light",
    language: "en"
};

let newSettings = {
    theme: "dark",
    __proto__: {
        isAdmin: true
    }
};

merge(userSettings, newSettings);

console.log(userSettings);
console.log(userSettings.isAdmin);

The output will be:

{ theme: 'dark', language: 'en' }
true

meaning the attacker has successfully polluted the object prototype.

To avoid this attack in our patched version, we avoid directly interacting with the prototype chain, and use safer alternatives like Object.create(null) for creating objects without prototypes.
Changes were done only in memstore.js.

index.js was based on https://security.snyk.io/vuln/SNYK-JS-TOUGHCOOKIE-5672873 POC, ran command "npm install tough-cookie@2.5.0 && node index.js" for the test

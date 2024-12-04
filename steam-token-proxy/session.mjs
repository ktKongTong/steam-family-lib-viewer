import {EAuthTokenPlatformType, LoginSession} from "steam-session";

async function main() {
    // Create our LoginSession and start a QR login session.
    let session = new LoginSession(EAuthTokenPlatformType.MobileApp);
    session.loginTimeout = 120000; // timeout after 2 minutes
    let startResult = await session.startWithQR();

    let qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(startResult.qrChallengeUrl);
    console.log(`Open QR code: ${qrUrl}`);

    session.on('remoteInteraction', () => {
        console.log('Looks like you\'ve scanned the code! Now just approve the login.');
    });

    // No need to handle steamGuardMachineToken since it's only applicable to accounts using email Steam Guard,
    // and such accounts can't be authed using a QR code.

    session.on('authenticated', async () => {
        console.log('\nAuthenticated successfully! Printing your tokens now...');
        console.log(`SteamID: ${session.steamID}`);
        console.log(`Account name: ${session.accountName}`);
        console.log(`Access token: ${session.accessToken}`);
        console.log(`Refresh token: ${session.refreshToken}`);

        // We can also get web cookies now that we've negotiated a session
        let webCookies = await session.getWebCookies();
        console.log('Web session cookies:');
        console.log(webCookies);
    });

    session.on('timeout', () => {
        console.log('This login attempt has timed out.');
    });

    session.on('error', (err) => {
        // This should ordinarily not happen. This only happens in case there's some kind of unexpected error while
        // polling, e.g. the network connection goes down or Steam chokes on something.
        console.log(`ERROR: This login attempt has failed! ${err.message}`);
    });
}

// await new Promise((resolve, reject) => {
//     main().then(resolve);
//     setTimeout(resolve, 10000);
// });

// const res =  await session.startWithQR()
//
let session = new LoginSession(EAuthTokenPlatformType.MobileApp);
session.refreshToken = ""

// @ts-ignore
await session.refreshAccessToken()

console.log(session.accessToken)
console.log(session.refreshToken)
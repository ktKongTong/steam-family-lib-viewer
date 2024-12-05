const r= ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/']

export function uint8ArrayToBase64(e:Uint8Array):string {
    for (var t, i = e.length, n = i % 3, a = [], s = 16383, o = 0, u = i - n; o < u; o += s)
        a.push(l(e, o, o + s > u ? u : o + s));
    1 === n ? (t = e[i - 1],
    a.push(r[t >> 2] + r[t << 4 & 63] + "==")) : 2 === n && (t = (e[i - 2] << 8) + e[i - 1],
    a.push(r[t >> 10] + r[t >> 4 & 63] + r[t << 2 & 63] + "="));
    return a.join("")
}
function l(e:any, t:any, i:any):string {
    for (var n, a, s = [], o = t; o < i; o += 3)
        n = (e[o] << 16 & 16711680) + (e[o + 1] << 8 & 65280) + (255 & e[o + 2]),
        s.push(r[(a = n) >> 18 & 63] + r[a >> 12 & 63] + r[a >> 6 & 63] + r[63 & a]);
    return s.join("")
}
export function base64ToUint8Array(base64:string) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes
}

class Hash {
  sha1(str) {
    let utf8 = unescape(encodeURIComponent(str));
    let binary = "";
    for (let i = 0; i < utf8.length; i++) {
      binary += utf8.charCodeAt(i).toString(2).padStart(8, '0');
    }

    binary += '1';
    while (binary.length % 512 !== 448) {
      binary += '0';
    }
    let len = utf8.length * 8;
    let binaryLength = len.toString(2).padStart(64, '0');
    binary += binaryLength;

    const chunks = [];
    for (let i = 0; i < binary.length; i += 512) {
      chunks.push(binary.slice(i, i + 512));
    }

    let h0 = 0x67452301;
    let h1 = 0xEFCDAB89;
    let h2 = 0x98BADCFE;
    let h3 = 0x10325476;
    let h4 = 0xC3D2E1F0;

    for (let i = 0; i < chunks.length; i++) {
      let chunk = chunks[i];

      const words = [];
      for (let j = 0; j < 16; j++) {
        words.push(parseInt(chunk.slice(j * 32, (j + 1) * 32), 2));
      }

      for (let j = 16; j < 80; j++) {
        words.push(rotate(words[j - 3] ^ words[j - 8] ^ words[j - 14] ^ words[j - 16], 1));
      }

      let a = h0;
      let b = h1;
      let c = h2;
      let d = h3;
      let e = h4;

      for (let j = 0; j < 80; j++) {
        let f, k;
        if (j < 20) {
          f = (b & c) | ((~b) & d);
          k = 0x5A827999;
        } else if (j < 40) {
          f = b ^ c ^ d;
          k = 0x6ED9EBA1;
        } else if (j < 60) {
          f = (b & c) | (b & d) | (c & d);
          k = 0x8F1BBCDC;
        } else {
          f = b ^ c ^ d;
          k = 0xCA62C1D6;
        }
        let temp = (rotate(a, 5) + f + e + k + words[j]) & 0xFFFFFFFF;
        e = d;
        d = c;
        c = rotate(b, 30);
        b = a;
        a = temp;
      }

      h0 = (h0 + a) & 0xFFFFFFFF;
      h1 = (h1 + b) & 0xFFFFFFFF;
      h2 = (h2 + c) & 0xFFFFFFFF;
      h3 = (h3 + d) & 0xFFFFFFFF;
      h4 = (h4 + e) & 0xFFFFFFFF;
    }

    let result = "";
    result += h0.toString(16).padStart(8, '0');
    result += h1.toString(16).padStart(8, '0');
    result += h2.toString(16).padStart(8, '0');
    result += h3.toString(16).padStart(8, '0');
    result += h4.toString(16).padStart(8, '0');
    return result;
  }
}

function rotate(num, count) {
  return ((num << count) | (num >>> (32 - count))) & 0xFFFFFFFF;
}

module.exports = new Hash();
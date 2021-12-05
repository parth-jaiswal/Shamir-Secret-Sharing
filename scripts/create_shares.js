//step 1: encode image to base64
const encodeImage = require("./img_base64")
encodeImage();


//create shares
function horner(x, coeffs) {
	var logx = config.logs[x],
		fx = 0,
		i;

	for (i = coeffs.length - 1; i >= 0; i--) {
		if (fx !== 0) {
			fx = config.exps[(logx + config.logs[fx]) % config.maxShares] ^ coeffs[i];
		} else {
			fx = coeffs[i];
		}
	}

	return fx;
}

// Evaluate the Lagrange interpolation polynomial at x = `at`
// using x and y Arrays that are of the same length, with
// corresponding elements constituting points on the polynomial.
function lagrange(at, x, y) {
	var sum = 0,
		len,
		product,
		i,
		j;

	for (i = 0, len = x.length; i < len; i++) {
		if (y[i]) {
			product = config.logs[y[i]];

			for (j = 0; j < len; j++) {
				if (i !== j) {
					if (at === x[j]) {
						// happens when computing a share that is in the list of shares used to compute it
						product = -1; // fix for a zero product term, after which the sum should be sum^0 = sum, not sum^1
						break;
					}
					product =
						(product +
							config.logs[at ^ x[j]] -
							config.logs[x[i] ^ x[j]] +
							config.maxShares) %
						config.maxShares; // to make sure it's not negative
				}
			}

			// though exps[-1] === undefined and undefined ^ anything = anything in
			// chrome, this behavior may not hold everywhere, so do the check
			sum = product === -1 ? sum : sum ^ config.exps[product];
		}
	}

	return sum;
}

function getShares(secret, numShares, threshold) {
	var shares = [],
		coeffs = [secret],
		i,
		len;

	for (i = 1; i < threshold; i++) {
		coeffs[i] = parseInt(config.rng(config.bits), 2);
	}

	for (i = 1, len = numShares + 1; i < len; i++) {
		shares[i - 1] = {
			x: i,
			y: horner(i, coeffs),
		};
	}

	return shares;
}


function constructPublicShareString(bits, id, data) {
	var bitsBase36, idHex, idMax, idPaddingLen, newShareString;

	id = parseInt(id, config.radix);
	bits = parseInt(bits, 10) || config.bits;
	bitsBase36 = bits.toString(36).toUpperCase();
	idMax = Math.pow(2, bits) - 1;
	idPaddingLen = idMax.toString(config.radix).length;
	idHex = padLeft(id.toString(config.radix), idPaddingLen);

	if (typeof id !== "number" || id % 1 !== 0 || id < 1 || id > idMax) {
		throw new Error(
			"Share id must be an integer between 1 and " + idMax + ", inclusive."
		);
	}

	newShareString = bitsBase36 + idHex + data;

	return newShareString;
}

constructPublicShareString(1, 1, 1)


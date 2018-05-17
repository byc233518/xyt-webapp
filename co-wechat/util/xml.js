// xml Conversion
const xml2js = require('xml2js')

exports.xmlToJson = (str) => {
     return new Promise((resolve, reject) => {
        const parseString = xml2js.parseString
        parseString(str, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
     })
}

exports.jsonToXml = (obj) => {
    const builder = new xml2js.Builder()
    return builder.buildObject(obj)
}

exports.formatMessage = (result) => {
	const message = {}

	if (typeof result === 'object') {
		const keys = Object.keys(result)

		for (let i = 0; i < keys.length; i++) {
			const item = result[keys[i]]
			const key = keys[i]

			if (!(item instanceof Array) || item.length === 0) {
				continue
			}

			if (item.length === 1) {
				const val = item[0]

				if (typeof val === 'object') {
					message[key] = formatMessage(val)
				}
				else {
					message[key] = (val || '').trim()
				}
			}
			else {
				message[key] = []

				for (let j = 0, k = item.length; j < k; j++) {
					message[key].push(formatMessage(item[j]))
				}
			}
		}
	}

	return message
}
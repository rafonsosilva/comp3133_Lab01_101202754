const csv = require('csv-parser')
const fs = require('fs')
const output = []


paths = ['./usa.txt', './canada.txt']

for (let path of paths) {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path)
    }

    fs.writeFileSync(path, 'country,year,population\n')
}

var readerStream = fs.createReadStream('input_countries.csv')

readerStream.pipe(csv())
    .on('data', data => {
        if (data.country == 'United States' || data.country == 'Canada') {
            output.push(data)
        }
    })
    .on('end', () => {
        for (let data of output) {
            const { country, year, population } = data
            if (data.country === 'Canada') {
                fs.appendFileSync('canada.txt', `${country}, ${year}, ${population}\n`)
            } else {
                fs.appendFileSync('usa.txt', `${country}, ${year}, ${population}\n`)
            }
        }
    })

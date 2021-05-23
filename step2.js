const { default: axios } = require('axios');
const fs = require('fs');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            console.log(`Error reading ${path}`, err);
            process.exit(1);
        }
        console.log(data);
    });
}

async function webCat(url) {
    try{
        let res = await axios.get(url);
        console.log(res.data);
    }
    catch(err){
        console.log(err)
    }
}

let arg = process.argv[2];
if(arg.startsWith('http')) {
    webCat(arg);
} else {
    cat(process.argv[2]);
}
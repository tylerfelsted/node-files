const { default: axios } = require('axios');
const fs = require('fs');


function handleOutPut(data, out){
    if(out) {
        fs.writeFile(out, data, 'utf8', err => {
            if(err) {
                console.log('Error', err);
                process.exit(1);
            }
        });
    } else {
        console.log(data);
    }
}


function cat(path, out) {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            console.log(`Error reading ${path}`, err);
            process.exit(1);
        }
        handleOutPut(data, out);
    });
}

async function webCat(url, out) {
    try{
        let res = await axios.get(url);
        handleOutPut(res.data, out);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}


let out;
let path = process.argv[2];
if(path === '--out') {
    path = process.argv[4];
    out = process.argv[3];
}
if(path.startsWith('http')) {
    webCat(path, out);
} else {
    cat(path, out);
}




































// const { default: axios } = require('axios');
// const fs = require('fs');

// function readFile(path) {
//     fs.readFile(path, 'utf8', (err, data) => {
//         if(err) {
//             console.log(`Error reading ${path}`, err);
//             process.exit(1);
//         }
//         console.log(data)
//         return data;
//     });
// }

// function writeFile(path, content) {
//     fs.writeFile(path, content, {encoding: 'utf8', flag: 'a'}, err => {
//         console.log(`Couldn't write ${path}`, err)
//         process.exit(1);
//     });
// }

// async function readWeb(url) {
//     try{
//         let res = await axios.get(url);
//         return res.data;
//     }
//     catch(err){
//         console.log(err)
//         process.exit(1)
//     }
// }

// function cat(path) {
//     console.log(readFile(path));
// }

// async function catWrite(inPath, outPath) {
//     const toWrite = await readFile(inPath)
//     writeFile(outPath, toWrite);
// }

// async function webCat(url) {
//     console.log(await readWeb(url));
// }

// async function webCatWrite(url, path) {
//     const toWrite = await readWeb(url);
//     writeFile(path, toWrite);
// }

// let arg = process.argv[2];
// console.log(arg)
// if(arg === '--out') {
//     let newPath = process.argv[3];
//     let input = process.argv[4];
//     console.log(newPath)
//     console.log(input)
//     if(input.startsWith('http')) {
//         webCatWrite(input, newPath);
//     } else {
//         catWrite(newPath, input);
//     }

// }else if(arg.startsWith('http')) {
//     webCat(arg);
// } else {
//     cat(process.argv[2]);
// }
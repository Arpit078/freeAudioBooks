import express from "express"
import {serve} from "./download.js"
import fs from "fs"
import fsx from "fs-extra"
// import { fetch } from "./data.js";
import { fileURLToPath } from 'url';
import path ,{ dirname } from 'path';
import {zip} from "./zip.js"
const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json());



//-------------webpage-------------------//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//-------------webpage-end-------------------//




//---------------sendfile-------------------//
app.get('/q=:url', async (req, res) => {
	try {
        const directoryPath = './book/';
        try {
            fsx.removeSync(directoryPath);
            console.log('Directory removed successfully.');
          } catch (error) {
            console.error('Error removing directory:', error);
          }
          try {
            fs.mkdirSync(directoryPath);
            console.log('Directory created successfully.');
          } catch (error) {
            console.error('Error creating directory:', error);
          }
        const bookName = req.params.url
        const url = 'https://goldenaudiobook.com/' + req.params.url + '/'
        await serve(url)
        await zip("./book/",`./${bookName}.zip`)
        const zipFileName = `${bookName}.zip`;
        const zipFilePath = `./${zipFileName}`;
        await zip(`./book/`, zipFilePath);
    
        const options = {
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        };
    
        res.download(zipFilePath, zipFileName, options, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`File ${zipFilePath} sent successfully.`);
          }
          // Delete the ZIP file after sending it
          fs.unlinkSync(zipFilePath);
        });
        
    } catch (error) {
        console.log(error)
    }
});

//---------------sendfile-end-------------------//



app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})





import { fetch, fetchFullLengthAudiobooksWebsite } from "./data.js";
import https from 'https';
import fs from 'fs';

function download(url, folder_path) {
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(folder_path);
  
      const request = https.get(url, (response) => {
        response.pipe(file);
  
        file.on('finish', () => {
          file.close(() => {
            console.log('File downloaded successfully.');
            resolve(); // Resolve the promise when the file download is complete
          });
        });
      });
  
      request.on('error', (err) => {
        fs.unlink(folder_path, () => {}); // Delete the file if download fails
        console.error('File download failed:', err.message);
        reject(err); // Reject the promise if an error occurs during download
      });
    });
  }

export function serve(url) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(url);
        const data = JSON.parse(res);
  
        console.log(data.number);
  
        for (let i = 1; i <= parseInt(data.number); i++) {
          const num = i > 9 ? `${i}` : `0${i}`;
          const parsedUrl = data.audio_book_url.slice(0, -6) + num + `.mp3`;
          console.log(parsedUrl);
          await download(parsedUrl, `./book/${i}.mp3`);
        }
  
        resolve(); // Resolve the promise when the operation is complete
      } catch (error) {
        reject(error); // Reject the promise if an error occurs
      }
    });
  }
export function serveFullLengthAudioBooks(url) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetchFullLengthAudiobooksWebsite(url);
        const data = JSON.parse(res);
  
        console.log(data.number);
  
        for (let i = 1; i <= parseInt(data.number); i++) {
          const num = i > 9 ? `${i}` : `0${i}`;
          const parsedUrl = data.audio_book_url.slice(0, -6) + num + `.mp3`;
          console.log(parsedUrl);
          await download(parsedUrl, `./book/${i}.mp3`);
        }
  
        resolve(); // Resolve the promise when the operation is complete
      } catch (error) {
        reject(error); // Reject the promise if an error occurs
      }
    });
  }
  

// await serveFullLengthAudioBooks("https://fulllengthaudiobook.com/robert-bly-iron-john-audiobook/")
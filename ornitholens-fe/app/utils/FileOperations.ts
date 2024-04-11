import fs from "fs";

export function getFilesArray(dir: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

export function getNumberOfFolders(dir: string): Promise<number> {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files.length);
      }
    });
  });
}

export async function chooseRandomFolder(dir: string): Promise<string> {
  const numberOfFolders = await getNumberOfFolders(dir);
  const randomNumber = Math.trunc(Math.random() * numberOfFolders);
  console.log(`Random number: ${randomNumber}`);
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(`${dir}\\${files[randomNumber]}`);
      }
    });
  });
}

import fs from 'fs'

export default function getFiles (dir, files_=[]){
  const files = fs.readdirSync(dir);
  for (let i in files) {
    const name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()){
      getFiles(name, files_);
    } else {
      files_.push({name: name, data: JSON.parse(fs.readFileSync(name, 'utf8'))});
    }
  }
  return files_;
}
var fs = require('fs');
// escreve algo em um arquivo
var write_file = (file_name, content) =>
{
    return new Promise((res, rej) =>
    {
        fs.appendFile(file_name, content, function (err) 
        {
            if (err) rej(err);
            res(true);
        });
    });
}
// cria uma pasta
var create_folder = (folder_name) =>
{
    return new Promise((res, rej) =>
    {
        fs.mkdir(folder_name, { recursive: true }, (err) => {
            if (err) rej(err);
            res(true);
        });
    });
}
// lê arquivo
var read_file = (file_name) =>
{
    return new Promise((res, rej) =>
    {
        fs.readFile(file_name, (err, data) => {
            if (err) rej(err);
            res(JSON.parse(data.toString()));
        });
    });
}
// lê arquivo
var list_files = (folder_name) =>
{
    return new Promise((res, rej) =>
    {
        fs.readdir(folder_name, function (err, files)
        {
            if (err) rej(err);
            res(files);
        });
    });
}
module.exports = {
    write_file: write_file,
    create_folder: create_folder,
    list_files: list_files,
    read_file: read_file
};
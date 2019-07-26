var fm = require('./file_manager');
var get_all = () =>
{
    return new Promise(async (res, rej) =>
    {
        try 
        {
            var todos = [];
            var files = await fm.list_files("./json");
            for(file of files) 
            {
                var content = await fm.read_file("./json/" + file);
                todos.push(content);
            };
            res(todos);
        }
        catch (error)
        {
            rej(error);    
        }
    });
}
module.exports = {
    get_all: get_all
};
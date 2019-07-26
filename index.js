var all = require('./get_json');
var create_module = require('./create_module');
var main = async () =>
{
    try 
    {
        var models = await all.get_all();
        for (model of models)
        {
            await create_module.cria_modulo(model);
        }
    }
    catch (error)
    {
        console.log(error);
    }
}
main();
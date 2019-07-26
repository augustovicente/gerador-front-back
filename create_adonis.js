var fm = require('./file_manager');
var gera_method = (fields, tabela, model, stt, abrev) =>
{
    return new Promise(async (res, rej) =>
    {
        try 
        {
            var status = (!!stt) ? `async status({ request })
            {
                var dados = request.only(["id", "status"]);
                await ${model}.query().where('id', dados.id).update({ ${abrev}_statu: dados.status });
                return { 'success': true };
            }` : "";
            var campos_create = "";
            fields.forEach(field => {
                campos_create += `${abrev}_${field}: new_data.${field},\n`;
            });
            var campos_update = "";
            fields.forEach(field => {
                campos_update += `${abrev}.${abrev}_${field} = new_data.${field};\n`;
            });
            var methods = `
            async list({ request })
            {
                var page = request.only(['page']).page;
                return await ${model}.query().paginate(page);
            }
            async create({ request })
            {
                var new_data = request.only(${JSON.stringify(fields)});
                var _new = await ${model}.create({
                    ${campos_create}
                });
                return { success: _new };
            }
            async edit({ params, request })
            {
                var new_data = request.only(${JSON.stringify(fields)});
                var ${abrev} = await ${model}.find(params.id);
                ${campos_update}
                ${abrev}.save();
                return { 'success': true };
            }
            ${status}
            async delete({ params })
            {
                await ${model}.query().delete().where('id', params.id);
                return { 'success': true };
            }
            async get_edit({ params })
            {
                return await ${model}.query().where({id: params.id}).fetch();
            }`;
            await fm.write_file(`./modules/${tabela}/methods_adonis.js`, methods);
            res(true);
        }
        catch (error)
        {
            rej(error);    
        }
    });
}
var gera_route = (rota, tabela, model, stt) =>
{
    return new Promise(async (res, rej) =>
    {
        try 
        {
            var status = (!!stt) ? `Route.post('/${rota}/status', '${model}Controller.status').middleware('auth');` : "";
            var routes = `
            // ${tabela.toUpperCase()} ROUTES
            // -- GET
            Route.get('/${rota}', '${model}Controller.list').middleware('auth');
            Route.get('/${rota}/:id', '${model}Controller.get_edit').middleware('auth');
            // -- POST
            Route.post('/${rota}/create', '${model}Controller.create').middleware('auth');
            Route.post('/${rota}/edit/:id', '${model}Controller.edit').middleware('auth');
            ${status}
            //  -- DELETE
            Route.delete('/${rota}/:id', '${model}Controller.delete').middleware('auth');`;
            await fm.write_file(`./modules/${tabela}/routes_adonis.js`, routes);
            res(true);
        }
        catch (error)
        {
            rej(error);    
        }
    });
}
module.exports = {
    gera_route: gera_route,
    gera_method: gera_method
};
var fm = require('./file_manager');
var can = require('./create_angular');
var cad = require('./create_adonis');
var ce = require('./create_external');
var cria_modulo = (json) =>
{
    return new Promise(async (res, rej) =>
    {
        try 
        {
            var confirm = !!(await fm.create_folder(`./modules/${json.table}`));
            confirm = confirm && (await fm.create_folder(`./modules/${json.table}/${json.rota}`));
            confirm = confirm && (await fm.create_folder(`./modules/${json.table}/${json.rota}/list`));
            confirm = confirm && (await fm.create_folder(`./modules/${json.table}/${json.rota}/edit`));
            confirm = confirm && (await fm.create_folder(`./modules/${json.table}/${json.rota}/new`));
            if (confirm)
            {
                cad.gera_method(json.fields, json.table, json.model, json.has_status, json.abreviacao);
                cad.gera_route(json.rota, json.table, json.model, json.has_status);
                ce.gera_route_cad(json.rota, json.table, json.model);
                ce.gera_side_bar(json.tp_menu, json.rota, json.table, json.icone);
                can.cria_components(json.fields, json.fields_filter, json.fields_display, json.rota, json.table, json.has_status, json.abreviacao, json.model, json.tp_menu);
                can.cria_files(json.tp_menu, json.rota, json.table, json.model);
                res(true);
            }
            else res(false);
        }
        catch (error)
        {
            rej(error);    
        }
    });
}
module.exports = {
    cria_modulo: cria_modulo
};
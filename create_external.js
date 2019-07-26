var fm = require('./file_manager');
var gera_side_bar = (tp_menu, rota, tabela, icone) =>
{
    return new Promise(async (res, rej) =>
    {
        try 
        {
            var title = tabela[0].toUpperCase()+tabela.slice(1); 
            var sidebar = `
            <li>
                <a routerLink="/${tp_menu}/${rota}/list" (click)="addExpandClass('component')" [routerLinkActive]="['router-link-active']">
                    <i class="${icone}"></i>&nbsp;
                    <span class="hide-menu">${title}</span>
                </a>
            </li>`;
            await fm.write_file(`./modules/${tabela}/sidebar.html`, sidebar);
            res(true);
        }
        catch (error)
        {
            rej(error);    
        }
    });
}
var gera_route_cad = (rota, tabela, model) =>
{
    return new Promise(async (res, rej) =>
    {
        try 
        {
            var sidebar = `
            {
                path: '${rota}',
                loadChildren: './${rota}/${rota}.module#${model}Module'
            }`;
            await fm.write_file(`./modules/${tabela}/route.json`, sidebar);
            res(true);
        }
        catch (error)
        {
            rej(error);    
        }
    });
}
module.exports = {
    gera_route_cad: gera_route_cad,
    gera_side_bar: gera_side_bar
};
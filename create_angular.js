var fm = require('./file_manager');
var cria_components = (fields, fields_filter, fields_display, rota, tabela, stt, abrev, model, tp_menu) =>
{
    return new Promise(async (res, rej) =>
    {
        try 
        {
            await component_new(fields, rota, tabela, model);      
            await component_list(fields, fields_filter, fields_display, rota, tabela, stt, abrev, tp_menu, model);   
            await component_edit(fields, rota, tabela, abrev, model);
            res(true);
        }
        catch (error)
        {
            rej(error);    
        }
    });
}
var cria_files = (tp_menu, rota, tabela, model) =>
{
    return new Promise(async (res, rej) =>
    {
        try 
        {
            await module_ts(model, rota, tabela);
            await routing(tp_menu, rota, tabela, model);
            res(true);
        }
        catch (error)
        {
            rej(error);    
        }
    });
}
var module_ts = (model, rota, tabela) =>
{
    return new Promise(async (res, rej) =>
    {
        try 
        {
            var ts = (model) =>
            {
                var ts = `import { NgModule } from '@angular/core';
                import { RouterModule } from '@angular/router';
                import { CommonModule } from '@angular/common';
                import { FormsModule, ReactiveFormsModule } from '@angular/forms';
                import { JsonpModule } from '@angular/http';
                import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
                import { MatTableModule, MatButtonToggleModule, MatFormFieldModule, MatInputModule } from '@angular/material';
                import { ${model}Routes } from './${rota}.routing';
                import { List${model}Component } from './list/${rota}.component';
                import { New${model}Component } from './new/new-${rota}.component';
                import { Edit${model}Component } from './edit/edit-${rota}.component';
                @NgModule({
                    imports: [
                        CommonModule,
                        RouterModule.forChild(${model}Routes),
                        FormsModule,
                        ReactiveFormsModule,
                        JsonpModule,
                        MatFormFieldModule,
                        MatInputModule,
                        MatTableModule,
                        MatButtonToggleModule,
                        NgbModule,
                    ],
                    declarations: [
                        List${model}Component,
                        New${model}Component,
                        Edit${model}Component
                    ],
                    entryComponents:[]
                })
                export class ${model}Module { }`;
                return ts;
            }
            var content_ts = ts(model);
            await fm.write_file(`./modules/${tabela}/${rota}/${rota}.module.ts`, content_ts);
            res(true);
        }
        catch (error)
        {
            rej(error);    
        }
    });
}
var routing = (tp_menu, rota, tabela, model) =>
{
    return new Promise(async (res, rej) =>
    {
        try 
        {
            var ts = (tp_menu, model, rota) =>
            {
                var ts = `import { Routes } from '@angular/router';
                import { List${model}Component } from './list/${rota}.component';
                import { New${model}Component } from './new/new-${rota}.component';
                import { Edit${model}Component } from './edit/edit-${rota}.component';
                export const ${model}Routes: Routes = [
                    {
                        path: 'list',
                        component: List${model}Component,
                        data: {
                            title: 'Cadastro de ${model}s'
                        }
                    },
                    {
                        path: 'new',
                        component: New${model}Component,
                        data: {
                            title: 'Novo(a) ${model}',
                            back: '${tp_menu}/${rota}/list'
                        }
                    },
                    {
                        path: 'edit/:id',
                        component: Edit${model}Component,
                        data: {
                            title: 'Editar ${model}',
                            back: '${tp_menu}/${rota}/list'
                        }
                    }
                ];`;
                return ts;
            }
            var content_ts = ts(tp_menu, model, rota);
            await fm.write_file(`./modules/${tabela}/${rota}/${rota}.routing.ts`, content_ts);
            res(true);
        }
        catch (error)
        {
            rej(error);    
        }
    });
}
var component_new = (fields, rota, tabela, model) =>
{
    return new Promise(async (res, rej) =>
    {
        try 
        {
            var html = (fields) =>
            {
                var campos = "";
                fields.forEach(field => 
                {
                    var title = field[0].toUpperCase()+field.slice(1); 
                    campos += ` <div class="col-md-6 col-xs-12 p-3">
                        <label for="${field}">${title}</label>
                        <input id="${field}" type="text" [(ngModel)]="${field}" class="form-control" name="${field}" required>
                    </div>\n`;
                });
                var html = `<div class="row">
                    <div class="col-12">
                        <form #newGruposForm="ngForm" class="row" (ngSubmit)="salva()">
                            ${campos}
                            <div class="col-12 p-2">
                                <button type="submit" class="btn btn-success float-right">
                                    <i class="fa fa-check"></i>
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>`;
                return html;
            }
            var content_html = html(fields);
            var ts = (fields, rota, model) =>
            {
                var atributos = "";
                var verify = "";
                var post = "";
                fields.forEach((field, i) => 
                {
                    atributos += `public ${field} = "";\n`;
                    verify += (i == 0)?`this.${field}`:` && this.${field}`;
                    post += `${field}: this.${field},\n`;
                });
                var ts = `import { Component } from '@angular/core';
                import 'rxjs/add/operator/debounceTime';
                import { ToastrService } from 'ngx-toastr';
                import { Servidor } from '../../../shared/providers/server';
                import { Router } from '@angular/router';
                @Component({ templateUrl: 'new-${rota}.component.html' })
                export class New${model}Component
                {
                    ${atributos}
                    constructor
                    (
                        private router: Router,
                        private servidor: Servidor,
                        private toastr: ToastrService,
                        private activatedRoute: ActivatedRoute
                    )
                    {}
                    salva()
                    {
                        if (${verify})
                        {
                            this.servidor.envia_post({
                                ${post}
                            }, '/${rota}/create').subscribe(data =>
                            {
                                this.toastr.info("Cadastrado com sucesso!");
                                this.router.navigate(['../list'], {relativeTo: this.activatedRoute});
                            }, err =>
                            {
                                this.toastr.warning("Erro: " + err.message);
                            });
                        }
                        else
                        {
                            this.toastr.warning("Preencha os campos!");					
                        }
                    }
                }`;
                return ts;
            }
            var content_ts = ts(fields, rota, model);
            await fm.write_file(`./modules/${tabela}/${rota}/new/new-${rota}.component.html`, content_html);
            await fm.write_file(`./modules/${tabela}/${rota}/new/new-${rota}.component.ts`, content_ts);
            res(true);
        }
        catch (error)
        {
            rej(error);    
        }
    });
}
var component_list = (fields, fields_filter, fields_display, rota, tabela, stt, abrev, tp_menu, model) =>
{
    return new Promise(async (res, rej) =>
    {
        try 
        {
            fields_display.push("status","edita");
            var html = (fields, rota, tabela, stt, abrev, tp_menu) =>
            {
                var campos = "";
                fields.forEach(field => 
                {
                    var title = field[0].toUpperCase()+field.slice(1); 
                    campos += `<ng-container matColumnDef="${field}">
                        <mat-header-cell *matHeaderCellDef> ${title} </mat-header-cell>>
                        <mat-cell *matCellDef="let ${tabela}"> {{${tabela}.${abrev}_${field}}} </mat-cell>
                    </ng-container>\n`;
                });
                var status = (!!stt)?`<ng-container matColumnDef="status">
                    <mat-header-cell *matHeaderCellDef> Status </mat-header-cell>>
                    <mat-cell *matCellDef="let ${tabela}">   
                        <mat-button-toggle-group #group="matButtonToggleGroup" appearance="legacy" (change)="altera_status(${tabela}.id, group.value)" name="fontStyle" aria-label="Font Style">
                            <mat-button-toggle [class]="(group.value == 1)?'btn-success':'btn-outline-success'" [checked]="${tabela}.${abrev}_statu == 1" value="1">Ativo</mat-button-toggle>
                            <mat-button-toggle [class]="(group.value == 0)?'btn-warning':'btn-outline-warning'" [checked]="${tabela}.${abrev}_statu == 0" value="0">Inativo</mat-button-toggle>
                        </mat-button-toggle-group> 
                    </mat-cell>
                </ng-container>`:"";
                var html = `
                    <div class="row">
                    <div class="col-12 p-3">
                        <button routerLink="../new" type="button" class="btn btn-success float-right">
                            <i class="fa fa-plus"></i>
                            Novo
                        </button>
                    </div>
                    <div class="col-12 mat-container">
                        <div style="margin-bottom: 10px; background-color: white; width: fit-content; border-radius: 10px; padding-right: 10px; padding-left: 10px;">
                            <input type="text" style="border:none; border-radius: 10px;" [(ngModel)]="valor" (change)="applyFilter(valor)">
                            <i class="fa fa-search" (click)="applyFilter(valor)"></i>
                        </div>
                        <mat-table [dataSource]="dataSource">
                            ${campos}
                            ${status}
                            <ng-container matColumnDef="edita">
                                <mat-header-cell *matHeaderCellDef></mat-header-cell>>
                                <mat-cell *matCellDef="let ${tabela}"> 
                                    <button type="button" class="btn btn-outline-info m-r-5" [routerLink]="['/${tp_menu}/${rota}/edit/', ${tabela}.id]">
                                        Editar
                                    </button>
                                    <button type="button" class="btn btn-outline-danger m-l-5" (click)="exclui(${tabela}.id)">
                                        Excluir
                                    </button>
                                </mat-cell>
                            </ng-container>
                            <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
                            <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
                        </mat-table>
                        <ngb-pagination class="d-flex justify-content-start" [collectionSize]="pages" [(page)]="page" [pageSize]="pageSize"
                        (pageChange)="loadPage()" aria-label="Default pagination"></ngb-pagination>
                    </div>
                </div>`;
                return html;
            }
            var content_html = html(fields, rota, tabela, stt, abrev, tp_menu);
            var ts = (fields_filter, fields_display, rota, stt, model) =>
            {
                var status = (!!stt)?`altera_status(id, status)
                {
                    this.servidor.envia_post({id: id, status: status}, '/${rota}/status').subscribe(data =>{});
                }`:"";
                var ts = `import { Component } from '@angular/core';
                import 'rxjs/add/operator/debounceTime';
                import { Servidor } from '../../../shared/providers/server';
                import { MatTableDataSource } from '@angular/material';
                @Component({
                    templateUrl: '${rota}.component.html'
                })
                export class List${model}Component
                {
                    displayedColumns: string[] = ${JSON.stringify(fields_display)};
                    public dataSource = new MatTableDataSource();
                    public page = 1;
                    public pages = 1;
                    public pageSize = 20;
                    novo: string;
                    constructor
                    (
                        private servidor: Servidor	
                    )
                    {
                        this.loadPage();
                    }
                    loadPage()
                    {
                        this.servidor.envia_get('/${rota}?page=' + this.page).subscribe((data: any) =>
                        {
                            this.dataSource.data = data.data;
                            this.page = data.page;
                            this.pageSize = data.perPage;
                            this.pages = data.total;
                        });
                    }
                    ${status}
                    exclui(id)
                    {
                        var agree = window.confirm("Realmente deseja excluir?");
                        if (agree)
                        {
                            this.servidor.envia_delete('/${rota}/' + id).subscribe(data =>
                            {
                                this.loadPage();
                            });		
                        }
                    }
                    applyFilter(valor)
                    {
                        this.servidor.envia_post(
                        {
                            table: "${rota}",
                            fields: ${JSON.stringify(fields_filter)},
                            value: valor,
                            page: this.page,
                            condition: ""
                        }, '/filter').subscribe((data: any) =>
                        {
                            this.dataSource.data = data.data;
                            this.page = data.page;
                            this.pageSize = data.perPage;
                            this.pages = data.total;
                        });
                    }
                }`;
                return ts;
            }
            var content_ts = ts(fields_filter, fields_display, rota, stt, model);
            await fm.write_file(`./modules/${tabela}/${rota}/list/${rota}.component.html`, content_html);
            await fm.write_file(`./modules/${tabela}/${rota}/list/${rota}.component.ts`, content_ts);
            res(true);
        }
        catch (error)
        {
            rej(error);    
        }
    });
}
var component_edit = (fields, rota, tabela, abrev, model) =>
{
    return new Promise(async (res, rej) =>
    {
        try 
        {
            var html = (fields) =>
            {
                var campos = "";
                fields.forEach(field => 
                {
                    var title = field[0].toUpperCase()+field.slice(1); 
                    campos += ` <div class="col-md-6 col-xs-12 p-3">
                        <label for="${field}">${title}</label>
                        <input id="${field}" type="text" [(ngModel)]="${field}" class="form-control" name="${field}" required>
                    </div>\n`;
                });
                var html = `<div class="row">
                    <div class="col-12">
                        <form #newGruposForm="ngForm" class="row" (ngSubmit)="salva()">
                            ${campos}
                            <div class="col-12 p-2">
                                <button type="submit" class="btn btn-success float-right">
                                    <i class="fa fa-check"></i>
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>`;
                return html;
            }
            var content_html = html(fields);
            var ts = (fields, rota, abrev, model) =>
            {
                var atributos = "";
                var verify = "";
                var post = "";
                var init = "";
                fields.forEach((field, i) => 
                {
                    atributos += `public ${field} = "";\n`;
                    verify += (i == 0)?`this.${field} != this.backup.${field}`:` || this.${field} != this.backup.${field}`;
                    post += `${field}: this.${field},\n`;
                    init += `this.${field} = dados.${abrev}_${field};\n`;
                });
                var ts = `import { Component } from '@angular/core';
                import 'rxjs/add/operator/debounceTime';
                import { ToastrService } from 'ngx-toastr';
                import { Servidor } from '../../../shared/providers/server';
                import { Router, ActivatedRoute } from '@angular/router';
                @Component({ templateUrl: 'edit-${rota}.component.html' })
                export class Edit${model}Component
                {
                    public id: number;
                    public backup: any;
                    ${atributos}
                    constructor
                    (
                        private router: Router,
                        private servidor: Servidor,
                        private toastr: ToastrService,
                        private route: ActivatedRoute
                    ) { }
                    salva()
                    {
                        if (${verify})
                        {
                            this.servidor.envia_post({
                               ${post}
                            }, '/${rota}/edit/' + this.id).subscribe(data =>
                            {
                                this.toastr.info("Alterado com sucesso!");
                                this.router.navigate(['../list'], {relativeTo: this.activatedRoute});
                            }, err =>
                            {
                                this.toastr.warning("Erro: " + err.message);
                            });
                        }
                        else
                        {
                            this.toastr.warning("Os campos não foram alterados!");
                        }
                    }
                    ngOnInit()
                    {
                        this.route.paramMap.subscribe((params: any) =>
                        {
                            this.id = params.params.id;
                            this.servidor.envia_get('/${rota}/' + this.id).subscribe(data =>
                            {
                                var dados: any = data[0];
                                this.backup = JSON.parse(JSON.stringify(dados));
                                ${init}
                            });
                        });
                    }
                }`;
                return ts;
            }
            var content_ts = ts(fields, rota, abrev, model);
            await fm.write_file(`./modules/${tabela}/${rota}/edit/edit-${rota}.component.html`, content_html);
            await fm.write_file(`./modules/${tabela}/${rota}/edit/edit-${rota}.component.ts`, content_ts);
            res(true);
        }
        catch (error)
        {
            rej(error);    
        }
    });
}
module.exports = {
    cria_files: cria_files,
    cria_components: cria_components 
};
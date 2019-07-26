import { Component } from '@angular/core';
                import 'rxjs/add/operator/debounceTime';
                import { Servidor } from '../../../shared/providers/server';
                import { MatTableDataSource } from '@angular/material';
                @Component({
                    templateUrl: 'usuarios.component.html'
                })
                export class ListUsuarioComponent
                {
                    displayedColumns: string[] = ["nome","email","cpf","status","edita"];
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
                        this.servidor.envia_get('/usuarios?page=' + this.page).subscribe((data: any) =>
                        {
                            this.dataSource.data = data.data;
                            this.page = data.page;
                            this.pageSize = data.perPage;
                            this.pages = data.total;
                        });
                    }
                    altera_status(id, status)
                {
                    this.servidor.envia_post({id: id, status: status}, '/usuarios/status').subscribe(data =>{});
                }
                    exclui(id)
                    {
                        var agree = window.confirm("Realmente deseja excluir?");
                        if (agree)
                        {
                            this.servidor.envia_delete('/usuarios/' + id).subscribe(data =>
                            {
                                this.loadPage();
                            });		
                        }
                    }
                    applyFilter(valor)
                    {
                        this.servidor.envia_post(
                        {
                            table: "usuarios",
                            fields: ["nome","email","cpf"],
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
                }
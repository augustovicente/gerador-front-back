import { Component } from '@angular/core';
                import 'rxjs/add/operator/debounceTime';
                import { ToastrService } from 'ngx-toastr';
                import { Servidor } from '../../../shared/providers/server';
                import { Router, ActivatedRoute } from '@angular/router';
                @Component({ templateUrl: 'edit-usuarios.component.html' })
                export class EditUsuarioComponent
                {
                    public id: number;
                    public backup: any;
                    public nome = "";
public email = "";
public cpf = "";

                    constructor
                    (
                        private router: Router,
                        private servidor: Servidor,
                        private toastr: ToastrService,
                        private route: ActivatedRoute
                    ) { }
                    salva()
                    {
                        if (this.nome != this.backup.nome || this.email != this.backup.email || this.cpf != this.backup.cpf)
                        {
                            this.servidor.envia_post({
                               nome: this.nome,
email: this.email,
cpf: this.cpf,

                            }, '/usuarios/edit/' + this.id).subscribe(data =>
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
                            this.servidor.envia_get('/usuarios/' + this.id).subscribe(data =>
                            {
                                var dados: any = data[0];
                                this.backup = JSON.parse(JSON.stringify(dados));
                                this.nome = dados.usu_nome;
this.email = dados.usu_email;
this.cpf = dados.usu_cpf;

                            });
                        });
                    }
                }
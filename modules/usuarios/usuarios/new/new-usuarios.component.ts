import { Component } from '@angular/core';
                import 'rxjs/add/operator/debounceTime';
                import { ToastrService } from 'ngx-toastr';
                import { Servidor } from '../../../shared/providers/server';
                import { Router } from '@angular/router';
                @Component({ templateUrl: 'new-usuarios.component.html' })
                export class NewUsuarioComponent
                {
                    public nome = "";
public email = "";
public cpf = "";

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
                        if (this.nome && this.email && this.cpf)
                        {
                            this.servidor.envia_post({
                                nome: this.nome,
email: this.email,
cpf: this.cpf,

                            }, '/usuarios/create').subscribe(data =>
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
                }
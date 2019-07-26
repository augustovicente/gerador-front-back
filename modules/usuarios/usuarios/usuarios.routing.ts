import { Routes } from '@angular/router';
                import { ListUsuarioComponent } from './list/usuarios.component';
                import { NewUsuarioComponent } from './new/new-usuarios.component';
                import { EditUsuarioComponent } from './edit/edit-usuarios.component';
                export const UsuarioRoutes: Routes = [
                    {
                        path: 'list',
                        component: ListUsuarioComponent,
                        data: {
                            title: 'Cadastro de Usuarios'
                        }
                    },
                    {
                        path: 'new',
                        component: NewUsuarioComponent,
                        data: {
                            title: 'Novo(a) Usuario',
                            back: 'cadastros/usuarios/list'
                        }
                    },
                    {
                        path: 'edit/:id',
                        component: EditUsuarioComponent,
                        data: {
                            title: 'Editar Usuario',
                            back: 'cadastros/usuarios/list'
                        }
                    }
                ];
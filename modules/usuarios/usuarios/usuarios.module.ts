import { NgModule } from '@angular/core';
                import { RouterModule } from '@angular/router';
                import { CommonModule } from '@angular/common';
                import { FormsModule, ReactiveFormsModule } from '@angular/forms';
                import { JsonpModule } from '@angular/http';
                import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
                import { MatTableModule, MatButtonToggleModule, MatFormFieldModule, MatInputModule } from '@angular/material';
                import { UsuarioRoutes } from './usuarios.routing';
                import { ListUsuarioComponent } from './list/usuarios.component';
                import { NewUsuarioComponent } from './new/new-usuarios.component';
                import { EditUsuarioComponent } from './edit/edit-usuarios.component';
                @NgModule({
                    imports: [
                        CommonModule,
                        RouterModule.forChild(UsuarioRoutes),
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
                        ListUsuarioComponent,
                        NewUsuarioComponent,
                        EditUsuarioComponent
                    ],
                    entryComponents:[]
                })
                export class UsuarioModule { }
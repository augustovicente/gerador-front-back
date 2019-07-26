
            // USUARIOS ROUTES
            // -- GET
            Route.get('/usuarios', 'UsuarioController.list').middleware('auth');
            Route.get('/usuarios/:id', 'UsuarioController.get_edit').middleware('auth');
            // -- POST
            Route.post('/usuarios/create', 'UsuarioController.create').middleware('auth');
            Route.post('/usuarios/edit/:id', 'UsuarioController.edit').middleware('auth');
            Route.post('/usuarios/status', 'UsuarioController.status').middleware('auth');
            //  -- DELETE
            Route.delete('/usuarios/:id', 'UsuarioController.delete').middleware('auth');
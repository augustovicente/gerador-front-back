
            async list({ request })
            {
                var page = request.only(['page']).page;
                return await Usuario.query().paginate(page);
            }
            async create({ request })
            {
                var new_data = request.only(["nome","email","cpf"]);
                var _new = await Usuario.create({
                    usu_nome: new_data.nome,
usu_email: new_data.email,
usu_cpf: new_data.cpf,

                });
                return { success: _new };
            }
            async edit({ params, request })
            {
                var new_data = request.only(["nome","email","cpf"]);
                var usu = await Usuario.find(params.id);
                usu.usu_nome = new_data.nome;
usu.usu_email = new_data.email;
usu.usu_cpf = new_data.cpf;

                usu.save();
                return { 'success': true };
            }
            async status({ request })
            {
                var dados = request.only(["id", "status"]);
                await Usuario.query().where('id', dados.id).update({ usu_statu: dados.status });
                return { 'success': true };
            }
            async delete({ params })
            {
                await Usuario.query().delete().where('id', params.id);
                return { 'success': true };
            }
            async get_edit({ params })
            {
                return await Usuario.query().where({id: params.id}).fetch();
            }
{
    "table": "conf_rankings", // nome da tabela no adonis (com _ )
    "tp_menu": "conf", // tipo do menu: conf/cadastros/registros
    "icone": "fa fa-user", // icone escolhido
    "rota": "conf-rank", // nome da tabela (com - )
    "model": "ConfRank", // nome da tabela (em maiúsculo)
    "has_status": true, // true -> tem status, false -> não tem status
    "fields": [ 
        "label",
        "nome_banco",
        "peso"
    ], // campos da tabela (sem o prefixo)
    "fields_display": [
        "label",
        "nome_banco"
    ], // campos da tabela a serem mostrados na tela de listagem (sem o prefixo)
    "fields_filter": [
        "label",
        "nome_banco",
        "peso"
    ], // campos da tabela a serem filtrados na tela de listagem (sem o prefixo)
    "abreviacao":"conf_rank" // abreviacao
}
/**
 * ticmServices - mapping
 * Copyright(c) 2020 Alejandro Villén
 * MIT Licensed
 */

function ticmServices_print_mappingGetAssets(data) {
    if (data.length >= 1) {
        $(".datatable-basic").DataTable().destroy();
        var fullArray = [];
        var dataArray = [];
        for (var ele in data) {
            var element = data[ele];
            dataArray.push(`<td class="text-center">
                                <div class="list-icons">
                                    <div class="dropdown">
                                        <a href="#" class="list-icons-item" data-toggle="dropdown">
                                            <i class="icon-menu9"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <a href="#" class="dropdown-item"  onClick="ticmServices_getMappingAsset('${element.path}')"><i class="icon-download"></i> Descarregar fitxer</a>
                                        </div>
                                    </div>
                                </div>
                            </td>`);

            dataArray.push(element.title);
            dataArray.push(element.description);
            dataArray.push(element.file);
            dataArray.push(new Date(element.created_at * 1000).toLocaleString());
            dataArray.push(element.statusName);

            fullArray.push(dataArray);
            dataArray = [];
        }
        $(".datatable-basic").dataTable({
            autoWidth: false,
            responsive: true,
            stateSave: true,
            columnDefs: [{
                orderable: true
            }],
            dom: `<"datatable-header"fB><"datatable-scroll"t><"datatable-footer"ipl>`,
            buttons: {
                dom: {
                    button: {
                        className: 'btn btn-primary bg-slate'
                    }
                },
                buttons: [
                    {extend: 'copy'},
                    {extend: 'csv'},
                    {extend: 'excel'},
                    {extend: 'pdf'},
                    {extend: 'print'}
                ]
            },
            language: {
                search: '<span>Filtro:</span> _INPUT_ ',
                lengthMenu: '<span>Show:</span> _MENU_',
                paginate: {
                    'first': 'First',
                    'last': 'Last',
                    'next': '→',
                    'previous': '←'
                }
            },
            data: fullArray
        });
    }
}
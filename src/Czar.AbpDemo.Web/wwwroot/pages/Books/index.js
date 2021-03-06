﻿$(function () {
    var l = abp.localization.getResource('AbpDemo');

    var createModal = new abp.ModalManager(abp.appPath + 'Books/CreateModal');
    var editModal = new abp.ModalManager(abp.appPath + 'Books/EditModal');
    var dataTable = $('#BooksTable').DataTable(abp.libs.datatables.normalizeConfiguration({
        processing: true,
        serverSide: true,
        paging: true,
        searching: false,
        autoWidth: false,
        scrollCollapse: true,
        order: [[1, "asc"]],
        ajax: abp.libs.datatables.createAjax(czar.abpDemo.bookStore.book.getList),
        columnDefs: [
            {
                rowAction: {
                    items:
                        [
                            {
                                text: l('ActionsEdit'),
                                action: function (data) {
                                    editModal.open({ id: data.record.id });
                                }
                            },
                            {
                                text: l('ActionsDelete'),
                                confirmMessage: function (data) {
                                    return l('ActionsDeletionConfirmationMessage', data.record.name);
                                },
                                action: function (data) {
                                    czar.abpDemo.bookStore.book
                                        .delete(data.record.id)
                                        .then(function () {
                                            abp.notify.info(l('ActionsSuccessfullyDeleted'));
                                            dataTable.ajax.reload();
                                        });
                                }
                            }
                        ]
                }
            },
            { data: "name" },
            { data: "type" },
            { data: "publishDate" },
            { data: "price" },
            { data: "creationTime" }
        ]
    }));


    editModal.onResult(function () {
        dataTable.ajax.reload();
    });
    createModal.onResult(function () {
        dataTable.ajax.reload();
    });
    $("#NewBookButton").click(function (e) {
        e.preventDefault();
        createModal.open();
    });
});


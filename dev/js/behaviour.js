// This file name can be changed to something more relevant.
//It is preferred to modularise related javascript files in separate files for readability.

$(document).ready(function () {
    if (window.location.pathname === '/admin/sales') {
        $('#products').change(function () {
            $('#price').val($('#products option:selected').attr('data-price'));
            $('#category-please-select').remove();
            $('#categories').val($('#products option:selected').attr('data-category')).attr('selected','selected');
        });
        // $('#categories').change(function () {
        //     $.getJSON("getProducts.php?category=" + $(this).val(), success = function (data) {
        //         data.forEach(function (product) {
        //             $('option')
        //             .attr({
        //                 value: data.id
        //               })
        //               .data({price: data.price, category: data.category_id})
        //               .text(data.description).insertBefore("#choose");
        //         });
        //     });
        // });
    }
});

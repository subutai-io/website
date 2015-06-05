/**
 * Created by ubuntu on 5/29/15.
 */

$(document).ready(function() {

    function changeTab() {

        var url = document.location.toString();

        if (url.match('#')) {
            $('.myNav a[href=#'+url.split('#')[1]+']').tab('show') ;
        }
    }

    changeTab();

    $(".legal-info li a").click(function(e) {
        e.preventDefault();
        window.location=this.getAttribute('href');
        changeTab();
    });
});
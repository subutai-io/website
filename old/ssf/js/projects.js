$(document).ready(main());

var projects;
var filteredProjects;

var currPage = 1;

var titleMode = true;
var projectsPerPage = [];
projectsPerPage[titleMode] = 40;

var tags = {};

var searcher = new Searcher();


function main() {

    $.getJSON("/projects.json", function(data) {
        titleMode = true; // default mode
        var category = getParameterByName("category");


        if (category === 'cloud') {
            $('#header_name').text("Cloud computing projects");
        }
        if (category === 'security') {
            $('#header_name').text("Cyber security projects");
        }
        if (category === 'bigdata') {
            $('#header_name').text("Big data projects");
        }
        if (category === 'configuration') {
            $('#header_name').text("Software defined everything projects");
        }
        if (category === 'internet-of-things') {
            $('#header_name').text("Internet of things projects");
        }

        projects = data;

        if (category.length > 0) {
            filteredProjects = [];
            projects.forEach(function(e) {
                e.categories.forEach(function(t) {
                    if (t === category)
                        filteredProjects.push(e);

                });
            });
        } else
            filteredProjects = projects;

        projects.forEach(function(e) {
            e.categories.forEach(function(t) {
                tags[t] = t in tags ? tags[t]++ : 1;
            });
        });

        for (var e in tags) {
            $('#cats').append("<option>" + e + "</option>");
        }

        $('#cats').chosen();

        $("#cats").val(category).trigger("chosen:updated");

        build();
    });
}

$('#mode').click(function(e) {
    if (!titleMode) {
        $('#mode').text('Table View');
    } else {
        $('#mode').text('Tiled View');
    }

    titleMode = !titleMode;

    build();
});

$("#search-input").keyup(function(event) {
    filterProjects();
});

$("#cats").change(function(event) {
    filterProjects();
});

function filterProjects() {
    var filteredProjectsTmp = [];

    var criteria = $('#search-input').val();
    if (criteria) {
        filteredProjectsTmp = searcher.search(projects, criteria);
    } else {
        filteredProjectsTmp = projects;
    }

    var selectedTags = $("#cats").chosen().val();


    if (selectedTags === null) {
        filteredProjects = filteredProjectsTmp;
        build();
        return;
    }

    filteredProjects = [];


    filteredProjectsTmp.forEach(function(e) {
        var catMatched = false;

        for (var i = 0; i < selectedTags.length; i++) {
            e.categories.forEach(function(t) {

                if (t === selectedTags[i])
                    catMatched = true;

            });


            if (!catMatched)
                break;

            if (i != selectedTags.length - 1)
                catMatched = false;
        }

        if (catMatched) filteredProjects.push(e);

    });

    build();
}

function build(page) {
    currPage = page || 1;

    $('#content').children().remove();

    var projectsToShow = [];

    for (var i = (currPage - 1) * projectsPerPage[titleMode]; i < filteredProjects.length && i < currPage * projectsPerPage[titleMode]; i++) {

        filteredProjects[i].tags = "";

        for (var j = 0; j < filteredProjects[i].categories.length; j++) {
            filteredProjects[i].tags += filteredProjects[i].categories[j] + " ";
        }

        projectsToShow.push(filteredProjects[i]);
    }
    console.log(projectsToShow);
    buildElement("/partials/tiled.html", projectsToShow, "#content");
    $('#content .col-md-6:odd').after('<hr/>');

    pagination();
}

function pagination() {
    maxPages = Math.ceil(filteredProjects.length / projectsPerPage[titleMode]);

    var pages = [];
    for (var i = 1; i <= maxPages; i++) {
        pages.push(i);
    }

    buildElement("/partials/pagination.html", pages, "#pagination");

    $("#pagination a:contains('" + currPage + "')").closest("li").addClass("disabled");
    if (currPage === 1)
        $("#pagination li a .fa-chevron-left").closest("li").addClass("disabled");

    if (currPage === maxPages)
        $("#pagination li a .fa-chevron-right").closest("li").addClass("disabled");

    $("#pagination li a .fa-chevron-left").closest("a").attr("onclick", "build(" + (currPage - 1) + ")");
    $("#pagination li a .fa-chevron-right").closest("a").attr("onclick", "build(" + (currPage + 1) + ")");
}

function buildElement(tmpl, elements, insertion) {
    var result = "";

    $.ajax({
        url: tmpl,
        success: function(tpl) {

            var loop = tpl.replace(/(\r\n|\n|\r|\t)/gm, "").replace();

            var match = new RegExp("<loop>(.*?)</loop>").exec(loop);


            if (Object.prototype.toString.call(elements) === "[object Array]") {
                loop = match[1];

                for (var i = 0; i < elements.length; i++) {
                    result += buildElementReg(loop, elements[i]);
                }
            } else {
                result = buildElementReg(loop, elements);
            }

            $(insertion).html(tpl.replace(/(\r\n|\n|\r|\t)/gm, "").replace(new RegExp("<loop>(.*?)</loop>"), result));
        },

        async: false
    });
}

function buildElementReg(tpl, elements) {
    if (Object.prototype.toString.call(elements) === "[object Object]") {
        for (var e in elements) {
            tpl = tpl.replace(new RegExp("{{ " + e + " }}", "g"), elements[e]);
        }

        return tpl;
    } else {
        return tpl.replace(new RegExp("{{ val }}", "g"), elements);
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function FuzzySearchStrategy() {
    function createFuzzyRegExpFromString(string) {
        return new RegExp(string.split('').join('.*?'), 'gi');
    }

    var self = this;
    self.matches = function(string, crit) {
        if ('string' != typeof string) {
            return !1;
        } else {
            string = string.trim();
            return !!string.match(createFuzzyRegExpFromString(crit));
        }
    };
}

function LiteralSearchStrategy() {
    function doMatch(string, crit) {
        return string.toLowerCase().indexOf(crit.toLowerCase()) >= 0;
    }

    var self = this;
    self.matches = function(string, crit) {
        if ('string' != typeof string) {
            return !1;
        } else {
            string = string.trim();
            return doMatch(string, crit);
        }
    };
}

function Searcher() {
    function findMatches(store, crit, strategy) {
        for (var data = store, i = 0; i < data.length && matches.length < limit; i++)
            findMatchesInObject(data[i], crit, strategy);
        return matches;
    }

    function findMatchesInObject(obj, crit, strategy) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key) && strategy.matches(obj[key], crit)) {
                matches.push(obj);
                break;
            }
        }
    }

    function getSearchStrategy() {
        return fuzzy ? fuzzySearchStrategy : literalSearchStrategy;
    }

    var self = this,
        matches = [],
        fuzzy = !1,
        limit = 20,
        fuzzySearchStrategy = new FuzzySearchStrategy(),
        literalSearchStrategy = new LiteralSearchStrategy();

    self.setFuzzy = function(_fuzzy) {
        fuzzy = !!_fuzzy;
    };
    self.setLimit = function(_limit) {
        limit = parseInt(_limit, 20) || limit;
    };
    self.search = function(data, crit) {
        if (crit) {
            matches.length = 0;
            return findMatches(data, crit, getSearchStrategy());
        } else {
            return [];
        }
    };
}

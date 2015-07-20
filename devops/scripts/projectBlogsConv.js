var blogJSON = JSON.parse(process.argv[2])
var blogs = [];
var blog = {};
if ( blogJSON.results ){
    for (var i = 0; i < blogJSON.results.length; i++){
        var blog = {};
        blog.title = blogJSON.results[i].title;
        blog.url = "https://confluence.subutai.io" + blogJSON.results[i]._links.webui;
        blogs.push(blog);
    }
    blog.blogs = blogs;
    console.log( JSON.stringify( blog ) );
}
else {
    blog.blogs = [];
    console.log( JSON.stringify( blog ) );
}
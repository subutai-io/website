# Subutai Social Foundation Website

This project contains the SSF Website. It uses Jekyll to generate a static
site from markdown files. You can read more about how to create content for
the website from the [SSF Website Project](https://confluence.subutai.io/x/F4AWAQ) documentation space in Confluence.

## Running the Site

Clone this project to your local machine and make sure you have a hypervisor
and vagrant installed. If you don't have one of the non-free hypervisors you can
install VirtualBox which is free. Once you have these prerequisites installed
you can fire up the ['subutai/jekyll-site'](https://atlas.hashicorp.com/subutai/boxes/jekyll-site) vagrant box associated with this project by issueing the
following command within the directory you cloned this project into:

    vagrant up

VirtualBox is the default provider for Vagrant. If you would like to use vmware
or parallels on Mac OS X you can issue one of the following respective commands:

    vagrant up --provider vmware_fusion
    vagrant up --provider vmware_desktop
    vagrant up --provider virtualbox
    vagrant up --provider parallels


Once vagrant fires up the box, you can ssh into it with *vagrant ssh*, then you must
configure aws credentials by the following command and set access, secret keys and region:

    aws configure

After that you will also require to clone repository with descriptors inside this folder
Please clone the repo into project-descriptors folder, as the script to build website content
will search for this folder. Then you have to run

    site-build.sh

to build the website's content. After that you can feel free to build jekyll website:

    jekyll s --source=ssf --host=0.0.0.0

the following link will become available in your browser

    [http://localhost:4000](http://localhost:4000)

While you make changes to the content with markdown files for the website
the vagrant vm will update the site automatically.


// old
Once vagrant fires up the box, you can ssh into it with *vagrant ssh* and
start up the website with the start_jekyll.sh script in the home directory
of the vagrant user. Startup requires full generation (might take 30 seconds)
but after jekyll starts it will keep updating changes you make to your
content in the project. You can make changes outside of the vagrant vm and
just hit the URL for the site to see the effects of your work:

[http://localhost:4000](http://localhost:4000)

While you make changes to the content with markdown files for the website
the vagrant vm will update the site automatically.


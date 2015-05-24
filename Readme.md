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

Once vagrant fires up the box, you can ssh into it with *vagrant ssh* and
start up the website with the start_jekyll.sh script in the home directory
of the vagrant user. Startup requires full generation (might take 30 seconds)
but after jekyll starts it will keep updating changes you make to your 
content in the project. You can make changes outside of the vagrant vm and 
just hit the URL for the site to see the effects of your work:

[http://localhost:4000](http://localhost:4000)

While you make changes to the content with markdown files for the website 
the vagrant vm will update the site automatically.


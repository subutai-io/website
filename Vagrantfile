# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "istus/jekyll-site"
  config.vm.box_version = "1.0"
  config.vm.hostname = "site-dev"

  # Map localhost:4000 to port 4000 inside the VM
  config.vm.network :forwarded_port, guest: 4000, host: 4000

  # Create a shared folder between guest and host
  config.vm.synced_folder ".", "/vagrant", create: true

  config.ssh.forward_agent = true

  # VirtualBox-specific configuration
  config.vm.provider "virtualbox" do |v|
    v.customize ["modifyvm", :id, "--memory", 2048]
    v.customize ["modifyvm", :id, "--cpus", 2]
    v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    v.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
  end

  # VMWare-specific configuration
  config.vm.provider "vmware_fusion" do |v|
    v.vmx["memsize"]="2048"
    v.vmx["numvcpus"]="2"
  end

  # Parallels-specific configuration
  config.vm.provider "parallels" do |v|
    v.optimize_power_consumption = false
    v.memory = 2048
    v.cpus = 2
  end
end

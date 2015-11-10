#!/usr/bin/env bash
#update packages
apt-get -y -qq update

apt-get -y install software-properties-common
#add repository for ruby2
apt-add-repository -y ppa:brightbox/ruby-ng

#get 2.2 from newly added repository
apt-get -y -qq update

#install ruby with build tools so we can use gems
apt-get -y install build-essential
apt-get -y install unzip
apt-get -y install golang
apt-get -y install git
apt-get -y install libcurl4-openssl-dev
apt-get -y install ruby2.2
apt-get -y install ruby2.2-dev
apt-get -y install nodejs-legacy npm

#install requirements (jekyll)
gem update --system
echo "gem: --no-ri --no-rdoc" > ~/.gemrc
gem install bundler
gem install jekyll -v 2.5.3

curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
unzip awscli-bundle.zip
./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws
rm awscli-bundle.zip
rm -rf awscli-bundle
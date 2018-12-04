---
title: Subutai Getting Started
body_classes: get-start
---

<div class="banner" markdown="1">
<div class="container">
<h1>Getting Started</h1>
</div>
</div>

<div class="smallContainer">
    <h2>To get started with Subutai Bazaar or PeerOS:</h2>
    <div class="topicWrap">
        <h6>Register at <a href="#">Subutai Bazaar</a>, our social marketplace for user-administered P2P cloud services</h6>
        <ul>
            <li>Create environments on other users' peers</li>
            <li>Choose the products or applications that you need</li>
        </ul>
    </div>
    <div class="topicWrap">
        <h6>Install the <a href="#">PeerOS</a>, an open source, P2P (peer-to-peer) Cloud and Internet of Things (IoT) software and firmware</h6>
        <ul>
            <li>Set up your computing resources for sharing, rent, or barter</li>
            <li>Connect IoT devices to cloud applications securely</li>
        </ul>
    </div>
</div>

<section class="container">
    <h2><img src="images/logo-bazaar-shadow.png" class="titleIcon">Subutai Bazaar</h2>
    <div class="halfCol">
        <h4>Quick links</h4>
        <ul class="getStart-list">
            <li><a href="#">What is Subutai Bazaar</a></li>
            <li><a href="#">Sign up or log in</a></li>
            <li>For tasks that require authentication (e.g., adding cloud providers), you need to set up PGP keys. You can use the <a href="#">E2E plugin</a> to easily generate and manage these keys. Other software components are available to facilitate administrative tasks on peers and environments.</li>
            <li>View the <a href="#">complete documentation</a></li>
        </ul>
    </div>
    <figure class="halfCol">
        <img style="width: 100%;" src="images/bazaar-panel-03.jpg">
    </figure>
    <h2><img src="images/logo-peer-os-web-shadow.png" class="titleIcon">Subutai PeerOS</h2>
    <!-- <div class="halfCol"> -->
        <h4>Quick links</h4>
        <ul class="getStart-list">
            <li>Learn more about <a href="#">Subutai PeerOS</a></li>
            <li>Install the <a href="#">P2P daemon</a> and <a href="#">Subutai</a> Control Center on your desktop to access your Peers. You may also want to install the <a href="#">E2E plugin</a> that will manage the PGP keys for you</li>
            <li>Choose your preferred way to get the PeerOS up and running:<br><small>Subutai recommends that you use Debian Stretch 9.X to create your Peers</small>
                <ul>
                    <li><a href="#">Quick install</a> (about 5 minutes)<br><small>Requirements: any system that uses Vagrant and 100 GB disk space</small></li>
                    <li><a href="#">Advanced admin install</a> (about 20 minutes)<br><small>Requirements: Debian system (preferably, freshly installed) and 100 GB disk space</small></li>
                </ul>
            </li>    
            <li>Learn the basics:
                <ul>
                    <li><a href="#">How to use the Subutai Console</a></li>
                    <li><a href="#">How to update Subutai components</a></li>
                </ul>
            </li>
            <li>View the <a href="#">complete documentation</a></li>
        </ul>
    <!-- </div> -->
    <figure class="fullImg">
        <img src="images/peer-panel.jpg">
    </figure>
</section>
<section class="container" id="downloadsSection">
    <h2>Downloads</h2>
    <div class="textBlock">
        <p>Optimize your use of the Subutai Bazaar or PeerOS by installing the following companion software:</p>
    </div>
    <h3>E2E plugin</h3>
    <div class="textBlock">
        <p>Remove the hassle of managing PGP keys that are required to ensure secure communications within the Subutai platform.</p>
        <p>The E2E plugin is directly available from the official store of main browsers <a href="#">Chrome</a> and <a href="#">Firefox</a>. For other supported browsers, you may download from here.</p>
    </div>
    <h3>Subutai Control Center</h3>
    <div class="textBlock">
        <p>Access your peers, containers, and environments via SSH or Remote Desktop. Check or update relevant local software and view your GoodWill balance. Equipped with a built-in file transfer system, the Subutai Control Center also enables you to upload and download files from a remote cloud storage in a secure way.</p>
        <p>The Subutai Control Center is available in Windows, Mac, and Linux versions.</p>
    </div>
    <div class="tabsWrap">
        <div class="tab">
            <button class="btn tabLinks" onclick="openSystem(event, 'windows')">Windows</button>
            <button class="btn tabLinks" onclick="openSystem(event, 'mac')">Mac</button>
            <button class="btn tabLinks" onclick="openSystem(event, 'linux')">Linux</button>
        </div>
        <div id="windows" class="tabcontent"><!-- windows -->
            <h4>You can download the MSI package for Windows (64-bit):</h4>
            <a href="#" class="btn">Subutai Control Center x64 7.x</a>
            <div class="topicWrap">
                <p>Check the For Developers box to display and download the developer and master versions.
You may access and test these versions accordingly.</p>
                <button class="btn" onclick="devControlWin()">For Developers</button>
                <div id="linksControl-win">
                    <a class="btn" href="#">Subutai Control Center x64 Dev</a>
                    <a class="btn" href="#">Subutai Control Center x64 Master</a>
                </div>
            </div>
            <h5>Learn more: <a href="#">how to use the Control Center</a></h5>
            <h3>P2P daemon</h3>
            <div class="textBlock">
                <p>Enable your system to join the swarm and access private cloud environments. The P2P daemon is required to access your Peers, containers, and Environments via SSH or Remote Desktop from the Bazaar, Subutai Management Console, or Control Center.</p>
                <p>The P2P daemon is available in <b>Windows</b>, <b>Mac</b>, and <b>Linux</b> versions.</p>
            </div>
            <h4>You can download the package for Mac (64-bit):</h4>
            <a href="#" class="btn">Subutai P2P for Mac OS X ( 64 bit ) 8.x</a>
            <div class="topicWrap">
                <p>Check the For Developers box to display and download the developer and master versions.
You may access and test these versions accordingly.</p>
                <button class="btn" onclick="devDaemonWin()">For Developers</button>
                <div id="linksDaemon-win">
                    <a class="btn" href="#">Subutai Control Center x64 Dev</a>
                    <a class="btn" href="#">Subutai Control Center x64 Master</a>
                </div>
            </div>
        </div> <!-- tabcontent -->
        <div id="mac" class="tabcontent">
            <h4>You can download the package for Mac (64-bit):</h4>
            <a href="#" class="btn">Subutai Control Center x64 7.x</a>
            <div class="topicWrap">
                <p>Check the For Developers box to display and download the developer and master versions.
You may access and test these versions accordingly.</p>
                <button class="btn" onclick="devControlMac()">For Developers</button>
                <div id="linksControl-mac">
                    <a class="btn" href="#">Subutai Control Center x64 Dev</a>
                    <a class="btn" href="#">Subutai Control Center x64 Master</a>
                </div>
            </div>
            <h5>Learn more: <a href="#">how to use the Control Center</a></h5>
            <h3>P2P daemon</h3>
            <div class="textBlock">
                <p>Enable your system to join the swarm and access private cloud environments. The P2P daemon is required to access your Peers, containers, and Environments via SSH or Remote Desktop from the Bazaar, Subutai Management Console, or Control Center.</p>
                <p>The P2P daemon is available in Windows, Mac, and Linux versions.</p>
            </div>
            <h4>You can download the package for Mac (64-bit):</h4>
            <a href="#" class="btn">Subutai P2P for Mac OS X ( 64 bit ) 8.x</a>
            <div class="topicWrap">
                <p>Check the For Developers box to display and download the developer and master versions.
    You may access and test these versions accordingly.</p>
                <button class="btn" onclick="devDaemonMac()">For Developers</button>
                <div id="linksDaemon-mac">
                    <a class="btn" href="#">Subutai Control Center x64 Dev</a>
                    <a class="btn" href="#">Subutai Control Center x64 Master</a>
                </div>
            </div>
        </div> <!-- tabcontent -->
        <div id="linux" class="tabcontent">
            <h4>You can download the DEB package for Linux (64-bit):</h4>
            <a href="#" class="btn">Subutai Control Center x64 7.x</a>
            <div class="topicWrap">
                <p>Check the For <b>Developers</b> box to display and download the developer and master versions.
You may access and test these versions accordingly.</p>
                <button class="btn" onclick="devControlLinux()">For Developers</button>
                <div id="linksControl-linux">
                    <a class="btn" href="#">Subutai Control Center x64 Dev</a>
                    <a class="btn" href="#">Subutai Control Center x64 Master</a>
                </div>
            </div>
            <h5>Install the <b>Subutai Control Center Application</b></h5>
            <p>We only support Debian based systems right now. Use apt install:</p>
            <div class="lineCode-wrap">
                <p>sudo apt install /path/to/subutai-control-center.deb</p>
            </div>
            <h5>Learn more: <a href="#">how to use the Control Center</a></h5>
            <h3>P2P daemon</h3>
            <div class="textBlock">
                <p>Enable your system to join the swarm and access private cloud environments. The P2P daemon is required to access your Peers, containers, and Environments via SSH or Remote Desktop from the Bazaar, Subutai Management Console, or Control Center.</p>
                <p>The P2P daemon is available in Windows, Mac, and Linux versions.</p>
            </div>
            <h4>You can download the DEB package for Linux (64-bit):</h4>
            <a href="#" class="btn">Subutai P2P for Linux ( 64 bit ) 8.x</a>
            <div class="topicWrap">
                <p>Check the For Developers box to display and download the developer and master versions.
You may access and test these versions accordingly.</p>
                <button class="btn" onclick="devDaemonLinux()">For Developers</button>
                <div id="linksDaemon-linux">
                    <a class="btn" href="#">Subutai P2P for Linux Dev</a>
                    <a class="btn" href="#">Subutai P2P for Linux Master</a>
                </div>
            </div>
            <h5>Install the <b>Subutai P2P Daemon</b></h5>
            <p>We only support Debian based systems right now. Use apt install:</p>
            <div class="lineCode-wrap">
                <p>sudo apt install /path/to/subutai-p2p.deb</p>
            </div>
        </div> <!-- tabcontent -->
    </div>
</section>
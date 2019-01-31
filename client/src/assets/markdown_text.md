# j-o-w: first project
## Setting up a flexible, hosted linux server

#### 1) Get some "cloud compute" thing
- sign up for gcp have to use a credit card - free tier can technically be used forever ... so, that's a thing.
- enable billing so that you can create vm instance (there should be a message about never charging without first getting confirmation)

- select a thing; I chose ubuntu 18.04 LTS because of reasons

- in the firewall section of the initial setup, enable http and https traffic

- you can totally use the browser "terminal" to do all the things. You can't paste directly into the "terminal" but it has a nifty option to download/upload files

- but also, nah pls. I'd rather make my own ssh keys and add them to the instance metadata so that I can use my own terminal (because my local OS is ubuntu)
  - (another option/benefit is to use the remote vm as a location linked in your linux file system with ssh/sftp -- but again, you can use the browser "terminal" or whatever)
  - if you ride linux or want to use putty/or Hyperterminal in Windows here's some stuff about setting up the ssh keys (this might be cool becausee then you can just alias your ssh connection task and then remote connection becomes like, really nice) https://cloud.google.com/compute/docs/instances/adding-removing-ssh-keys#locatesshkeys
    - a bit annoying. use keygen locally and then use browser terminal to upload the public key(s) and append them to ~/.ssh/authorized_keys on remote
    - thought: hmm, gcp seems slower than aws... (and certain security measures seem easier in aws also - i.e. simply allowing ssh from only your current IP address)

#### 2) Setup your vm thing 
- sudo update && upgrade
  - install nvm (node version manager for node/npm environment control)
  - pm2 (for organizing/managing your running servers and dbs)
  - nginx (reverse proxy for making all your servers/dbs(but not really) available from ports 80 & 443)
  - install vim (my terminal preference for file editting; might already be installed)
  https://github.com/creationix/nvm
    - after nvm install: source ~/.bashrc (resource terminal), nvm --version (confirm install), nvm install node (install stable node & confirm w/ node --version, npm --version)

#### 3) Basic Node server thing
- npm init -y to initialize tracking of packages/a node project
- npm install express
- vim server.js

***server.js***:

```js
const express = require('express') // include express library
const app = express()

// on a GET request to host:8000/ simply respond with 'hi'
app.get('/', (req, res) => res.send('hi'))

// allow app to listen on port 8000 and console log your server running msg
app.listen(8000, () => console.log('app is listening on port 8000...'))

```

- back on GCP > Compute Engine console, lazily open all ports in a certain range for testing ... will need to refine this later to only allow 80, 443 - but for now let's check that we have access to our server

- you can find the external IP of your vm instance in the External IP column of the VM Instances section - go figure, right?

  - start server with ```node server.js``` in the terminal and test serving this msg to ***external_IP:8000***

- now test w/ html file: create an index.html with some content

  - in ***server.js*** change ```res.send('hi')``` to ```res.sendFile(path.join(__direname, 'index.html'))``` & include the path module with ```const path = require('path') ``` at the top of the file.


#### 4) Setup ***your_domain***

- go somewhere that sells domains and pick a cool one (Godaddy.com anything with the .xyz top-domain for $0.99/first year)
- in the Manage DNS section of Godaddy.com you can set the A Record to the public/external IP
    - might as well set up some subdomains for ze future projects (demo, app, about); do this by setting CNAME values similar to already provided www -> @ (set the ttl to custom 600 sec to see DNS values working sooner, I think)
- if not still running, start server with ```node server.js``` in the terminal and ensure you can now access your index.html at ***your_domain:8000***

#### 5) nginx thing for thinging multiple things

- use nginx to reverse proxy requests to 80 (and later 443)

-  edit (with vim? - will need sudo privilage to edit) the default config file in /etc/nginx/sites-available to proxy ```http://localhost:[app_port]``` (so far we've been using app_port = 8000) -> you only need this right now:

```conf
server {`{`}
        listen 80;
        listen [::]:80;

	location / {`{`}
		proxy_pass http://localhost:8000;
	}
}
```
- run ```sudo service nginx restart``` to apply the changes; a msg will be logged if the restart has any issues because of your .config

- use node to restart your server and check ***your_domain*** without specifying the port
  - is your index.html being served here now!?!

#### 6) pm2 for running and auto-restarting thing

- pm2? (for app & db) (https://www.npmjs.com/package/pm2)

- ```pm2 start server.js --name="a_useful_name_for_managing_app:port_number_app_is_listening_on"```

#### other stuff

- reconfigure nginx for multiple apps/ports with redirecting from port 80

- letsencrypt ssl certification and routing http traffic to https
    - holy crap, it has gotten very easy to use plugins for this
    - (access to the webroot folder for use with the plugin - redirect the subdomains)

- $$$ PROFIT
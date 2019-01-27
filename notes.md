

1) sign up for gcp have to use a credit card - free tier forever ... is a thing?, enable billing, create vm instance

2) select ubuntu 18.04 LTS > enable http(s)

3) use the browser "terminal" - nah pls.  make my own ssh keys and add them to the instance metadata https://cloud.google.com/compute/docs/instances/adding-removing-ssh-keys#locatesshkeys

-> a bit annoying. use keygen locally and then use browser terminal to upload the public key(s) and append them to ~/.ssh/authorized_keys on remote

alias ssh_aws_creds='ssh-add ~/Documents/secrets/n_cali_aws_key.pem'

(^ have to add creds in order to use nautilis' ssh/sftp connection; also, consider making an alias)

4) hmm, this seems slower than aws...

5) update && upgrade - install nvm, pm2, nginx
  https://github.com/creationix/nvm , source ~/.bashrc, nvm --version, nvm install node (node, npm --version)

6) open ports for testing ... will need to refine this later

7) test w/ msg, test w/ html file

8) use nginx to reverse proxy requests to 80 (and later 443)

  edit the default in /etc/nginx/sites-available to proxy http://localhost:[app_port] (close open ports)

  pm2? (for app & db) (https://www.npmjs.com/package/pm2)

9) domain & dns setup

>> (.xyz for $0.99!!)

manage DNS - set A Record to the public IP of your hosted server...

might as well set up some subdomains for ze future projects (demo, app, about) CNAME values similar to www @


10) letsencrypt
git &&
https://github.com/certbot/certbot
holy crap, it has gotten very easy

reconfigure nginx

(access to the webroot folder for use with the plugin - redirect the subdomains)

11) $$$ PROFIT





sudo service nginx status




----------- REST API 

POST https://www.googleapis.com/compute/v1/projects/moonlit-bucksaw-229800/zones/us-west1-b/instances { "kind": "compute#instance", "name": "j-o-w", "zone": "projects/moonlit-bucksaw-229800/zones/us-west1-b", "machineType": "projects/moonlit-bucksaw-229800/zones/us-west1-b/machineTypes/n1-standard-1", "metadata": { "kind": "compute#metadata", "items": [] }, "tags": { "items": [ "http-server", "https-server" ] }, "disks": [ { "kind": "compute#attachedDisk", "type": "PERSISTENT", "boot": true, "mode": "READ_WRITE", "autoDelete": true, "deviceName": "j-o-w", "initializeParams": { "sourceImage": "projects/ubuntu-os-cloud/global/images/ubuntu-1804-bionic-v20181222", "diskType": "projects/moonlit-bucksaw-229800/zones/us-west1-b/diskTypes/pd-standard", "diskSizeGb": "10" } } ], "canIpForward": false, "networkInterfaces": [ { "kind": "compute#networkInterface", "subnetwork": "projects/moonlit-bucksaw-229800/regions/us-west1/subnetworks/default", "accessConfigs": [ { "kind": "compute#accessConfig", "name": "External NAT", "type": "ONE_TO_ONE_NAT", "networkTier": "PREMIUM" } ], "aliasIpRanges": [] } ], "description": "", "labels": {}, "scheduling": { "preemptible": false, "onHostMaintenance": "MIGRATE", "automaticRestart": true, "nodeAffinities": [] }, "deletionProtection": false, "serviceAccounts": [ { "email": "562913674651-compute@developer.gserviceaccount.com", "scopes": [ "https://www.googleapis.com/auth/devstorage.read_only", "https://www.googleapis.com/auth/logging.write", "https://www.googleapis.com/auth/monitoring.write", "https://www.googleapis.com/auth/servicecontrol", "https://www.googleapis.com/auth/service.management.readonly", "https://www.googleapis.com/auth/trace.append" ] } ] }

POST https://www.googleapis.com/compute/v1/projects/moonlit-bucksaw-229800/global/firewalls { "name": "default-allow-http", "kind": "compute#firewall", "sourceRanges": [ "0.0.0.0/0" ], "network": "projects/moonlit-bucksaw-229800/global/networks/default", "targetTags": [ "http-server" ], "allowed": [ { "IPProtocol": "tcp", "ports": [ "80" ] } ] }

POST https://www.googleapis.com/compute/v1/projects/moonlit-bucksaw-229800/global/firewalls { "name": "default-allow-https", "kind": "compute#firewall", "sourceRanges": [ "0.0.0.0/0" ], "network": "projects/moonlit-bucksaw-229800/global/networks/default", "targetTags": [ "https-server" ], "allowed": [ { "IPProtocol": "tcp", "ports": [ "443" ] } ] }
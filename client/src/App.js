import React, { useState } from 'react'
import './App.css'
import './Modal.css'

import Layout from './Layout/Layout'

const Modal = ({ open }) => {
  if (!open) return <></>
  return <div className='Modal'>
    <ReadMe />
  </div>
}

const ReadMe = () => <div className="ReadMe"><h1 id="j-o-w-first-project-n-r">j-o-w: first project</h1>
    <h2 id="setting-up-a-flexible-hosted-linux-server-n-r">Setting up a flexible, hosted linux server</h2>
    <h4 id="1-get-some-cloud-compute-thing">1) Get some &quot;cloud compute&quot; thing</h4>
    <ul>
    <li>sign up for gcp have to use a credit card - free tier can technically be used forever ... so, that&#39;s a thing.</li>
    <li><p>enable billing so that you can create vm instance (there should be a message about never charging without first getting confirmation)</p>
    </li>
    <li><p>select a thing; I chose ubuntu 18.04 LTS because of reasons</p>
    </li>
    <li><p>in the firewall section of the initial setup, enable http and https traffic</p>
    </li>
    <li><p>you can totally use the browser &quot;terminal&quot; to do all the things. You can&#39;t paste directly into the &quot;terminal&quot; but it has a nifty option to download/upload files</p>
    </li>
    <li><p>but also, nah pls. I&#39;d rather make my own ssh keys and add them to the instance metadata so that I can use my own terminal (because my local OS is ubuntu)</p>
    <ul>
    <li>(another option/benefit is to use the remote vm as a location linked in your linux file system with ssh/sftp -- but again, you can use the browser &quot;terminal&quot; or whatever)</li>
    <li>if you ride linux or want to use putty/or Hyperterminal in Windows here&#39;s some stuff about setting up the ssh keys (this might be cool becausee then you can just alias your ssh connection task and then remote connection becomes like, really nice) <a href="https://cloud.google.com/compute/docs/instances/adding-removing-ssh-keys#locatesshkeys">https://cloud.google.com/compute/docs/instances/adding-removing-ssh-keys#locatesshkeys</a><ul>
    <li>a bit annoying. use keygen locally and then use browser terminal to upload the public key(s) and append them to ~/.ssh/authorized_keys on remote</li>
    <li>thought: hmm, gcp seems slower than aws... (and certain security measures seem easier in aws also - i.e. simply allowing ssh from only your current IP address)</li>
    </ul>
    </li>
    </ul>
    </li>
    </ul>
    <h4 id="2-setup-your-vm-thing">2) Setup your vm thing</h4>
    <ul>
    <li>sudo update &amp;&amp; upgrade<ul>
    <li>install nvm (node version manager for node/npm environment control)</li>
    <li>pm2 (for organizing/managing your running servers and dbs)</li>
    <li>nginx (reverse proxy for making all your servers/dbs(but not really) available from ports 80 &amp; 443)</li>
    <li>install vim (my terminal preference for file editting; might already be installed)
    <a href="https://github.com/creationix/nvm">https://github.com/creationix/nvm</a><ul>
    <li>after nvm install: source ~/.bashrc (resource terminal), nvm --version (confirm install), nvm install node (install stable node &amp; confirm w/ node --version, npm --version)</li>
    </ul>
    </li>
    </ul>
    </li>
    </ul>
    <h4 id="3-basic-node-server-thing">3) Basic Node server thing</h4>
    <ul>
    <li>npm init -y to initialize tracking of packages/a node project</li>
    <li>npm install express</li>
    <li>vim server.js</li>
    </ul>
    <p><strong><em>server.js</em></strong>:</p>
    <pre><code class="lang-js">const express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>) <span class="hljs-regexp">//</span> include express library
    const app = express()

    <span class="hljs-regexp">//</span> <span class="hljs-literal">on</span> a GET request to host:<span class="hljs-number">8000</span>/ simply respond with <span class="hljs-string">'hi'</span>
    app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-params">(req, res)</span> =&gt;</span> res.send(<span class="hljs-string">'hi'</span>))

    <span class="hljs-regexp">//</span> allow app to listen <span class="hljs-literal">on</span> port <span class="hljs-number">8000</span> <span class="hljs-keyword">and</span> <span class="hljs-built_in">console</span> log your server running msg
    app.listen(<span class="hljs-number">8000</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'app is listening on port 8000...'</span>))
    </code></pre>
    <ul>
    <li><p>back on GCP &gt; Compute Engine console, lazily open all ports in a certain range for testing ... will need to refine this later to only allow 80, 443 - but for now let&#39;s check that we have access to our server</p>
    </li>
    <li><p>you can find the external IP of your vm instance in the External IP column of the VM Instances section - go figure, right?</p>
    <ul>
    <li>start server with <code>node server.js</code> in the terminal and test serving this msg to <strong><em>external_IP:8000</em></strong></li>
    </ul>
    </li>
    <li><p>now test w/ html file: create an index.html with some content</p>
    <ul>
    <li>in <strong><em>server.js</em></strong> change <code>res.send(&#39;hi&#39;)</code> to <code>res.sendFile(path.join(__direname, &#39;index.html&#39;))</code> &amp; include the path module with <code>const path = require(&#39;path&#39;)</code> at the top of the file.</li>
    </ul>
    </li>
    </ul>
    <h4 id="4-setup-your_domain-">4) Setup <strong><em>your_domain</em></strong></h4>
    <ul>
    <li>go somewhere that sells domains and pick a cool one (Godaddy.com anything with the .xyz top-domain for $0.99/first year)</li>
    <li>in the Manage DNS section of Godaddy.com you can set the A Record to the public/external IP<ul>
    <li>might as well set up some subdomains for ze future projects (demo, app, about); do this by setting CNAME values similar to already provided www -&gt; @ (set the ttl to custom 600 sec to see DNS values working sooner, I think)</li>
    </ul>
    </li>
    <li>if not still running, start server with <code>node server.js</code> in the terminal and ensure you can now access your index.html at <strong><em>your_domain:8000</em></strong></li>
    </ul>
    <h4 id="5-nginx-thing-for-thinging-multiple-things">5) nginx thing for thinging multiple things</h4>
    <ul>
    <li><p>use nginx to reverse proxy requests to 80 (and later 443)</p>
    </li>
    <li><p>edit (with vim? - will need sudo privilage to edit) the default config file in /etc/nginx/sites-available to proxy <code>http://localhost:[app_port]</code> (so far we&#39;ve been using app_port = 8000) -&gt; you only need this right now:</p>
    </li>
    </ul>
    <pre><code class="lang-conf">server {`{`}
            listen <span class="hljs-number">80</span>;
            listen [::]:<span class="hljs-number">80</span>;

        location / {`{`}
            proxy_pass http:<span class="hljs-comment">//localhost:8000;</span>
        }
    }
    </code></pre>
    <ul>
    <li><p>run <code>sudo service nginx restart</code> to apply the changes; a msg will be logged if the restart has any issues because of your .config</p>
    </li>
    <li><p>use node to restart your server and check <strong><em>your_domain</em></strong> without specifying the port</p>
    <ul>
    <li>is your index.html being served here now!?!</li>
    </ul>
    </li>
    </ul>
    <h4 id="6-pm2-for-running-and-auto-restarting-thing">6) pm2 for running and auto-restarting thing</h4>
    <ul>
    <li><p>pm2? (for app &amp; db) (<a href="https://www.npmjs.com/package/pm2">https://www.npmjs.com/package/pm2</a>)</p>
    </li>
    <li><p><code>pm2 start server.js --name=&quot;a_useful_name_for_managing_app:port_number_app_is_listening_on&quot;</code></p>
    </li>
    </ul>
    <h4 id="other-stuff">other stuff</h4>
    <ul>
    <li><p>reconfigure nginx for multiple apps/ports with redirecting from port 80</p>
    </li>
    <li><p>letsencrypt ssl certification and routing http traffic to https</p>
    <ul>
    <li>holy crap, it has gotten very easy to use plugins for this</li>
    <li>(access to the webroot folder for use with the plugin - redirect the subdomains)</li>
    </ul>
    </li>
    <li><p>$$$ PROFIT</p>
    </li>
    </ul>
</div>

const App = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const toggleModal = e => setModalOpen(prevState => !prevState)

  return <div className="App">
      <Layout />
      <Modal open={modalOpen} />
      
      {/* <div style={{display:'none'}} ref={markedRef}>{markdown}</div> */}
      <button className="modal-toggle" onClick={toggleModal}>{!modalOpen ? `Info` : `Close`}</button>
    </div>
}

export default App

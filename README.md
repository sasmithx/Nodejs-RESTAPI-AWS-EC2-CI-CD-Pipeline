
# Automating Node.js REST API Deployment on AWS EC2 with CI/CD

This repository contains a Node.js REST API application deployed on AWS EC2. It includes a CI/CD pipeline for continuous integration and continuous deployment, enabling automated testing, building, and deployment processes. The project demonstrates best practices for developing and deploying scalable REST APIs with seamless integration into AWS services.

First, set up Node.js server, which will act as the backbone of our REST API. This server will handle requests, process data, and communicate with the database to ensure seamless functionality.
##


1. Clone the repository:

   ```bash
   https://github.com/sasmithx/Nodejs-RESTAPI-AWS-EC2-CI-CD-Pipeline.git
   ```

This will provide a structured starting point for building and integrating your API.

Since we are using MongoDB as our database, it is essential to configure its accessibility properly. To ensure seamless connectivity from any location, update the network access settings accordingly, allowing external access while maintaining security best practices.

  <a href="https://github.com/sasmithx/Nodejs-RESTAPI-AWS-EC2-CI-CD-Pipeline/blob/main/assets/MongoDB.png">
    <img src="https://github.com/sasmithx/Nodejs-RESTAPI-AWS-EC2-CI-CD-Pipeline/blob/main/assets/MongoDB.png" style="border-radius: 40px;" >
  </a>

2. Setting Up EC2 Instance and Git Repository

- Create a new EC2 instance in your AWS account.
- Generate or use an existing SSH key pair for accessing the instance.
- Create a new Git repository and push your Node.js code to it.

  <a href="https://github.com/sasmithx/Nodejs-RESTAPI-AWS-EC2-CI-CD-Pipeline/blob/main/assets/EC2.png">
    <img src="https://github.com/sasmithx/Nodejs-RESTAPI-AWS-EC2-CI-CD-Pipeline/blob/main/assets/EC2.png" style="border-radius: 40px;" >
  </a>

3. Connecting to EC2 Instance

- After creating the instance and pushing code to the repository, connect to the EC2 instance via SSH using the .pem file.

  <a href="https://github.com/sasmithx/Nodejs-RESTAPI-AWS-EC2-CI-CD-Pipeline/blob/main/assets/ConnectEC2.png">
    <img src="https://github.com/sasmithx/Nodejs-RESTAPI-AWS-EC2-CI-CD-Pipeline/blob/main/assets/ConnectEC2.png" style="border-radius: 40px;" >
  </a>

```
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

4. Setting Up GitHub Actions

- Navigate to your repository settings on GitHub and select Actions.
- Add a self-hosted runner and follow the setup instructions

  <a href="https://github.com/sasmithx/Nodejs-RESTAPI-AWS-EC2-CI-CD-Pipeline/blob/main/assets/Runners.png">
    <img src="https://github.com/sasmithx/Nodejs-RESTAPI-AWS-EC2-CI-CD-Pipeline/blob/main/assets/Runners.png" style="border-radius: 40px;" >
  </a>  

5. Environment Setup for GitHub Actions

- Create a .env file with your environment variables and add them as secrets in your GitHub repository settings.

  <a href="https://github.com/sasmithx/Nodejs-RESTAPI-AWS-EC2-CI-CD-Pipeline/blob/main/assets/Secret.png">
    <img src="https://github.com/sasmithx/Nodejs-RESTAPI-AWS-EC2-CI-CD-Pipeline/blob/main/assets/Secret.png" style="border-radius: 40px;" >
  </a>

6. CI/CD Workflows

- Create GitHub Actions workflows for CI/CD. Below is an example of a Node.js CI workflow.

```
# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs

name: Node.js CI/CD

on:
  push:
    branches: [ "main" ]

jobs:
  build:
    runs-on: self-hosted
    strategy:
      matrix:
        node-version: [22.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/
    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    - run: npm ci
    - run: |
        touch .env
        echo "${{ secrets.MONGO_DB_URL }}" > .env
    - run: pm2 restart BackendAPI
```

7. Environment Setup in Ubuntu

```
sudo ./svc.sh install
sudo ./svc.sh start

```
Ensure Node.js and Nginx are installed on your Ubuntu instance.

```
sudo apt update
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs nginx

```

8. Setting Up Nginx Reverse Proxy

Configure Nginx to act as a reverse proxy for your Node.js application.

```
sudo nano /etc/nginx/sites-available/default

```

Add the following configuration,

```
location /api {
  rewrite ^\/api\/(.*)$ /api/$1 break;
  proxy_pass http://localhost:5000;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}

```

Restart Nginx for changes to take effect,

```
sudo systemctl restart nginx

```

9. Setting Up PM2

PM2 is a process manager for Node.js applications. Install and configure it to keep your application running in the background.

```
sudo npm i -g pm2
pm2 start server.js --name=apiServer

```
  <a href="https://github.com/sasmithx/Nodejs-RESTAPI-AWS-EC2-CI-CD-Pipeline/blob/main/assets/PM2Start.png">
    <img src="https://github.com/sasmithx/Nodejs-RESTAPI-AWS-EC2-CI-CD-Pipeline/blob/main/assets/PM2Start.png" style="border-radius: 40px;" >
  </a>

  <a href="https://github.com/sasmithx/Nodejs-RESTAPI-AWS-EC2-CI-CD-Pipeline/blob/main/assets/PM2.png">
    <img src="https://github.com/sasmithx/Nodejs-RESTAPI-AWS-EC2-CI-CD-Pipeline/blob/main/assets/PM2.png" style="border-radius: 40px;" >
  </a>

10. Now changes are directly applying in to the CI/CD pipeline for every new push and pull in to the main branch.
    
  <a href="https://github.com/sasmithx/Nodejs-RESTAPI-AWS-EC2-CI-CD-Pipeline/blob/main/assets/Workflows.png">
    <img src="https://github.com/sasmithx/Nodejs-RESTAPI-AWS-EC2-CI-CD-Pipeline/blob/main/assets/Workflows.png" style="border-radius: 40px;" >
  </a>

Upon successful completion of the CI process, the CD (Continuous Deployment) phase is initiated.

## **📌 License**  

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

<div align="center">
  <img src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white" />
  <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" />
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS-000000?style=for-the-badge&logo=amazonaws&logoColor=FF9900" /> 
  <img src=" https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" /> 
  <img src="https://img.shields.io/badge/Nginx-000000?style=for-the-badge&logo=nginx&logoColor=009639" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  



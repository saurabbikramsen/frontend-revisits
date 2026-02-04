# DevTinder

- Created a Vite + React Application

# deployment

- signup on AWS
- launch instance
- chmod 400 devTinder.pem
- ssh -i devTinder.pem ec2-user@89.0.142.86
- install node version matching your project
- git clone https://github.com/saurabsen/devTinder-web.git
- frontend
  - npm install
  - npm run build
  - sudo apt update
  - sudo apt install nginx
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - copy code from dist(build files) to /var/www/html
  - sudo scp -r dist/\* /var/www/html
  - enable port 80 of your instance
  - Backend
    - updated DB password
    - allowed ec2 instance public ip on mongodb server
    - installed npm install pm2 -g
    - pm2 start npm -- start
      - pm2 list
      - pm2 delete name
      - pm2 flush name
        - flush the logs
      - pm2 logs
      - pm2 start -- name "devTinder" -- start

  # nginix config

  server_name your_domain_or_ip;
  location /api/ {
  proxy_pass http://127.0.0.1:8888/;
  proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

  }
  update frontend config to relative path

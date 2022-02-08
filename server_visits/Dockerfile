# use ubuntu as base image
FROM ubuntu

#install nodejs
RUN apt update
RUN DEBIAN__FRONTEND=noninteractive apt install --no-install-recommends tzdata nodejs npm curl -y
ENV PATH=/usr/bin/npm;/usr/bin/node:$PATH

#Pre-requisite for run node-app
# Wordir - cd and if directory is not present, it will create it and move to it
WORKDIR /server_visists
# COPY - copy files my local machine to container
# if we made a change in source file all cmds are exec again and don't reffer cache. why re-exec all cmd since we change source code
# so first copy package json and then install dependency so if package.json change , install cmd will work . hereby we don't re-exec as 
# well reduce build time
COPY ./package.json ./  
RUN npm i 
COPY ./ ./

#Primary command
CMD ["node", "app.js"]

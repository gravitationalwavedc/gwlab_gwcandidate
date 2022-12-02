FROM nginx:latest

# Install needed packages
RUN apt-get update
RUN apt-get install -y curl git python3 python3-virtualenv rsync

# Copy the gwcandidate source code in to the container
COPY src /src

# Pull down and set up the gwcandidate repo
RUN cd /tmp && rsync -arv /src /tmp/gwlab-gwcandidate/
WORKDIR /tmp/gwlab-gwcandidate/src
RUN virtualenv -p python3 venv
RUN venv/bin/pip install -r requirements.txt
RUN mkdir -p logs
# Build the graphql schema from the gwcandidate repo
RUN venv/bin/python development-manage.py graphql_schema

# Copy the gwcandidate source in to the container
WORKDIR /

# Copy the generate gwcandidate schema
RUN mkdir -p /gwlab-gwcandidate/src/react/data/
RUN mv /tmp/gwlab-gwcandidate/src/react/data/schema.json /src/react/data/

# Don't need the gwcandidate project now
RUN rm -Rf /tmp/gwlab-gwcandidate

# Build webpack bundle
RUN mkdir /src/static
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
RUN . ~/.nvm/nvm.sh && cd /src/react/ && nvm install && nvm use && npm install && npm run relay && npm run build

# Copy the javascript bundle
RUN rsync -arv /src/static/ /static/

# Don't need any of the javascipt code now
RUN rm -Rf /src
RUN rm -Rf ~/.nvm/

RUN apt-get remove -y --purge python3 python-virtualenv rsync
RUN apt-get autoremove --purge -y

ADD ./nginx/static.conf /etc/nginx/conf.d/nginx.conf

EXPOSE 8000

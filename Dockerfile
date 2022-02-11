FROM registry.gitlab.com/tozd/docker/meteor:ubuntu-focal-2.5.6

ENV LD_LIBRARY_PATH=/lib

RUN apt-get update && apt-get install -y wget unzip libaio1 && rm -rf /var/lib/apt/lists/*

RUN wget --quiet --output-document=instantclient.zip \
      https://download.oracle.com/otn_software/linux/instantclient/215000/instantclient-basiclite-linux.x64-21.5.0.0.0dbru.zip && \
    unzip -q instantclient.zip && \
    rm -f instantclient.zip

RUN wget --quiet --output-document=sqlplus.zip \
      https://download.oracle.com/otn_software/linux/instantclient/215000/instantclient-sqlplus-linux.x64-21.5.0.0.0dbru.zip && \
    unzip sqlplus.zip && rm -f sqlplus.zip

RUN ln -s /instantclient_* /instantclient

ENV LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:/instantclient

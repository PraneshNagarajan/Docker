#Pull from base image
FROM ubuntu
RUN yum install java -yum
CMD java --version
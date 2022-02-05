#Pull from base image
FROM ubuntu
RUN yum install java -y
CMD ["java --version"]
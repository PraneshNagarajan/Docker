#Pull from base image
FROM ubuntu
RUN apt update
RUN apt install python
CMD ["python --version"]
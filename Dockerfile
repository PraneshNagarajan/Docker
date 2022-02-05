#Pull from base image
FROM ubuntu
RUN apt update
RUN apt install python -y
CMD ["python --version"]
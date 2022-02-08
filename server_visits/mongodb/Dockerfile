# Use mongo as base image
FROM mongo

#Create new Database
RUN echo "use server_visits" | mongo

#insert initial value to DB
RUN echo "db.server_visits.insert({'visits' 0 })" | mongo


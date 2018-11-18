FROM alfredyang1986/ember:base

# Copy the current directory contents into the container at /app
ADD . /app

# Make the Ember app across the platform
RUN npm rebuild node-sass

# RUN yarn
RUN ember b

# Make port 80 available to the world outside this container
EXPOSE 4200

# Run command when the conatiner launches
CMD ember s --production

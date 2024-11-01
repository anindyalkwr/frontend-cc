# Use the official Nginx image
FROM nginx:alpine

# Copy the static files to the Nginx web directory
COPY public /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

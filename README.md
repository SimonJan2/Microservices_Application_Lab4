# Task - Microservices Application in Flask

- Build a microservices-based application using Flask.
- Add core business logic to each service.
- Dockerize each service.
- Deploy the application in a Minikube environment.

1.  Define Microservices Structure
    Identify services based on project requirements ( User Service, Product Service, Order Service).
    Design the business logic (BL) for each service ( User Service handles authentication, Product Service manages product data, etc.).
2.  Set Up Flask Application for Each Microservice
    Initialize Flask projects for each service in separate folders.
    Define routes for each service ( User Service could have /login, /register; Product Service could have /add, /delete).
    Implement business logic (BL) within each route:
    User Service: Handle login, registration, profile management.
    Product Service: Manage adding, removing, and viewing products.
    Order Service: Process orders, payment, and track orders.
    Test each service locally to ensure they work as standalone applications.
3.  Dockerize Each Microservice
    Create Dockerfiles for each microservice:
    Specify the base image .
    Install dependencies .
    Copy service code into the container.
    Set environment variables if needed ( API keys, database URLs).
    Build Docker images for each service.
    Test the Docker containers locally to ensure each service runs as expected.
4.  Set Up a Local Database in Docker --optional
    Use Docker to create a container for a database (e.g., MySQL, PostgreSQL, MongoDB).
    Configure each microservice to connect to this local database.
5.  Create a Docker-Compose File for Local --ptional
    Write a docker-compose.yml file to define all microservices and the database.
    Link each microservice to the database if necessary.
    Test the entire application using Docker Compose to ensure services communicate as expected.
6.  Prepare for Kubernetes (Minikube) Deployment

## Create Kubernetes manifests for each microservice:

- Deployment files to define pods and replicas.
- Service files to expose each microservice within the Kubernetes cluster.
- Configure environment variables in Kubernetes manifests for each service ( database connection strings).

7. Deploy to Minikube
   Start Minikube and enable necessary addons (ngress).
   Apply Kubernetes manifests to deploy each microservice on Minikube.
   Expose services using Ingress if you want a single entry point for your microservices.
8. Verify and Test in Minikube
   Verify each pod is running and services are accessible.
   Test each service endpoint to ensure correct functionality and inter-service communication.
9. Clean Up --optional
   Remove resources in Minikube when the testing is complete.
   Ensure each student documents their steps, especially around business logic.


# Solution - Microservices Application with Flask and React

This project demonstrates a microservices architecture using Flask for backend services and React for the frontend. The application is containerized using Docker and deployed on Kubernetes (Minikube).

## Architecture Overview

The application consists of four main components:

1. **Frontend Service**: React application providing the user interface
2. **User Service**: Handles user authentication and management
3. **Product Service**: Manages product inventory and information
4. **Order Service**: Handles order processing and management

### System Architecture
```
                   ┌─────────────┐
                   │   Ingress   │
                   └─────────────┘
                         │
            ┌────────────┴───────────┐
            │                        │
     ┌──────┴─────┐           ┌──────┴─────┐
     │  Frontend  │           │   Backend  │
     │  (React)   │           │  Services  │
     └──────┬─────┘           └──────┬─────┘
            │                        │
            │                ┌───────┴───────┐
            │                │               │
     ┌──────┴─────┐   ┌──────┴─────┐   ┌─────┴──────┐
     │    User    │   │  Product   │   │   Order    │
     │  Service   │   │  Service   │   │  Service   │
     └────────────┘   └────────────┘   └────────────┘
```

## Features

- User Registration and Authentication
- Product Management
- Order Processing
- Persistent Data Storage
- Kubernetes Deployment
- Service Discovery
- Load Balancing

## Technical Stack

- **Frontend**:
  - React
  - React Router
  - Tailwind CSS
  - Axios for API calls

- **Backend**:
  - Flask
  - Flask-CORS
  - Werkzeug Security

- **Infrastructure**:
  - Docker
  - Kubernetes (Minikube)
  - Nginx Ingress Controller
  - Persistent Volumes

## Project Structure
```
microservices/
├── frontend/
│   ├── Dockerfile
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Products.js
│   │   │   └── Orders.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── backend/
│   ├── user_service/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   └── app.py
│   ├── product_service/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   └── app.py
│   └── order_service/
│       ├── Dockerfile
│       ├── requirements.txt
│       └── app.py
├── k8s/
│   ├── frontend-deployment.yaml
│   ├── user-deployment.yaml
│   ├── product-deployment.yaml
│   ├── order-deployment.yaml
│   └── ingress.yaml
└── docker-compose.yml
```

## Setup and Deployment

1. **Prerequisites**:
   - Docker
   - Minikube
   - kubectl
   - Node.js and npm

2. **Build Images**:
```bash
eval $(minikube docker-env)
docker compose build
```

3. **Deploy to Kubernetes**:
```bash
kubectl apply -f k8s/
```

4. **Configure Ingress**:
```bash
minikube addons enable ingress
echo "$(minikube ip) microservices.local" | sudo tee -a /etc/hosts
```

## Service Communication

- Frontend communicates with backend services through the Ingress controller
- Services communicate with each other using Kubernetes service discovery
- Each service has its own database/storage
- Authentication is handled by the User Service

## API Endpoints

### User Service (Port: 31000)
- `POST /register`: Register new user
- `POST /login`: User authentication
- `GET /users`: List all users

### Product Service (Port: 31001)
- `GET /products`: List all products
- `POST /products`: Add new product
- `GET /products/<id>`: Get product details
- `DELETE /products/<id>`: Remove product

### Order Service (Port: 31002)
- `GET /orders`: List all orders
- `POST /orders`: Create new order
- `GET /orders/<id>`: Get order details

## Kubernetes Components

- **Deployments**: Manage the pods for each service
- **Services**: Expose pods and enable service discovery
- **Ingress**: Route external traffic to services
- **PersistentVolumes**: Store persistent data
- **ConfigMaps/Secrets**: Store configuration and sensitive data

## Monitoring and Debugging

- Health check endpoints for each service
- Debug endpoints for troubleshooting
- Kubernetes logs and monitoring

## Development

1. Run locally with Docker Compose:
```bash
docker compose up
```

2. Deploy to Kubernetes:
```bash
kubectl apply -f k8s/
```

3. Access services:
- Frontend: http://microservices.local
- API endpoints: http://microservices.local/api/*

## Future Improvements

- Add authentication middleware
- Implement service mesh
- Add monitoring and logging solutions
- Implement CI/CD pipeline
- Add API documentation
- Implement data backup solution
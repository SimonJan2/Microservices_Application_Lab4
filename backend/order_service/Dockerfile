FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install flask==2.0.1 werkzeug==2.0.1 flask-cors==3.0.10
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5002
CMD ["python", "app.py"]
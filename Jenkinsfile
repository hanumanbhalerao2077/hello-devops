pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = "hanuman545"
        IMAGE_NAME = "hello-devops"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/hanumanbhalerao2077/hello-devops.git',
                    credentialsId: 'github-cred'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Jenkins container already has access to Docker socket
                sh "docker build -t $DOCKERHUB_USERNAME/$IMAGE_NAME:latest ."
            }
        }

        stage('Push Docker Image') {
            steps {
                withDockerRegistry([credentialsId: 'dockerhub-cred', url: '']) {
                    sh "docker push $DOCKERHUB_USERNAME/$IMAGE_NAME:latest"
                }
            }
        }

        stage('Deploy on EC2') {
            steps {
                sh """
                ssh -o StrictHostKeyChecking=no ubuntu@<EC2_PUBLIC_IP> \
                'docker pull $DOCKERHUB_USERNAME/$IMAGE_NAME:latest && \
                 docker stop hello-devops || true && \
                 docker rm hello-devops || true && \
                 docker run -d -p 3000:3000 --name hello-devops $DOCKERHUB_USERNAME/$IMAGE_NAME:latest'
                """
            }
        }
    }
}

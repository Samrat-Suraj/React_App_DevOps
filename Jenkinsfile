pipeline{
    agent any
    environment{
        DOCKER_IMAGE = 'samratsooraj/node-todo-app:latest'
    }
    stages{
        stage("code"){
            steps{
                git branch : 'main' , url : 'https://github.com/Samrat-Suraj/React_App_DevOps.git'
            }
        }
        stage("build"){
            steps{
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }
        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerHub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USER --password-stdin'
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }
        stage("deploy"){
            steps{
                sh 'docker-compose down || true'
                sh 'docker-compose up -d --build'
            }
        }
    }
}
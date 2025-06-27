pipeline {
  agent any

  environment {
    IMAGE_NAME = 'nest-backend'
    CONTAINER_PORT = '3104'
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/At-Your-Service-pro/ays-backend.git', branch: 'main'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $IMAGE_NAME .'
      }
    }

    stage('Run Container') {
      steps {
        sh 'docker rm -f $IMAGE_NAME || true'
        sh 'docker run -d -p 3104:3104 --name $IMAGE_NAME $IMAGE_NAME'
      }
    }
  }

  post {
    always {
      echo 'Pipeline finished.'
    }
  }
}

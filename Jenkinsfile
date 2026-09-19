pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                bat 'make install && make build'
            }
        }

        stage('Test') {
            steps {
                bat 'make test'
            }
        }
    }
}
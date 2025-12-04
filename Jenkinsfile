pipeline {
    agent any

    tools {
        nodejs "NodeJS-18"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npx playwright install'
                bat 'npx playwright install-deps'  // optional; might fail on Windows, safe to remove
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx playwright test --reporter=line,allure-playwright'
            }
        }

        stage('Generate Allure Report') {
            steps {
                bat 'allure generate allure-results --clean -o allure-report'
            }
        }

        stage("Publish Allure Report") {
            steps {
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'allure-results/**'
        }
    }
}

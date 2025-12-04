pipeline {
    agent any

    tools {
        nodejs "NodeJS-18"   // The name configured in Jenkins (Manage Jenkins → Global Tool Configuration)
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npx playwright install'        // installs browsers
                sh 'npx playwright install-deps'   // optional for Linux agents
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test --reporter=line,allure-playwright'
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh 'allure generate allure-results --clean -o allure-report'
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

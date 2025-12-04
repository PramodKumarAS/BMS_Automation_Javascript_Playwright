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
            }
        }

        stage('Run Tests') {
            steps {
                // Continue pipeline even if tests fail
                bat 'npx playwright test --reporter=line,allure-playwright || exit 0'
            }
        }
    }

    post {
        always {
            echo "Generating Allure Report even if tests fail..."
            
            // Generate report
            bat '''
                if exist allure-results (
                    allure generate allure-results --clean -o allure-report
                ) else (
                    echo "No allure-results folder found"
                )
            '''

            // Publish in Jenkins
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]

            // Archive raw artifacts
            archiveArtifacts artifacts: 'allure-results/**'
        }
    }
}

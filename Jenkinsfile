pipeline {
    agent none

    tools {
        nodejs "NodeJS-18"
    }

    stages {

        stage('Checkout') {
            agent { label 'windows-controller' }
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            agent { label 'windows-install' }
            steps {
                bat 'npm ci'
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            agent { label 'windows-playwright' }
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    bat 'npx playwright test --reporter=line,allure-playwright'
                }
            }
        }
    }
    
    post {
        always {
            node('windows-playwright') {

                echo "Generating Allure Report even if tests fail..."

                bat '''
                    if exist allure-results (
                        allure generate allure-results --clean -o allure-report
                    ) else (
                        echo "No allure-results folder found"
                    )
                '''

                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
                archiveArtifacts artifacts: 'allure-results/**'
            }
        }
    }

}

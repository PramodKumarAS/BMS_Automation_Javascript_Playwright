pipeline {
    agent any

    tools {
        nodejs 'NodeJS-18'
    }

    stages {

        stage('Install') {
            steps {
                checkout scm
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh '''
                    if [ -d allure-results ]; then
                        allure generate allure-results --clean -o allure-report
                    else
                        echo "No allure-results found"
                    fi
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'allure-results/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
            allure results: [[path: 'allure-results']]
        }
    }
}

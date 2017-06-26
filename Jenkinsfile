#!groovys

gitOrg  = 'https://github.hpe.com/SMA-RnD'
gitRepo = 'react-itsma'
branch  = env.BRANCH_NAME
currentBuild.displayName = "# ${BUILD_NUMBER}-${gitRepo}-${branch}"

if( branch ==~ /PR-.*/){
    buildCMD = "mvn -s settings.xml -Pdev -Ddocker.image.tag=${branch} -B -U clean deploy"
    currentBuild.description = "${env.CHANGE_AUTHOR_DISPLAY_NAME} : <a href=\"${env.CHANGE_URL}\" >${branch}</a>"
}else{
    buildCMD = "mvn -s settings.xml -Pci -B -U clean deploy"
}

slackChannel = '#suite-ui'
 
def setBuildStatus(String message, String state) {
  step([
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: "${gitOrg}/${gitRepo}.git"],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "${gitRepo}/${branch}"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]);
}

pipeline {
//    triggers { pollSCM('H/2 * * * *') }
    options { 
        timestamps()
        ansiColor('xterm')
    }
    agent { label 'SUITE-BUILD' }
    stages {
        stage('stage #1: build'){
            steps {
                sh "git rev-parse HEAD > .git/current-commit"
                script{
                    commitSha = readFile(".git/current-commit").trim()
                }
                setBuildStatus("Jenkins Build Start", "PENDING")
                withMaven(maven: 'M3') {
                    sh "${buildCMD}"
                }  
            }
        }
       stage('stage #2: code check'){
             steps {
               withMaven(maven: 'M3') {
                sh "mvn -s settings.xml clean verify sonar:sonar"
            }
          }
        }
        stage('stage #3: deploy'){
            steps {
                script{
                    if( branch ==~ /PR-.*/){
                        echo 'deploy step is coming soon'
                    }else{
                        echo 'deploy step is coming soon'
                    }
                }  
            }
        }
    }
    post { 
        failure {
            setBuildStatus("Jenkins Build finish", "FAILURE")
            slackSend   channel: slackChannel, 
                        color: 'danger', 
                        message: "FAILURE:${currentBuild.displayName}: ${BUILD_URL} \n GitHub: https://github.hpe.com/SMA-RnD/${gitRepo}/commit/${commitSha}" 
        }
        success {
            setBuildStatus("Jenkins Build finish", "SUCCESS")
            slackSend   channel: slackChannel, 
                        color: 'good', 
                        message: "SUCCESS:${currentBuild.displayName}: ${BUILD_URL} \n GitHub: https://github.hpe.com/SMA-RnD/${gitRepo}/commit/${commitSha}"
        }
    }
}
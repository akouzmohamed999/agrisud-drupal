def dockerRepoUrl = "harbor.norsys-afrique.ma"
def dockerImageName = "web-site"
def dockerImageTag = "${dockerRepoUrl}/agrisud/${dockerImageName}:latest"

def rancherHost = "192.168.1.235"

pipeline {
   agent any
   stages {
      stage('Docker Build and Tag') {
         steps {
            sh("docker build -f deploy/Dockerfile --no-cache -t ${dockerImageName} .")
         }
      }
      stage('Push') {
         environment {
            DOCKER = credentials("naf-docker-registry")
         }
         steps {
            sh("docker tag ${dockerImageName} ${dockerImageTag}")
            sh("docker login -u $DOCKER_USR -p $DOCKER_PSW ${dockerRepoUrl}")

            sh("docker push ${dockerImageTag}")
         }
      }
      stage('Deploy') {
         environment {
            OPS = credentials("naf-ops-deploy")
         }
         steps {
            script {
               def remote = [: ]
               remote.name = 'ops'
               remote.host = "$rancherHost"
               remote.user = "$OPS_USR"
               remote.password = "$OPS_PSW"
               remote.allowAnyHosts = true
               sshCommand remote: remote, command: 'export PATH=$PATH:/var/lib/rancher/rke2/bin KUBECONFIG=int-config && kubectl patch deployment agrisud-website -n agrisud-integration -p "{\\"spec\\": {\\"template\\": {\\"metadata\\": { \\"labels\\": {  \\"redeploy\\": \\"$(date +%s)\\"}}}}}"'
            }
         }
      }

   }

}

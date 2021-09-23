def dockerRepoUrl = "harbor.norsys-afrique.ma"
def dockerImageName = "web-site"
def dockerImageTag = "${dockerRepoUrl}/agrisud/${dockerImageName}:latest"

def mysqlRootPassword = "secretintpassword"
def mysqlDatabaseName = "agrisud_website"
def mysqlDatabaseHost = "agrisud-mysql"
def mysqlUser = "norsys2021"
def mysqlPassword = "MDP2NAF"

pipeline {
	  agent any
		 stages {
              stage('Injecting int Env vars') {
				   steps {
				   	sh("sed -i '''s@\\[MYSQL_ROOT_PASSWORD\\]@'''\"${mysqlRootPassword}\"'''@''' .env.prod")
				   	sh("sed -i '''s@\\[DATABASE_NAME\\]@'''\"${mysqlDatabaseName}\"'''@''' .env.prod")
				   	sh("sed -i '''s@\\[DATABASE_HOST\\]@'''\"${mysqlDatabaseHost}\"'''@''' .env.prod")
				   	sh("sed -i '''s@\\[MYSQL_USER\\]@'''\"${mysqlUser}\"'''@''' .env.prod")
                    sh("sed -i '''s@\\[MYSQL_PASSWORD\\]@'''\"${mysqlPassword}\"'''@''' .env.prod")
				   	sh("cat .env.prod > .env")
				   }
			  }
			  stage('Docker Build and Tag') {
				   steps {
				    sh("docker build -f deploy/Dockerfile -t ${dockerImageName} .")
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
			  
	 }

}

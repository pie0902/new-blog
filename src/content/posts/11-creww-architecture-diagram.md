---
title: "11. creww Architecture Diagram"
description: "크루의 아키텍처 다이어그램을 만들었다. 미리 만들었어야 했는데 아직 진행중인 프로젝트라서.. 계속 수정될 예정이다. I have created an architecture diagram for Creww project. I should have made it earlier, but since it's an ongoing project... it's expected to be continually updated. Architecture Diagr..."
published: "2024-06-29T07:00:53.134Z"
tags: ['다이어그램', '프로젝트', 'Creww']
series: "과거 Hashnode"
---

크루의 아키텍처 다이어그램을 만들었다. 미리 만들었어야 했는데 아직 진행중인 프로젝트라서.. 계속 수정될 예정이다.

I have created an architecture diagram for Creww project. I should have made it earlier, but since it's an ongoing project... it's expected to be continually updated.

### Architecture Diagram

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719643735387/73354842-c945-4b58-999c-15f0c25ec8e8.png)

---

### 설명

* 클라이언트 측 시스템은 일반적인 웹 브라우저를 통해 접근한다. 사용자는 데스크톱이나 모바일 기기의 브라우저로 서비스에 접속한다.
    
* 서버는 Debian Linux가 설치된 NAS 장비에서 운영된다.
    
* Nginx는 NAS에 직접 설치되어 웹 서버와 리버스 프록시 역할을 수행한다. 80번 포트(HTTP)와 443번 포트(HTTPS)를 모두 처리한다.
    
    * HTTP 요청은 자동으로 HTTPS로 리다이렉트된다.
        
    * HTTPS 연결에 대해 SSL 터미네이션을 수행한다.
        
    * 요청을 적절한 백엔드 서비스로 라우팅한다.
        
* Docker Compose를 사용해 여러 컨테이너를 관리한다. 주요 컨테이너는 다음과 같다:
    
    * Frontend 컨테이너 (127.0.0.1:3000): 사용자 인터페이스를 제공한다.
        
    * Backend 컨테이너 (127.0.0.1:8080): API 서비스를 제공한다.
        
    * MySQL 컨테이너 (127.0.0.1:3306): 데이터베이스 서비스를 제공한다.
        
* 데이터 흐름
    
    * 클라이언트의 요청은 Nginx를 통해 들어온다.
        
    * Nginx는 요청을 해석하여 적절한 컨테이너로 전달한다.
        
    * Frontend 요청은 Frontend 컨테이너로, API 요청은 Backend 컨테이너로 전달된다.
        
    * Backend 컨테이너는 필요에 따라 MySQL 컨테이너와 통신하여 데이터를 처리한다.
        
* 개발 및 배포 프로세스 개발은 로컬 개발 환경(macOS)에서 이루어진다.
    
* 코드는 GitHub에 푸시되고, GitHub Actions를 통해 CI/CD 파이프라인이 실행된다.
    
* 빌드된 Docker 이미지는 Docker Hub에 푸시되고, SSH를 통해 NAS에 접속하여 최신 이미지를 pull 받아 배포한다.
    

---

### Architecture Description

* Client-side system is accessed through a standard web browser. Users connect to the service using browsers on desktop or mobile devices.
    
* The server operates on NAS equipment installed with Debian Linux.
    
* Nginx is directly installed on the NAS, serving as a web server and reverse proxy. It handles both port 80 (HTTP) and port 443 (HTTPS).
    
    * HTTP requests are automatically redirected to HTTPS.
        
    * SSL termination is performed for HTTPS connections.
        
    * Requests are routed to appropriate backend services.
        
* Docker Compose is used to manage multiple containers. The main containers are:
    
    * Frontend container (127.0.0.1:3000): Provides the user interface.
        
    * Backend container (127.0.0.1:8080): Provides API services.
        
    * MySQL container (127.0.0.1:3306): Provides database services.
        
* Data flow:
    
    * Client requests come through Nginx.
        
    * Nginx interprets the requests and forwards them to the appropriate container.
        
    * Frontend requests are sent to the Frontend container, API requests to the Backend container.
        
    * The Backend container communicates with the MySQL container as needed to process data.
        
* Development and deployment process:
    
    * Development takes place in a local development environment (macOS).
        
    * Code is pushed to GitHub, and CI/CD pipeline is executed through GitHub Actions.
        
    * Built Docker images are pushed to Docker Hub, and the latest images are pulled and deployed by accessing the NAS via SSH.
---
title: "5. creww dockerfile 작성"
description: "Dockerfile 작성 및 빌드: Dockerfile 작성: Creww 프로젝트의 배포를 위해 Dockerfile을 작성. Dockerfile에는 애플리케이션의 환경 설정 및 의존성 설치 명령어를 포함하여 컨테이너 이미지를 생성한다. 빌드: 작성된 Dockerfile을 사용하여 Docker 이미지를 빌드했다. 빌드된 이미지를 통해 일관된 환경에서 애플리케이션을 실행할 수 있게 되었다. nas에서 실행시키기 위해 docker h..."
published: "2024-05-25T15:00:00.000Z"
tags: []
series: "과거 Hashnode"
---

**Dockerfile 작성 및 빌드:**

* **Dockerfile 작성:**
    
    * Creww 프로젝트의 배포를 위해 Dockerfile을 작성.
        
    * Dockerfile에는 애플리케이션의 환경 설정 및 의존성 설치 명령어를 포함하여 컨테이너 이미지를 생성한다.
        
* **빌드:**
    
    * 작성된 Dockerfile을 사용하여 Docker 이미지를 빌드했다.
        
    * 빌드된 이미지를 통해 일관된 환경에서 애플리케이션을 실행할 수 있게 되었다.
        
    * nas에서 실행시키기 위해 docker hub에 push 한다.
        

**환경변수 설정 (JWT 키 보호):**

* **JWT 키 보호:**
    
    * JWT 키가 소스 코드에 노출되지 않도록 환경변수를 설정.
        
    * 환경변수를 통해 애플리케이션이 실행될 때 필요한 민감한 정보들을 안전하게 관리할 수 있다.
        
* **설정 방법:**
    
    * `.env` 파일을 사용하여 환경변수를 정의.
        
    * Docker 컨테이너 실행 시 해당 환경변수를 로드하도록 설정했다.
        

### 주의사항

* 현재 개발 중인 컴퓨터는 Mac으로, ARM 기반으로 동작한다.
    
* NAS에서 실행하려면 Docker 이미지를 AMD64 아키텍처로 빌드해야 한다.
    
* Docker 빌드 시 플랫폼을 명시하여 AMD64 아키텍처용 이미지를 생성했다.
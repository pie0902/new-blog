---
title: "4.배포 환경을 위한 단일 Redis 인스턴스: AWS ElasticCache 활용법"
description: "..::.. .:+*##++==:. / \ \ / / ___| ..=*######+++++++-.. / _ \ \ /\ / /\___ \ -############**++++= / ___ \ V V / _..."
published: "2024-04-10T15:00:00.000Z"
tags: []
series: "과거 Hashnode"
---

```java
            ..::..                                       
        .:+*##++==:.            / \ \      / / ___|                             
    ..=*######+++++++-..       / _ \ \ /\ / /\___ \                        
    -############**++++=      / ___ \ V  V /  ___) |                   
    .:-=*###########+-::     /_/___\_\_/\_/  |____/ _       ____           _          
          *###++++.         | ____| | __ _ ___| |_(_) ___ / ___|__ _  ___| |__   ___ 
          *###++++.         |  _| | |/ _` / __| __| |/ __| |   / _` |/ __| '_ \ / _ \    
          *###++++.         | |___| | (_| \__ \ |_| | (__| |__| (_| | (__| | | |  __/
    .:::------------::..    |_____|_|\__,_|___/\__|_|\___|\____\__,_|\___|_| |_|\___|               
    -###*++=-----===+++=                                
    ..=*######+++++++-..                                
        .:+*##++==:.                                    
           ..--..                                                                                                                                                               
```

## AWS ElasticCache란?

> AWS ElasticCache는 아마존 웹 서비스(AWS)가 제공하는 관리형 인메모리 캐싱 서비스다.  
> 데이터를 메모리에 저장하여 빠른 데이터 검색과 애플리케이션 성능 향상을 돕는다.  
> Redis 또는 Memcached와 같은 인기 있는 오픈 소스 인메모리 캐싱 시스템을 쉽게 설정, 관리, 확장할 수 있도록 설계되었다.

## AWS ElasticCache 프리티어 생성

* 아래 스크린샷 처럼 설정을 한다.
    
* 서브넷은 생성하거나 기본값을 선택해도 무관
    
* cache.t2.micro를 선택하는게 중요하다
    
* 매월 750시간의 t2.micro 노드 사용량 (Redis 또는 Memcached)
    
* 이는 한 달 동안 지속적으로 t2.micro 노드 1개를 무료로 사용할 수 있음을 의미한다. (31일 \* 24시간 = 744시간)
    
* 내 경우에는 로컬환경에서 ElasticCache를 테스트하려고 보안그룹 설정에서 포트를 열어놨다.  
    
    ![ap-northeast-2 console aws amazon com_elasticache_home_region=ap-northeast-2 (1)](https://private-user-images.githubusercontent.com/47919911/320197126-6e52cbdb-2ecb-4400-beca-50b9f61217b9.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTQzNjAzOTcsIm5iZiI6MTcxNDM2MDA5NywicGF0aCI6Ii80NzkxOTkxMS8zMjAxOTcxMjYtNmU1MmNiZGItMmVjYi00NDAwLWJlY2EtNTBiOWY2MTIxN2I5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA0MjklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNDI5VDAzMDgxN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTU1MTNlODJhOWZjZTNlMDJlZTdiMWY2ZTRhZmVlZWRmZDE2ODY0YzdjZTgwYTJlZGMxZDdjOTRkNzU2YzNhNjcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.qwWUgYRmtCeqYHplmz6WbHgquNMVSbS6rsxfTwwMuU0 align="left")
    
    **그 외 다른 설정들은 대부분 해제하면 된다.**
    

## 팀원이 생성한 EC2 인스턴스에서 AWS ElasticCache 활용해서 검증

* EC2 인스턴스와 ElastiCache 클러스터가 동일한 VPC 내에 있고, 보안 그룹 설정이 올바르게 되어 있다면 별도의 복잡한 설정 없이도 EC2에서 ElastiCache를 사용할 수 있다.  
    
    ![스크린샷 2024-04-05 오후 8 51 37](https://private-user-images.githubusercontent.com/47919911/320197146-9ac25a25-a938-4722-93dc-3c8622822f41.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTQzNjAzOTcsIm5iZiI6MTcxNDM2MDA5NywicGF0aCI6Ii80NzkxOTkxMS8zMjAxOTcxNDYtOWFjMjVhMjUtYTkzOC00NzIyLTkzZGMtM2M4NjIyODIyZjQxLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA0MjklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNDI5VDAzMDgxN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTMyOGFhMmM1OWVhNTY3NDUzOTczZTg0ODFmZDA0OTM0Y2M0YWMyNTU5OWU3OWFmOGE0ZTFkMzgwMjI4MDk5MTAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.sy2FFj2201LiAIPC5cSFY-shWo1eRjRv43dTpXzCKq0 align="left")
    

## ElasticCache를 로컬 개발 환경에서 사용하기

* IntelliJ에서 로컬 환경으로 설정한 레디스 말고 ElasticCache를 사용해서 캐싱처리한 데이터를 조회 해보고 싶었다.
    
* 여러가지 정보를 검색한 결과 ssh 터널링을 사용해서 접근하는 방법을 찾을 수 있었다.
    

## 로컬 머신에서 SSH 터널링을 사용하여 AWS ElasticCache Redis에 안전하게 접근하는 방법

#### SSH 터널링 설정 방법

터미널에서 다음 명령어를 실행:

```java
ssh -i /path/to/your-key.pem -N -L local-port:elasticache-endpoint:redis-port ec2-user@bastion-host-ip
```

* path/to/your-key.pem: EC2 인스턴스에 접속하기 위한 SSH 키 파일의 경로이다.
    
* local-port: 로컬 머신에서 사용할 포트 번호다. 이미 사용 중인 포트가 아니어야 하며, 여기서는 예시로 6380을 사용한다.
    
* elasticache-endpoint: AWS ElastiCache Redis 인스턴스의 엔드포인트 주소.
    
* redis-port: Redis 서비스가 사용하는 포트 번호로, 일반적으로 6379이다.
    
* ec2-user: EC2 인스턴스의 사용자 이름. 우분투 서버를 사용하는 경우 ubuntu가 기본 사용자 이름이다.
    
* bastion-host-ip: Bastion Host로 사용되는 EC2 인스턴스의 공개 IP 주소.
    
* **주의사항**
    
* 명령어 실행 후, 연결이 성공했음을 알리는 별도의 메시지는 출력되지 않는다.
    
* 이 SSH 터널이 성공적으로 설정되면, 로컬 머신의 6380 포트를 통해 ElastiCache Redis에 안전하게 접근할 수 있다.
    

#### Spring Boot 애플리케이션 설정

[application.properties](http://application.properties) 파일에서 Redis 설정을 다음과 같이 변경한다.

```java
spring.data.redis.host=localhost
spring.data.redis.port=6380
```

이 설정은 SSH 터널을 통해 로컬 포트 6380으로 ElastiCache Redis 인스턴스에 접근하도록 지시한다.

#### 테스트 및 검증

* 인텔리제이에서 Redis에 데이터를 저장한 후, EC2 인스턴스에서 ElastiCache Redis를 사용하여 해당 데이터를 조회할 수 있다.
    
* 이 과정을 통해 SSH 터널링을 사용하여 로컬 머신과 AWS ElastiCache Redis 간에 안전한 통신 경로가 성공적으로 설정되었음을 확인할 수 있다.
    

1. 첫 번째 POST 요청을 보내서 Redis에 데이터를 저장한다.
    
    ![스크린샷 2024-04-06 오후 6 52 51](https://private-user-images.githubusercontent.com/47919911/320197196-f9995165-9b94-438f-87db-b28a90d37d18.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTQzNjAzOTcsIm5iZiI6MTcxNDM2MDA5NywicGF0aCI6Ii80NzkxOTkxMS8zMjAxOTcxOTYtZjk5OTUxNjUtOWI5NC00MzhmLTg3ZGItYjI4YTkwZDM3ZDE4LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA0MjklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNDI5VDAzMDgxN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTEyYWI1ZTc2NGY1NzAyN2RmNjc3ZTg1NjgxZTIxOGM3ZWQ5ZTdjZWQ4YjVlNWFiMzRiODNjODA3NjI4NDcyN2UmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0._R3Go4e6xKfCEILTWhPUPV3nMqkK-uRw51xe-S16Gs0 align="left")
    
    ![스크린샷 2024-04-06 오후 6 53 04](https://private-user-images.githubusercontent.com/47919911/320197306-a96a2163-0f08-4736-b173-f5db301b7357.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTQzNjAzOTcsIm5iZiI6MTcxNDM2MDA5NywicGF0aCI6Ii80NzkxOTkxMS8zMjAxOTczMDYtYTk2YTIxNjMtMGYwOC00NzM2LWIxNzMtZjVkYjMwMWI3MzU3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA0MjklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNDI5VDAzMDgxN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTY1NGE2YzkzZDU4NDg2YzZjZDRlMTZlYzhmODA4YjNhZjJjZDNkMjZkYjI5NWE3MDdkZjQ5YjZjZTQzOWRjZjYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.uInHbB78tZqQ7zjauaAH2VFLTivMHq8d-qxbnFu1FWo align="left")
    
2. EC2 인스턴스에 접속한 후, ElastiCache Redis에서 키 값을 조회한다.
    
    ![스크린샷 2024-04-06 오후 6 56 13](https://private-user-images.githubusercontent.com/47919911/320197349-6d8b1502-afed-41f0-8417-669bbb7a5093.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTQzNjAzOTcsIm5iZiI6MTcxNDM2MDA5NywicGF0aCI6Ii80NzkxOTkxMS8zMjAxOTczNDktNmQ4YjE1MDItYWZlZC00MWYwLTg0MTctNjY5YmJiN2E1MDkzLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA0MjklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNDI5VDAzMDgxN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWZkMTQ0ZmZjODFkM2NmNmIwM2QyNDdhN2I1NzA5MTg4OTYwNmNkMjRhM2NhM2ViYWNkZWUwNDgzYTMwNGVhYTcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.iuKHKaepIW-VC9r0Q5G5J6cHEWtxLFYc_541412N3Dk align="left")
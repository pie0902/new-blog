---
title: "7. creww 매우 간단한 수정 기록"
description: "ssh 터미널로 가정용 nas와 통신해서 docker-compose up 명령어를 입력하고 사이트를 실행시키려는데.. frontend 컨테이너와 mysql 컨테이너는 잘 실행이 되는데 backend 컨테이너가 자꾸 꺼지는 에러를 마주했다. 로그를 살펴보고 이것저것 구글링을 한 결과.. 문제의 원인을 찾아보니 MySQL 8.0.27 버전의 커넥터가 스프링 부트 2.7.x 버전과 호환되지 않는 다는걸 발견했다.스프링 관련 문서를 확인해보니 2.7 ..."
published: "2024-05-30T15:00:00.000Z"
tags: ['Java', 'MySQL', 'SQL', '프로젝트', 'Creww']
series: "과거 Hashnode"
---

ssh 터미널로 가정용 nas와 통신해서 docker-compose up 명령어를 입력하고 사이트를 실행시키려는데..

frontend 컨테이너와 mysql 컨테이너는 잘 실행이 되는데 backend 컨테이너가 자꾸 꺼지는 에러를 마주했다.

로그를 살펴보고 이것저것 구글링을 한 결과..

문제의 원인을 찾아보니 MySQL 8.0.27 버전의 커넥터가 스프링 부트 2.7.x 버전과 호환되지 않는 다는걸 발견했다.스프링 관련 문서를 확인해보니 2.7 버전부터는 최소 8.0.28 버전의 MySQL 커넥터를 사용할 것을 권장하고 있었다.

해결법: runtimeOnly 'mysql:mysql-connector-java:8.0.29' 으로 수정했다.(원래는 8.0.27)

그리고 인코딩 문제로 데이터베이스와 문제를 일으켜서 application.properties에서 데이터베이스에 접속할 때 사용하는 jdbc url 설정에 useUnicode 옵션을 추가했다.

오늘도 해결완료!
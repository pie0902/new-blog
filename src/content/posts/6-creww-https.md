---
title: "6. creww 데비안 리눅스로 배포한 사이트에 HTTPS 적용"
description: "웹 서버에 HTTPS를 적용하는 작업을 했다. 먼저 apt 패키지 관리자를 업데이트하고, certbot과 certbot-nginx 패키지를 설치한다. Copy codesudo apt update sudo apt install certbot sudo apt install python3-certbot-nginx 그리고 certbot 유틸리티를 실행해서 Nginx 설정을 자동으로 수정하게 했다. Copy codesudo certbot --ngin..."
published: "2024-05-28T15:00:00.000Z"
tags: []
series: "과거 Hashnode"
---

웹 서버에 HTTPS를 적용하는 작업을 했다.

먼저 apt 패키지 관리자를 업데이트하고, certbot과 certbot-nginx 패키지를 설치한다.

```bash
Copy codesudo apt update 
sudo apt install certbot
sudo apt install python3-certbot-nginx
```

그리고 certbot 유틸리티를 실행해서 Nginx 설정을 자동으로 수정하게 했다.

```bash
Copy codesudo certbot --nginx
```

certbot이 몇 가지 질문을 하는데, 거기에 맞게 응답하면 SSL/TLS 인증서를 자동으로 발급받고 Nginx 설정 파일도 적절히 수정한다. 사이트 도메인, 이메일 주소 등을 물어보는데 차례로 입력하면 된다.

이렇게 하면 웹사이트에 https 접속이 가능해지고, 보안 연결 설정도 자동으로 완료된다. 매우 간단한 작업으로 웹 서버의 보안을 높일 수 있다.
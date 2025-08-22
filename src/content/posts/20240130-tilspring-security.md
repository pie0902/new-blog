---
title: "2024.01.30 TIL(spring security)"
description: "Spring Security 💡 오늘의 학습 키워드 #스프링 #GitHub ✔️ 오늘의 Todo List JWT SpringSecurity 인증과 인 1. Spring Securiy 프레임워크는 Spring 서버에 필요한 인증 및 인가를 위해 많은 기능을 제공해 줌으로써 개발의 수고를 덜어 준다. build.gradle에 Spring Security 프레임워크를 추가한다. Spring Security를 활성화 한다. WebSe..."
published: "2024-01-29T15:00:00.000Z"
tags: ['Spring', 'Spring Security', 'JWT', 'TIL']
series: "과거 Hashnode"
---

## Spring Security

### 💡 오늘의 학습 키워드

#스프링 #GitHub

### ✔️ 오늘의 Todo List

* JWT
    
* SpringSecurity
    
* 인증과 인
    

---

### 1\. Spring Securiy 프레임워크는 Spring 서버에 필요한 인증 및 인가를 위해 많은 기능을 제공해 줌으로써 개발의 수고를 덜어 준다.

1. build.gradle에 Spring Security 프레임워크를 추가한다.
    
2. Spring Security를 활성화 한다.
    
3. WebSecurityConfig 클래스를 만들어서 Bean에 등록한 다음 Spring Security를 설정한다.(LoggingFilter, AuthFilter 등등)2. Spring Security - Filter Chanin
    
4. Spring Securit에서 모든 호출은 DispatcherServlet을 통하게 되고 이후에 각 요청을 담당하는 Controller로 분배된다.
    
5. 이때, 각 요청에 대해서 공통적으로 처리해야 할 필요가 있을 때 DispatcherServlet 이전에 단계가 필요하며 이것이 Filter이다.3.Form Login 기반은 인증
    
6. Spring Security도 인증 및 인가를 처리하기 위해 Fiter를 사용하는데 Spring Security는 FilterChainPoroxy를 통해서 상세로직을 수현하고 있다.
    
7. Form Login 기반 인증은 인증이 필요한 URL 요청이 들어왔을 때 인증이 되지 않았다면 로그인 페이지를 반환하는 형태이다.4.UsernamePasswordAuthenticationFilte
    
8. UsernamePasswordAuthenticationFilter는 Spring Security의 필터인 AbstractAuthenticationProcessingFilter를 상속한 Filter이다.
    
9. 기본적으로 Form Login 기반을 사용할 때 username과 password 확인하여 인증한다.
    
10. 사용자가 username과 password를 제출하면 UsernamePasswordAuthenticationFilter는 인증된 사용자의 정보가 담기는 인증 객체인 Authentication의 종류 중 하나인 UsernamePasswordAuthenticationToken을 만들어 AuthenticationManager에게 넘겨 인증을 시도한다.
    
11. 실패하면 SecurityContextHolder를 비운다.
    
12. 성공하면 SecurityContextHolder에 Authentication를 세팅한다.
    

---

### ✏️오늘의 기록

1. 오늘은 SpringSecurity와 JWT를 공부했다.
    
2. JWT강의만 보면서 머리가 며칠 동안 아팠는데 책도 보고 구글링도 하고 각종 영상을 찾아본 후에 강의를 다시 보니깐 이해가 됐다.
    
3. 머리로 이해하는 것보다는 직접 작성해 보고 익숙해지는 것이 더 중요하니깐 내일은 정말 실습의 날이다.
    
4. 그리고 내일 저녁에는 2주 차 강의로 넘어가는 게 목표다.🤔 오늘의 회고마음이 조급해서 엄청 집중하면 오히려 너무 사고가 좁아져서 잘 안 들어오는 것 같다. 어제보다는 마음이 가벼워져서 다행이다. 내일은 로그인 회원가입 JWT와 친해지는 날이다. 모르면 모를수록 머리가 아픈데 한번 이해되기 시작하면 정말 재밌다.
---
title: "2024.01.19 TIL (Spring)"
description: "오늘의 마음가짐 💡 오늘의 학습 키워드 #스프링 #GitHub ✔️ 오늘의 Todo List 스프링 강의 수강 스프링 실습 TIL 리뉴얼 1주 차 수업 내 거로 만들기 ✏️오늘의 기록 Spring 프로젝트 생성 build.gradle로 간편하게 설정 바꿀 수 있음 오늘 알게 된 라이브러리 spring-boot-starter-web : Spring MVC와 Tomcat 웹 서버를 포함 매우 편리하게 Controller, S..."
published: "2024-01-18T15:00:00.000Z"
tags: []
series: "과거 Hashnode"
---

## 오늘의 마음가짐

### 💡 오늘의 학습 키워드

#스프링 #GitHub

### ✔️ 오늘의 Todo List

* <s>스프링 강의 수강</s>
    
* <s>스프링 실습</s>
    
* <s>TIL 리뉴얼</s>
    
* 1주 차 수업 내 거로 만들기
    

### ✏️오늘의 기록

1. Spring 프로젝트 생성
    
    * build.gradle로 간편하게 설정 바꿀 수 있음
        
2. 오늘 알게 된 라이브러리
    
    * spring-boot-starter-web : Spring MVC와 Tomcat 웹 서버를 포함 매우 편리하게 Controller, Service, Repository와 같은 웹애플리케이션의 기본 구성 요소를 빠르게 개발할 수 있다. JSON 변환을 위한 Jackson 라이브러리와 같은 필수 라이브러리들도 포함되어 있어 REST API 개발에 필요한 대부분의 기능을 즉시 사용할 수 있다.
        
    * Lombok: 개발을 편리하게 해주는 라이브러리다. 반복적인 코드 작성을 줄여주는 다양한 어노테이션을 제공한다!! (@Getter,@Setter...)
        
3. 정적 페이지와 동적 페이지(Thymeleaf 사용 시)
    
    * 정적 페이지는 resources/static 보관
        
    * 동적 페이지는 resources/templates 보관  
        **Spring MVC의 View Resolve는 컨트롤러에서 반환된 뷰(html) 이름을 실제 뷰 템플릿 파일로 매핑하고, 해당 파일을 찾아서. 웹페이지로 렌더링 하는 역할을 한다.**
        
4. 데이터를 클라이언트에 반환
    
    * 1번 helloStringJson의 Content-Typ은 text/html으로, JSON 형태의 문자열을 직접 반환한다.
        
    * 2번 helloClassJson의 Content-Type은 application/json으로, 객체를 JSON으로 자동 변환하는 기능을 사용한다.  
        **Content-Type 헤더는 Spring의 내부 메커니즘에 의해 결정된다(Spring이 알맞게 편리하게 정해줌)**
        
    * ```java
        @RestController 
        @RequestMapping("/response/rest")
        public class ResponseRestController { 
        			1.
        			@GetMapping("/json/string") 
                    public String helloStringJson() { 
                    	return "{\"name\":\"Robbie\",\"age\":95}"; 
                    } 
                    2. 
                    @GetMapping("/json/class")
                    public Star helloClassJson() {
                    	return new Star("Robbie", 95);
                    } 
        }
        ```
        
5. Jackson 라이브러리
    
    * Java 객체를 JSON 형식의 문자열로 변환해준다. (JSON 직렬화)
        
    * JSON 문자열을 자바 객체로 변환해준다. (JSON 역직렬화)
        
    * ObjectMapper objectMapper = new ObjectMapper();
        
        1. String json = objectMapper.writeValueAsString(star);
            
        2. String json = objectMapper.readValue(json,Star.class)
            
6. Path Variable & Request Param
    
    * Path Variable
        
        1. path Variable은 브라우저에서 서버로 HTTP 요청을 보낼 때 데이터를 함께 보낼 수 있다.
            
        2. 서버에 보내려는 데이터를 URL 경로에 추가할 수 있다.
            
        3. `(@PathVariable String name, @PathVariable int age)`
            
    * Request Param
        
        1. 서버에 보내려는 데이터를 URL 경로 마지막에? 와 & 를 사용하여 추가할 수 있다.
            
        2. ? name = aaa & age = 111
            
        3. `GET \[`[`http://localhost:8080/hello/request/form/param`](http://localhost:8080/hello/request/form/param)`? name=aaa&age=111\] (@RequestParam String name, @RequestParam int age)`
            
        4. 생략가능
            

### 👊 문제해결

##### 오늘 생긴 문제 :

공부를 하다가 오늘도 어김없이 오류가 생겼다. 문제는 깃 충돌과 타임리프를 프로젝트 생성 시 만들지 않아서 서버를 실행할 때마다 에러가 났다.

##### 해결책:

```java
implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
```

구글링을 이것저것 해보다가 build.grade가 문제인걸 알게 돼서 dependencies에 코드 한 줄을 추가하니깐 잘 작동됐다.  
아직은 생소하지만 gradle에 대해서도 이렇게 알아가는 것 같아서 기분이 좋다!  
(깃은 삭제하고 다시 커밋했다..)

### 🤔 오늘의 회고

1. 뭔가 수월하게 이해하고 블로그를 옮기려 했는데.. 지금 그럴 때가 아닌 것 같다. 스프링은 이번 주말에 붙잡고 기초는 이해해야겠다.. 근데 이게 2~3일 만에 이해하고 익숙해질 수 있는 개념은 아닌 것 같은데.. 어쨌든 불가능은 없으니깐! 그리고 MySQL에 익숙해지고 싶어서 프로그래머스 문제를 계속 풀고 있다. 능숙하게 할 수 있을 때 까진 눈 아파도 gogogo
    
2. 매일 써야 하는 TIL이 일기장이 돼버리는 것만큼 슬픈 일이 없을 것 같아서(후회하는 거 안 좋아함) 오늘부터는 정말 신경 써서 쓰도록 노력해야겠다고 마음먹었다.
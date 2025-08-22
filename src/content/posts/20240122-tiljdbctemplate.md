---
title: "2024.01.22 TIL(JdbcTemplate)"
description: "오늘의 마음가짐 💡 오늘의 학습 키워드 #스프링 #MySQL ✔️ 오늘의 Todo List 스프링 강의 수강 스프링 실습 과제 시작 ✏️오늘의 기록 JdbcTemplate 데이터베이스와 상호 작용하는 방법을 제공 JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource); // 데이터베이스 연결 설정 // SQL 쿼리 실행 및 결과 조회 List<String> names = jdbcTe..."
published: "2024-01-21T15:00:00.000Z"
tags: ['Java', 'MySQL', 'SQL', 'TIL']
series: "과거 Hashnode"
---

## 오늘의 마음가짐

### 💡 오늘의 학습 키워드

#스프링 #MySQL

### ✔️ 오늘의 Todo List

* <s>스프링 강의 수강</s>
    
* <s>스프링 실습</s>
    
*  <s>과제 시작</s>
    

### ✏️오늘의 기록

JdbcTemplate

* 데이터베이스와 상호 작용하는 방법을 제공
    

```java
JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource); // 데이터베이스 연결 설정

// SQL 쿼리 실행 및 결과 조회
List<String> names = jdbcTemplate.queryForList("SELECT name FROM users", String.class);

// 동적인 파라미터 전달
String username = "john";
jdbcTemplate.update("INSERT INTO users(username) VALUES(?)", username);
```

이렇게 데이터를 동적으로 넣을 수가 있다. 다른 기능도 많지만 학습 중..

Layer Architecture

* 소프트웨어 시스템을 서로 다른 계층으로 나누어 구성하여 시스템의 유지 보수와 확장을 용이하게 하는 아키텍처 패턴!
    

### 👊 문제해결

오늘 생긴 문제 :

        IoC와 DI 개념의 어려움... 이것을 해결하려면 반복 반복 반복 밖에 없지 않을까요?

### 🤔 오늘의 회고

1. 오늘은 과제를 시작하면서 코드를 다시 작성했다. 하다 보니깐 강의를 또 찾게 됐는데 완벽하게 이해를 하려면 시간이 많이 촉박할 것 같아서 책과 유료강의를 활용해서 다방면 설명을 듣고 이해도를 상승시켜야겠다.
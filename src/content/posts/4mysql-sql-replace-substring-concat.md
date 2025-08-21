---
title: "4.MySQL - 업무 필요한 문자 포맷이 다를 때, SQL 로 가공하기 (REPLACE, SUBSTRING, CONCAT)"
description: "SQL 에서는 특정 문자를 다른 것으로 바꿀 수 있는 기능을 제공합니다 함수명 : replace 사용 방법 SQL replace(바꿀 컬럼, 현재 값, 바꿀 값) 예전에 ‘문곡리’ 라는 지명이 ‘문가리’ 로 바뀌었어요 (주소의 ‘문곡리’ 를 ‘문가리’ 로 바꾸기) select addr, REPLACE (addr, \"문곡리\",\"문가리\") FROm food_orders where addr like \"%문곡리%\" 전체 데이터가 아닌 특정 문자만 ..."
published: "2023-12-17T15:00:00.000Z"
tags: []
series: "과거 Hashnode"
---

SQL 에서는 특정 문자를 다른 것으로 바꿀 수 있는 기능을 제공합니다

함수명 : replace

사용 방법

SQL

replace(바꿀 컬럼, 현재 값, 바꿀 값)

```sql
예전에 ‘문곡리’ 라는 지명이 ‘문가리’ 로 바뀌었어요

(주소의 ‘문곡리’ 를 ‘문가리’ 로 바꾸기)
select addr,
REPLACE (addr, "문곡리","문가리")
FROm food_orders
where addr like "%문곡리%"
```

전체 데이터가 아닌 특정 문자만 필요할 때, SQL 로 필요한 부분만 조회할 수 있습니다

함수명 : substring (substr)

substr(조회 할 컬럼, 시작 위치, 글자 수)

```sql
전체 주소에서 앞부분인 ‘시도’ 부분만 필요해요

select addr,
SUBSTR(addr,1,2)
FROm food_orders
where addr like "%서울특별시%"
```

원하는 문자가 여러 컬럼에 있을 때, 하나로 합쳐서 업무에 필요한 형태로 만들 수 있습니다.

SQL 에서는 여러 컬럼의 값을 하나로 합칠 수 있는 기능을 제공합니다.

예시) 서울시에 있는 음식점은 ‘\[서울\] 음식점명’ 이라고 수정하고 싶어요.

함수명 : concat

사용 방법

SQL

복사

concat(붙이고 싶은 값1, 붙이고 싶은 값2, 붙이고 싶은 값3, .....)

```sql
[실습]
1.(서울시에 있는 음식점은 ‘[서울] 음식점명’ 이라고 수정)
SELECT restaurant_name,addr,
CONCAT("[",SUBSTR(addr,1,2),"]" ,restaurant_name)
from food_orders
WHERE addr like "%서울%"
```

종합 실습

```sql
[실습] 서울 지역의 음식 타입별 평균 음식 주문금액 구하기 (출력 : ‘서울’, ‘타입’, ‘평균 금액’)

SELECT SUBSTR(addr,1,2) ,cuisine_type,avg(price)  
FROM food_orders
where addr like "%서울%"
group by 1,2


[실습] 이메일 도메인별 고객 수와 평균 연령 구하기

SELECT SUBSTR(email,10) "도메인",
		COUNT(1),
		avg(age)  
FROM customers
group by 1

[실습] ‘[지역(시도)] 음식점이름 (음식종류)’ 컬럼을 만들고, 총 주문건수 구하기

SELECT CONCAT("[지역(",SUBSTR(addr,1,2),")]",restaurant_name,"(",cuisine_type,")") "음식점 종류",
count(1) "주문건수"
FROM food_orders
group by 1
```
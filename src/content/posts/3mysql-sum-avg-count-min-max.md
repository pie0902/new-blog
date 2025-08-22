---
title: "3.MySQL 데이터 조회와 엑셀 함수 적용을 한 번에 끝내기 (SUM, AVG, COUNT, MIN, MAX)"
description: "숫자 연산 종류 연산자설명+더하기-빼기*곱하기/나누기 SQL 에서는 계산의 편의를 위해 함수를 제공하고 있습니다. 사용방법은 엑셀과 유사하고, 유일하게 다른 점은 데이터의 범위가 아닌 계산할 ‘컬럼’을 적어준다는 것입니다. 함수 종류합계 : SUM(컬럼) 평균 : AVG(컬럼) 전체 데이터의 갯수 구하기 함수 종류 데이터 갯수 : COUNT(컬럼) 컬럼명 대신 1 혹은 사용 가능 몇개의 값을 가지고 있는지 구할 때 : DISTINCT [실습]..."
published: "2023-12-16T15:00:00.000Z"
tags: ['MySQL', 'SQL']
series: "과거 Hashnode"
---

숫자 연산 종류

<table><tbody><tr><td colspan="1" rowspan="1"><p>연산자</p></td><td colspan="1" rowspan="1"><p>설명</p></td></tr><tr><td colspan="1" rowspan="1"><p>+</p></td><td colspan="1" rowspan="1"><p>더하기</p></td></tr><tr><td colspan="1" rowspan="1"><p>-</p></td><td colspan="1" rowspan="1"><p>빼기</p></td></tr><tr><td colspan="1" rowspan="1"><p>*</p></td><td colspan="1" rowspan="1"><p>곱하기</p></td></tr><tr><td colspan="1" rowspan="1"><p>/</p></td><td colspan="1" rowspan="1"><p>나누기</p></td></tr></tbody></table>

SQL 에서는 계산의 편의를 위해 함수를 제공하고 있습니다. 사용방법은 엑셀과 유사하고, 유일하게 다른 점은 데이터의 범위가 아닌 계산할 ‘컬럼’을 적어준다는 것입니다.

함수 종류합계 : SUM(컬럼)

평균 : AVG(컬럼)

전체 데이터의 갯수 구하기

함수 종류

데이터 갯수 : COUNT(컬럼) *컬럼명 대신 1 혹은* 사용 가능

몇개의 값을 가지고 있는지 구할 때 : DISTINCT

```sql
[실습]
1.주문 금액이 30,000원 이상인 주문건의 갯수 구하기
select count(order_id)
from food_orders
where price>=30000

2.한국 음식의 주문 당 평균 음식가격 구하기
select avg(price)
from food_orders
where cuisine_type="Korean"
```

단위를 나누어 숫자 계산을 해봅시다(Group by)

select 카테고리컬럼(원하는컬럼 아무거나), sum(계산 컬럼),

from

group by 카테고리컬럼(원하는컬럼 아무거나)

```sql
[실습]Group by 를 이용하여 카테고리별 연산해보기

1.음식점별 주문 금액 최댓값 조회하기
select restaurant_name,
		max(price)
from food_orders
group by restaurant_name

2.결제 타입별 가장 최근 결제일 조회하기
select pay_type
	   max(date)
from payments
group by pay_type
```

Query 결과를 정렬하여 업무에 바로 사용하기 (ORDER BY)

select 카테고리컬럼(원하는컬럼 아무거나), sum(계산 컬럼),

from

group by 카테고리컬럼(원하는컬럼 아무거나)

order by 정렬을 원하는 컬럼 (카테고리컬럼(원하는컬럼 아무거나), sum(계산 컬럼) 둘 다 가능)

```sql
[실습] Order by 를 이용하여 데이터를 정렬해보기
1.음식점별 주문 금액 최댓값 조회하기 - 최댓값 기준으로 내림차순 정렬
select restarant_name,
		max(price)
from food_orders
group by restarant_name
order by max(price) desc

2.고객을 이름 순으로 오름차순으로 정렬하기

select *
from customers
order by name


음식 종류별 가장 높은 주문 금액과 가장 낮은 주문금액을 조회하고, 가장 낮은 주문금액 순으로 (내림차순) 정렬하기
select cuisine_type "음식종류",
       max(price),min(price)
from food_orders
group by cuisine_type
order by min(price) desc
```

2주차 완강완료
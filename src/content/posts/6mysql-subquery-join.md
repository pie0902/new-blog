---
title: "6.MySQL - Subquery와 Join"
description: "select order_id, restaurant_name, if(over_time>=0, over_time, 0) over_time from ( select order_id, restaurant_name, food_preparation_time-25 over_time from food_orders ) a 서브쿼리란) 이런식으로 ()로 묶어서 조건을 지정해준다음 그 위에 SELECT문에서 조건문을 한번더 지정해줌으로써 가독성을 향상시킬수 있..."
published: "2023-12-19T15:00:00.000Z"
tags: ['MySQL', 'SQL']
series: "과거 Hashnode"
---

```sql
select order_id, restaurant_name, if(over_time>=0, over_time, 0) over_time
from 
(
select order_id, restaurant_name, food_preparation_time-25 over_time
from food_orders
) a
```

서브쿼리란)

이런식으로 ()로 묶어서 조건을 지정해준다음

그 위에 SELECT문에서 조건문을 한번더 지정해줌으로써 가독성을 향상시킬수 있습니다.

```sql
-- 1) [실습] 음식점의 평균 단가별 segmentation 을 진행하고, 그룹에 따라 수수료 연산하기
    --   (수수료 구간 -
   --   ~5000원 미만 0.05%
   --   ~20000원 미만 1%
   --   ~30000원 미만 2%
   --   30000원 초과 3%)



SELECT restaurant_name,
		avgg*ppri "수수료"		
FROM 
(
SELECT restaurant_name,
	   CASE WHEN avgg <5000 then 0.005
	 		WHEN avgg between 5000 and 19999 then 0.01
	 		WHEN avgg between 20000 and 29999 then 0.02
	 		else 0.03 end ppri,
	 		avgg
FROM
(
SELECT restaurant_name, avg(price/quantity) avgg
FROM food_orders
group by 1
)a
)b


-- 2) [실습] 음식점의 지역과 평균 배달시간으로 segmentation 하기


SELECT restaurant_name,
      "시도",
      case when 평균배달시간<=20 then "20분이하"
           when 평균배달시간>20 and "평균배달시간"<=30 then "20에서 30분사이"
           when 평균배달시간>30 then "30분이상" end "배소요시간"      
from
(
SELECT restaurant_name,
	   SUBSTR(addr,1,2) 시도,
	   avg(delivery_time) 평균배달시간
from food_orders
group by 1
)a
```

필요한 데이터가 서로 다른 테이블에 있을 때 조회하기 (JOIN)

JOIN 의 기본 구조

SQL

\-- LEFT JOIN

select 조회 할 컬럼

from 테이블1 a left join 테이블2 b on a.공통컬럼명=b.공통컬럼명

\-- INNER JOIN

select 조회 할 컬럼

from 테이블1 a inner join 테이블2 b on a.공통컬럼명=b.공통컬럼명

```sql
[실습] 한국 음식의 주문별 결제 수단과 수수료율을 조회하기
SELECT a.order_id,
	   a.restaurant_name,
	   a.price,
       b.pay_type,
       b.vat 
FROM food_orders a left join payments b on a.order_id = b.order_id
where cuisine_type = "Korean"

[실습] 고객의 주문 식당 조회하기
SELECT distinct a.name,
       a.age,
       a.gender,
       b.restaurant_name
from customers a inner join food_orders b on a.customer_id = b.customer_id
```
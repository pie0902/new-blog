---
title: "5.MySQL - IF문과 CASE문"
description: "IF 문은 원하는 조건에 충족할 때 적용할 방법과 아닌 방법을 지정해 줄 수 있습니다 예시) 음식 타입을 ‘Korean’ 일 때는 ‘한식’, ‘Korean’ 이 아닌 경우에는 ‘기타’ 라고 지정하고 싶어요 함수명 : if 사용 방법 if(조건, 조건을 충족할 때, 조건을 충족하지 못할 때) Case 문은 각 조건별로 적용 할 값을 지정해 줄 수 있습니다. 조건별로 지정을 해주기 때문에 아래와 같이 if 문을 여러번 쓴 효과를 낼 수 있습니다. ..."
published: "2023-12-18T15:00:00.000Z"
tags: []
series: "과거 Hashnode"
---

IF 문은 원하는 조건에 충족할 때 적용할 방법과 아닌 방법을 지정해 줄 수 있습니다

예시) 음식 타입을 ‘Korean’ 일 때는 ‘한식’, ‘Korean’ 이 아닌 경우에는 ‘기타’ 라고 지정하고 싶어요

함수명 : if

사용 방법

if(조건, 조건을 충족할 때, 조건을 충족하지 못할 때)

Case 문은 각 조건별로 적용 할 값을 지정해 줄 수 있습니다.

조건별로 지정을 해주기 때문에 아래와 같이 if 문을 여러번 쓴 효과를 낼 수 있습니다. if(조건1, 값1, if(조건2, 값2, 값3))

예시) 음식 타입을 ‘Korean’ 일 때는 ‘한식’, ‘Japanese’ 혹은 ‘Chienese’ 일 때는 ‘아시아’, 그 외에는 ‘기타’ 라고 지정

함수명 : case

case when 조건1 then 값(수식)1 when 조건2 then 값(수식)2 else 값(수식)3 end

\[실습\]

다음의 조건으로 배달시간이 늦었는지 판단하는 값을 만들어주세요. - 주중 : 25분 이상 - 주말 : 30분 이상

```sql
select
	order_id,
	day_of_the_week,
	delivery_time,
	case when day_of_the_week="Weekday" and delivery_time >=25 then "늦음"
		 when day_of_the_week="WeeKend" and delivery_time >=30 then "늦음"
		 else "정상" end "배달시간"
from food_orders
```
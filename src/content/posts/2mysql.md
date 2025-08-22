---
title: "2.MySQL 기본구조/데이터 조회"
description: "SELECT: 데이터베이스에서 데이터를 조회할 때 사용하는 기본 명령어입니다. 데이터를 불러오는 모든 쿼리(Query)에 이 명령어를 사용합니다. FROM: 조회할 데이터가 저장된 테이블을 지정하는 구문입니다. *: 테이블의 모든 컬럼(열)을 선택하겠다는 의미입니다. select * from food_orders 위의 쿼리는 food_orders 테이블에 있는 모든 컬럼의 데이터를 조회합니다."
published: "2023-12-15T15:00:00.000Z"
tags: ['Java', 'MySQL', 'SQL']
series: "과거 Hashnode"
---

SELECT: 데이터베이스에서 데이터를 조회할 때 사용하는 기본 명령어입니다. 데이터를 불러오는 모든 쿼리(Query)에 이 명령어를 사용합니다.

FROM: 조회할 데이터가 저장된 테이블을 지정하는 구문입니다.

\*: 테이블의 모든 컬럼(열)을 선택하겠다는 의미입니다.

```java
select *
from food_orders
```

위의 쿼리는 food\_orders 테이블에 있는 모든 컬럼의 데이터를 조회합니다.
---
title: 'C언어 배열 vs 포인터'
description: '배열과 포인터의 관계를 코드 예제와 함께 설명합니다.'
published: '2025-08-22T00:00:00.000Z'
tags: ['C언어', '포인터', '배열']
series: 'C언어'
---

# C언어 배열 vs 포인터

## 코드 예제

```c
#include <stdio.h>

int arr[5] = {10,20,30,40,50};
int *p = arr;

int main() {
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d\n", i, arr[i]);
    }
    printf("--------------------------\n");
    for (int i = 0; i < 5; i++) {
        printf("포인터 p로 출력한 arr[%d] = %d\n", i, *(p+i));
    }
}
```

설명

- arr[i] 와 \*(p+i) 는 완전히 동일하다.

- 배열 이름(arr)은 사실상 배열 첫 원소의 주소(&arr[0]) 를 의미한다.

- 따라서 int \*p = arr; 로 선언하면 p는 배열의 첫 원소 주소를 가리키게 된다.

- 이후 \*(p+i) 를 통해 arr[i] 와 같은 방식으로 값에 접근 가능하다.

실행 결과 예시

```markdown
arr[0] = 10
arr[1] = 20
arr[2] = 30
arr[3] = 40
arr[4] = 50

---

포인터 p로 출력한 arr[0] = 10
포인터 p로 출력한 arr[1] = 20
포인터 p로 출력한 arr[2] = 30
포인터 p로 출력한 arr[3] = 40
포인터 p로 출력한 arr[4] = 50
```

💡 핵심 포인트
배열 인덱스 arr[i] 는 사실 \*(arr+i) 와 같은 의미다.

arr 는 배열의 시작 주소를 가리키는 포인터처럼 동작한다.

따라서 arr[i], _(arr+i), _(p+i) 는 모두 동일한 결과를 준다.

🔗 [전체 코드 보기 (GitHub)](https://github.com/pie0902/C/blob/main/src/2.array_vs_pointer.c)

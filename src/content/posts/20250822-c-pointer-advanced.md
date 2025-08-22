---
title: 'C언어 포인터 심화: void*, 다중 포인터, 주소와 값'
description: 'C언어 포인터의 심화 개념인 void*, 다중 포인터, 주소와 값 관계를 예제 코드와 함께 설명합니다.'
published: '2025-08-22T00:00:00.000Z'
tags: ['C언어', '포인터']
series: 'C언어'
---

# C언어 포인터 심화: void\*, 다중 포인터, 주소와 값

## 1. void\* 포인터

```c
#include <stdio.h>
int main() {
    int a = 100;
    double b = 3.14;
    void *vp;

    vp = &a;
    printf("a = %d\n", *(int*)vp);

    vp = &b;
    printf("b = %.2f\n", *(double*)vp);
}
```

- void\*는 "주소를 담는 바구니" 로 비유 가능

- 실제 값을 꺼낼 땐 반드시 형변환을 해줘야 함

---

## 2. 다중 포인터

- 포인터를 가리키는 포인터.

- 2차원 배열 동적 할당 같은 곳에서 많이 쓰임.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int rows = 3, cols = 4;
    int **matrix = malloc(rows * sizeof(int*)); // 행 포인터 배열

    for (int i = 0; i < rows; i++) {
        matrix[i] = malloc(cols * sizeof(int)); // 각 행에 열 할당
    }

    // 값 넣기
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            matrix[i][j] = i * cols + j;
            printf("matrix[%d][%d] = %d (주소: %p)\n",
                   i, j, matrix[i][j], (void*)&matrix[i][j]);
        }
    }

    // 메모리 해제
    for (int i = 0; i < rows; i++) free(matrix[i]);
    free(matrix);
}
```

- matrix 자체는 int\*들의 배열

- 각 matrix[i]가 또 int 배열을 가리킴

---

## 3. 포인터와 주소/값 관계

```c

int a = 10;
int *p = &a; // p에는 a의 주소 저장
p → a의 주소 저장

*p → 주소에 들어있는 값 (즉 10)
```

- 정리:
  - 타입 옆에 \* → 포인터 선언

  - 변수 앞에 \* → 역참조 (값 꺼내기)

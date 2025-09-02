---
title: '리눅스 커널 - 시스템 콜'
published: '2025-09-02T14:00:00.240Z'
tags: ['linux-kernel', 'system-call']
series: 'linux-kernel'
---

# system call이란?

- system call: 프로그램이 커널한테 직접 하는 부탁이다.

```bash
printf("Hello\n")
```

- 간단하게 printf로 “Hello”를 출력할 때에도 뒤에서는 커널한테 부탁을 한다. (글자 좀 화면에 나오게 해줘!)

## 1.system call에서 자주 쓰는 번호와 상수 정리

### 1-1. 파일 디스크립터 번호 (fd)

| 번호  | 의미                            | 비유                      |
| ----- | ------------------------------- | ------------------------- |
| **0** | 표준 입력 (stdin, 보통 키보드)  | “내가 입력하는 통로”      |
| **1** | 표준 출력 (stdout, 보통 화면)   | “화면에 글자 나오는 통로” |
| **2** | 표준 에러 (stderr, 오류 메시지) | “에러 전용 통로”          |

---

### 1-2. 주요 system call 상수 (SYS\_…)

| 상수          | 의미                | 설명                                                                   |
| ------------- | ------------------- | ---------------------------------------------------------------------- |
| **SYS_read**  | read 시스템콜 번호  | `syscall(SYS_read, fd, buf, size)` → fd에서 size만큼 읽어서 buf에 저장 |
| **SYS_write** | write 시스템콜 번호 | `syscall(SYS_write, fd, buf, size)` → buf 내용을 fd로 출력             |
| **SYS_open**  | open 시스템콜 번호  | 파일 열기 (`syscall(SYS_open, "file.txt", O_RDONLY)`)                  |
| **SYS_close** | close 시스템콜 번호 | 열린 파일 닫기                                                         |

---

### 1-3. 코드 예시 속 의미 다시 보기

```c
syscall(SYS_read, 0, buf, sizeof(buf));
// → 키보드(0번 통로)에서 입력을 buf에 저장

syscall(SYS_write, 1, buf, n);
// → 화면(1번 통로)으로 buf 내용을 n바이트 출력

```

## 2. 직접 system call 사용해서 써보기

### 2-1) printf 없이 출력하기

```bash
#include <unistd.h>       // 표준 POSIX 헤더, write/read 같은 시스템콜 번호/함수 정의
#include <sys/syscall.h>  // syscall() 함수와 SYS_write 같은 상수 정의
#include <stdio.h>        // 표준 입출력 라이브러리 (여기선 안 쓰이지만 printf 같은 함수 있음)

int main() {
    // 출력할 문자열 준비 (const char* → 문자열 리터럴 포인터)
    const char *msg = "Hello from syscall\n";

    // syscall() 함수 호출
    // SYS_write → write 시스템콜 번호
    // 인자 설명:
    //   1 → 파일 디스크립터 (1 = stdout)
    //   msg → 출력할 문자열 시작 주소
    //   20 → 출력할 바이트 수 (길이)
    syscall(SYS_write, 1, msg, 20);

    return 0;
}

```

### 2-2 입력 받아서 출력하기

```bash
#include <unistd.h>
#include <sys/syscall.h>

int main(){
    char buf[100]; //입력 받을 배열
    // 키보드 (표준 입력, fd = 0)에서 글자 받기
    int n = syscall(SYS_read,0,buf,sizeof(buf));

    //읽은 글자를 화면에 표준 출력으로 다시 쓰기
    syscall(SYS_write,1,buf,n);
    return 0;
}
```

### 오늘의 정리

오늘은 커널에 직접 시스템 콜을 던져봤다.

그동안은 그냥 `printf` 같은 함수로 출력만 했는데,

알고 보니 그 뒤에서 커널이 `write` 시스템 콜을 받아서 일을 하고 있었다.

코드를 짤 때는 단순히 “출력한다”라고만 생각했는데,

사실은 커널이 그 과정을 모두 대신 처리해주고 있었던 거다.

평소 당연하게 쓰던 입출력, 파일 다루기 같은 기본 동작조차

커널이 없으면 불가능하다는 걸 조금은 체감했다.

작은 실습이었지만,

겉으로 보이는 코드 뒤에 숨어 있는 커널의 역할을 직접 확인할 수 있었다는 점에서 의미 있었다.

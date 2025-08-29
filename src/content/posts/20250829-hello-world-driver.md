---
title: '리눅스 커널 - 디바이스 드라이버(Hello 모듈 실습)'
published: '2025-08-29T16:59:43.240Z'
tags: ['linux-kernel', 'device-driver']
series: 'linux-kernel'
---

# 리눅스 커널 - 디바이스 드라이버

### 오늘의 공부 목차

1. 드라이버 개념 이해
2. 드라이버의 종류
3. 실습 준비

## 1. 드라이버 개념 이해

- 디바스 드라이버 = 커널이 하드웨어랑 대화하는 통역사라고 생각하면 된다.
- 예시
  - 키보드 입력 → 드라이버가 읽어서 커널에 전달 → 프로그램이 사용
  - 네트워크 카드 → 드라이버가 패킷 주고받음
- **리눅스 드라이버 형태**
  1. **빌트인 (Built-in)**
     - 커널 컴파일 시 아예 포함됨 (`y` 옵션)
     - 부팅 시 항상 커널 안에 존재
  2. **모듈(Module)**
     - 필요할 때 `insmod`/`modprobe`로 삽입 가능 (`m` 옵션)
     - 메모리 절약 + 유지보수 편함
- **리눅스는 모놀리식 커널 (Monolithic Kernel)**
  - 커널 공간에서 모든 핵심 기능 + 드라이버가 동작
  - 모듈 시스템 덕분에 “유연한 모놀리식”이라고도 불림
- **윈도우 = 하이브리드 커널 (Hybrid Kernel)**
  - NT 커널 구조: 마이크로커널 + 모놀리식 특성 혼합
  - 일부 기능(윈도우 서브시스템 등)은 유저 모드 서비스로 동작

---

## 2. 드라이버의 종류

### 2-1. 캐릭터 디바이스 (Character Device)

- **특징**
  - 데이터를 **바이트 단위**로 차례대로 읽고 쓰는 장치
  - 스트림(stream)처럼 순차적으로 입출력 → “파일처럼 한 글자씩 처리”
- **예시**
  - `/dev/tty` → 터미널 (키보드 입력, 화면 출력)
  - `/dev/null` → 쓰면 버려지고, 읽으면 아무 것도 없는 장치
- **비유**: 수도꼭지에서 물이 한 줄기로 계속 흐르는 것처럼 “한 줄 흐름”

---

### 2-2. 블록 디바이스 (Block Device)

- **특징**
  - 데이터를 **블록 단위(일정 크기, 보통 512B~4KB)**로 묶어서 입출력
  - 랜덤 액세스 가능 → 특정 블록만 읽거나 쓸 수 있음
- **예시**
  - HDD, SSD, SD카드
  - 리눅스에서 `/dev/sda`, `/dev/mmcblk0` 같은 장치
- **비유**: 책을 생각하면, 한 장(=블록) 단위로 바로 펼쳐볼 수 있음

---

### 2-3. 네트워크 디바이스 (Network Device)

- **특징**
  - 데이터를 **패킷 단위**로 송수신
  - 일반 파일처럼 read/write가 아니라, 네트워크 스택을 통해 send/recv
- **예시**
  - `eth0` (유선 이더넷)
  - `wlan0` (무선 WiFi)
- **비유**: 편지를 보내면 “봉투(패킷)” 단위로 이동하는 것과 비슷

---

## 보충 개념

- **바이트 단위**
  - 데이터의 최소 표현 단위 (1 byte = 보통 8bit = 숫자 0~255 표현 가능)
  - 캐릭터 디바이스는 이 최소 단위로 순서대로 입출력
- **/dev/sda**
  - 리눅스에서 **첫 번째 SCSI/SATA 디스크**를 의미
  - Windows의 `C:` 드라이브와 비슷하게 보일 수 있지만, 완전히 같진 않음
    - Windows: 드라이브 문자(`C:`, `D:`)
    - Linux: 디바이스 파일(`/dev/sda`, `/dev/sdb`) + 마운트 포인트(`/`, `/home` 등)
  - 예: `/dev/sda1` = 첫 번째 디스크의 첫 번째 파티션

---

정리하면:

- 캐릭터 → 한 글자씩 (순차 스트림)
- 블록 → 덩어리 단위 (랜덤 액세스 가능)
- 네트워크 → 봉투 단위 (패킷 전송)
- `/dev/sda`는 리눅스의 “디스크 장치 파일”이지 Windows `C:`처럼 고정된 건 아님.

## 3. 실습 준비

실습에 앞서 라즈베리파이3b가 있어서 라즈베리파이로 실행했다.

- Ubuntu / Raspberry Pi 환경에서 커널 헤더 설치:
  ```bash
  sudo apt update
  sudo apt install build-essential linux-headers-$(uname -r)
  ```

라즈베리파이에서 커널 드라이버를 만들려면 두 가지 도구가 필요하다.

1. build-essential
   - 쉽게 말해서 C언어 프로그램을 만들 수 있는 기본 공구세트
   - 안에 들어있는 것들
     - gcc → 컴파일러
     - make → 실행기
     - 기타 라이브러리
   - 드라이버도 결국은 c언어로 쓰인 프로그램이라서 필요함
2. raspberrypi-kernel-headers

- 리눅스 드라이버는 커널과 직접 대화해야 한다.
- 근데 커널은 너무 크고 복잡하다. 우리가 직접 모든 코드를 볼 필요가 없다.
- 대신 “커널이 이런 기능을 이렇게 쓸 수 있어” 라고 정리된 설명서(헤더 파일)가 필요하다.
- 라즈베리파이에 설치된 커널 버전과 똑같은 헤더를 설치해야 드라이버가 정상적으로 빌드된다.
- 맞는 헤더가 에러 뜨고 빌드 실패

1. 작업용 디렉토리 만들기:

```bash
mkdir ~/driver_dev && cd ~/driver_dev
```

4. Hello Driver 모듈 코드

**hello_driver.c**

```c
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>

// 모듈이 로드될 때 실행
static int __init hello_init(void){
    printk(KERN_INFO "Hello, thunder's first driver!\n");
    return 0;
}

// 모듈이 제거될 때 실행
static void __exit hello_exit(void){
    printk(KERN_INFO "Goodbye, driver!\n");
}

module_init(hello_init);
module_exit(hello_exit);

MODULE_LICENSE("GPL");
MODULE_AUTHOR("thunder");
MODULE_DESCRIPTION("Simple Hello World Driver");
```

---

## 5. Makefile

**Makefile**

```
obj-m += hello_driver.o

all:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) modules

clean:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) clean

```

### 명령어 해부

```
make -C /lib/modules/$(shell uname -r)/build M=$(PWD) modules
```

### 1. `make`

- **리눅스 커널이 제공하는 Kbuild Makefile**을 실행.
- 즉, “커널 빌드 시스템”을 불러내는 명령어.

---

### 2. `C /lib/modules/$(shell uname -r)/build`

- `C` 옵션 = 이 디렉토리로 들어가서(make chdir) Makefile 실행하라는 뜻.
- `/lib/modules/$(shell uname -r)/build`
  - `$(shell uname -r)` → 현재 커널 버전 문자열 (`6.1.21-v7+`)
  - `/lib/modules/6.1.21-v7+/build` → 현재 커널 빌드 디렉토리 (커널 헤더가 있는 곳)
- 즉, 현재 커널 헤더 빌드 시스템으로 들어가라는 뜻.

---

### 3. `M=$(PWD)`

- `M` 변수는 **모듈 소스 코드가 있는 디렉토리**를 의미.
- `$(PWD)` → 지금 네가 있는 디렉토리 (`~/driver_dev`)
- 즉, “내가 모듈 소스를 여기 두었으니, 여기서 빌드해줘” 라는 뜻.

---

### 4. `modules`

- 커널 빌드 시스템에 정의된 **타겟(target)** 이름.
- “외부 모듈을 빌드해라”라는 명령.
- 따라서 위 전체 명령은:
  > “커널 빌드 시스템을 불러와서, 내 디렉토리(M=$(PWD))에 있는 소스로 모듈을 컴파일해라”

---

### 정리

- `make` = 커널 빌드 시스템 실행
- `C .../build` = 커널 소스/헤더 디렉토리로 이동
- `M=$(PWD)` = 현재 내 모듈 소스 있는 디렉토리 지정
- `modules` = “모듈 빌드하라” 타겟 실행

### 흐름도

```
┌─────────────────────┐
│ make                │   ← "빌드 해줘!" 실행
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ -C /lib/modules/... │   ← 현재 커널 버전 빌드 시스템 디렉토리로 이동
│ (커널 헤더 & Kbuild)│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ M=$(PWD)            │   ← 내 모듈 소스(hello_driver.c)가 있는 경로 알려줌
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Target: modules     │   ← "외부 모듈 빌드" 명령 실행
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ 결과물 생성         │
│ hello_driver.ko     │   ← 커널 모듈 파일 완성!
└─────────────────────┘

```

---

## 6. 빌드 & 실행 과정

### 6-1. 모듈 빌드

```bash
make
```

- `hello_driver.c` → `hello_driver.o` (중간 산출물)
- `hello_driver.o` → `hello_driver.ko` (최종 커널 모듈)

### 6-2. 모듈 삽입

```bash
sudo insmod hello_driver.ko
```

- 커널 공간에 모듈 삽입
- `hello_init()` 함수 실행 → 로그 출력

### 6-3. 로그 확인

```bash
dmesg | grep thunder
```

출력 예시:

```
[ 1273.997271] Hello, thunder's first driver!
```

### 6-4. 모듈 제거

```bash
sudo rmmod hello_driver
dmesg | grep thunder
```

출력 예시:

```
[ 1287.868108] Goodbye, driver!
```

### 최종 로그

![hello_module.png](/images/hello_module.png)

---

## 7. 실습으로 알게 된 점

1. **커널 모듈의 개념**
   - 커널에 동적으로 추가/삭제할 수 있는 코드 조각
   - 전체 커널을 다시 빌드하지 않아도 기능을 확장할 수 있다.
2. **모듈 생명주기**
   - `hello_init()` → insmod 시 실행
   - `hello_exit()` → rmmod 시 실행
3. **로그 출력 방식**
   - 커널에는 `printf`가 없음 → 대신 `printk` 사용
   - 결과는 `dmesg`로 확인
4. **모듈이 올라가 있는지 확인**

   ```bash
   lsmod | grep hello_driver
   ```

   → 현재 로드된 모듈 리스트에서 확인 가능

---

## 8. 웹 개발 비유로 이해하기 (쉽게 설명)

- **커널 = 웹 서버(Spring Boot)**
- **모듈(.ko) = 컨트롤러/플러그인**
- **hello_init() = @PostConstruct (초기화)**
- **hello_exit() = @PreDestroy (정리)**
- **printk → dmesg = System.out.println → 로그**

즉, 오늘 한 건 “실행 중인 서버에 HelloController 하나 붙였다가 뗀 것”과 동일하다

---

## 오늘의 공부 정리

커널은 **하드웨어와 운영체제가 실시간으로 소통하는 창구** 같은 존재다.

운영체제 과목 공부를 할 때는 항상 암기식으로만 접근해서, 뭔가 겉도는 느낌이 있었다.

그런데 오늘은 리눅스 커널에 직접 모듈을 올려보고(`insmod`), 로그를 출력해보며(`dmesg`)

추상적이던 개념이 조금 더 구체적으로 와닿았다.

마치 뭉개구름 같던 그림이 점점 해상도가 올라가는 느낌이라고 할까?

아직 공부할 부분은 산더미지만,

꾸준히 실습하며 **커널의 동작 원리**를 내 것으로 만드는 그날까지 달려가 보자!

---
title: 'esp32 공부하기(1)'
published: '2025-09-20T18:54:00.240Z'
tags: ['임베디드', 'esp32']
series: 'esp32'
description: 'esp32 프로젝트 설정'
---

# esp32 프로젝트 설정

## esp32를 공부하는 이유

### esp32를 구매하고 공부하게된 이유

베란다에 여름부터 키우던 바질이 있다. 바질은 물을 많이 먹는 식물이다.

그래서 그런가.. 잊고있다가 3일 뒤에 보면 화분에 있는 흙이 다 말라있다.

그러다보니 자연스럽게 토양센서를 달아서 물이 부족할때마다 핸드폰에 알람이 오면 편하지 않을까 생각이 들었다.

무엇으로 개발해야할지 모르겠어서 구글에 검색을 해보니 esp32에는 와이파이와 블루투스가 내장되어 있고 가격도 저렴하다 하여 구매를 했다.

하지만 지금부터 만드는 프로젝트들을 어떻게든 써먹고 싶으니.. 식물 토양 센서가 되기전에 빼먹을 수 있는 지식들을 학습한 뒤에(?) 개발을 들어가야겠다 생각해서 이렇게 블로그를 작성한다.

## esp32에 대해서 알아보자

### esp32는 무엇?

- 32비트 MCU
  - 일반적인 아두이노(8비트 AVR)보다 더 강력한 32비트 프로세서(Xtensa 듀얼코어, 일부 모델은 RISC-V) 사용

- 무선 통신 내장
  - Wi-Fi와 Bluetooth(BLE 포함)를 칩 안에 내장 → 별도 모듈 없이 자체적으로 무선 통신 가능

- 저전력 동작 지원
  - Deep Sleep 모드 제공 → 배터리 기반 IoT 기기에 적합

- 활용 분야
  - IoT 센서, 스마트홈 기기, 웨어러블, 간단한 네트워크 서버 등

## esp32를 실행해보자

### git clone

- esp32 공식 sdk를 깃허브에서 받아온다.
- ESP-IDF 안에는 “ESP32 동작을 위한 모든 소스코드 + 예제”가 들어 있다.
- 다운받은 뒤에는 cd esp-idf && ./install.sh all 설치스크립트를 실행한다.
  - Xtensa 크로스 컴파일러 다운로드
  - CMake, Ninja 같은 빌드 도구 설치
  - python 가상환경 생성 등 개발 도구를 자동으로 설치해줌

```bash
# 1. ESP-IDF 받을 디렉토리 만들기
mkdir -p ~/esp
cd ~/esp

# 2. ESP-IDF GitHub에서 다운로드 (버전 5.2 권장)
git clone -b v5.2 --recursive https://github.com/espressif/esp-idf.git

# 3. 설치 스크립트 실행 (툴체인 자동 설치)
cd esp-idf
./install.sh all

```

설치가 끝난 뒤 환경 변수 등록

```bash
. $HOME/esp/esp-idf/export.sh
```

- idf.py, xtensa-esp32-elf-gcc 같은 명령어를 path에 추가하는 과정

### idf.py는 esp-idf 빌드 시스템이다.

idf.py build → 크로스 컴파일러(GCC) 사용

idf.py flash → esptool로 펌웨어 전송

idf.py monitor → miniterm으로 UART 로그 확인

### 스프링부트로 서버 개발하는 것과 비교

Spring Boot: 코드 작성 → gradle build → 서버 배포(jar 실행) → 로그 확인

ESP32: 코드 작성 → idf.py build → 보드 플래시(bin 업로드) → UART 모니터

## VSCode 확장 프로그램 설치하기

ESP-IDF는 터미널에서만 다뤄도 충분하지만,  
VSCode의 **ESP-IDF Extension**을 설치하면 GUI 환경에서 더 편하게 쓸 수 있다.

1. VSCode의 확장 탭에서 `ESP-IDF` 검색
2. ESPRESSIF에서 제공하는 **ESP-IDF Extension** 설치
3. 좌측 메뉴에 ESP-IDF 아이콘이 추가됨
4. 여기서 `New Project` 버튼을 눌러 프로젝트를 바로 생성할 수 있고,  
   Build / Flash / Monitor 버튼도 제공되어 명령어 입력 없이 실행 가능하다.

👉 내부적으로는 여전히 `idf.py build/flash/monitor`를 실행하는 것이지만,  
VSCode UI를 통해 더 직관적으로 작업할 수 있다.

## 설치가 완료되면..

1. VSCode 확장에서 New Project -> template-app을 선택해서 프로젝트를 만든다.
2. 프로젝트 이름과 저장 경로를 입력한다.
3. main/app_main.c 안에서 코드를 작성한다.

> 잘 나오는지 확인해보려고 hello world를 출력해본다.

```C
#include <stdio.h>

void app_main(void)
{
    printf("Hello, World!\n");
}
```

그리고

1.빌드

```bash
idf.py build
```

2. 보드에 업로드

```bash
idf.py -p /dev/cu.usbserial-0001 flash
```

3. 모니터 (시리얼로 확인)

```bash
idf.py -p /dev/cu.usbserial-0001 monitor
```

반복 사이클

코드 수정 → 빌드 → 플래시 → 모니터 → 동작 확인

이 과정을 반복하면서 FreeRTOS Task, 센서, 네트워킹 기능을 점점 추가하면 된다.

스크립트를 만들면 편할 것 같지만, 학습할때는 일단 직접 해봐야겠다.
![hello world 출력](<images/esp32/esp32(1).png>)

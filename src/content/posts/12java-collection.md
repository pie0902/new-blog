---
title: "12.Java Collection"
description: "Java Collection Java프로그래밍 에서는 배열을 더 고도화 시켜서 컬렉션 이라는 이름으로 참조형 자료구조를 제공하고 있습니다. 컬렉션은 참조형 변수만 저장함으로써 여러 기능을 많이 제공합니다. Collection의 종류 List - 순서가 있는 데이터의 집합 (데이터 중복 허용) 주요 구현체 : ArrayList, LinkedList, Vector 사용 예) 데이터 순서가 중요한 경우, 동적 배열이 필요한 경우 등. Se..."
published: "2024-01-02T15:00:00.000Z"
tags: []
series: "과거 Hashnode"
---

## Java Collection

Java프로그래밍 에서는 배열을 더 고도화 시켜서 컬렉션 이라는 이름으로 참조형 자료구조를 제공하고 있습니다. 컬렉션은 참조형 변수만 저장함으로써 여러 기능을 많이 제공합니다.

#### Collection의 종류

* List - 순서가 있는 데이터의 집합 (데이터 중복 허용)
    
    * 주요 구현체 : ArrayList, LinkedList, Vector
        
    * 사용 예) 데이터 순서가 중요한 경우, 동적 배열이 필요한 경우 등.
        
* Set - 중복을 허용하지 않는 유일한 요소들의 집합
    
    * 주요 구현체 : HashSet, LinkedHashSet, TreeSet
        
    * 사용 예) 중복 없는 데이터 집합이 필요한 경우,집합 연산이 필요한 경우 등.
        
* Queue - 일반적으로 FIFO(First-In-First-Out)순서를 따르는 요소들의 컬렉션
    
    * 주요 구현체: LinkedList, PriorityQueue
        
    * 사용 예) 대기열 관리,프로세스 스케줄링 등.
        
* Map - 키-값 쌍으로 데이터를 저장합니다. 각 키는 유일합니다 (키의 중복 허용안함)
    
    * 주요 구현체 : HashMap, LinkedHashMap, TreeMap, HashTable
        
    * 사용 예) 키를 통한 빠른 데이터 접근이 필요한 경우, 데이터의 연관 관계 표현 등.
---
title: "15.Java HashMap 다시 복습"
description: "알고리즘 문제를 풀다가 기초 문법이 부실하다는 생각이 들었다.이론으로 알고있는 것과 손가락으로 두들겨본 코드는 다르니.. 그래서 복습을 진행했다. 1. 그룹화 애너그램 그룹화: 문자열 배열 strs가 주어졌을 때, 애너그램(문자를 재배열하여 다른 단어를 만들 수 있는 단어)끼리 그룹화하는 프로그램을 작성하세요.HashMap을 사용하여 애너그램 그룹을 관리하고, 결과를 출력하세요. import java.util.ArrayList; import..."
published: "2024-06-27T06:08:46.599Z"
tags: []
series: "과거 Hashnode"
---

알고리즘 문제를 풀다가 기초 문법이 부실하다는 생각이 들었다.  
이론으로 알고있는 것과 손가락으로 두들겨본 코드는 다르니..

그래서 복습을 진행했다.

## 1\. 그룹화

> 애너그램 그룹화: 문자열 배열 strs가 주어졌을 때, 애너그램(문자를 재배열하여 다른 단어를 만들 수 있는 단어)끼리 그룹화하는 프로그램을 작성하세요.  
> HashMap을 사용하여 애너그램 그룹을 관리하고, 결과를 출력하세요.

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class 그룹화 {
    public static void main(String[] args) {
        String[] strs = {"eat", "tea", "tan", "ate", "nat", "bat"};
        Map<String,List<String>> map = new HashMap<>();
        for(String str : strs) {
            char[] chars = str.toCharArray();
            Arrays.sort(chars);
            String sortStr = new String(chars);

            if (!map.containsKey(sortStr)) {
                map.put(sortStr, new ArrayList<>());
            }
            map.get(sortStr).add(str);
        }
        for(Map.Entry<String,List<String>> entry: map.entrySet()){
            String key = entry.getKey();
            List<String> value = entry.getValue();
            System.out.println(key + " " + value);
        }
    }
```

## 2\. 단어 빈도 세기

```java
import java.util.HashMap;

public class 단어빈도세기 {
    public static void main(String[] args) {
        String[] words = {"prevention예방", "avoidance회피", "recovery복구", "ignorance무시",
            "prevention예방"};
        HashMap<String, Integer> Wm = new HashMap<>();

        for (String word : words) {
            Wm.put(word,Wm.getOrDefault(word,0)+1);
        }
        for(String word : Wm.keySet()) {
            int num = Wm.get(word);
            System.out.println(word + ": " + num + "번");
        }
    }
}
```

## 3\. 학생 점수 관리

> 학생 점수 관리: 학생의 이름을 키로, 점수를 값으로 하는 HashMap을 생성하세요.  
> 학생 이름과 점수를 입력받아 HashMap에 저장하고, 학생 이름을 입력받아 해당 학생의 점수를 출력하는 프로그램을 작성하세요.

```java

public class 학생점수관리 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String name="";
        Map<String,Integer> note = new HashMap<>();
        while(!name.equals("stop")) {
            System.out.print("이름을 입력하세요: ");
            name = scanner.nextLine();

            if(!name.equals("stop")) {
                System.out.print("점수를 입력하세요: ");
                int score = scanner.nextInt();
                scanner.nextLine();
                note.put(name, score);
            }
        }

        for(String printName: note.keySet()){
            int score = note.get(printName);
            System.out.println(printName +": "+score);
        }
    }
}
```

## 4\. 학생 정보 관리

> 학생 점수 관리: 학생의 이름을 키로, 점수를 값으로 하는 HashMap을 생성하세요.  
> 학생 이름과 점수를 입력받아 HashMap에 저장하고, 학생 이름을 입력받아 해당 학생의 점수를 출력하는 프로그램을 작성하세요.

```java
public class 학생점수관리 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String name="";
        Map<String,Integer> note = new HashMap<>();
        while(!name.equals("stop")) {
            System.out.print("이름을 입력하세요: ");
            name = scanner.nextLine();

            if(!name.equals("stop")) {
                System.out.print("점수를 입력하세요: ");
                int score = scanner.nextInt();
                scanner.nextLine();
                note.put(name, score);
            }
        }

        for(String printName: note.keySet()){
            int score = note.get(printName);
            System.out.println(printName +": "+score);
        }
    }
}
```

### 오늘의 중점 정리

#### Map.Entry 문법

* Map.Entry 는 Map 인터페이스 내부 인터페이스로, 맵의 각 키-쌍 값을 나타내는 객체다.
    
* getKey(),getValue() 메서드를 제공하여 키와 값을 얻을 수 있다.
    

> 예를들어  
> Map&lt;String,Integer&gt; list = new HashMap&lt;&gt;();  
> 라는 객체가 있을 때 모든 키-쌍을 출력하는 코드

```java
for(Map.Entry<String,Integer> entry : list){
    String key = entry.getKey();
    int value = entry.getValue();

    System.out.println("키 " + key + ", 값 " + value );
} 
```
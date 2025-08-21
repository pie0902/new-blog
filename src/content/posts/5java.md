---
title: "5.Java 반복문"
description: "import java.util.Scanner; public class Hello { public static void main(String[] args) { String a = \"Hello\"; String b = new String(\"Hello\"); //boolean 문자열을 비교할때는 equals를 사용한다. //이유는 나중에 생성자를 사용할때를 대비해서라는데.. 일단..."
published: "2023-12-21T15:00:00.000Z"
tags: []
series: "과거 Hashnode"
---

```java
import java.util.Scanner;

public class Hello {
    public static void main(String[] args)
    {
        String a = "Hello";
        String b = new String("Hello");

        //boolean 문자열을 비교할때는 equals를 사용한다.
        //이유는 나중에 생성자를 사용할때를 대비해서라는데.. 일단을 이렇게 알아두라고 하심 - 생활코딩

        /* 반복문으로 바로 응용 */
        for(var i = 0; i<a.length();i++){
            System.out.println(a + i + "for\n");
        }
        int i = 0;
        while(i<a.length()){
            System.out.println(a + i + "while\n");
            i++;
        }
    }
}
```

반복문에서는 for문과 while문을 많이 사용합니다.

그동안 사용했던 문자열 예제로 for문과 반목문으로 a라는 변수에 담긴 문자열을

문자열의 길이만큼 출력해봤습니다.
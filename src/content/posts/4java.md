---
title: "4.Java 조건문"
description: "public class Hello { public static void main(String[] args) { String a = \"Hello\"; String b = new String(\"Hello\"); //boolean 문자열을 비교할때는 equals를 사용한다. //이유는 나중에 생성자를 사용할때를 대비해서라는데.. 일단을 이렇게 알아두라고 하심 - 생활코딩 ..."
published: "2023-12-20T15:00:00.000Z"
tags: ['Java']
series: "과거 Hashnode"
---

```java
public class Hello {
    public static void main(String[] args)
    {
        String a = "Hello";
        String b = new String("Hello");

        //boolean 문자열을 비교할때는 equals를 사용한다.
        //이유는 나중에 생성자를 사용할때를 대비해서라는데.. 일단을 이렇게 알아두라고 하심 - 생활코딩

        /* 조건문으로 바로 응용 */
        if(a.equals(b)){
            System.out.println("true");
        }
        else{
            System.out.println("false");
        }
    }
}
```

조건문을 간단하게 작성해봤습니다.
---
title: "6.Java 계산기 만들기"
description: "가장 훌륭한 학습방법은 직접 실습으로 작은 프로젝트부터 만드는것이라고 생각합니다. 그래서 간단한 사칙연산을 할수있는 계산기를 작성해봤습니다. import java.util.Scanner; class Calculator{ public static int add(int a, int b){ return a+b; } public static int minus(int a, int b){ return a..."
published: "2023-12-22T15:00:00.000Z"
tags: []
series: "과거 Hashnode"
---

가장 훌륭한 학습방법은 직접 실습으로 작은 프로젝트부터 만드는것이라고 생각합니다.

그래서 간단한 사칙연산을 할수있는 계산기를 작성해봤습니다.

```java
import java.util.Scanner;

class Calculator{
    public static int add(int a, int b){
        return a+b;
    }
    public static int minus(int a, int b){
        return a-b;
    }
    public static int multiply(int a, int b){
        return a*b;
    }
    public static int divide(int a, int b){
        return a/b;
    }
}
public class Hello {
    public static void main(String[] args){
        System.out.println("연산자를 입력하세요 (+, -, *, /): ");
        Scanner scanner = new Scanner(System.in);
        String c = scanner.next();
        System.out.println("숫자 두개를 입력하세요");
        int a = scanner.nextInt();
        int b = scanner.nextInt();

        Calculator calculator = new Calculator();
        switch(c){
            case "+":
                System.out.println(calculator.add(a,b));
                break;
            case "-":
                System.out.println(calculator.minus(a,b));
                break;
            case "*":
                System.out.println(calculator.multiply(a,b));
                break;
            case "/":
                System.out.println(calculator.divide(a,b));
                break;
            default:
                System.out.println("유효하지않은 값을 입력했습니다.");
                break;
        }

    }
}
```

[GitHub Link](https://github.com/pie0902/study_java/blob/main/calculator/Hello.java)
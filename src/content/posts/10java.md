---
title: "10.Java 추상화"
description: "추상화란? 복잡한 것들을 일반적인 형태로 단순화합니다. 코드의 재사용성이 증가합니다. 🤔 요약을 해도 저는 잘 이해가 안 가서요.. 제가 이것저것 찾아본 자료를 한번정리를 해보겠습니다. 평소에 자주 쓰는 반복문도 추상화다!? 우리가 평소에 자주쓰는 반복문(for, while)도 추상화를 한 것이라고 합니다. 예를 들어서 컴퓨터에게 \"여러 번 같은 작업을 수행해!\"라고 지시하는 대신, for/while 반복문을 사용하여 이를 간결하..."
published: "2023-12-29T15:00:00.000Z"
tags: []
series: "과거 Hashnode"
---

### **추상화란?**

---

* 복잡한 것들을 일반적인 형태로 단순화합니다.
    
* 코드의 재사용성이 증가합니다.
    

---

## **🤔**

요약을 해도 저는 잘 이해가 안 가서요.. 제가 이것저것 찾아본 자료를 한번  
정리를 해보겠습니다.

## **평소에 자주 쓰는 반복문도 추상화다!?**

* 우리가 평소에 자주쓰는 반복문(for, while)도 추상화를 한 것이라고 합니다. 예를 들어서 컴퓨터에게 "여러 번 같은 작업을 수행해!"라고 지시하는 대신, for/while 반복문을 사용하여 이를 간결하게 표현을 하는 것이라고 합니다.
    
* 이렇게 반복을 하게 되면 복잡한 반복 로직을 숨기고, 개발자가 보다 직관적이고 이해하기 쉬운 방식으로 반복 작업을 구현할 수 있게 해 줍니다.
    

적당한 설명이 되었을까요? 하지만 더욱더 잘 이해해 보도록 노력해 보겠습니다.

추상화에 쓰이는 코드는 대표적으로 abstract와 interface가 있습니다.

* 두 코드의 공통점으로는 둘 다 객체를 만들 수 없는 클래스입니다.
    
    ## 1\. abstract
    

#### **abstract는 설계도로 비유한다**

* abstract를 알기 전에 미리 알아야 하는 것들
    

1. abstract는 상속 키워드로 extends를 사용합니다.
    
2. 추상 메서드는 하위클래스에서 override를 강제해야 합니다.
    
3. 추상 메서드를 포함하는 클래스는 반드시 추상 클래스여야 합니다.
    
4. 다중 상속이 불가능합니다.
    

* 3개의 제조사에서 핸드폰을 만듭니다.(Samsung, Apple, Nothing)
    
* 전화기에는 전화하는 기능이 필요합니다.
    

```java
class SamsungPhone {  
    public void call() {  
        System.out.println("삼성폰으로 전화를 겁니다.");  
    }  
}  
class ApplePhone {  
    public void call() {  
        System.out.println("아이폰으로 전화를 겁니다.");  
    }  
}  
class NothingPhone {  
    public void call(){  
        System.out.println("낫싱폰으로 전화를 겁니다.");  
    }  
}  
public class Main {  
    public static void main(String [] args) {  
        SamsungPhone samsung = new SamsungPhone();  
        ApplePhone apple = new ApplePhone();  
        NothingPhone nothing = new NothingPhone();  

        samsung.call();  
        apple.call();  
        nothing.call();  
    }  
}
```

* 예를 들어 이렇게 삼성폰, 애플폰, 낫싱폰으로 전화 기능이 있는 폰을 클래스로 구현했습니다.
    
* 코드를 보시면 전화를 하는 call 메서드가 중복됩니다.
    
* 그렇다면 아예 Phone이라는 상위 클래스를 만들어서 각 제조사별로 상속을 시킬 수 있지 않을까요?
    
* Phone이라는 상위 클래스에서 상속을 시켜서 제조사별로 클래스를 만들면 call이라는 기능을 확장시키면서 개발이 가능합니다.
    

```java
import java.util.ArrayList;  
import java.util.Arrays;  
import java.util.List;  
abstract class Phone {  
    public abstract void call();  
}  
class SamsungPhone extends Phone {  
    @Override  
    public void call() {  
        System.out.println("삼성폰으로 전화를 겁니다.");  
    }  
}  
class ApplePhone extends Phone{  
    @Override  
    public void call() {  
        System.out.println("아이폰으로 전화를 겁니다.");  
    }  
}  
class NothingPhone extends Phone{  
    @Override  
    public void call(){  
        System.out.println("낫싱폰으로 전화를 겁니다.");  
    }  
}  

public class Main {  
    public static void main(String [] args) {  
        List <Phone> cellPhones = new ArrayList <>(Arrays.asList(new    SamsungPhone(), new ApplePhone(), new NothingPhone()));  
        for(Phone phone:cellPhones){  
             phone.call();  
        }  
    }  
}
```

이렇게 구현을 했습니다.

위에서 쓴 코드에서

```java
abstract
```

* abstract로 추상화한 코드를 작성하고 자식 클래스에서 상속받아서 구현하는 것입니다. 직접 객체를 생성하진 못하지만 공통된 기능을 가진 클래스의 구조를 정의하면서도 그 구체적인 실행은 각각의 하위 클래스에 위임할 수 있습니다.
    
* 3개의 기종이 다른 핸드폰이 모두 통화하기 기능이 있고 상위 클래스 Phone에 있는 메서드 call기능을 오버라이딩(덮어쓰기) 해서 각자의 제조사 이름을 붙여 전화를 건다라고 출력을 합니다.
    

## **2.interface**

### **interface는 규칙 설명서**

* interface를 알기 전에 미리 알아야 하는 것들
    

1. interface는 구현부가 존재하지 않고 선언부만 존재합니다.
    
2. interface의 모든 멤버 변수는 public static final(상수)이어야 하고, 생략이 가능합니다.
    
3. interface의 모든 멤버 메서드는 public abstract이어야 하고, 생략이 가능합니다.
    
4. interface는 상속 키워드로 implements를 사용합니다.
    
5. 다중 상속이 가능합니다.
    

* 한국에서 사용되는 모든 핸드폰은 전화 걸기, 메시지 보내기 기능이 있어야 합니다.
    
* 3개의 다른 제조사 핸드폰은 각기 다른 방식으로 핸드폰을 제작하지만 위에 3가지 기능은 모든 핸드폰이 가져야 하는 가이드입니다. (한국에 저 두 가지 기능 중 한 개라도 빠져있으면 출시불가라고 가정할 때)
    

1. Samsung: 안드로이드 기반 폰을 만들지만 전화와 메시지 기능은 있습니다.
    
2. Apple: ios 기반 폰을 만들지만 전화와 메시지 기능은 있습니다.
    
3. Nothing: 안드로이드 기반으로 특이한 디자인의 폰을 만들지만 전화와 메시지 기능은 있습니다.
    

* 각자 다른 개성을 가진 제조사가 핸드폰을 만들 때 전화하기 메시지 보내기 기능은 꼭 넣어서 제작을 해야 합니다.
    
* interface에 정의된 메서드를 각 클래스의 목적에 맞게 동일한 기능으로 구현해야 합니다.
    

```java

import java.util.ArrayList;  
import java.util.Arrays;  
import java.util.Collections;  
import java.util.List;


interface Phone {  
    void call();  

    void text();  
}  
interface Test {  
    void testTest();  
}  
class SamsungPhone implements Phone, Test {  
    public void call(){  
        System.out.println("삼성폰으로 전화를 겁니다.");  
    }  
    public void text(){  
        System.out.println("삼성폰으로 문자를 보냅니다.");  
    }  
    public void testTest(){  
        System.out.println("왜 삼성만!");  
    }  
}  
class ApplePhone implements Phone {  
    public void call(){  
        System.out.println("아이폰으로 전화를 겁니다.");  
    }  
    public void text(){  
        System.out.println("아이폰으로 문자를 보냅니다.");  
    }  
}  
class NothingPhone implements Phone {  
    public void call(){  
        System.out.println("낫싱폰으로 전화를 겁니다.");  
    }  
    public void text(){  
        System.out.println("낫싱폰으로 문자를 보냅니다.");  
    }  
}  
public class Main {  
    public static void main(String [] args) {  
        SamsungPhone sp = new SamsungPhone();  
        ApplePhone ap = new ApplePhone();  
        NothingPhone np = new NothingPhone();  
        sp.call();  
        sp.testTest();  
        ap.call();  
        np.text();  
        }  
    }
```

이렇게 구현을 했습니다.

위에서 쓴 코드에서

```java
interface
```

* interface로 추상화한 코드를 작성하고 자식 클래스에서 상속받아서 구현했습니다.. 직접 객체를 생성하진 못하지만 공통된 규칙을 가진 클래스의 구조를 정의하면서도 그 구체적인 실행은 각각의 다른 기능을 구현할 수 있습니다.
    
* Samsung 클래스만 다중상속을 받아서 두 개의 기능을 구현해야 했습니다.
    
* 3개의 기종이 다른 핸드폰이 모두 통화하기와 문자 보내기 기능이 있고 상위 추상 클래스 Phone에 있는 메서드 call기능을 포함시켜서 각자의 제조사 이름을 붙여 전화를 건다라고 출력을 합니다.
    

---

## **차이점**

* 상속과 구현:
    
* abstract를 사용한 코드에서는 자식 클래스가 부모 클래스를 확장하는 것입니다..
    
* interface를 사용한 코드에서는 samsung, apple, nothing 3개의 클래스가 Phone 인터페이스를 구현합니다.
    
* interface는 한 클래스가 여러 개의 인터페이스를 구현할 수 있습니다.
    
* 요약 :
    
* abstract는 "상위-하위"관계를 형성하는 것이고 한 클래스는 하나의 추상 클래스만 상속받을 수 있습니다.
    
* interface는 계약 이행과 같아서 한 클래스는 여러 인터페이스를 구현할 수 있습니다.
---
title: "4. creww 조회수 기능"
description: "일단 조회수 기능이 없는 것 같아서 postService에 게시글 조회수를 표시해주는 로직을 한개 더 추가했다. @Entity @Getter @NoArgsConstructor @Table(name = \"post\") public class Post extends BaseEntity { @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id; pr..."
published: "2024-05-24T15:00:00.000Z"
tags: ['Java', '프로젝트', 'Creww']
series: "과거 Hashnode"
---

일단 조회수 기능이 없는 것 같아서 postService에 게시글 조회수를 표시해주는 로직을 한개 더 추가했다.

```java
@Entity
@Getter
@NoArgsConstructor
@Table(name = "post")
public class Post extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    private Long userId;
    private Long boardId;
    private int views = 0;

    public void setViews(int views){
        this.views = views;
    }

}
```

@Setter 대신에 조회수의 값을 변경하는 setViews를 넣어놨다.

프론트는 따로 게시글을 쓰려고 하진 않는다.

하지만 리액트로 만든 프론트에서 작동이 잘 된다 (로컬 환경)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1717862376901/c779bfe0-1e52-416b-809c-9de0e9209829.png)

별건 아니지만 그래도 결과물이 보이니깐 기분이 좋다.  
Good!
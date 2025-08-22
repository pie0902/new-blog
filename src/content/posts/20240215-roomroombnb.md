---
title: "2024.02.15 RoomRoomBnB 팀 프로젝트"
description: "RoomRoomBnB 팀 프로젝트 💡 오늘의 학습 키워드 #과제발표 ✔️ 오늘의 Todo List 팀 과제 발표하기 ✏️오늘의 기록 그동안 팀 프로젝트를 한다는 핑계로 TIL을 쓰지 않았다. 다시 열심히 써야겠다. 일기 형식 말고!!!! 팀 과제 발표를 내가 했다. 별로 잘하진 않은 것 같다. 나는 회원가입/로그인 기능을 구현했는데 로그아웃 기능은 만들지 않았다. JWT 토큰 방식으로 로그인을 구현했는데 백엔드에서 로그아웃을 구현..."
published: "2024-02-14T15:00:00.000Z"
tags: ['JWT', '프로젝트', 'RoomRoomBnB']
series: "과거 Hashnode"
---

## RoomRoomBnB 팀 프로젝트

### 💡 오늘의 학습 키워드

#과제발표

### ✔️ 오늘의 Todo List

*  <s>&nbsp;팀 과제 발표하기</s>
    

---

### ✏️오늘의 기록

1. 그동안 팀 프로젝트를 한다는 핑계로 TIL을 쓰지 않았다. 다시 열심히 써야겠다. 일기 형식 말고!!!!
    
2. 팀 과제 발표를 내가 했다. 별로 잘하진 않은 것 같다.
    
3. 나는 회원가입/로그인 기능을 구현했는데 로그아웃 기능은 만들지 않았다. JWT 토큰 방식으로 로그인을 구현했는데 백엔드에서 로그아웃을 구현할 거면 세션 방식을 사용하는 게 좋다는 결론을 내렸기 때문이다.(로그아웃 기능을 구현하면 JWT의 장점이 별로 없을 것 같다.)
    

팀 프로젝트 깃허브 페이지 : [https://github.com/RoomRoomBnB/roombnb](https://github.com/RoomRoomBnB/roombnb)

 [](https://github.com/RoomRoomBnB/roombnb)

[GitHub - RoomRoomBnB/roombnb](https://github.com/RoomRoomBnB/roombnb)

[Contribute to RoomRoomBnB/roombnb development by creating an account on GitHub.](https://github.com/RoomRoomBnB/roombnb)

[github.com](https://github.com/RoomRoomBnB/roombnb)

#### 팀 프로젝트 후기

```java
@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JwtUtil jwtUtil;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        // BCryptPasswordEncoder를 Bean으로 등록하여 비밀번호 암호화에 사용
        return new BCryptPasswordEncoder();
    }

    //AuthenticationManager Bean 등록
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration)
        throws Exception {
        // Spring Security의 AuthenticationManager를 사용자 정의 설정으로 Bean으로 등록
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(auth -> auth.disable()) // CSRF 보호 기능을 비활성화
            .formLogin(auth -> auth.disable()) // 폼 기반 로그인 비활성화
            .httpBasic(auth -> auth.disable()) // HTTP Basic 인증 비활성화
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/test").authenticated() // "/test" 경로는 인증된 사용자만 접근 가능
                // 지정된 경로들은 누구나 접근 가능하도록 설정
                .requestMatchers("/login", "/", "/v3/api-docs/**", "/api/users/signup",
                    "/swagger-ui/**", "/swagger-ui.html").permitAll()
                .anyRequest().authenticated()) // 나머지 요청들은 모두 인증 필요
            .addFilterBefore(new JwtFilter(jwtUtil), LoginFilter.class) // JwtFilter를 LoginFilter 전에 추가
            .addFilterBefore(
                new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil),
                UsernamePasswordAuthenticationFilter.class) // LoginFilter를 UsernamePasswordAuthenticationFilter 전에 추가
            .sessionManagement(
                session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // 세션을 사용하지 않고 STATELESS로 설정

        return http.build(); // SecurityFilterChain 구성을 완료하고 반환
    }
```

나를 힘들게 했던 시큐리티 설정..

물론 계속 공부 하겠지만 이제는 마음이 그나마 편해졌다. 왜냐하면 그래도 이 정도 기본적인 코드는 이해는 했기 때문이다.

로그인/회원가입 기능이 걸려서 다행이다.

CRUD를 다뤘으면 재밌었겠지만 저번 개인 프로젝트 때도 회원가입/로그인 기능 구현이 가장 어려웠었다.

한번 더 구현하게 돼서 운 좋게도 이해를 더 잘 할 수 있게 됐다.
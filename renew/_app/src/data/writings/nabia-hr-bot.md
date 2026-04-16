# 📱 Nabia HR Telegram Bot

## 1. 프로젝트 개요

Nabia 경영진 전용 HR 데이터 조회 텔레그램 챗봇. Claude AI 기반 자연어 대화로 직원 정보, 연봉, 출퇴근, 평가 데이터를 조회할 수 있습니다.

---

## 2. 기술 스택

| 구성 요소 | 기술 |
|---|---|
| 런타임 | Node.js + TypeScript (tsx) |
| 봇 프레임워크 | grammY |
| AI | Anthropic Claude (Haiku 4.5, Tool Use) |
| 데이터베이스 | SQLite3 (better-sqlite3, WAL 모드) |
| 시드 데이터 | @faker-js/faker (한국어 로케일) |

---

## 3. 아키텍처 및 프로젝트 구조

```
src/
├── index.ts                  # 진입점 — 봇 생성, 핸들러 등록, 그레이스풀 셧다운
├── config.ts                 # 환경 변수 로딩 및 검증
├── database/
│   ├── connection.ts         # SQLite 연결 관리 (WAL 모드, FK 활성화)
│   ├── schema.sql            # 테이블 DDL
│   └── seed.ts               # Mock 데이터 생성 (직원 100명, 90일치 출퇴근, 평가)
├── models/
│   ├── employee.ts           # Employee 인터페이스
│   ├── attendance.ts         # Attendance 인터페이스
│   ├── evaluation.ts         # Evaluation 인터페이스
│   └── user.ts               # TelegramUser, RegistrationCode 인터페이스
├── repositories/
│   ├── employee-repo.ts      # 직원 CRUD, 연봉 통계, 이름 검색, 생일 조회
│   ├── attendance-repo.ts    # 출퇴근 조회, 지각/결근 필터, 월간 리포트 집계
│   ├── evaluation-repo.ts    # 평가 조회 (직원별, 연도별)
│   └── user-repo.ts          # 사용자 등록, 권한 관리, 초대 코드 생성/검증
├── services/
│   └── ai.ts                 # Claude AI 연동 — 도구 정의, 에이전트 루프, 대화 기록 관리
├── handlers/
│   ├── auth.ts               # /start, /help, /register, /cancel 핸들러
│   ├── employee.ts           # /employees, /employee 핸들러 + 페이지네이션 콜백
│   ├── salary.ts             # /salary 핸들러
│   ├── attendance.ts         # /attendance, /late, /absent, /report, /stats 핸들러
│   ├── admin.ts              # /add_executive, /revoke, /users 핸들러
│   └── natural.ts            # 자연어 텍스트 라우터 — AI 대화 + 그룹 채팅 지원
├── middlewares/
│   └── auth.ts               # requireExecutive, requireSuperadmin 권한 검증 미들웨어
└── utils/
    ├── formatters.ts         # 연봉(만원), 날짜(한국식), 시간, HTML 이스케이프 포맷터
    └── keyboards.ts          # 인라인 페이지네이션 키보드 빌더 (10명 단위)
```

---

## 4. 데이터베이스 설계

| 테이블 | 설명 | 주요 컬럼 |
|---|---|---|
| `employees` | 직원 정보 | name, role, department, salary, hire_date, birth_date, phone, email, is_active |
| `attendance` | 출퇴근 기록 | employee_id(FK), work_date, check_in_time, check_out_time, is_late, is_early_leave |
| `evaluations` | 평가 정보 | employee_id(FK), year, grade(A~E) |
| `telegram_users` | 봇 사용자 | telegram_id, telegram_username, full_name, role(pending/executive/superadmin) |
| `registration_codes` | 초대 코드 | code, role, used, created_by(FK), used_by(FK) |

---

## 5. 구현 기능 상세

### 5-1. 🔐 초대 코드 기반 인증 시스템

봇 접근 권한을 초대 코드로 관리합니다. 권한은 3단계로 나뉩니다.

| 권한 | 설명 | 획득 방법 |
|---|---|---|
| `pending` | 미인증 상태 (기본값) | 봇 최초 접속 시 |
| `executive` | 경영진 — HR 데이터 조회 가능 | 슈퍼어드민이 발급한 초대 코드 입력 |
| `superadmin` | 최고 관리자 — 모든 기능 사용 가능 | `.env`의 `SUPERADMIN_CODE` 입력 |

- `/register` 명령어로 인증 절차를 시작하며, 코드를 별도 메시지로 입력하거나 `/register [코드]`로 즉시 인증할 수 있습니다.
- `/cancel`로 진행 중인 인증을 취소할 수 있습니다.
- 초대 코드는 1회성이며, 사용 후 자동으로 소멸됩니다.

### 5-2. 💬 AI 대화 인터페이스 (Claude 연동)

슬래시 명령어 없이 자연어로 HR 데이터를 조회할 수 있습니다. Claude Haiku 모델과 도구 호출(Tool Use) 패턴을 사용하여 사용자 의도를 파악하고 적절한 데이터를 반환합니다.

**그룹 채팅 지원**: 1:1 채팅뿐 아니라 그룹/슈퍼그룹 채팅에서도 사용 가능합니다. 그룹에서는 봇을 `@멘션`하거나 봇의 메시지에 **답장(Reply)** 할 때 응답합니다.

**대화 기록 관리**: 사용자별로 최근 20개 메시지를 기억하며, `/clear` 명령어로 대화 기록을 초기화할 수 있습니다.

**사용 가능한 AI 도구 (14종)**:

| 도구 | 설명 |
|---|---|
| `search_employee` | 이름으로 직원 정보 검색 |
| `list_employees` | 전체 직원 목록 조회 (페이지네이션) |
| `filter_employees` | 직급/부서/연봉/입사일 조합 필터링 |
| `get_salary_stats` | 직급별 연봉 통계 |
| `get_salary_stats_by_department` | 부서별 연봉 통계 |
| `get_salary_history` | 직원별 연도별 연봉 추이 |
| `get_attendance` | 특정 날짜 출퇴근 현황 |
| `get_late_list` | 지각자 목록 |
| `get_absent_list` | 결근자 목록 |
| `get_employee_report` | 직원별 30일 출퇴근 리포트 |
| `get_hr_stats` | HR 전체 통계 대시보드 |
| `get_birthdays_by_month` | 월별 생일자 조회 |
| `get_employee_evaluations` | 직원별 평가 이력 조회 |
| `get_evaluations_by_year` | 연도별 전체 평가 결과 |

**질문 예시**:

> 👤 직원 정보

- `"김민서 정보 알려줘"`
- `"박지우 연락처 뭐야?"`
- `"전체 직원 목록 보여줘"`
- `"개발자 목록 보여줘"`
- `"프론트엔드팀 누가 있어?"`
- `"연봉 TOP 5 알려줘"`
- `"개발자 중 연봉 가장 높은 사람"`
- `"모바일팀에서 가장 먼저 입사한 사람"`
- `"연봉이 가장 낮은 직원은?"`
- `"디자이너 중 입사 오래된 순으로 보여줘"`
- `"2020년에 입사한 개발자 누구야?"`
- `"백엔드팀 2021년 입사자 보여줘"`
- `"김민서 근속 연수 알려줘"`
- `"10년 이상 근속자 누구야?"`

> 💰 연봉

- `"직급별 평균 연봉 알려줘"`
- `"부서별 연봉 통계 보여줘"`
- `"개발자 평균 연봉 얼마야?"`
- `"프론트엔드팀 연봉 어때?"`
- `"김민서 연봉 알려줘"`
- `"김민서 연봉 추이 보여줘"`
- `"박지우 5년간 연봉 변화"`
- `"김민서 입사 후 연봉이 얼마나 올랐어?"`

> 🕐 출퇴근

- `"오늘 출퇴근 현황 알려줘"`
- `"2026-03-15 출퇴근 현황"`
- `"오늘 지각한 사람 누구야?"`
- `"어제 결근자 있어?"`
- `"김민서 출퇴근 리포트 보여줘"`
- `"박지우 최근 30일 지각 몇 번이야?"`
- `"오늘 몇 명 출근했어?"`

> 📊 평가

- `"김민서 평가 이력 보여줘"`
- `"박지우 평가 등급 어때?"`
- `"2025년 평가 결과 알려줘"`
- `"2025년 A등급 받은 사람 누구야?"`
- `"올해 D등급 이하 직원 있어?"`

> 🎂 생일

- `"이번 달 생일자 알려줘"`
- `"3월 생일인 직원 누구야?"`
- `"다음 달 생일자 있어?"`

> 📈 전체 통계

- `"전체 HR 통계 보여줘"`
- `"직원 몇 명이야?"`
- `"직급별 인원 분포 알려줘"`

> 🔀 부서 간 비교

- `"백엔드팀이랑 프론트엔드팀 근속 연수 같은 직원 연봉 비교해줘"`
- `"모바일팀 vs 인프라팀 동일 근속 연봉 비교"`
- `"백엔드팀과 데이터팀 2020년 입사자 연봉 비교"`

> 🔀 복합 질문

- `"김민서 연봉이랑 평가 이력 같이 보여줘"`
- `"프론트엔드팀 평균 연봉이랑 인원수 알려줘"`
- `"오늘 지각한 개발자 누구야?"`

### 5-3. 👥 직원 정보 관리

100명의 Mock 직원 데이터(한국어 이름, 5개 직급, 14개 부서)를 자동 생성하여 조회할 수 있습니다.

| 기능 | 명령어 | 설명 |
|---|---|---|
| 직원 목록 | `/employees` | 전체 직원 목록을 페이지네이션(10명 단위)으로 조회. 인라인 키보드로 이전/다음 페이지 이동 |
| 직원 검색 | `/employee [이름]` | 이름 부분 일치 검색. 직급, 부서, 연봉, 입사일, 생년월일, 연락처 표시 (최대 20명) |

**직급 종류**: 개발자, 기획자, 디자이너, 부장, 이사 및 경영진

**부서 종류**:
- 개발자: 프론트엔드팀, 백엔드팀, 모바일팀, 인프라팀, 데이터팀
- 기획자: 서비스기획팀, 전략기획팀, PM팀
- 디자이너: UX팀, UI팀, 브랜드팀
- 이사 및 경영진: 경영지원실, 전략실, CTO실

### 5-4. 💰 연봉 통계 및 조회

| 기능 | 명령어 | 설명 |
|---|---|---|
| 직급별 통계 | `/salary` | 직급별 평균/최소/최대 연봉을 만원 단위로 표시 |
| 개인 연봉 | `/salary [이름]` | 특정 직원의 연봉을 원 단위 및 만원 단위로 표시 |

연봉 범위 (시드 데이터 기준):
- 개발자: 4,500만원 ~ 9,000만원
- 기획자: 4,000만원 ~ 7,000만원
- 디자이너: 3,800만원 ~ 6,500만원
- 이사 및 경영진: 8,000만원 ~ 2억원

### 5-5. 🕐 출퇴근 관리

90일치 출퇴근 Mock 데이터를 자동 생성합니다 (주말 제외). 출근 기준 시간은 `.env`의 `WORK_START_TIME`(기본 09:00)으로 설정됩니다.

| 기능 | 명령어 | 설명 |
|---|---|---|
| 오늘 현황 | `/attendance` | 오늘 출퇴근 현황 + 출근/지각/결근 인원 요약 (최대 30명 표시) |
| 날짜별 현황 | `/attendance [YYYY-MM-DD]` | 특정 날짜의 출퇴근 현황 조회 |
| 지각자 | `/late` | 오늘 지각자 목록 (출근 시간순 정렬) |
| 결근자 | `/absent` | 오늘 결근자 목록 (직급, 부서 표시) |
| 월간 리포트 | `/report [이름]` | 최근 30일 출퇴근 리포트 — 출근일수, 지각 횟수, 조퇴 횟수, 평균 출근시간 (최대 5명) |

출퇴근 데이터 분포:
- 정상 출근(85%): 08:30 ~ 09:00
- 지각(10%): 09:01 ~ 10:30
- 결근(5%): 출근 기록 없음
- 퇴근: 18:00 ~ 19:30

### 5-6. 📊 평가 관리

연도별 직원 평가 데이터를 자동 생성합니다 (입사일 이후 최근 3년).

| 등급 | 비율 |
|---|---|
| A (최우수) | 10% |
| B (우수) | 30% |
| C (보통) | 40% |
| D (미흡) | 15% |
| E (부진) | 5% |

AI 대화를 통해 `"김민서 평가 이력"`, `"2025년 평가 결과"` 등으로 조회할 수 있습니다.

### 5-7. 📈 HR 통계 대시보드

| 기능 | 명령어 | 설명 |
|---|---|---|
| 전체 통계 | `/stats` | 전체 직원 수, 평균 연봉, 직급별 분포, 오늘 출퇴근 요약을 한눈에 표시 |

### 5-8. 🛡️ 슈퍼어드민 관리 기능

| 기능 | 명령어 | 설명 |
|---|---|---|
| 초대 코드 생성 | `/add_executive` | 1회용 경영진 초대 코드 생성 (형식: `nabia-exec-[타임스탬프]-[랜덤]`) |
| 권한 회수 | `/revoke [telegram_id]` | 특정 사용자의 권한을 `pending`으로 변경. 슈퍼어드민은 회수 불가 |
| 사용자 목록 | `/users` | 등록된 모든 사용자의 이름, 아이디, 권한, 등록일 표시 |

---

## 6. 환경 변수 및 설정

| 변수명 | 설명 | 기본값 |
|---|---|---|
| `BOT_TOKEN` | 텔레그램 봇 토큰 (필수) | — |
| `ANTHROPIC_API_KEY` | Claude API 키 (AI 대화 기능용, 필수) | — |
| `SUPERADMIN_CODE` | 슈퍼어드민 등록 코드 | `nabia-super-2026-xxxx` |
| `DB_PATH` | SQLite DB 파일 경로 | `data/nabia_hr.db` |
| `COMPANY_NAME` | 회사명 (봇 메시지에 표시) | `Nabia` |
| `WORK_START_TIME` | 출근 기준 시간 | `09:00` |
| `WORK_END_TIME` | 퇴근 기준 시간 | `18:00` |

---

## 7. 설치 및 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 설정
cp .env.example .env
# .env 파일을 열고 BOT_TOKEN, ANTHROPIC_API_KEY, SUPERADMIN_CODE를 설정

# 3. 봇 실행 (DB 자동 생성 + 시드 데이터 삽입)
npm start

# 개발 모드 (파일 변경 시 자동 재시작)
npm run dev

# 시드 데이터만 별도 생성
npm run seed
```

### 🔑 텔레그램 봇 토큰 발급 방법

1. 텔레그램에서 [@BotFather](https://t.me/BotFather)를 검색하여 대화를 시작합니다.
2. `/newbot` 명령어를 입력합니다.
3. 봇 이름을 입력합니다 (예: `Nabia HR Bot`).
4. 봇 사용자명을 입력합니다 (예: `nabia_hr_bot`). `_bot`으로 끝나야 합니다.
5. BotFather가 발급한 토큰을 복사합니다 (예: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`).
6. `.env` 파일의 `BOT_TOKEN`에 설정합니다.

### 📋 최초 설정

1. `.env`의 `SUPERADMIN_CODE` 값을 안전한 코드로 변경
2. 봇 실행 후 텔레그램에서 `/start` 입력
3. `/register` → SUPERADMIN_CODE 입력 → 슈퍼어드민 등록
4. `/add_executive`로 경영진 초대 코드 생성
5. 해당 코드를 경영진에게 전달

### 🌐 ngrok으로 외부 접속 (선택)

로컬에서 실행 중인 봇을 외부에서 접근 가능하게 하려면 ngrok을 사용할 수 있습니다.

```bash
# 1. ngrok 설치 (macOS)
brew install ngrok

# 2. ngrok 계정 연동 (https://dashboard.ngrok.com 에서 토큰 확인)
ngrok config add-authtoken YOUR_NGROK_TOKEN

# 3. ngrok 터널 실행 (포트 번호는 필요에 따라 변경)
ngrok http 3000
```

> **참고**: 현재 봇은 polling 방식으로 동작하므로 ngrok 없이도 정상 작동합니다. Webhook 방식으로 전환할 경우에만 필요합니다.

---

## 8. 명령어 전체 목록

### 🔓 공개
| 명령어 | 설명 |
|---|---|
| `/start` | 봇 소개 |
| `/help` | 권한에 따라 사용 가능한 명령어 목록 표시 |
| `/register` | 초대 코드 인증 (대화형 또는 `/register [코드]`) |
| `/cancel` | 진행 중인 인증 취소 |

### 👔 경영진 전용
| 명령어 | 설명 |
|---|---|
| `/employees` | 직원 목록 (인라인 페이지네이션) |
| `/employee [이름]` | 직원 검색 (이름 부분 일치) |
| `/salary` | 직급별 연봉 통계 |
| `/salary [이름]` | 개인 연봉 조회 |
| `/attendance` | 오늘 출퇴근 현황 |
| `/attendance [YYYY-MM-DD]` | 특정 날짜 출퇴근 현황 |
| `/late` | 오늘 지각자 목록 |
| `/absent` | 오늘 결근자 목록 |
| `/report [이름]` | 월간 출퇴근 리포트 (최근 30일) |
| `/stats` | 전체 HR 통계 대시보드 |
| `/clear` | AI 대화 기록 초기화 |

### 🔧 슈퍼어드민 전용
| 명령어 | 설명 |
|---|---|
| `/add_executive` | 경영진 1회용 초대 코드 생성 |
| `/revoke [telegram_id]` | 사용자 권한 회수 |
| `/users` | 등록 사용자 전체 목록 |

---

## 9. 향후 개선 방향

- Webhook 방식 전환으로 응답 속도 개선
- 직원 데이터 실시간 연동 (외부 HR 시스템 API)
- 다국어 지원 (영어, 일본어)
- 출퇴근 알림 기능 (지각/결근 자동 통보)
- 평가 데이터 시각화 (차트 이미지 생성)
- 대화 로그 분석 및 통계

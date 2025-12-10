# 원블럭 부정클릭 모니터링 시스템 설정 가이드

## 📋 사전 준비

1. Google 계정
2. 네이버 광고 계정 (파라미터 추적용)
3. 카카오톡 알림을 받을 방법 (선택)

---

## 🚀 설정 순서

### Step 1: Google Sheets 생성

1. [Google Sheets](https://sheets.google.com) 접속
2. 새 스프레드시트 생성
3. 이름: `원블럭_클릭로그_광고주명`
4. URL에서 스프레드시트 ID 복사
   - 예: `https://docs.google.com/spreadsheets/d/여기가ID/edit`

### Step 2: Apps Script 설정

1. 스프레드시트에서 `확장 프로그램 > Apps Script` 클릭
2. 기존 코드 전체 삭제
3. `Code.gs` 코드 붙여넣기
4. 설정값 수정:
   ```javascript
   const CONFIG = {
     SPREADSHEET_ID: '복사한 스프레드시트 ID',
     SHEET_NAME: '클릭로그',
     KAKAO_WEBHOOK_URL: '카카오 웹훅 URL (선택)',
     ALERT_EMAIL: '알림받을 이메일',
     // ...
   };

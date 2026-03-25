-- =====================================================
-- 마음연구소 크레딧 시스템 - Supabase SQL 스키마
-- Supabase Dashboard > SQL Editor 에서 실행하세요
-- =====================================================

-- 1. users 테이블 생성
CREATE TABLE IF NOT EXISTS public.users (
  uid            TEXT        PRIMARY KEY,
  credit         INTEGER     NOT NULL DEFAULT 100 CHECK (credit >= 0),
  last_share_at  TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. updated_at 자동 갱신 트리거
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_users_updated_at ON public.users;
CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3. Row Level Security (RLS) 활성화
--    서버(service_role key)만 접근 가능 → 클라이언트 직접 접근 차단
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 기존 정책 제거 후 재생성
DROP POLICY IF EXISTS "service_role_only" ON public.users;
CREATE POLICY "service_role_only" ON public.users
  USING (auth.role() = 'service_role');

-- 4. 인덱스 (조회 성능)
CREATE INDEX IF NOT EXISTS idx_users_uid ON public.users (uid);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON public.users (created_at);

-- 5. 완료 확인
SELECT 'users table created successfully' AS status;

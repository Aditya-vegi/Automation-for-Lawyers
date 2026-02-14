-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================
-- USERS & AUTHENTICATION
-- ============================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'lawyer', -- lawyer, partner, admin
  firm_id UUID,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS firms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  jurisdiction TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- CASES MANAGEMENT
-- ============================================

CREATE TABLE IF NOT EXISTS cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  firm_id UUID NOT NULL REFERENCES firms(id) ON DELETE CASCADE,
  case_number TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'open', -- open, closed, archived
  case_type TEXT, -- criminal, civil, intellectual_property, etc.
  jurisdiction TEXT,
  court TEXT,
  judge TEXT,
  lead_attorney_id UUID REFERENCES profiles(id),
  opposing_counsel TEXT,
  filing_date DATE,
  hearing_date DATE,
  trial_date DATE,
  priority TEXT DEFAULT 'medium', -- low, medium, high, critical
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_cases_firm_id ON cases(firm_id);
CREATE INDEX idx_cases_status ON cases(status);
CREATE INDEX idx_cases_case_number ON cases(case_number);

-- ============================================
-- EVIDENCE MANAGEMENT
-- ============================================

CREATE TABLE IF NOT EXISTS evidence (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  firm_id UUID NOT NULL REFERENCES firms(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  evidence_type TEXT NOT NULL, -- document, audio, video, image, email, chat_log, etc.
  file_url TEXT,
  file_name TEXT,
  file_size INT,
  mime_type TEXT,
  duration_seconds INT, -- for audio/video
  status TEXT DEFAULT 'pending', -- pending, verified, analyzed, flagged
  authenticity_score NUMERIC(3,2), -- 0.00 to 1.00
  relevance_score NUMERIC(3,2), -- 0.00 to 1.00
  chain_of_custody_verified BOOLEAN DEFAULT FALSE,
  source TEXT,
  collected_date DATE,
  collected_by_id UUID REFERENCES profiles(id),
  legal_hold BOOLEAN DEFAULT FALSE,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_evidence_case_id ON evidence(case_id);
CREATE INDEX idx_evidence_status ON evidence(status);
CREATE INDEX idx_evidence_type ON evidence(evidence_type);
CREATE INDEX idx_evidence_created_at ON evidence(created_at DESC);

-- ============================================
-- DOCUMENTS & FILINGS
-- ============================================

CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  firm_id UUID NOT NULL REFERENCES firms(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  document_type TEXT, -- complaint, motion, brief, memo, discovery, etc.
  file_url TEXT,
  file_name TEXT,
  file_size INT,
  content_text TEXT, -- for full-text search
  status TEXT DEFAULT 'draft', -- draft, filed, served, archived
  filing_date DATE,
  served_date DATE,
  due_date DATE,
  author_id UUID REFERENCES profiles(id),
  pages INT,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_documents_case_id ON documents(case_id);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_type ON documents(document_type);

-- ============================================
-- PRECEDENTS & CASE LAW
-- ============================================

CREATE TABLE IF NOT EXISTS precedents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  firm_id UUID REFERENCES firms(id) ON DELETE CASCADE,
  case_name TEXT NOT NULL,
  citation TEXT NOT NULL UNIQUE,
  jurisdiction TEXT,
  court TEXT,
  year INT,
  judge TEXT,
  parties TEXT[], -- {plaintiff, defendant}
  opinion_text TEXT,
  holding TEXT,
  legal_principles TEXT[],
  relevant_quotes TEXT[],
  source TEXT, -- case law database URL
  relevance_score NUMERIC(3,2),
  is_precedent BOOLEAN DEFAULT TRUE,
  tags TEXT[],
  bookmarked_by UUID[] DEFAULT '{}'::uuid[], -- array of user IDs
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_precedents_jurisdiction ON precedents(jurisdiction);
CREATE INDEX idx_precedents_year ON precedents(year);
CREATE INDEX idx_precedents_legal_principles ON precedents USING GIN (legal_principles);

-- ============================================
-- EVIDENCE ANALYSIS & AI REASONING
-- ============================================

CREATE TABLE IF NOT EXISTS evidence_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  evidence_id UUID NOT NULL REFERENCES evidence(id) ON DELETE CASCADE,
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  analysis_type TEXT, -- timeline, contradiction, risk, citation, entity_extraction
  analysis_result JSONB, -- flexible structure for different analysis types
  key_findings TEXT[],
  risk_score NUMERIC(3,2),
  confidence_score NUMERIC(3,2),
  related_evidence_ids UUID[],
  related_precedent_ids UUID[],
  analyzed_by TEXT, -- 'ai_model_v1', etc.
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_evidence_analysis_evidence_id ON evidence_analysis(evidence_id);
CREATE INDEX idx_evidence_analysis_type ON evidence_analysis(analysis_type);

-- ============================================
-- TIMELINE & EVENTS
-- ============================================

CREATE TABLE IF NOT EXISTS timeline_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- evidence_collected, document_filed, hearing, deposition, etc.
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  location TEXT,
  participants TEXT[],
  related_evidence_id UUID REFERENCES evidence(id),
  related_document_id UUID REFERENCES documents(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_timeline_case_id ON timeline_events(case_id);
CREATE INDEX idx_timeline_event_date ON timeline_events(event_date);

-- ============================================
-- ACTIVITY LOG & AUDIT TRAIL
-- ============================================

CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  firm_id UUID NOT NULL REFERENCES firms(id) ON DELETE CASCADE,
  case_id UUID REFERENCES cases(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL, -- created, updated, deleted, viewed, downloaded, analyzed
  resource_type TEXT, -- case, evidence, document, precedent
  resource_id UUID,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_firm_id ON activity_logs(firm_id);
CREATE INDEX idx_activity_logs_case_id ON activity_logs(case_id);
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at DESC);

-- ============================================
-- TAGS & METADATA
-- ============================================

CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  firm_id UUID NOT NULL REFERENCES firms(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#3b82f6',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_tags_firm_name ON tags(firm_id, name);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE firms ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE precedents ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Policies for cases (firm-based access)
CREATE POLICY "Users can view cases in their firm"
  ON cases FOR SELECT
  USING (
    firm_id = (SELECT firm_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "Users can create cases in their firm"
  ON cases FOR INSERT
  WITH CHECK (
    firm_id = (SELECT firm_id FROM profiles WHERE id = auth.uid())
  );

-- Policies for evidence (firm-based access)
CREATE POLICY "Users can view evidence in their firm's cases"
  ON evidence FOR SELECT
  USING (
    firm_id = (SELECT firm_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "Users can create evidence in their firm's cases"
  ON evidence FOR INSERT
  WITH CHECK (
    firm_id = (SELECT firm_id FROM profiles WHERE id = auth.uid())
  );

-- Policies for documents (firm-based access)
CREATE POLICY "Users can view documents in their firm's cases"
  ON documents FOR SELECT
  USING (
    firm_id = (SELECT firm_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "Users can create documents in their firm's cases"
  ON documents FOR INSERT
  WITH CHECK (
    firm_id = (SELECT firm_id FROM profiles WHERE id = auth.uid())
  );

-- Policies for activity logs (firm-based access)
CREATE POLICY "Users can view their firm's activity logs"
  ON activity_logs FOR SELECT
  USING (
    firm_id = (SELECT firm_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "System can create activity logs"
  ON activity_logs FOR INSERT
  WITH CHECK (true);

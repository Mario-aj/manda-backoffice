// Manda — KYC (identity verification) · mobile flow
// Manual review (no auto-biometrics). Photos are private, used only for KYC.
// Reuses MANDA tokens + atoms (Icon, PrimaryButton, GhostButton, Avatar, StatusSpacer).

// ──────────────────────────────────────────────────────────────
// Shared bits
// ──────────────────────────────────────────────────────────────
function KYCHeader({ title, onBack = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 14px 8px' }}>
      <button style={{ width: 38, height: 38, borderRadius: 19, border: 'none', background: MANDA.paper, color: MANDA.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icon.chevronLeft(22)}</button>
      <div style={{ flex: 1, fontFamily: MANDA.font, fontWeight: 800, fontSize: 16, color: MANDA.ink }}>{title}</div>
    </div>);

}

function ProgressDots({ step, total = 4 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ display: 'flex', gap: 5 }}>
        {Array.from({ length: total }).map((_, i) =>
        <div key={i} style={{ width: i + 1 === step ? 22 : 7, height: 7, borderRadius: 4, background: i < step ? MANDA.green : MANDA.divider, transition: 'all .2s' }} />
        )}
      </div>
      <div style={{ fontFamily: MANDA.font, fontSize: 12.5, fontWeight: 700, color: MANDA.inkMuted }}>Passo {step} de {total}</div>
    </div>);

}

function PrivacyNote({ children }) {
  return (
    <div style={{ display: 'flex', gap: 10, padding: '11px 13px', borderRadius: 13, background: MANDA.greenSoft, alignItems: 'flex-start' }}>
      <div style={{ flexShrink: 0, color: MANDA.greenDeep }}>{Icon.lock(16, MANDA.greenDeep)}</div>
      <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.greenDeep, lineHeight: 1.45, fontWeight: 600 }}>{children}</div>
    </div>);

}

// ──────────────────────────────────────────────────────────────
// KYC-1 · Intro
// ──────────────────────────────────────────────────────────────
function ScreenKYCIntro() {
  const items = [
  ['Documento · frente', Icon.bank],
  ['Documento · verso', Icon.bank],
  ['Selfie com o documento', Icon.camera],
  ['Selfie simples', Icon.user]];

  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.white, display: 'flex', flexDirection: 'column' }}>
      <StatusSpacer />
      <KYCHeader title="Verificação" />

      {/* Hero */}
      <div style={{ position: 'relative', padding: '14px 24px 26px', background: `linear-gradient(180deg, ${MANDA.greenSoft}, ${MANDA.white})`, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -70, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,135,84,.16), transparent 70%)' }} />
        <div style={{ position: 'relative', width: 72, height: 72, borderRadius: 22, background: MANDA.green, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 12px 26px ${MANDA.green}40` }}>
          {Icon.shield(38, '#fff')}
        </div>
        <div style={{ position: 'relative', fontFamily: MANDA.font, fontSize: 26, fontWeight: 800, letterSpacing: -0.8, color: MANDA.ink, marginTop: 16, textWrap: 'pretty' }}>
          Verifique a sua identidade
        </div>
        <div style={{ position: 'relative', fontFamily: MANDA.font, fontSize: 14.5, color: MANDA.inkMuted, marginTop: 8, lineHeight: 1.5 }}>
          A verificação protege as suas transações e dá confiança a toda a comunidade Manda.
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '18px 24px 8px' }}>
        <div style={{ fontFamily: MANDA.font, fontSize: 11.5, fontWeight: 800, letterSpacing: 0.8, color: MANDA.inkMuted, textTransform: 'uppercase' }}>Vai precisar de</div>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map(([label, icon], i) =>
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: MANDA.greenSoft, color: MANDA.greenDeep, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon(22, MANDA.greenDeep)}</div>
              <div style={{ fontFamily: MANDA.font, fontSize: 14.5, fontWeight: 700, color: MANDA.ink }}>{label}</div>
            </div>
          )}
        </div>
        <div style={{ marginTop: 18 }}>
          <PrivacyNote>As suas fotos são privadas e usadas só para verificação. A revisão é feita pela equipa Manda.</PrivacyNote>
        </div>
      </div>

      <div style={{ padding: '12px 22px 30px', borderTop: `1px solid ${MANDA.divider}` }}>
        <PrimaryButton full size="md">Começar</PrimaryButton>
      </div>
    </div>);

}

// ──────────────────────────────────────────────────────────────
// KYC-2 · Document type
// ──────────────────────────────────────────────────────────────
function DocTypeCard({ icon, title, sub, selected }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 16,
      background: selected ? MANDA.greenSoft : MANDA.white,
      border: `1.5px solid ${selected ? MANDA.green : MANDA.cardBorder}`
    }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: selected ? MANDA.white : MANDA.paper, color: MANDA.greenDeep, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: MANDA.font, fontSize: 15, fontWeight: 800, color: MANDA.ink }}>{title}</div>
        <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted, marginTop: 1 }}>{sub}</div>
      </div>
      <div style={{ width: 22, height: 22, borderRadius: 11, border: `2px solid ${selected ? MANDA.green : MANDA.cardBorder}`, background: selected ? MANDA.green : MANDA.white, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {selected && <div style={{ width: 8, height: 8, borderRadius: 4, background: MANDA.white }} />}
      </div>
    </div>);

}

function ScreenKYCDocType() {
  const idIcon = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke={MANDA.greenDeep} strokeWidth="1.7" />
      <circle cx="8.5" cy="11" r="2.2" stroke={MANDA.greenDeep} strokeWidth="1.6" />
      <path d="M13 9.5h5M13 13h5M5.5 15.5c.4-1.4 1.6-2 3-2s2.6.6 3 2" stroke={MANDA.greenDeep} strokeWidth="1.5" strokeLinecap="round" />
    </svg>);

  const passIcon = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="3" width="14" height="18" rx="2.5" stroke={MANDA.greenDeep} strokeWidth="1.7" />
      <circle cx="12" cy="10" r="2.6" stroke={MANDA.greenDeep} strokeWidth="1.6" />
      <path d="M9 16h6" stroke={MANDA.greenDeep} strokeWidth="1.6" strokeLinecap="round" />
    </svg>);

  const carIcon = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke={MANDA.greenDeep} strokeWidth="1.7" />
      <path d="M7 10h4M7 13h6M15 9.5h3v4h-3z" stroke={MANDA.greenDeep} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>);

  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.white, display: 'flex', flexDirection: 'column' }}>
      <StatusSpacer />
      <KYCHeader title="Documento" />
      <div style={{ padding: '6px 24px 0' }}><ProgressDots step={1} /></div>

      <div style={{ flex: 1, overflow: 'auto', padding: '16px 22px 8px' }}>
        <div style={{ fontFamily: MANDA.font, fontSize: 22, fontWeight: 800, letterSpacing: -0.6, color: MANDA.ink }}>Que documento vai usar?</div>
        <div style={{ fontFamily: MANDA.font, fontSize: 13.5, color: MANDA.inkMuted, marginTop: 6, lineHeight: 1.45 }}>
          Escolha um documento oficial com foto, válido e legível.
        </div>

        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <DocTypeCard icon={idIcon} title="Bilhete de Identidade" sub="Frente e verso" selected />
          <DocTypeCard icon={passIcon} title="Passaporte" sub="Página com a foto" />
          <DocTypeCard icon={carIcon} title="Carta de Condução" sub="Frente e verso" />
        </div>
      </div>

      <div style={{ padding: '12px 22px 30px', borderTop: `1px solid ${MANDA.divider}` }}>
        <PrimaryButton full size="md">Continuar</PrimaryButton>
      </div>
    </div>);

}

// ──────────────────────────────────────────────────────────────
// KYC-3 · Capture (reusable CaptureCard)
//   guide: 'rect' (document) | 'oval' (selfie) | 'ovalrect' (selfie + doc)
// ──────────────────────────────────────────────────────────────
function FrameGuide({ guide }) {
  // Corner-marked rectangle
  const Corners = ({ w, h }) =>
  <div style={{ position: 'relative', width: w, height: h }}>
      {[['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']].map(([v, hh], i) =>
    <div key={i} style={{
      position: 'absolute', [v]: -2, [hh]: -2, width: 26, height: 26,
      borderTop: v === 'top' ? `3px solid ${MANDA.greenBright}` : 'none',
      borderBottom: v === 'bottom' ? `3px solid ${MANDA.greenBright}` : 'none',
      borderLeft: hh === 'left' ? `3px solid ${MANDA.greenBright}` : 'none',
      borderRight: hh === 'right' ? `3px solid ${MANDA.greenBright}` : 'none',
      borderTopLeftRadius: v === 'top' && hh === 'left' ? 12 : 0,
      borderTopRightRadius: v === 'top' && hh === 'right' ? 12 : 0,
      borderBottomLeftRadius: v === 'bottom' && hh === 'left' ? 12 : 0,
      borderBottomRightRadius: v === 'bottom' && hh === 'right' ? 12 : 0
    }} />
    )}
    </div>;


  if (guide === 'oval' || guide === 'ovalrect') {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
        <div style={{ width: 168, height: 210, borderRadius: '50% 50% 48% 48%', border: `3px dashed ${MANDA.greenBright}`, boxShadow: '0 0 0 2000px rgba(6,38,24,.28)' }} />
        {guide === 'ovalrect' &&
        <div style={{ width: 150, height: 92 }}><Corners w={150} h={92} /></div>
        }
      </div>);

  }
  // rect
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 248, height: 156, boxShadow: '0 0 0 2000px rgba(6,38,24,.28)', borderRadius: 12 }}>
        <Corners w={248} h={156} />
      </div>
    </div>);

}

function CaptureCard({ step, title, instruction, guide = 'rect', captured = false, tips = [] }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.white, display: 'flex', flexDirection: 'column' }}>
      <StatusSpacer />
      <KYCHeader title="Captura" />
      <div style={{ padding: '6px 24px 12px' }}><ProgressDots step={step} /></div>

      <div style={{ padding: '0 24px 10px' }}>
        <div style={{ fontFamily: MANDA.font, fontSize: 20, fontWeight: 800, letterSpacing: -0.5, color: MANDA.ink }}>{title}</div>
        <div style={{ fontFamily: MANDA.font, fontSize: 13.5, color: MANDA.inkMuted, marginTop: 4, lineHeight: 1.4 }}>{instruction}</div>
      </div>

      {/* Viewport */}
      <div style={{ margin: '0 20px', flex: 1, minHeight: 0, borderRadius: 20, overflow: 'hidden', position: 'relative', background: captured ? MANDA.greenSoft : '#0E2018' }}>
        {captured ?
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <div style={{ width: 72, height: 72, borderRadius: 36, background: MANDA.white, color: MANDA.green, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 20px ${MANDA.green}30` }}>
              {Icon.check(38, MANDA.green)}
            </div>
            <div style={{ fontFamily: MANDA.font, fontSize: 14, fontWeight: 800, color: MANDA.greenDeep }}>Foto capturada</div>
            <div style={{ position: 'absolute', top: 14, left: 14, padding: '5px 11px', borderRadius: 10, background: MANDA.white, fontFamily: MANDA.font, fontSize: 11.5, fontWeight: 700, color: MANDA.greenDeep, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              {Icon.lock(13, MANDA.greenDeep)} Documento seguro
            </div>
          </div> :

        <>
            <FrameGuide guide={guide} />
            {/* faux camera grain dots */}
            <div style={{ position: 'absolute', top: 14, left: 14, padding: '5px 10px', borderRadius: 10, background: 'rgba(255,255,255,.12)', color: '#fff', fontFamily: MANDA.font, fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: 4, background: '#FF5A5A' }} /> câmara
            </div>
          </>
        }
      </div>

      {/* Tips */}
      {tips.length > 0 && !captured &&
      <div style={{ padding: '12px 24px 4px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {tips.map((t) =>
        <span key={t} style={{ padding: '5px 10px', borderRadius: 10, background: MANDA.paper, fontFamily: MANDA.font, fontSize: 11.5, fontWeight: 600, color: MANDA.inkMuted }}>{t}</span>
        )}
        </div>
      }

      <div style={{ padding: '12px 22px 30px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {captured ?
        <>
            <PrimaryButton full size="md">Usar esta foto</PrimaryButton>
            <button style={{ height: 46, borderRadius: 23, border: `1.5px solid ${MANDA.cardBorder}`, background: MANDA.white, color: MANDA.ink, fontFamily: MANDA.font, fontWeight: 700, fontSize: 14.5, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {Icon.camera(18, MANDA.ink)} Repetir
            </button>
          </> :

        <>
            <PrimaryButton full size="md" icon={Icon.camera(18, '#fff')}>Tirar foto</PrimaryButton>
            <GhostButton full style={{ height: 46, borderRadius: 23 }}>Escolher da galeria</GhostButton>
          </>
        }
      </div>
    </div>);

}

function ScreenKYCCaptureFront() {
  return <CaptureCard step={2} title="Frente do documento" instruction="Enquadre a frente do BI dentro da moldura." guide="rect" tips={['Boa luz', 'Sem reflexo', 'Texto legível']} />;
}
function ScreenKYCCaptureSelfieDoc() {
  return <CaptureCard step={3} title="Selfie com o documento" instruction="Segure o documento junto ao rosto, dentro das guias." guide="ovalrect" tips={['Rosto visível', 'Documento legível']} />;
}
function ScreenKYCCaptureDone() {
  return <CaptureCard step={4} title="Selfie simples" instruction="Centre o rosto no oval. Olhe para a câmara." guide="oval" captured />;
}

// ──────────────────────────────────────────────────────────────
// KYC-4 · Review and submit
// ──────────────────────────────────────────────────────────────
function ReviewThumb({ label }) {
  return (
    <div>
      <div style={{ position: 'relative', height: 104, borderRadius: 14, background: MANDA.greenSoft, border: `1px solid #CFE8DA`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {Icon.shield(26, MANDA.greenDeep)}
        <div style={{ position: 'absolute', right: 8, bottom: 8, padding: '3px 8px', borderRadius: 8, background: MANDA.white, fontFamily: MANDA.font, fontSize: 10.5, fontWeight: 800, color: MANDA.green }}>Refazer</div>
        <div style={{ position: 'absolute', left: 8, top: 8, color: MANDA.greenDeep }}>{Icon.check(16, MANDA.greenDeep)}</div>
      </div>
      <div style={{ fontFamily: MANDA.font, fontSize: 12, color: MANDA.inkMuted, marginTop: 6, fontWeight: 600 }}>{label}</div>
    </div>);

}

function ScreenKYCReview() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.white, display: 'flex', flexDirection: 'column' }}>
      <StatusSpacer />
      <KYCHeader title="Rever" />

      <div style={{ flex: 1, overflow: 'auto', padding: '8px 22px 8px' }}>
        <div style={{ fontFamily: MANDA.font, fontSize: 22, fontWeight: 800, letterSpacing: -0.6, color: MANDA.ink }}>Reveja antes de enviar</div>

        {/* Doc type */}
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14, background: MANDA.paper, border: `1px solid ${MANDA.cardBorder}` }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: MANDA.greenSoft, color: MANDA.greenDeep, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icon.shield(20, MANDA.greenDeep)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: MANDA.font, fontSize: 11.5, color: MANDA.inkMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>Documento</div>
            <div style={{ fontFamily: MANDA.font, fontSize: 14.5, fontWeight: 800, color: MANDA.ink, marginTop: 1 }}>Bilhete de Identidade</div>
          </div>
          <span style={{ fontFamily: MANDA.font, fontSize: 12.5, fontWeight: 800, color: MANDA.green }}>Editar</span>
        </div>

        {/* 2x2 grid */}
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <ReviewThumb label="Frente" />
          <ReviewThumb label="Verso" />
          <ReviewThumb label="Selfie com documento" />
          <ReviewThumb label="Selfie" />
        </div>

        {/* Consent */}
        <div style={{ marginTop: 18, display: 'flex', gap: 12, padding: '12px 4px' }}>
          <div style={{ width: 24, height: 24, borderRadius: 7, background: MANDA.green, border: `2px solid ${MANDA.green}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.ink, lineHeight: 1.5 }}>
            Autorizo a Manda a verificar a minha identidade com base nestes documentos.
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 22px 30px', borderTop: `1px solid ${MANDA.divider}` }}>
        <PrimaryButton full size="md">Enviar para verificação</PrimaryButton>
      </div>
    </div>);

}

// ──────────────────────────────────────────────────────────────
// KYC-5 · Result states
// ──────────────────────────────────────────────────────────────
function ScreenKYCPending() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.white, display: 'flex', flexDirection: 'column' }}>
      <StatusSpacer />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center' }}>
        <div style={{ width: 96, height: 96, borderRadius: 48, background: MANDA.warnSoft, color: MANDA.warn, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke={MANDA.warn} strokeWidth="1.8" />
            <path d="M12 7v5l3 2" stroke={MANDA.warn} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ fontFamily: MANDA.font, fontSize: 23, fontWeight: 800, letterSpacing: -0.6, color: MANDA.ink, marginTop: 20 }}>Estamos a rever o seu pedido</div>
        <div style={{ fontFamily: MANDA.font, fontSize: 14.5, color: MANDA.inkMuted, marginTop: 8, lineHeight: 1.5, maxWidth: 290 }}>
          A revisão é feita pela equipa Manda. A resposta chega normalmente em algumas horas — avisamos por notificação.
        </div>
        <div style={{ marginTop: 18 }}>
          <PrivacyNote>Pode continuar a usar o Manda enquanto verificamos.</PrivacyNote>
        </div>
      </div>
      <div style={{ padding: '12px 22px 30px' }}>
        <button style={{ width: '100%', height: 50, borderRadius: 25, border: `1.5px solid ${MANDA.cardBorder}`, background: MANDA.white, color: MANDA.ink, fontFamily: MANDA.font, fontWeight: 700, fontSize: 14.5 }}>Voltar</button>
      </div>
    </div>);

}

function ScreenKYCApproved() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.white, display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', flex: 1, background: `linear-gradient(180deg, ${MANDA.green}, #157346)`, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.18), transparent 70%)' }} />
        <div style={{ position: 'relative', width: 96, height: 96, borderRadius: 48, background: 'rgba(255,255,255,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 10px rgba(255,255,255,.08)' }}>
          <div style={{ width: 68, height: 68, borderRadius: 34, background: '#fff', color: MANDA.green, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icon.check(40, MANDA.green)}</div>
        </div>
        <div style={{ position: 'relative', fontFamily: MANDA.font, fontSize: 24, fontWeight: 800, letterSpacing: -0.7, marginTop: 20 }}>Identidade verificada</div>
        <div style={{ position: 'relative', marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 13px', borderRadius: 12, background: 'rgba(255,255,255,.16)', fontFamily: MANDA.font, fontSize: 12.5, fontWeight: 700 }}>
          {Icon.shield(15, '#fff')} Selo verificado activo
        </div>
        <div style={{ position: 'relative', fontFamily: MANDA.font, fontSize: 14, opacity: .9, marginTop: 14, lineHeight: 1.5, maxWidth: 280 }}>
          Já pode negociar com mais confiança. O seu perfil mostra agora o selo de identidade verificada.
        </div>
      </div>
      <div style={{ padding: '12px 22px 30px' }}>
        <PrimaryButton full size="md">Continuar</PrimaryButton>
      </div>
    </div>);

}

function ScreenKYCRejected() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.white, display: 'flex', flexDirection: 'column' }}>
      <StatusSpacer />
      <KYCHeader title="Verificação" />
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '14px 30px 8px', textAlign: 'center' }}>
        <div style={{ width: 90, height: 90, borderRadius: 45, background: MANDA.dangerSoft, color: MANDA.danger, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke={MANDA.danger} strokeWidth="1.8" />
            <path d="M12 7.5v5.5M12 16h.01" stroke={MANDA.danger} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ fontFamily: MANDA.font, fontSize: 22, fontWeight: 800, letterSpacing: -0.6, color: MANDA.ink, marginTop: 18 }}>Não foi possível verificar</div>
        <div style={{ fontFamily: MANDA.font, fontSize: 14, color: MANDA.inkMuted, marginTop: 8, lineHeight: 1.5, maxWidth: 290 }}>
          Reveja o motivo abaixo e reenvie os documentos. É rápido.
        </div>

        {/* Reason box */}
        <div style={{ marginTop: 18, width: '100%', textAlign: 'left', padding: '14px 16px', borderRadius: 16, background: MANDA.dangerSoft, border: `1px solid #F3D3CE` }}>
          <div style={{ fontFamily: MANDA.font, fontSize: 11.5, fontWeight: 800, color: MANDA.danger, textTransform: 'uppercase', letterSpacing: 0.5 }}>Motivo da rejeição</div>
          <div style={{ fontFamily: MANDA.font, fontSize: 14, color: MANDA.ink, marginTop: 6, lineHeight: 1.45 }}>
            A foto do verso do documento estava ilegível. Tire a foto com boa luz e sem reflexos.
          </div>
        </div>
      </div>
      <div style={{ padding: '12px 22px 30px', borderTop: `1px solid ${MANDA.divider}` }}>
        <PrimaryButton full size="md">Reenviar documentos</PrimaryButton>
      </div>
    </div>);

}

Object.assign(window, {
  ScreenKYCIntro, ScreenKYCDocType,
  ScreenKYCCaptureFront, ScreenKYCCaptureSelfieDoc, ScreenKYCCaptureDone,
  ScreenKYCReview, ScreenKYCPending, ScreenKYCApproved, ScreenKYCRejected,
  CaptureCard
});

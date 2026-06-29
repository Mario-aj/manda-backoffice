// Manda — Backoffice (web, desktop-first). Operations panel: KYC queue + review,
// transactions monitoring. Reuses MANDA tokens; web layout (no IOSDevice).

// ──────────────────────────────────────────────────────────────
// WebFrame — browser window chrome (traffic lights + URL pill)
// ──────────────────────────────────────────────────────────────
function WebFrame({ url = 'backoffice.manda.ao', children, width = 1280, height = 820 }) {
  return (
    <div style={{ width, height, borderRadius: 14, overflow: 'hidden', background: MANDA.white, boxShadow: '0 30px 70px rgba(0,0,0,.18), 0 0 0 1px rgba(0,0,0,.06)', display: 'flex', flexDirection: 'column' }}>
      {/* top chrome */}
      <div style={{ height: 42, flexShrink: 0, background: '#EDEFEC', borderBottom: `1px solid ${MANDA.divider}`, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 14 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <div key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />)}
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ minWidth: 320, height: 26, borderRadius: 8, background: MANDA.white, border: `1px solid ${MANDA.cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '0 14px', fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted, fontWeight: 600 }}>
            {Icon.lock(13, MANDA.inkSubtle)} {url}
          </div>
        </div>
        <div style={{ width: 52 }} />
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>{children}</div>
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Shell — sidebar + topbar + content
// ──────────────────────────────────────────────────────────────
function Sidebar({ active }) {
  const items = [
  { key: 'kyc', label: 'KYC', icon: Icon.shield },
  { key: 'tx', label: 'Transações', icon: Icon.exchange }];

  return (
    <div style={{ width: 240, flexShrink: 0, background: MANDA.greenDeep, color: '#fff', display: 'flex', flexDirection: 'column', padding: '22px 14px 16px' }}>
      <div style={{ padding: '0 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <MandaWordmark size={24} color="#fff" />
        <div style={{ fontFamily: MANDA.font, fontSize: 11.5, fontWeight: 700, letterSpacing: 1, color: MANDA.greenMint, textTransform: 'uppercase' }}>Backoffice</div>
      </div>

      <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map((it) => {
          const on = it.key === active;
          return (
            <div key={it.key} style={{
              display: 'flex', alignItems: 'center', gap: 11, padding: '11px 12px', borderRadius: 11,
              background: on ? MANDA.greenBright : 'transparent',
              color: on ? '#062618' : 'rgba(255,255,255,.82)',
              fontFamily: MANDA.font, fontSize: 14.5, fontWeight: on ? 800 : 600, cursor: 'pointer'
            }}>
              {it.icon(20, on ? '#062618' : 'rgba(255,255,255,.82)')}
              {it.label}
            </div>);

        })}
      </div>

      <div style={{ flex: 1 }} />
      <div style={{ paddingTop: 14, borderTop: '1px solid rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar name="Rita Operações" size={36} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: MANDA.font, fontSize: 13.5, fontWeight: 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Rita Mendes</div>
          <div style={{ fontFamily: MANDA.font, fontSize: 11.5, color: 'rgba(255,255,255,.6)' }}>Ops · Terminar sessão</div>
        </div>
      </div>
    </div>);

}

function Topbar({ title }) {
  return (
    <div style={{ height: 64, flexShrink: 0, borderBottom: `1px solid ${MANDA.divider}`, background: MANDA.white, display: 'flex', alignItems: 'center', padding: '0 26px', gap: 16 }}>
      <div style={{ flex: 1, fontFamily: MANDA.font, fontSize: 19, fontWeight: 800, color: MANDA.ink, letterSpacing: -0.4 }}>{title}</div>
      <div style={{ width: 280, height: 38, borderRadius: 10, background: MANDA.paper, display: 'flex', alignItems: 'center', padding: '0 13px', gap: 9, fontFamily: MANDA.font, fontSize: 13.5, color: MANDA.inkSubtle }}>
        {Icon.search(17, MANDA.inkSubtle)} Procurar utilizador, ref MND…
      </div>
      <Avatar name="Rita Mendes" size={38} />
    </div>);

}

function Shell({ active, title, children }) {
  return (
    <div style={{ height: '100%', display: 'flex', background: MANDA.paper, fontFamily: MANDA.font }}>
      <Sidebar active={active} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Topbar title={title} />
        <div style={{ flex: 1, minHeight: 0, overflow: 'auto', padding: '24px 26px' }}>{children}</div>
      </div>
    </div>);

}

// Shared badge for statuses
function BOBadge({ tone = 'green', children }) {
  const map = {
    warn: [MANDA.warnSoft, MANDA.warn],
    green: [MANDA.greenSoft, MANDA.greenDeep],
    danger: [MANDA.dangerSoft, MANDA.danger],
    blue: ['#E7EEF5', '#1A4F6E'],
    mute: [MANDA.paper, MANDA.inkMuted]
  };
  const [bg, fg] = map[tone] || map.green;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 8, background: bg, color: fg, fontFamily: MANDA.font, fontSize: 12, fontWeight: 800 }}>
      <span style={{ width: 6, height: 6, borderRadius: 3, background: fg }} /> {children}
    </span>);

}

function Chip({ active, children, tone }) {
  const activeBg = tone === 'warn' ? MANDA.warnSoft : tone === 'danger' ? MANDA.dangerSoft : MANDA.greenSoft;
  const activeFg = tone === 'warn' ? MANDA.warn : tone === 'danger' ? MANDA.danger : MANDA.greenDeep;
  return (
    <div style={{
      padding: '7px 14px', borderRadius: 18, fontFamily: MANDA.font, fontSize: 13, fontWeight: 700, cursor: 'pointer',
      background: active ? activeBg : MANDA.white,
      color: active ? activeFg : MANDA.inkMuted,
      border: `1px solid ${active ? 'transparent' : MANDA.cardBorder}`
    }}>{children}</div>);

}

// ──────────────────────────────────────────────────────────────
// BO-1 · Login
// ──────────────────────────────────────────────────────────────
function BOLogin() {
  return (
    <div style={{ height: '100%', background: MANDA.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MANDA.font }}>
      <div style={{ position: 'absolute', top: -120, left: -80, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,135,84,.12), transparent 70%)' }} />
      <div style={{ position: 'relative', width: 420, background: MANDA.white, borderRadius: 20, padding: '36px 36px 30px', boxShadow: '0 20px 50px rgba(11,77,47,.10)', border: `1px solid ${MANDA.cardBorder}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <MandaGlyph size={36} />
          <MandaWordmark size={24} />
        </div>
        <div style={{ fontFamily: MANDA.font, fontSize: 23, fontWeight: 800, letterSpacing: -0.6, color: MANDA.ink, marginTop: 22 }}>Entrar no backoffice</div>
        <div style={{ fontFamily: MANDA.font, fontSize: 13.5, color: MANDA.inkMuted, marginTop: 5 }}>Acesso restrito à equipa de operações.</div>

        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <TextField label="Email" value="rita.mendes@manda.ao" />
          <div>
            <TextField label="Palavra-passe" value="••••••••••" type="password" />
            <div style={{ marginTop: 8, padding: '8px 11px', borderRadius: 10, background: MANDA.dangerSoft, color: MANDA.danger, fontFamily: MANDA.font, fontSize: 12.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={MANDA.danger} strokeWidth="1.8" /><path d="M12 7.5v5.5M12 16h.01" stroke={MANDA.danger} strokeWidth="2" strokeLinecap="round" /></svg>
              Email ou palavra-passe incorretos.
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <PrimaryButton full size="md">Entrar</PrimaryButton>
        </div>
        <div style={{ textAlign: 'center', marginTop: 16, fontFamily: MANDA.font, fontSize: 12, color: MANDA.inkSubtle }}>
          Acesso restrito à equipa Manda · sessões auditadas
        </div>
      </div>
    </div>);

}

// ──────────────────────────────────────────────────────────────
// BO-2 · KYC queue
// ──────────────────────────────────────────────────────────────
const KYC_QUEUE = [
{ name: 'João Cangola', user: '@joao.cangola', doc: 'Bilhete de Identidade', when: 'Hoje · 14:21', status: 'warn', label: 'Pendente' },
{ name: 'Maria Pacheco', user: '@maria.p', doc: 'Passaporte', when: 'Hoje · 13:48', status: 'warn', label: 'Pendente' },
{ name: 'Eduardo Bumba', user: '@eddy.bmb', doc: 'Carta de Condução', when: 'Hoje · 11:12', status: 'warn', label: 'Pendente' },
{ name: 'Lucía Ferraz', user: '@lu.ferraz', doc: 'Bilhete de Identidade', when: 'Ontem · 18:30', status: 'green', label: 'Aprovado' },
{ name: 'Roberto Matamba', user: '@rob.matamba', doc: 'Passaporte', when: 'Ontem · 16:05', status: 'danger', label: 'Rejeitado' },
{ name: 'Ana Sambo', user: '@ana.sambo', doc: 'Bilhete de Identidade', when: 'Ontem · 09:41', status: 'green', label: 'Aprovado' }];


function TableHead({ cols }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: cols.map((c) => c.w).join(' '), padding: '0 18px', height: 40, alignItems: 'center', borderBottom: `1px solid ${MANDA.divider}` }}>
      {cols.map((c, i) =>
      <div key={i} style={{ fontFamily: MANDA.font, fontSize: 11.5, fontWeight: 800, letterSpacing: 0.5, color: MANDA.inkSubtle, textTransform: 'uppercase', textAlign: c.align || 'left' }}>{c.label}</div>
      )}
    </div>);

}

function BOKycQueue() {
  const cols = [{ label: 'Utilizador', w: '2fr' }, { label: 'Documento', w: '1.4fr' }, { label: 'Submetido', w: '1.2fr' }, { label: 'Estado', w: '1fr', align: 'right' }];
  return (
    <Shell active="kyc" title="Pedidos de verificação">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
        <Chip active tone="warn">Pendentes · 3</Chip>
        <Chip>Aprovados</Chip>
        <Chip>Rejeitados</Chip>
        <div style={{ flex: 1 }} />
        <div style={{ fontFamily: MANDA.font, fontSize: 13, color: MANDA.inkMuted, fontWeight: 600 }}>6 pedidos</div>
      </div>

      <div style={{ background: MANDA.white, borderRadius: 16, border: `1px solid ${MANDA.cardBorder}`, overflow: 'hidden' }}>
        <TableHead cols={cols} />
        {KYC_QUEUE.map((r, i) =>
        <div key={i} style={{ display: 'grid', gridTemplateColumns: cols.map((c) => c.w).join(' '), padding: '0 18px', minHeight: 64, alignItems: 'center', borderBottom: i < KYC_QUEUE.length - 1 ? `1px solid ${MANDA.divider}` : 'none', cursor: 'pointer', background: i === 0 ? 'rgba(26,135,84,.03)' : MANDA.white }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar name={r.name} size={38} />
              <div>
                <div style={{ fontFamily: MANDA.font, fontSize: 14, fontWeight: 700, color: MANDA.ink }}>{r.name}</div>
                <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted }}>{r.user}</div>
              </div>
            </div>
            <div style={{ fontFamily: MANDA.font, fontSize: 13.5, color: MANDA.ink }}>{r.doc}</div>
            <div style={{ fontFamily: MANDA.font, fontSize: 13, color: MANDA.inkMuted }}>{r.when}</div>
            <div style={{ textAlign: 'right' }}><BOBadge tone={r.status}>{r.label}</BOBadge></div>
          </div>
        )}
      </div>
    </Shell>);

}

// ──────────────────────────────────────────────────────────────
// BO-3 · KYC detail (+ lightbox + reject modal variants)
// ──────────────────────────────────────────────────────────────
function ImgTile({ label, big }) {
  return (
    <div>
      <div style={{ position: 'relative', height: big ? 280 : 180, borderRadius: 14, background: MANDA.greenSoft, border: `1px solid #CFE8DA`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-in', overflow: 'hidden' }}>
        {Icon.shield(big ? 40 : 30, MANDA.greenDeep)}
        <div style={{ position: 'absolute', right: 10, top: 10, width: 28, height: 28, borderRadius: 8, background: MANDA.white, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MANDA.greenDeep }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke={MANDA.greenDeep} strokeWidth="1.8" /><path d="M20 20l-3.5-3.5M11 8v6M8 11h6" stroke={MANDA.greenDeep} strokeWidth="1.8" strokeLinecap="round" /></svg>
        </div>
      </div>
      <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted, marginTop: 7, fontWeight: 600 }}>{label}</div>
    </div>);

}

function KycDetailBody() {
  return (
    <div style={{ display: 'flex', gap: 24, height: '100%' }}>
      {/* Left column */}
      <div style={{ width: 300, flexShrink: 0 }}>
        <div style={{ background: MANDA.white, borderRadius: 16, border: `1px solid ${MANDA.cardBorder}`, padding: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Avatar name="João Cangola" size={72} />
            <div style={{ fontFamily: MANDA.font, fontSize: 17, fontWeight: 800, color: MANDA.ink, marginTop: 12 }}>João Cangola</div>
            <div style={{ fontFamily: MANDA.font, fontSize: 13, color: MANDA.inkMuted }}>@joao.cangola</div>
          </div>
          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
            ['Email', 'joao.c@email.ao'],
            ['Telefone', '+244 923 ··· 481'],
            ['Membro desde', 'Mar 2025'],
            ['Documento', 'Bilhete de Identidade'],
            ['Submetido', 'Hoje · 14:21']].
            map(([k, v], i) =>
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: i < 4 ? `1px solid ${MANDA.divider}` : 'none' }}>
                <span style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted }}>{k}</span>
                <span style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.ink, fontWeight: 700, textAlign: 'right' }}>{v}</span>
              </div>
            )}
          </div>
        </div>
        <div style={{ marginTop: 14, padding: '11px 13px', borderRadius: 12, background: MANDA.paper, border: `1px solid ${MANDA.cardBorder}`, fontFamily: MANDA.font, fontSize: 11.5, color: MANDA.inkMuted, lineHeight: 1.45, display: 'flex', gap: 8 }}>
          {Icon.lock(15, MANDA.inkSubtle)} Imagens sensíveis · acessos registados na auditoria.
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <ImgTile label="Frente do documento" />
          <ImgTile label="Verso do documento" />
          <ImgTile label="Selfie com documento" />
          <ImgTile label="Selfie" />
        </div>
        <div style={{ flex: 1 }} />
        {/* Action bar */}
        <div style={{ marginTop: 20, padding: '14px 18px', background: MANDA.white, borderRadius: 16, border: `1px solid ${MANDA.cardBorder}`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted }}>Esta acção fica registada na auditoria.</div>
          <button style={{ height: 44, padding: '0 22px', borderRadius: 22, border: `1.5px solid ${MANDA.danger}`, background: MANDA.white, color: MANDA.danger, fontFamily: MANDA.font, fontWeight: 800, fontSize: 14 }}>Rejeitar</button>
          <PrimaryButton size="md" icon={Icon.check(18, '#fff')}>Aprovar</PrimaryButton>
        </div>
      </div>
    </div>);

}

function BOKycDetailHeader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
      <button style={{ height: 34, padding: '0 14px', borderRadius: 17, border: `1px solid ${MANDA.cardBorder}`, background: MANDA.white, color: MANDA.ink, fontFamily: MANDA.font, fontWeight: 700, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        {Icon.chevronLeft(16)} Pedidos
      </button>
      <BOBadge tone="warn">Pendente</BOBadge>
    </div>);

}

function BOKycDetail() {
  return (
    <Shell active="kyc" title="João Cangola · verificação">
      <BOKycDetailHeader />
      <KycDetailBody />
    </Shell>);

}

function BOKycLightbox() {
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <Shell active="kyc" title="João Cangola · verificação">
        <BOKycDetailHeader />
        <KycDetailBody />
      </Shell>
      {/* Lightbox */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,38,24,.72)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <div style={{ position: 'absolute', top: 22, right: 26, width: 40, height: 40, borderRadius: 20, background: 'rgba(255,255,255,.14)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>×</div>
        <div style={{ width: 560, height: 380, borderRadius: 18, background: MANDA.greenSoft, border: `2px solid rgba(255,255,255,.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 30px 80px rgba(0,0,0,.4)' }}>
          {Icon.shield(64, MANDA.greenDeep)}
        </div>
        <div style={{ fontFamily: MANDA.font, fontSize: 14, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
          Frente do documento {Icon.lock(15, '#fff')} <span style={{ opacity: .6 }}>1 / 4</span>
        </div>
      </div>
    </div>);

}

function BOKycReject() {
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <Shell active="kyc" title="João Cangola · verificação">
        <BOKycDetailHeader />
        <KycDetailBody />
      </Shell>
      {/* Modal */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,38,24,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 480, background: MANDA.white, borderRadius: 20, padding: '24px 24px 22px', boxShadow: '0 30px 80px rgba(0,0,0,.3)' }}>
          <div style={{ fontFamily: MANDA.font, fontSize: 19, fontWeight: 800, color: MANDA.ink, letterSpacing: -0.4 }}>Motivo da rejeição</div>
          <div style={{ fontFamily: MANDA.font, fontSize: 13, color: MANDA.inkMuted, marginTop: 5 }}>O utilizador verá esta mensagem. Seja claro e específico.</div>

          <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Documento ilegível', 'Selfie não corresponde', 'Documento expirado', 'Foto cortada'].map((t, i) =>
            <span key={t} style={{ padding: '6px 12px', borderRadius: 14, background: i === 0 ? MANDA.greenSoft : MANDA.paper, color: i === 0 ? MANDA.greenDeep : MANDA.inkMuted, border: `1px solid ${i === 0 ? 'transparent' : MANDA.cardBorder}`, fontFamily: MANDA.font, fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>{t}</span>
            )}
          </div>

          <div style={{ marginTop: 14, minHeight: 90, padding: '12px 14px', borderRadius: 12, border: `1.5px solid ${MANDA.cardBorder}`, fontFamily: MANDA.font, fontSize: 14, color: MANDA.ink, lineHeight: 1.45 }}>
            A foto do verso do documento estava ilegível. Tire a foto com boa luz e sem reflexos.
          </div>

          <div style={{ marginTop: 18, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button style={{ height: 44, padding: '0 20px', borderRadius: 22, border: `1px solid ${MANDA.cardBorder}`, background: MANDA.white, color: MANDA.ink, fontFamily: MANDA.font, fontWeight: 700, fontSize: 14 }}>Cancelar</button>
            <button style={{ height: 44, padding: '0 22px', borderRadius: 22, border: 'none', background: MANDA.danger, color: '#fff', fontFamily: MANDA.font, fontWeight: 800, fontSize: 14 }}>Confirmar rejeição</button>
          </div>
        </div>
      </div>
    </div>);

}

// ──────────────────────────────────────────────────────────────
// BO-4 · Transactions list
// ──────────────────────────────────────────────────────────────
const TX_ROWS = [
{ ref: 'MND-8147', buyer: 'João Cangola', seller: 'Maria Pacheco', amount: '175.875', status: 'blue', label: 'Aguardando ops', when: 'Hoje · 14:32', who: 'Manda', hi: 'warn' },
{ ref: 'MND-8142', buyer: 'Ana Sambo', seller: 'Pedro Cassule', amount: '210.000', status: 'danger', label: 'Em disputa', when: 'Hoje · 13:10', who: 'Manda', hi: 'danger' },
{ ref: 'MND-8138', buyer: 'Lucía Ferraz', seller: 'Eduardo Bumba', amount: '92.400', status: 'green', label: 'Em curso', when: 'Hoje · 12:48', who: 'Utilizador' },
{ ref: 'MND-8131', buyer: 'Roberto Matamba', seller: 'Inês Mucanza', amount: '348.750', status: 'mute', label: 'Concluída', when: 'Ontem · 19:22', who: '—' },
{ ref: 'MND-8129', buyer: 'José Tchindji', seller: 'Beatriz Lemos', amount: '61.250', status: 'mute', label: 'Cancelada', when: 'Ontem · 17:03', who: '—' }];


function BOTxList() {
  const cols = [{ label: 'Ref', w: '0.9fr' }, { label: 'Comprador', w: '1.3fr' }, { label: 'Vendedor', w: '1.3fr' }, { label: 'Montante (Kz)', w: '1fr', align: 'right' }, { label: 'Estado', w: '1.1fr' }, { label: 'Aberta', w: '1fr' }, { label: 'Acção de quem?', w: '1fr' }];
  return (
    <Shell active="tx" title="Transações">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
        <Chip active>Todas</Chip>
        <Chip>Em curso</Chip>
        <Chip active tone="warn">Aguardando ops · 1</Chip>
        <Chip active tone="danger">Em disputa · 1</Chip>
        <Chip>Concluídas</Chip>
        <Chip>Canceladas</Chip>
      </div>

      <div style={{ background: MANDA.white, borderRadius: 16, border: `1px solid ${MANDA.cardBorder}`, overflow: 'hidden' }}>
        <TableHead cols={cols} />
        {TX_ROWS.map((r, i) => {
          const hiBg = r.hi === 'danger' ? 'rgba(197,72,59,.05)' : r.hi === 'warn' ? 'rgba(201,122,31,.06)' : MANDA.white;
          return (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: cols.map((c) => c.w).join(' '), padding: '0 18px', minHeight: 58, alignItems: 'center', borderBottom: i < TX_ROWS.length - 1 ? `1px solid ${MANDA.divider}` : 'none', background: hiBg, cursor: 'pointer' }}>
              <div style={{ fontFamily: MANDA.fontMono, fontSize: 13, fontWeight: 700, color: MANDA.greenDeep }}>{r.ref}</div>
              <div style={{ fontFamily: MANDA.font, fontSize: 13.5, color: MANDA.ink }}>{r.buyer}</div>
              <div style={{ fontFamily: MANDA.font, fontSize: 13.5, color: MANDA.ink }}>{r.seller}</div>
              <div style={{ fontFamily: MANDA.font, fontSize: 13.5, fontWeight: 700, color: MANDA.ink, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{r.amount}</div>
              <div><BOBadge tone={r.status}>{r.label}</BOBadge></div>
              <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted }}>{r.when}</div>
              <div style={{ fontFamily: MANDA.font, fontSize: 12.5, fontWeight: 700, color: r.who === 'Manda' ? '#1A4F6E' : r.who === 'Utilizador' ? MANDA.greenDeep : MANDA.inkSubtle }}>{r.who}</div>
            </div>);

        })}
      </div>
    </Shell>);

}

// ──────────────────────────────────────────────────────────────
// BO-5 · Transaction detail
// ──────────────────────────────────────────────────────────────
function TimelineStep({ label, state }) {
  // state: 'done' | 'current' | 'future' | 'branch'
  const c = state === 'done' ? MANDA.green : state === 'current' ? MANDA.green : state === 'branch' ? MANDA.inkSubtle : MANDA.cardBorder;
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20 }}>
        <div style={{ width: 18, height: 18, borderRadius: 9, background: state === 'done' ? MANDA.green : MANDA.white, border: `2px solid ${c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: state === 'current' ? `0 0 0 4px ${MANDA.greenSoft}` : 'none', flexShrink: 0 }}>
          {state === 'done' && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        </div>
        <div style={{ width: 2, flex: 1, minHeight: 18, background: state === 'done' ? MANDA.green : MANDA.divider }} />
      </div>
      <div style={{ paddingBottom: 14 }}>
        <div style={{ fontFamily: MANDA.font, fontSize: 13.5, fontWeight: state === 'current' ? 800 : 700, color: state === 'future' ? MANDA.inkSubtle : state === 'branch' ? MANDA.inkMuted : MANDA.ink }}>{label}</div>
        {state === 'current' && <div style={{ fontFamily: MANDA.font, fontSize: 11.5, fontWeight: 800, color: '#1A4F6E', marginTop: 2 }}>← estado atual</div>}
      </div>
    </div>);

}

function BOTxDetail() {
  return (
    <Shell active="tx" title="Transação MND-8147">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <button style={{ height: 34, padding: '0 14px', borderRadius: 17, border: `1px solid ${MANDA.cardBorder}`, background: MANDA.white, color: MANDA.ink, fontFamily: MANDA.font, fontWeight: 700, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          {Icon.chevronLeft(16)} Transações
        </button>
        <div style={{ fontFamily: MANDA.fontMono, fontSize: 15, fontWeight: 700, color: MANDA.greenDeep }}>MND-8147</div>
        <BOBadge tone="blue">Aguardando ops</BOBadge>
        <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: '#1A4F6E', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          ⏳ Sem contagem contra a Manda
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        {/* Left: summary + comprovativos */}
        <div style={{ width: 380, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: MANDA.white, borderRadius: 16, border: `1px solid ${MANDA.cardBorder}`, padding: 18 }}>
            <div style={{ fontFamily: MANDA.font, fontSize: 11.5, fontWeight: 800, color: MANDA.inkSubtle, textTransform: 'uppercase', letterSpacing: 0.5 }}>Resumo</div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar name="João Cangola" size={36} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: MANDA.font, fontSize: 13.5, fontWeight: 700, color: MANDA.ink }}>João Cangola</div>
                <div style={{ fontFamily: MANDA.font, fontSize: 11.5, color: MANDA.inkMuted }}>Comprador</div>
              </div>
              {Icon.exchange(18, MANDA.inkSubtle)}
              <div style={{ flex: 1, textAlign: 'right' }}>
                <div style={{ fontFamily: MANDA.font, fontSize: 13.5, fontWeight: 700, color: MANDA.ink }}>Maria Pacheco</div>
                <div style={{ fontFamily: MANDA.font, fontSize: 11.5, color: MANDA.inkMuted }}>Vendedora</div>
              </div>
            </div>

            <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${MANDA.divider}`, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
              ['Base (200 USD × 875)', '175.000 Kz'],
              ['Comprador paga (+0,5%)', '175.875 Kz'],
              ['Vendedor recebe (−0,5%)', '174.125 Kz'],
              ['Taxa Manda (1%)', '1.750 Kz']].
              map(([k, v], i) =>
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted }}>{k}</span>
                  <span style={{ fontFamily: MANDA.font, fontSize: 12.5, fontWeight: 700, color: MANDA.ink, fontVariantNumeric: 'tabular-nums' }}>{v}</span>
                </div>
              )}
            </div>

            <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 11, background: MANDA.paper }}>
              <div style={{ fontFamily: MANDA.font, fontSize: 11, fontWeight: 800, color: MANDA.inkSubtle, textTransform: 'uppercase', letterSpacing: 0.4 }}>Conta da empresa (snapshot)</div>
              <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.ink, fontWeight: 700, marginTop: 3 }}>Manda Escrow · BAI</div>
              <div style={{ fontFamily: MANDA.fontMono, fontSize: 12, color: MANDA.inkMuted, marginTop: 2 }}>AO06 0040 ···· 0123 4</div>
            </div>
          </div>

          {/* Comprovativos */}
          <div style={{ background: MANDA.white, borderRadius: 16, border: `1px solid ${MANDA.cardBorder}`, padding: 18 }}>
            <div style={{ fontFamily: MANDA.font, fontSize: 11.5, fontWeight: 800, color: MANDA.inkSubtle, textTransform: 'uppercase', letterSpacing: 0.5 }}>Comprovativos</div>
            <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {['Kz · comprador', 'USD · vendedor', 'Payout'].map((l, i) =>
              <div key={l}>
                  <div style={{ height: 74, borderRadius: 11, background: i === 2 ? MANDA.paper : MANDA.greenSoft, border: `1px solid ${i === 2 ? MANDA.cardBorder : '#CFE8DA'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: i === 2 ? 'default' : 'zoom-in', color: i === 2 ? MANDA.inkSubtle : MANDA.greenDeep }}>
                    {i === 2 ? <span style={{ fontFamily: MANDA.font, fontSize: 10.5, fontWeight: 700 }}>pendente</span> : Icon.shield(22, MANDA.greenDeep)}
                  </div>
                  <div style={{ fontFamily: MANDA.font, fontSize: 10.5, color: MANDA.inkMuted, marginTop: 5, fontWeight: 600, textAlign: 'center' }}>{l}</div>
                </div>
              )}
            </div>
            <div style={{ marginTop: 10, fontFamily: MANDA.font, fontSize: 11, color: MANDA.inkSubtle, display: 'flex', gap: 6, lineHeight: 1.4 }}>
              {Icon.lock(14, MANDA.inkSubtle)} Documentos sensíveis · acesso auditado.
            </div>
          </div>
        </div>

        {/* Middle: timeline */}
        <div style={{ flex: 1, minWidth: 0, background: MANDA.white, borderRadius: 16, border: `1px solid ${MANDA.cardBorder}`, padding: 20 }}>
          <div style={{ fontFamily: MANDA.font, fontSize: 11.5, fontWeight: 800, color: MANDA.inkSubtle, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 14 }}>Linha do tempo</div>
          <TimelineStep label="Proposta enviada (vendedor)" state="done" />
          <TimelineStep label="Aceite pelo comprador" state="done" />
          <TimelineStep label="A aguardar pagamento Kz" state="done" />
          <TimelineStep label="Comprador pagou · pendente ops" state="current" />
          <TimelineStep label="Escrow confirmado" state="future" />
          <TimelineStep label="Vendedor enviou USD" state="future" />
          <TimelineStep label="Comprador confirmou" state="future" />
          <TimelineStep label="Payout ao vendedor" state="future" />
          <div style={{ marginTop: 6, padding: '10px 12px', borderRadius: 11, background: MANDA.paper, fontFamily: MANDA.font, fontSize: 11.5, color: MANDA.inkMuted, lineHeight: 1.45 }}>
            Ramos possíveis: rejeitada · proposta expirada · cancelada · disputa (resolução manual).
          </div>
        </div>

        {/* Right: ops actions (state-conditioned) */}
        <div style={{ width: 250, flexShrink: 0, background: MANDA.white, borderRadius: 16, border: `1px solid ${MANDA.cardBorder}`, padding: 18 }}>
          <div style={{ fontFamily: MANDA.font, fontSize: 11.5, fontWeight: 800, color: MANDA.inkSubtle, textTransform: 'uppercase', letterSpacing: 0.5 }}>Acções de ops</div>
          <div style={{ fontFamily: MANDA.font, fontSize: 11.5, color: MANDA.inkMuted, marginTop: 6, lineHeight: 1.4 }}>Conforme o estado atual.</div>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <PrimaryButton full size="sm" icon={Icon.check(16, '#fff')}>Confirmar Kz recebido</PrimaryButton>
            <button style={{ height: 42, borderRadius: 21, border: `1.5px solid ${MANDA.cardBorder}`, background: MANDA.white, color: MANDA.inkMuted, fontFamily: MANDA.font, fontWeight: 700, fontSize: 13 }}>Marcar payout feito</button>
            <button style={{ height: 42, borderRadius: 21, border: `1.5px solid ${MANDA.danger}`, background: MANDA.white, color: MANDA.danger, fontFamily: MANDA.font, fontWeight: 800, fontSize: 13 }}>Resolver disputa</button>
            <div style={{ paddingLeft: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontFamily: MANDA.font, fontSize: 12, color: MANDA.inkMuted, display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ width: 5, height: 5, borderRadius: 3, background: MANDA.inkSubtle }} /> Reembolsar comprador</div>
              <div style={{ fontFamily: MANDA.font, fontSize: 12, color: MANDA.inkMuted, display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ width: 5, height: 5, borderRadius: 3, background: MANDA.inkSubtle }} /> Libertar vendedor</div>
            </div>
          </div>
          <div style={{ marginTop: 16, paddingTop: 12, borderTop: `1px solid ${MANDA.divider}`, fontFamily: MANDA.font, fontSize: 11, color: MANDA.inkSubtle, lineHeight: 1.45 }}>
            Todas as acções exigem confirmação e ficam registadas na auditoria.
          </div>
        </div>
      </div>
    </Shell>);

}

Object.assign(window, {
  WebFrame, BOLogin, BOKycQueue, BOKycDetail, BOKycLightbox, BOKycReject,
  BOTxList, BOTxDetail
});

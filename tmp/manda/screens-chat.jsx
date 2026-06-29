// Manda — Chat list, search, 1:1 chat, group chat

// Helper: status bar spacer (sits beneath the absolute iOS status bar)
function StatusSpacer() {
  return <div style={{ height: 54 }} />;
}

// ──────────────────────────────────────────────────────────────
// Chat list — main "Conversas" screen
// ──────────────────────────────────────────────────────────────
function ScreenChatList() {
  const chats = [
  { name: 'Maria Pacheco', last: 'Tenho 500 USD disponível, câmbio 875.', time: '14:32', unread: 2, verified: true, hasTx: true, txStatus: 'em curso' },
  { name: 'Câmbio Luanda 🇦🇴', last: 'Pedro: alguém com 1.200 EUR para hoje?', time: '14:18', unread: 12, group: true },
  { name: 'Eduardo Bumba', last: 'Pagamento confirmado ✓', time: '13:50', verified: true, you: true },
  { name: 'Lucía Ferraz', last: 'Você: vou enviar agora', time: '12:04', verified: true, double: true },
  { name: 'USD Express', last: 'Ana: vendo 300 USD a 870', time: '11:47', unread: 5, group: true, muted: true },
  { name: 'Roberto Matamba', last: 'Boa, fechado então 👌', time: 'ontem', double: true },
  { name: 'Câmbio EUR Angola', last: 'José: alguém compra 800 EUR?', time: 'ontem', group: true, muted: true },
  { name: 'Suporte Manda', last: 'Sua conta foi verificada com sucesso.', time: 'seg', verified: true }];


  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.white, display: 'flex', flexDirection: 'column' }}>
      <StatusSpacer />

      {/* header */}
      <div style={{ padding: '6px 20px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <MandaGlyph size={32} />
        <div style={{ fontFamily: MANDA.font, fontSize: 24, fontWeight: 800, letterSpacing: -0.6, color: MANDA.ink, flex: 1 }}>Conversas</div>
        <button style={{ width: 38, height: 38, borderRadius: 19, border: 'none', background: MANDA.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MANDA.ink }}>{Icon.pencilSquare(20, MANDA.ink)}</button>
      </div>

      {/* search */}
      <div style={{ padding: '0 16px 8px' }}>
        <div style={{ height: 42, borderRadius: 12, background: MANDA.paper, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, color: MANDA.inkSubtle, fontFamily: MANDA.font, fontSize: 15 }}>
          {Icon.search(18, MANDA.inkSubtle)} Procurar pessoas, grupos…
        </div>
      </div>

      {/* tabs */}
      <div style={{ padding: '6px 16px 4px', display: 'flex', gap: 8 }}>
        {['Todas', 'Não lidas', 'Negócios', 'Grupos'].map((t, i) =>
        <div key={t} style={{
          padding: '7px 14px', borderRadius: 18,
          background: i === 0 ? MANDA.greenSoft : 'transparent',
          color: i === 0 ? MANDA.greenDeep : MANDA.inkMuted,
          fontFamily: MANDA.font, fontWeight: 700, fontSize: 13
        }}>{t}</div>
        )}
      </div>

      {/* list */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {chats.map((c, i) =>
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 18px' }}>
            {c.group ? <GroupAvatar names={[c.name, c.name.split(' ')[1] || 'X']} size={50} /> : <Avatar name={c.name} size={50} verified={c.verified} />}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ fontFamily: MANDA.font, fontSize: 15.5, fontWeight: 700, color: MANDA.ink, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</div>
                {c.muted && <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 11h3l4-3v8l-4-3H3v-2zM15 9l5 6M20 9l-5 6" stroke={MANDA.inkSubtle} strokeWidth="1.7" strokeLinecap="round" /></svg>}
                <div style={{ fontFamily: MANDA.font, fontSize: 12, color: c.unread ? MANDA.green : MANDA.inkSubtle, fontWeight: c.unread ? 700 : 500 }}>{c.time}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                {c.double && Icon.doubleCheck(15, MANDA.green)}
                <div style={{ fontFamily: MANDA.font, fontSize: 13.5, color: c.unread ? MANDA.ink : MANDA.inkMuted, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: c.unread ? 500 : 400 }}>{c.last}</div>
                {c.unread && !c.hasTx &&
              <div style={{ minWidth: 20, height: 20, padding: '0 6px', borderRadius: 10, background: MANDA.green, color: '#fff', fontFamily: MANDA.font, fontSize: 11.5, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.unread}</div>
              }
              </div>
              {c.hasTx &&
            <div style={{ marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 9px', borderRadius: 9, background: MANDA.greenSoft, color: MANDA.greenDeep, fontFamily: MANDA.font, fontSize: 11.5, fontWeight: 700 }}>
                  <span style={{ width: 6, height: 6, borderRadius: 3, background: MANDA.green, boxShadow: `0 0 0 3px ${MANDA.greenMint}` }} />
                  Transação {c.txStatus} · passo 1/4
                </div>
            }
            </div>
          </div>
        )}
      </div>

      {/* FAB — entry point to Create Group flow */}
      <a href="#group-create-details" title="Criar grupo" aria-label="Criar grupo" style={{ position: 'absolute', right: 18, bottom: 110, width: 56, height: 56, borderRadius: 28, background: MANDA.green, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', boxShadow: `0 10px 24px ${MANDA.green}55` }}>
        {Icon.plus(26, '#fff')}
      </a>

      {/* tab bar */}
      <TabBar active="chats" />
    </div>);

}

function TabBar({ active }) {
  const items = [
  { key: 'chats', label: 'Conversas', icon: Icon.chat },
  { key: 'wallet', label: 'Transações', icon: Icon.exchange },
  { key: 'profile', label: 'Perfil', icon: Icon.user }];

  return (
    <div style={{
      borderTop: `1px solid ${MANDA.divider}`, background: MANDA.white,
      padding: '8px 14px 28px', display: 'flex', justifyContent: 'space-around'
    }}>
      {items.map((it) =>
      <div key={it.key} style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
        color: active === it.key ? MANDA.green : MANDA.inkSubtle,
        fontFamily: MANDA.font, fontSize: 11, fontWeight: 700
      }}>
          {it.icon(24, active === it.key ? MANDA.green : MANDA.inkSubtle)}
          {it.label}
        </div>
      )}
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Search screen
// ──────────────────────────────────────────────────────────────
function ScreenSearch() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.white, display: 'flex', flexDirection: 'column' }}>
      <StatusSpacer />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 14px 12px' }}>
        <button style={{ width: 38, height: 38, borderRadius: 19, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MANDA.ink }}>{Icon.chevronLeft(22)}</button>
        <div style={{ flex: 1, height: 42, borderRadius: 12, background: MANDA.paper, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8 }}>
          {Icon.search(18, MANDA.inkSubtle)}
          <span style={{ fontFamily: MANDA.font, fontSize: 15, color: MANDA.ink, fontWeight: 600, flex: 1 }}>maria</span>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: MANDA.inkSubtle, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>×</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '0 4px' }}>
        {/* Users */}
        <SectionHeader label="Usuários" count={3} />
        {[
        { name: 'Maria Pacheco', sub: '@maria.p · Reputação 4.9★ · 12 transações', verified: true },
        { name: 'Maria José Lima', sub: '@maria.jose · 5 transações', verified: false },
        { name: 'Mariana Vunge', sub: '@mariana.vng · Nova no Manda' }].
        map((u, i) =>
        <SearchRow key={i} avatar={<Avatar name={u.name} size={44} verified={u.verified} />} title={u.name} sub={u.sub} match="Maria" trailing={<button style={{ height: 32, padding: '0 14px', borderRadius: 16, background: MANDA.green, color: '#fff', border: 'none', fontFamily: MANDA.font, fontWeight: 700, fontSize: 12.5 }}>Conversar</button>} />
        )}

        <SectionHeader label="Grupos" count={2} />
        {[
        { name: 'Câmbio Luanda 🇦🇴', sub: '1.247 membros · Grupo público' },
        { name: 'Mariners FX — USD/Kz', sub: '328 membros · Grupo público' }].
        map((g, i) =>
        <SearchRow key={i} avatar={<GroupAvatar names={[g.name, 'B']} size={44} />} title={g.name} sub={g.sub} match="Mar" trailing={<button style={{ height: 32, padding: '0 14px', borderRadius: 16, background: 'transparent', color: MANDA.green, border: `1.5px solid ${MANDA.green}`, fontFamily: MANDA.font, fontWeight: 700, fontSize: 12.5 }}>Entrar</button>} />
        )}

        <SectionHeader label="Mensagens" count={4} />
        {[
        { from: 'Maria Pacheco', preview: 'Mandei o comprovativo, podes ver?', time: 'ontem' },
        { from: 'Câmbio Luanda 🇦🇴', preview: 'Maria está vendendo USD a 875.', time: 'seg' }].
        map((m, i) =>
        <SearchRow key={i} avatar={<Avatar name={m.from} size={44} />} title={m.from} sub={m.preview} match="Maria" trailing={<span style={{ fontFamily: MANDA.font, fontSize: 11.5, color: MANDA.inkSubtle }}>{m.time}</span>} />
        )}
      </div>
    </div>);

}
function SectionHeader({ label, count }) {
  return (
    <div style={{ padding: '14px 20px 6px', display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ fontFamily: MANDA.font, fontSize: 12, fontWeight: 800, letterSpacing: 0.8, color: MANDA.inkMuted, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontFamily: MANDA.font, fontSize: 11.5, color: MANDA.inkSubtle, fontWeight: 600 }}>{count}</div>
      <div style={{ flex: 1, height: 1, background: MANDA.divider }} />
    </div>);

}
function SearchRow({ avatar, title, sub, match, trailing }) {
  // Wrap matching substring in green
  const idx = title.toLowerCase().indexOf((match || '').toLowerCase());
  const titleEl = match && idx >= 0 ?
  <>{title.slice(0, idx)}<span style={{ color: MANDA.green }}>{title.slice(idx, idx + match.length)}</span>{title.slice(idx + match.length)}</> :
  title;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px' }}>
      {avatar}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: MANDA.font, fontSize: 14.5, fontWeight: 700, color: MANDA.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{titleEl}</div>
        <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sub}</div>
      </div>
      {trailing}
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Chat conversation 1:1
// ──────────────────────────────────────────────────────────────
function ChatHeader({ name, sub, verified, group, onTransaction }) {
  return (
    <div style={{ position: 'relative', zIndex: 5 }}>
      <StatusSpacer />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 14px 10px', borderBottom: `1px solid ${MANDA.divider}` }}>
        <button style={{ width: 32, height: 32, borderRadius: 16, border: 'none', background: 'transparent', color: MANDA.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icon.chevronLeft(22)}</button>
        {group ? <GroupAvatar names={[name, 'B']} size={38} /> : <Avatar name={name} size={38} verified={verified} />}
        <a href={group ? '#group-settings-owner' : undefined} style={{ flex: 1, minWidth: 0, textDecoration: 'none', color: 'inherit', cursor: group ? 'pointer' : 'default' }} title={group ? 'Abrir info do grupo' : undefined}>
          <div style={{ fontFamily: MANDA.font, fontSize: 15.5, fontWeight: 800, color: MANDA.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
          <div style={{ fontFamily: MANDA.font, fontSize: 12, color: MANDA.inkMuted, marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sub}{group && <span style={{ color: MANDA.inkSubtle }}> · toque para ver info</span>}</div>
        </a>
        {onTransaction &&
        <button style={{ height: 34, padding: '0 12px', borderRadius: 17, border: 'none', background: MANDA.green, color: '#fff', fontFamily: MANDA.font, fontWeight: 700, fontSize: 12.5, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {Icon.exchange(16, '#fff')} Negociar
          </button>
        }
      </div>
    </div>);

}

function Bubble({ side = 'them', children, time, double, tail = true, color }) {
  const me = side === 'me';
  return (
    <div style={{ display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start', padding: '2px 14px' }}>
      <div style={{
        maxWidth: '78%', padding: '8px 12px',
        background: color || (me ? MANDA.bubbleMe : MANDA.bubbleThem),
        color: me ? MANDA.bubbleMeInk : MANDA.bubbleThemInk,
        borderRadius: me ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        boxShadow: me ? 'none' : '0 1px 2px rgba(0,0,0,.05)',
        border: me ? 'none' : `1px solid ${MANDA.cardBorder}`,
        fontFamily: MANDA.font, fontSize: 14.5, lineHeight: 1.35,
        position: 'relative'
      }}>
        {children}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 3, marginTop: 2, fontSize: 10.5, color: me ? 'rgba(255,255,255,.75)' : MANDA.inkSubtle }}>
          {time}{me && (double ? Icon.doubleCheck(12, 'rgba(255,255,255,.85)') : Icon.check(12, 'rgba(255,255,255,.85)'))}
        </div>
      </div>
    </div>);

}

function GroupMessage({ name, color = MANDA.green, children, time }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, padding: '2px 14px' }}>
      <Avatar name={name} size={28} />
      <div style={{ maxWidth: '78%', padding: '6px 12px', background: MANDA.bubbleThem, borderRadius: '4px 18px 18px 18px', border: `1px solid ${MANDA.cardBorder}`, fontFamily: MANDA.font }}>
        <div style={{ fontSize: 12, fontWeight: 800, color }}>{name}</div>
        <div style={{ fontSize: 14.5, color: MANDA.ink, lineHeight: 1.35, marginTop: 1 }}>{children}</div>
        <div style={{ fontSize: 10.5, color: MANDA.inkSubtle, textAlign: 'right', marginTop: 2 }}>{time}</div>
      </div>
    </div>);

}

function ChatComposer() {
  return (
    <div style={{ borderTop: `1px solid ${MANDA.divider}`, background: MANDA.white, padding: '10px 12px 28px', display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, minHeight: 40, padding: '10px 14px', borderRadius: 20, background: MANDA.paper, fontFamily: MANDA.font, fontSize: 14.5, color: MANDA.inkSubtle, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ flex: 1 }}>Mensagem</span>
      </div>
      <button style={{ width: 40, height: 40, borderRadius: 20, border: 'none', background: MANDA.green, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icon.mic(20, '#fff')}</button>
    </div>);

}

function DateChip({ children }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 6px' }}>
      <div style={{ padding: '4px 12px', borderRadius: 12, background: 'rgba(11,77,47,.07)', color: MANDA.greenDeep, fontFamily: MANDA.font, fontSize: 11.5, fontWeight: 700 }}>{children}</div>
    </div>);

}

function ScreenChat1to1() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F1F5F2', display: 'flex', flexDirection: 'column' }}>
      <ChatHeader name="Maria Pacheco" sub="@maria.p · online agora" verified onTransaction />
      <div style={{ flex: 1, overflow: 'auto', paddingBottom: 8 }}>
        <DateChip>Hoje</DateChip>
        <Bubble side="them" time="14:21">Oi João! Vi que estás à procura de USD.</Bubble>
        <Bubble side="me" time="14:22" double>Oi Maria! Sim, preciso de 200 USD ainda hoje.</Bubble>
        <Bubble side="them" time="14:24">Posso te vender a <b>875 Kz/USD</b>. Banco BAI ou BFA?</Bubble>
        <Bubble side="me" time="14:24" double>BAI é melhor pra mim.</Bubble>
        <Bubble side="them" time="14:25">Combinado então. Como sou eu que vendo, envio-te já a proposta no Manda — é só aceitares.</Bubble>

        {/* Suggestion card — seller proposes, buyer accepts */}
        <div style={{ padding: '8px 14px 4px' }}>
          <div style={{ background: MANDA.white, border: `1px solid ${MANDA.cardBorder}`, borderRadius: 16, padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: MANDA.greenSoft, color: MANDA.greenDeep, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icon.exchange(20, MANDA.greenDeep)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: MANDA.font, fontSize: 13.5, fontWeight: 800, color: MANDA.ink }}>Proposta a caminho</div>
              <div style={{ fontFamily: MANDA.font, fontSize: 12, color: MANDA.inkMuted, marginTop: 1 }}>A vendedora define os valores; você aceita ou rejeita.</div>
            </div>
          </div>
        </div>
        <Bubble side="me" time="14:31" double>Perfeito, fico à espera 👍</Bubble>
      </div>
      <ChatComposer />
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Group chat
// ──────────────────────────────────────────────────────────────
function ScreenChatGroup() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F1F5F2', display: 'flex', flexDirection: 'column' }}>
      <ChatHeader name="Câmbio Luanda 🇦🇴" sub="1.247 membros · 84 online" group />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <DateChip>Hoje · 14:00</DateChip>
        <GroupMessage name="Pedro Cassule" color="#7A3D0E" time="14:01">Bom dia 👋 alguém com <b>1.200 EUR</b> para hoje?</GroupMessage>
        <GroupMessage name="Inês Mucanza" color="#3D2A6E" time="14:04">Tenho 800 EUR se servir, câmbio 920.</GroupMessage>
        <GroupMessage name="Pedro Cassule" color="#7A3D0E" time="14:06">Preciso mesmo do total. Espero mais um pouco.</GroupMessage>
        <GroupMessage name="Maria Pacheco" color={MANDA.greenDeep} time="14:18">Vendo 500 USD se interessar a alguém — 875 Kz.</GroupMessage>
        <Bubble side="me" time="14:19" double>Maria, te chamei no privado 👍</Bubble>
        <GroupMessage name="Ana Sambo" color="#6E1A2C" time="14:22">Pedro, tenho 1.200 EUR sim, câmbio 918. Manda DM.</GroupMessage>

        {/* System note */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 14px' }}>
          <div style={{ background: 'rgba(11,77,47,.07)', color: MANDA.greenDeep, fontFamily: MANDA.font, fontSize: 11.5, padding: '6px 12px', borderRadius: 12, fontWeight: 600, textAlign: 'center', maxWidth: 280, lineHeight: 1.4 }}>
            Lembrete: negociações só são protegidas se abertas como <b>transação Manda</b>. Nunca pague fora da plataforma.
          </div>
        </div>
        <GroupMessage name="Pedro Cassule" color="#7A3D0E" time="14:24">Fechado Ana 🙏 chamando-te.</GroupMessage>
      </div>
      <ChatComposer />
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Chat list — skeleton loading state
// ──────────────────────────────────────────────────────────────
function ScreenChatListSkeleton() {
  // Vary widths slightly so the skeleton feels organic, not striped
  const rows = [
  { name: 78, last: 86, time: 30, unread: false },
  { name: 62, last: 70, time: 24, unread: true },
  { name: 54, last: 92, time: 28, unread: false },
  { name: 70, last: 60, time: 22, unread: false },
  { name: 48, last: 80, time: 26, unread: true },
  { name: 66, last: 74, time: 24, unread: false },
  { name: 58, last: 88, time: 28, unread: false },
  { name: 74, last: 64, time: 22, unread: false }];

  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.white, display: 'flex', flexDirection: 'column' }}>
      <StatusSpacer />

      {/* header — chrome stays visible, only the title/avatar areas hint at loading */}
      <div style={{ padding: '6px 20px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <MandaGlyph size={32} />
        <div style={{ fontFamily: MANDA.font, fontSize: 24, fontWeight: 800, letterSpacing: -0.6, color: MANDA.ink, flex: 1 }}>Conversas</div>
        <div style={{ width: 38, height: 38, borderRadius: 19, background: MANDA.paper }} />
      </div>

      {/* search — visible chrome */}
      <div style={{ padding: '0 16px 8px' }}>
        <div style={{ height: 42, borderRadius: 12, background: MANDA.paper, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, color: MANDA.inkSubtle, fontFamily: MANDA.font, fontSize: 15 }}>
          {Icon.search(18, MANDA.inkSubtle)} Procurar pessoas, grupos…
        </div>
      </div>

      {/* tabs — show real tabs, they don't depend on data */}
      <div style={{ padding: '6px 16px 4px', display: 'flex', gap: 8 }}>
        {['Todas', 'Não lidas', 'Negócios', 'Grupos'].map((t, i) =>
        <div key={t} style={{
          padding: '7px 14px', borderRadius: 18,
          background: i === 0 ? MANDA.greenSoft : 'transparent',
          color: i === 0 ? MANDA.greenDeep : MANDA.inkMuted,
          fontFamily: MANDA.font, fontWeight: 700, fontSize: 13
        }}>{t}</div>
        )}
      </div>

      {/* skeleton rows */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {rows.map((r, i) =>
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 18px', opacity: 1 - i * 0.07 }}>
            <SkelCircle size={50} />
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Skeleton w={`${r.name}%`} h={13} r={6} />
                <div style={{ flex: 1 }} />
                <Skeleton w={r.time} h={10} r={5} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Skeleton w={`${r.last}%`} h={11} r={6} />
                {r.unread && <Skeleton w={20} h={20} r={10} />}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FAB — kept; it's a static affordance */}
      <div style={{ position: 'absolute', right: 18, bottom: 110, width: 56, height: 56, borderRadius: 28, background: MANDA.green, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: `0 10px 24px ${MANDA.green}55`, opacity: 0.55 }}>
        {Icon.plus(26, '#fff')}
      </div>

      <TabBar active="chats" />
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Chat list — empty state (no conversations yet)
// ──────────────────────────────────────────────────────────────
function ScreenChatListEmpty() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.white, display: 'flex', flexDirection: 'column' }}>
      <StatusSpacer />

      <div style={{ padding: '6px 20px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <MandaGlyph size={32} />
        <div style={{ fontFamily: MANDA.font, fontSize: 24, fontWeight: 800, letterSpacing: -0.6, color: MANDA.ink, flex: 1 }}>Conversas</div>
        <button style={{ width: 38, height: 38, borderRadius: 19, border: 'none', background: MANDA.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MANDA.ink }}>{Icon.pencilSquare(20, MANDA.ink)}</button>
      </div>

      <div style={{ padding: '0 16px 8px' }}>
        <div style={{ height: 42, borderRadius: 12, background: MANDA.paper, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, color: MANDA.inkSubtle, fontFamily: MANDA.font, fontSize: 15 }}>
          {Icon.search(18, MANDA.inkSubtle)} Procurar pessoas, grupos…
        </div>
      </div>

      <div style={{ padding: '6px 16px 4px', display: 'flex', gap: 8 }}>
        {['Todas', 'Não lidas', 'Negócios', 'Grupos'].map((t, i) =>
        <div key={t} style={{
          padding: '7px 14px', borderRadius: 18,
          background: i === 0 ? MANDA.greenSoft : 'transparent',
          color: i === 0 ? MANDA.greenDeep : MANDA.inkMuted,
          fontFamily: MANDA.font, fontWeight: 700, fontSize: 13
        }}>{t}</div>
        )}
      </div>

      {/* Empty state body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 30px', textAlign: 'center' }}>
        {/* Illustration: stylized empty conversation */}
        <div style={{ position: 'relative', width: 152, height: 132, marginBottom: 16 }}>
          <div style={{
            position: 'absolute', left: 6, top: 16, width: 110, height: 64,
            background: MANDA.greenSoft, borderRadius: '18px 18px 18px 4px',
            border: `1.5px dashed ${MANDA.green}`
          }} />
          <div style={{
            position: 'absolute', right: 0, bottom: 6, width: 100, height: 56,
            background: MANDA.white, borderRadius: '18px 18px 4px 18px',
            border: `1.5px dashed ${MANDA.green}`,
            boxShadow: `0 4px 14px ${MANDA.green}18`
          }} />
          <div style={{
            position: 'absolute', left: 56, top: 50,
            width: 40, height: 40, borderRadius: 20,
            background: MANDA.green, color: MANDA.white,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 6px 14px ${MANDA.green}50`
          }}>{Icon.chat(22, MANDA.white)}</div>
        </div>

        <div style={{ fontFamily: MANDA.font, fontSize: 22, fontWeight: 800, color: MANDA.ink, letterSpacing: -0.6 }}>Nenhuma conversa ainda</div>
        <div style={{ fontFamily: MANDA.font, fontSize: 14, color: MANDA.inkMuted, marginTop: 8, lineHeight: 1.5, maxWidth: 280 }}>
          Procure pessoas pelo @username ou junte-se a um grupo público para começar a conversar e negociar câmbio.
        </div>

        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 280 }}>
          <PrimaryButton full size="md" icon={Icon.search(18, '#fff')}>Procurar contactos</PrimaryButton>
          <button style={{
            height: 46, borderRadius: 23, border: `1.5px solid ${MANDA.green}`,
            background: 'transparent', color: MANDA.green,
            fontFamily: MANDA.font, fontWeight: 700, fontSize: 14.5,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8
          }}>{Icon.plus(18, MANDA.green)} Criar um grupo</button>
        </div>
      </div>

      <TabBar active="chats" />
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Conversation skeleton (1:1 / group) — loading messages
// ──────────────────────────────────────────────────────────────
function SkelBubble({ side = 'them', w = 180, h = 38 }) {
  const me = side === 'me';
  return (
    <div style={{ display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start', padding: '4px 14px' }}>
      <div className="manda-skel-dark" style={{
        width: w, height: h,
        background: me ?
        'linear-gradient(90deg, rgba(26,135,84,.18) 0%, rgba(26,135,84,.35) 50%, rgba(26,135,84,.18) 100%)' :
        undefined,
        backgroundSize: '480px 100%',
        animation: 'mandaShimmer 1.4s linear infinite',
        borderRadius: me ? '18px 18px 4px 18px' : '18px 18px 18px 4px'
      }} />
    </div>);

}

function ScreenChatSkeleton({ group }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F1F5F2', display: 'flex', flexDirection: 'column' }}>
      {/* Header — skeletonized */}
      <div style={{ position: 'relative', zIndex: 5 }}>
        <StatusSpacer />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 14px 10px', borderBottom: `1px solid ${MANDA.divider}`, background: MANDA.white }}>
          <button style={{ width: 32, height: 32, borderRadius: 16, border: 'none', background: 'transparent', color: MANDA.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icon.chevronLeft(22)}</button>
          <SkelCircle size={38} />
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Skeleton w="55%" h={12} r={6} />
            <Skeleton w="42%" h={10} r={5} />
          </div>
          <Skeleton w={90} h={34} r={17} />
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', paddingTop: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0 10px' }}>
          <Skeleton w={62} h={20} r={10} />
        </div>

        {/* Alternating bubbles, with group avatars when group */}
        {group ?
        <>
            <SkelGroupRow w={210} h={48} />
            <SkelGroupRow w={150} h={36} />
            <div style={{ height: 6 }} />
            <SkelBubble side="me" w={170} h={38} />
            <SkelGroupRow w={240} h={56} />
            <SkelGroupRow w={130} h={32} />
            <SkelBubble side="me" w={120} h={32} />
          </> :

        <>
            <SkelBubble side="them" w={220} h={48} />
            <SkelBubble side="them" w={160} h={32} />
            <SkelBubble side="me" w={180} h={38} />
            <SkelBubble side="them" w={240} h={54} />
            <SkelBubble side="me" w={120} h={32} />
            <SkelBubble side="them" w={200} h={38} />
            <SkelBubble side="me" w={150} h={34} />
          </>
        }
      </div>

      {/* Composer kept as real chrome */}
      <ChatComposer />
    </div>);

}

function SkelGroupRow({ w, h }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, padding: '4px 14px' }}>
      <SkelCircle size={28} />
      <Skeleton w={w} h={h} r={14} style={{ borderTopLeftRadius: 4 }} />
    </div>);

}

// ──────────────────────────────────────────────────────────────
// 1:1 conversation — empty state (no messages yet)
// ──────────────────────────────────────────────────────────────
function ScreenChat1to1Empty() {
  const quickReplies = [
  '👋 Olá, tudo bem?',
  'Tens USD para câmbio?',
  'Bom dia 🙌'];

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F1F5F2', display: 'flex', flexDirection: 'column' }}>
      <ChatHeader name="Maria Pacheco" sub="@maria.p · Reputação 4.9★" verified onTransaction />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 28px', textAlign: 'center' }}>
        <Avatar name="Maria Pacheco" size={72} verified />
        <div style={{ fontFamily: MANDA.font, fontSize: 20, fontWeight: 800, color: MANDA.ink, marginTop: 14, letterSpacing: -0.5 }}>
          Maria Pacheco
        </div>
        <div style={{ fontFamily: MANDA.font, fontSize: 13, color: MANDA.inkMuted, marginTop: 4 }}>
          @maria.p · 12 transações concluídas
        </div>

        <div style={{ fontFamily: MANDA.font, fontSize: 14, color: MANDA.inkMuted, marginTop: 18, lineHeight: 1.5, maxWidth: 280 }}>
          Envie a primeira mensagem ou abra uma transação directamente.
        </div>

        {/* Quick reply suggestions */}
        <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {quickReplies.map((q) =>
          <div key={q} style={{
            padding: '8px 14px', borderRadius: 18,
            background: MANDA.white, border: `1px solid ${MANDA.cardBorder}`,
            fontFamily: MANDA.font, fontSize: 13, fontWeight: 600, color: MANDA.ink
          }}>{q}</div>
          )}
        </div>
      </div>

      <ChatComposer />
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Group conversation — empty state (group just created)
// ──────────────────────────────────────────────────────────────
function ScreenChatGroupEmpty() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F1F5F2', display: 'flex', flexDirection: 'column' }}>
      <ChatHeader name="Câmbio Família" sub="4 membros · você é admin" group />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 28px', textAlign: 'center' }}>
        <GroupAvatar names={['Câmbio', 'Família']} size={80} />
        <div style={{ fontFamily: MANDA.font, fontSize: 20, fontWeight: 800, color: MANDA.ink, marginTop: 14, letterSpacing: -0.5 }}>
          Câmbio Família
        </div>
        <div style={{ fontFamily: MANDA.font, fontSize: 13, color: MANDA.inkMuted, marginTop: 4 }}>
          Grupo privado · criado por você agora mesmo
        </div>

        <div style={{
          marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 12px', borderRadius: 12,
          background: MANDA.greenSoft, color: MANDA.greenDeep,
          fontFamily: MANDA.font, fontSize: 12, fontWeight: 600,
          maxWidth: 300, lineHeight: 1.35
        }}>
          {Icon.shield(14, MANDA.greenDeep)}
          Apenas membros aprovados podem ler as mensagens.
        </div>

        <div style={{ fontFamily: MANDA.font, fontSize: 14, color: MANDA.inkMuted, marginTop: 18, lineHeight: 1.5, maxWidth: 300 }}>
          Dê as boas-vindas ao grupo ou convide mais pessoas para começar.
        </div>

        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 280 }}>
          <PrimaryButton full size="md" icon={Icon.plus(18, '#fff')}>Adicionar membros</PrimaryButton>
          <button style={{
            height: 46, borderRadius: 23,
            border: `1.5px solid ${MANDA.green}`,
            background: MANDA.white, color: MANDA.green,
            fontFamily: MANDA.font, fontWeight: 700, fontSize: 14.5
          }}>Enviar boas-vindas 👋</button>
        </div>
      </div>

      <ChatComposer />
    </div>);

}

Object.assign(window, {
  ScreenChatList, ScreenSearch, ScreenChat1to1, ScreenChatGroup,
  ScreenChatListSkeleton,
  ScreenChatListEmpty, ScreenChat1to1Empty, ScreenChatGroupEmpty,
  ScreenChatSkeleton,
  TabBar, ChatHeader, ChatComposer
});
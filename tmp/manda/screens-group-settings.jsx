// Manda — Group settings page (Telegram/WhatsApp pattern)
// Three role-based variants share the same layout; permissions differ.
//
//   OWNER (super admin) — edits name + description, adds/removes members,
//                         promotes/demotes admins, can DELETE the group.
//   ADMIN              — edits name + description, adds/removes members.
//   MEMBER             — read-only info, can leave / report.

// ──────────────────────────────────────────────────────────────
// Extra icons used only here (kept local so brand.jsx stays focused)
// ──────────────────────────────────────────────────────────────
const GSIcon = {
  bell: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M6 17V11a6 6 0 1112 0v6l1.5 2H4.5L6 17z" stroke={c} strokeWidth="1.7" strokeLinejoin="round"/>
      <path d="M10 21a2 2 0 004 0" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
    </svg>),

  share: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="12" r="2.6" stroke={c} strokeWidth="1.7"/>
      <circle cx="17" cy="6" r="2.6" stroke={c} strokeWidth="1.7"/>
      <circle cx="17" cy="18" r="2.6" stroke={c} strokeWidth="1.7"/>
      <path d="M8.4 10.8l6.2-3.6M8.4 13.2l6.2 3.6" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
    </svg>),

  link: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M10 14a4 4 0 005.6 0l3-3a4 4 0 10-5.6-5.6L11.4 7M14 10a4 4 0 00-5.6 0l-3 3a4 4 0 105.6 5.6L12.6 17" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>),

  pencil: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 20l4-1 11-11-3-3L5 16l-1 4z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M14 6l3 3" stroke={c} strokeWidth="1.6"/>
    </svg>),

  exit: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M15 4h4a1 1 0 011 1v14a1 1 0 01-1 1h-4" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M10 8l-4 4 4 4M6 12h10" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>),

  trash: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 7h14M10 4h4a1 1 0 011 1v2H9V5a1 1 0 011-1z" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.5 7l1 12a2 2 0 002 2h5a2 2 0 002-2l1-12" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 11v6M14 11v6" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
    </svg>),

  crown: (s = 14, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <path d="M3 8l4 3 5-6 5 6 4-3-2 11H5L3 8z"/>
    </svg>),

  dots: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <circle cx="5" cy="12" r="1.8"/>
      <circle cx="12" cy="12" r="1.8"/>
      <circle cx="19" cy="12" r="1.8"/>
    </svg>),

  report: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 21V4l8 1.5L21 4v11l-8 1.5L5 15" stroke={c} strokeWidth="1.7" strokeLinejoin="round"/>
    </svg>) };



// ──────────────────────────────────────────────────────────────
// Shared data — same group, different viewer role per variant
// ──────────────────────────────────────────────────────────────
const FAMILIA_GROUP = {
  name: 'Câmbio Família',
  privacy: 'private', // 'private' | 'public'
  description: 'Grupo só para a família. Partilhamos USD e EUR a câmbio justo, sem stress. Nada de fora daqui — mantemos confiança.',
  createdAt: '12 de Março, 2025',
  inviteLink: 'manda.app/g/familia-7H9X'
};

const FAMILIA_MEMBERS = [
{ name: 'João Cangola', sub: '@joao.cgla · criou o grupo', role: 'owner', verified: true },
{ name: 'Maria Pacheco', sub: '@maria.p · Reputação 4.9★', role: 'admin', verified: true },
{ name: 'Eduardo Bumba', sub: '@eddy.bmb · 18 transações', role: 'admin', verified: true },
{ name: 'Lucía Ferraz', sub: '@lu.ferraz', role: 'member' },
{ name: 'Roberto Matamba', sub: '@rob.matamba · negociante', role: 'member' },
{ name: 'Ana Sambo', sub: '@ana.sambo', role: 'member' },
{ name: 'Pedro Cassule', sub: '@pedro.cs · Reputação 4.7★', role: 'member', verified: true },
{ name: 'Inês Mucanza', sub: '@ines.mc', role: 'member' },
{ name: 'José Tchindji', sub: '@jose.tch', role: 'member' },
{ name: 'Beatriz Lemos', sub: '@bea.lemos', role: 'member' },
{ name: 'Carlos Vieira', sub: '@carlos.v', role: 'member' },
{ name: 'Filipa Sousa', sub: '@fili.s', role: 'member' }];


// "Você" mapping per role variant — who the current viewer is
const VIEWER_BY_ROLE = {
  owner: 'João Cangola',
  admin: 'Maria Pacheco',
  member: 'Roberto Matamba'
};

// ──────────────────────────────────────────────────────────────
// Hero — large group avatar stack (custom, bigger than GroupAvatar)
// ──────────────────────────────────────────────────────────────
function GroupHeroAvatar({ members, size = 96 }) {
  // Show up to 3 stacked avatars. Slight rotation for visual interest.
  const picks = members.slice(0, 3);
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: size / 2,
        background: `radial-gradient(circle at 30% 25%, ${MANDA.greenMint}, ${MANDA.greenSoft})`,
        boxShadow: `0 14px 30px ${MANDA.green}25, inset 0 0 0 1.5px ${MANDA.white}`
      }} />
      <div style={{ position: 'absolute', inset: 0 }}>
        {picks.map((m, i) => {
          const s = size * 0.46;
          const positions = [
          { left: size * 0.16, top: size * 0.10 },
          { right: size * 0.10, top: size * 0.24 },
          { left: size * 0.30, bottom: size * 0.06 }];

          return (
            <div key={m.name} style={{
              position: 'absolute', ...positions[i],
              boxShadow: `0 0 0 2.5px ${MANDA.white}`, borderRadius: '50%'
            }}>
              <Avatar name={m.name} size={s} />
            </div>);

        })}
      </div>
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Quick action — round icon button with label below
// ──────────────────────────────────────────────────────────────
function QuickAction({ icon, label, active }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
      <div style={{
        width: 46, height: 46, borderRadius: 14,
        background: active ? MANDA.green : MANDA.greenSoft,
        color: active ? MANDA.white : MANDA.greenDeep,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {icon(22, active ? MANDA.white : MANDA.greenDeep)}
      </div>
      <div style={{ fontFamily: MANDA.font, fontSize: 11.5, fontWeight: 700, color: MANDA.ink, letterSpacing: -0.1 }}>{label}</div>
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Role pill — Owner / Admin (member has no pill)
// ──────────────────────────────────────────────────────────────
function RolePill({ role }) {
  if (role === 'owner') {
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '2px 8px', borderRadius: 8,
        background: 'rgba(201,122,31,.12)', color: '#8A4F0E',
        fontFamily: MANDA.font, fontSize: 10.5, fontWeight: 800, letterSpacing: 0.3, textTransform: 'uppercase'
      }}>
        {GSIcon.crown(10, '#C97A1F')} Dono
      </span>);

  }
  if (role === 'admin') {
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '2px 8px', borderRadius: 8,
        background: MANDA.greenSoft, color: MANDA.greenDeep,
        fontFamily: MANDA.font, fontSize: 10.5, fontWeight: 800, letterSpacing: 0.3, textTransform: 'uppercase'
      }}>
        Admin
      </span>);

  }
  return null;
}

// ──────────────────────────────────────────────────────────────
// Member row
// ──────────────────────────────────────────────────────────────
function MemberRow({ m, isViewer, canManage }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px' }}>
      <Avatar name={m.name} size={42} verified={m.verified} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontFamily: MANDA.font, fontSize: 14.5, fontWeight: 700, color: MANDA.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {m.name}{isViewer && <span style={{ color: MANDA.inkSubtle, fontWeight: 600 }}> · você</span>}
          </div>
        </div>
        <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.sub}</div>
      </div>
      <RolePill role={m.role} />
      {canManage && !isViewer &&
      <button style={{
        width: 30, height: 30, borderRadius: 15, border: 'none',
        background: 'transparent', color: MANDA.inkSubtle,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }}>
          {GSIcon.dots(20, MANDA.inkSubtle)}
        </button>
      }
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Settings list row (privacy, invite link, etc.)
// ──────────────────────────────────────────────────────────────
function SettingRow({ icon, label, value, sub, onTap, danger }) {
  const tint = danger ? MANDA.danger : MANDA.greenDeep;
  const tintBg = danger ? MANDA.dangerSoft : MANDA.greenSoft;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 20px' }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: tintBg, color: tint,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }}>{icon(20, tint)}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: MANDA.font, fontSize: 14.5, fontWeight: 700, color: danger ? MANDA.danger : MANDA.ink }}>{label}</div>
        {sub &&
        <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted, marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sub}</div>
        }
      </div>
      {value &&
      <div style={{ fontFamily: MANDA.font, fontSize: 13, color: MANDA.inkSubtle, fontWeight: 600 }}>{value}</div>
      }
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Main settings screen — role-driven
// ──────────────────────────────────────────────────────────────
function ScreenGroupSettings({ role = 'owner' }) {
  const isOwner = role === 'owner';
  const isAdmin = role === 'admin';
  const canEdit = isOwner || isAdmin; // can change name/description, add/remove members
  const viewerName = VIEWER_BY_ROLE[role];

  const group = FAMILIA_GROUP;
  const members = FAMILIA_MEMBERS;
  const isPrivate = group.privacy === 'private';

  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.paper, display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ background: MANDA.white, borderBottom: `1px solid ${MANDA.divider}` }}>
        <div style={{ height: 54 }} />
        <div style={{ display: 'flex', alignItems: 'center', padding: '4px 8px 10px' }}>
          <button style={{ width: 38, height: 38, borderRadius: 19, border: 'none', background: 'transparent', color: MANDA.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {Icon.chevronLeft(22)}
          </button>
          <div style={{ flex: 1, textAlign: 'center', fontFamily: MANDA.font, fontWeight: 800, fontSize: 16, color: MANDA.ink, letterSpacing: -0.3 }}>
            Info do grupo
          </div>
          {canEdit ?
          <button style={{ width: 38, height: 38, borderRadius: 19, border: 'none', background: 'transparent', color: MANDA.green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MANDA.font, fontWeight: 700, fontSize: 14 }}>
              {GSIcon.pencil(20, MANDA.green)}
            </button> :

          <button style={{ width: 38, height: 38, borderRadius: 19, border: 'none', background: 'transparent', color: MANDA.inkMuted, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {GSIcon.dots(22, MANDA.inkMuted)}
            </button>
          }
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Hero */}
        <div style={{ background: MANDA.white, padding: '24px 20px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <GroupHeroAvatar members={members} size={96} />
            {canEdit &&
            <div style={{
              position: 'absolute', right: -2, bottom: -2,
              width: 30, height: 30, borderRadius: 15,
              background: MANDA.green, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 0 3px ${MANDA.white}, 0 4px 10px ${MANDA.green}40`
            }}>{Icon.camera(15, '#fff')}</div>
            }
          </div>

          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontFamily: MANDA.font, fontSize: 22, fontWeight: 800, color: MANDA.ink, letterSpacing: -0.7 }}>
              {group.name}
            </div>
            {canEdit && GSIcon.pencil(15, MANDA.inkSubtle)}
          </div>
          <div style={{ marginTop: 4, fontFamily: MANDA.font, fontSize: 13, color: MANDA.inkMuted, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              {isPrivate ? Icon.lock(13, MANDA.inkMuted) :
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke={MANDA.inkMuted} strokeWidth="1.7" />
                <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" stroke={MANDA.inkMuted} strokeWidth="1.5" />
              </svg>
              }
              Grupo {isPrivate ? 'privado' : 'público'}
            </span>
            <span style={{ color: MANDA.inkSubtle }}>·</span>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{members.length} membros</span>
          </div>

          {/* Quick actions */}
          <div style={{ marginTop: 18, display: 'flex', alignItems: 'flex-start', gap: 6, width: '100%', maxWidth: 320 }}>
            <QuickAction icon={GSIcon.bell} label="Silenciar" />
            <QuickAction icon={Icon.search} label="Buscar" />
            <QuickAction icon={GSIcon.link} label="Link" />
            <QuickAction icon={GSIcon.share} label="Partilhar" />
          </div>
        </div>

        {/* Description */}
        <Section title="Descrição">
          <div style={{ background: MANDA.white, padding: '14px 20px' }}>
            <div style={{ fontFamily: MANDA.font, fontSize: 14, color: MANDA.ink, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
              {group.description}
            </div>
            {canEdit &&
            <button style={{
              marginTop: 10, height: 32, padding: '0 12px',
              borderRadius: 16, border: `1.5px solid ${MANDA.greenSoft}`,
              background: 'transparent', color: MANDA.greenDeep,
              fontFamily: MANDA.font, fontWeight: 700, fontSize: 12.5,
              display: 'inline-flex', alignItems: 'center', gap: 6
            }}>
                {GSIcon.pencil(14, MANDA.greenDeep)} Editar descrição
              </button>
            }
          </div>
        </Section>

        {/* Group meta */}
        <Section>
          <div style={{ background: MANDA.white }}>
            <SettingRow
              icon={Icon.lock}
              label={`Privacidade · ${isPrivate ? 'Privado' : 'Público'}`}
              sub={isPrivate ? 'Apenas convidados podem entrar' : 'Qualquer pessoa pode pedir para entrar'}
              value={canEdit ? 'Mudar' : null} />

            <div style={{ height: 1, background: MANDA.divider, marginLeft: 70 }} />
            <SettingRow
              icon={GSIcon.link}
              label="Link de convite"
              sub={group.inviteLink}
              value="Copiar" />

            <div style={{ height: 1, background: MANDA.divider, marginLeft: 70 }} />
            <SettingRow
              icon={Icon.shield}
              label="Permissões"
              sub={canEdit ? 'Quem pode enviar, fixar, adicionar' : 'Definidas pelos administradores'}
              value={canEdit ? 'Gerir' : null} />

          </div>
        </Section>

        {/* Members */}
        <Section title={`${members.length} membros`}>
          <div style={{ background: MANDA.white }}>
            {/* Add members row — only for admin/owner */}
            {canEdit &&
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 20px', borderBottom: `1px solid ${MANDA.divider}` }}>
                <div style={{
                width: 42, height: 42, borderRadius: 21,
                background: MANDA.greenSoft, color: MANDA.greenDeep,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>{Icon.plus(22, MANDA.greenDeep)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: MANDA.font, fontSize: 14.5, fontWeight: 700, color: MANDA.green }}>Adicionar membros</div>
                  <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted, marginTop: 1 }}>
                    {members.length} de 500 · {500 - members.length} vagas
                  </div>
                </div>
                {Icon.chevronRight(18, MANDA.inkSubtle)}
              </div>
            }

            {members.map((m, i) =>
            <MemberRow
              key={m.name}
              m={m}
              isViewer={m.name === viewerName}
              canManage={isOwner ||
              isAdmin && m.role === 'member'} />

            )}
          </div>
        </Section>

        {/* Notifications */}
        <Section title="Notificações">
          <div style={{ background: MANDA.white }}>
            <SettingRow
              icon={GSIcon.bell}
              label="Notificações"
              sub="Activas · todas as mensagens"
              value="Mudar" />

            <div style={{ height: 1, background: MANDA.divider, marginLeft: 70 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 20px' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: MANDA.greenSoft, color: MANDA.greenDeep, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {Icon.star(20, MANDA.greenDeep)}
              </div>
              <div style={{ flex: 1, fontFamily: MANDA.font, fontSize: 14.5, fontWeight: 700, color: MANDA.ink }}>Fixar no topo</div>
              <Toggle on={false} />
            </div>
          </div>
        </Section>

        {/* Danger zone — varies by role */}
        <Section>
          <div style={{ background: MANDA.white }}>
            {!isOwner &&
            <>
                <SettingRow
                icon={GSIcon.report}
                label="Reportar grupo"
                sub="Apenas a equipa Manda verá o reporte"
                danger />

                <div style={{ height: 1, background: MANDA.divider, marginLeft: 70 }} />
              </>
            }
            {/* All non-owners can leave */}
            {!isOwner &&
            <SettingRow
              icon={GSIcon.exit}
              label="Sair do grupo"
              sub="Deixa de receber mensagens. Não avisa o grupo."
              danger />

            }
            {/* Owner can transfer or delete */}
            {isOwner &&
            <>
                <SettingRow
                icon={GSIcon.exit}
                label="Sair e transferir propriedade"
                sub="Promove um admin a dono antes de sair"
                danger />

                <div style={{ height: 1, background: MANDA.divider, marginLeft: 70 }} />
                <SettingRow
                icon={GSIcon.trash}
                label="Apagar grupo"
                sub="Acção definitiva · apaga para todos os membros"
                danger />

              </>
            }
          </div>
        </Section>

        {/* Footer meta */}
        <div style={{ padding: '18px 20px 26px', textAlign: 'center', fontFamily: MANDA.font, fontSize: 11.5, color: MANDA.inkSubtle, lineHeight: 1.5 }}>
          Criado em {group.createdAt} por João Cangola.<br />
          ID do grupo · MND-7H9X-4421
        </div>
      </div>
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Section wrapper — UPPERCASE tiny label + container
// ──────────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div style={{ marginTop: 14 }}>
      {title &&
      <div style={{
        padding: '0 20px 8px', fontFamily: MANDA.font, fontSize: 11, fontWeight: 800,
        letterSpacing: 0.9, color: MANDA.inkSubtle, textTransform: 'uppercase'
      }}>{title}</div>
      }
      {children}
    </div>);

}

// Simple iOS-style toggle
function Toggle({ on }) {
  return (
    <div style={{
      width: 42, height: 26, borderRadius: 13,
      background: on ? MANDA.green : '#D4DBD6',
      position: 'relative', transition: 'background .15s'
    }}>
      <div style={{
        position: 'absolute', top: 3, left: on ? 19 : 3,
        width: 20, height: 20, borderRadius: 10,
        background: MANDA.white, boxShadow: '0 1px 3px rgba(0,0,0,.2)'
      }} />
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Three role-specific variants
// ──────────────────────────────────────────────────────────────
function ScreenGroupSettingsOwner() {return <ScreenGroupSettings role="owner" />;}
function ScreenGroupSettingsAdmin() {return <ScreenGroupSettings role="admin" />;}
function ScreenGroupSettingsMember() {return <ScreenGroupSettings role="member" />;}

Object.assign(window, {
  ScreenGroupSettings,
  ScreenGroupSettingsOwner, ScreenGroupSettingsAdmin, ScreenGroupSettingsMember
});

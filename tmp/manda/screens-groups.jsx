// Manda — Create group flow + add members flow
// Groups: public or private, max 500 members.

const MAX_GROUP = 500;

// ──────────────────────────────────────────────────────────────
// Shared: small step header used by the create-group flow
// ──────────────────────────────────────────────────────────────
function FlowHeader({ step = 1, total = 2, onBack, title, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <button style={{ width: 40, height: 40, borderRadius: 20, border: 'none', background: MANDA.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MANDA.ink }}>
        {Icon.chevronLeft(22)}
      </button>
      <div style={{ flex: 1, display: 'flex', gap: 6 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < step ? MANDA.green : MANDA.divider }} />
        ))}
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: MANDA.inkMuted, fontFamily: MANDA.font }}>{step} / {total}</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Create group · step 1 — details (name, photo, privacy, description)
// ──────────────────────────────────────────────────────────────
function ScreenCreateGroupDetails() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.white, padding: '64px 24px 30px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      <FlowHeader step={1} total={2} />

      <div style={{ marginTop: 22 }}>
        <div style={{ fontFamily: MANDA.font, fontSize: 26, fontWeight: 800, letterSpacing: -0.8, color: MANDA.ink }}>Criar grupo</div>
        <div style={{ fontFamily: MANDA.font, fontSize: 14, color: MANDA.inkMuted, marginTop: 6, lineHeight: 1.45 }}>
          Dê um nome ao seu grupo e escolha quem pode entrar. Pode mudar tudo isto depois.
        </div>
      </div>

      {/* Photo + name */}
      <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 14 }}>
        <button style={{
          position: 'relative', width: 72, height: 72, borderRadius: 24,
          border: `2px dashed ${MANDA.green}`, background: MANDA.greenSoft,
          color: MANDA.greenDeep, display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {Icon.camera(28, MANDA.greenDeep)}
          <div style={{
            position: 'absolute', right: -4, bottom: -4,
            width: 26, height: 26, borderRadius: 13,
            background: MANDA.green, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 0 2.5px ${MANDA.white}`,
          }}>{Icon.plus(16, '#fff')}</div>
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <TextField label="Nome do grupo" value="Câmbio Família" />
        </div>
      </div>

      {/* Description */}
      <div style={{ marginTop: 14 }}>
        <div style={{
          fontFamily: MANDA.font, fontSize: 13, fontWeight: 600, color: MANDA.inkMuted,
          marginBottom: 6, letterSpacing: 0.1, textTransform: 'uppercase',
        }}>Descrição (opcional)</div>
        <div style={{
          minHeight: 82, padding: '12px 14px',
          background: MANDA.white, borderRadius: 14,
          border: `1.5px solid ${MANDA.cardBorder}`,
          fontFamily: MANDA.font, fontSize: 14.5, color: MANDA.ink, lineHeight: 1.45,
        }}>
          Grupo só para a família, partilhamos USD e EUR a câmbio justo.
        </div>
      </div>

      {/* Privacy selector */}
      <div style={{ marginTop: 18 }}>
        <div style={{
          fontFamily: MANDA.font, fontSize: 13, fontWeight: 600, color: MANDA.inkMuted,
          marginBottom: 10, letterSpacing: 0.1, textTransform: 'uppercase',
        }}>Privacidade</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PrivacyOption
            selected
            icon={Icon.lock(20, MANDA.greenDeep)}
            title="Privado"
            sub="Apenas convidados podem entrar. Não aparece em pesquisas."
          />
          <PrivacyOption
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke={MANDA.greenDeep} strokeWidth="1.7"/>
                <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" stroke={MANDA.greenDeep} strokeWidth="1.5"/>
              </svg>
            }
            title="Público"
            sub="Qualquer pessoa pode encontrar e pedir para entrar."
          />
        </div>
      </div>

      {/* Limit hint */}
      <div style={{
        marginTop: 16, padding: '10px 12px', borderRadius: 12,
        background: MANDA.paper, border: `1px solid ${MANDA.cardBorder}`,
        display: 'flex', alignItems: 'center', gap: 10,
        fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted, lineHeight: 1.4,
      }}>
        <div style={{ width: 26, height: 26, borderRadius: 7, background: MANDA.greenSoft, color: MANDA.greenDeep, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {Icon.user(15, MANDA.greenDeep)}
        </div>
        Cada grupo pode ter até <b style={{ color: MANDA.ink, fontVariantNumeric: 'tabular-nums' }}>500 membros</b>.
      </div>

      <div style={{ flex: 1, minHeight: 14 }} />

      <div style={{ marginTop: 12 }}>
        <PrimaryButton full size="lg">Próximo · adicionar membros</PrimaryButton>
      </div>
    </div>
  );
}

function PrivacyOption({ icon, title, sub, selected }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 12,
      padding: '12px 14px', borderRadius: 14,
      background: selected ? MANDA.greenSoft : MANDA.white,
      border: `1.5px solid ${selected ? MANDA.green : MANDA.cardBorder}`,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: selected ? MANDA.white : MANDA.paper,
        color: MANDA.greenDeep,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: MANDA.font, fontSize: 14.5, fontWeight: 800, color: MANDA.ink }}>{title}</div>
        <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted, marginTop: 2, lineHeight: 1.4 }}>{sub}</div>
      </div>
      {/* Radio */}
      <div style={{
        width: 22, height: 22, borderRadius: 11,
        border: `2px solid ${selected ? MANDA.green : MANDA.cardBorder}`,
        background: selected ? MANDA.green : MANDA.white,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {selected && <div style={{ width: 8, height: 8, borderRadius: 4, background: MANDA.white }} />}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Create group · step 2 — members
// ──────────────────────────────────────────────────────────────
const SAMPLE_CONTACTS = [
  { name: 'Maria Pacheco', sub: '@maria.p', section: 'A', verified: true, selected: true },
  { name: 'Eduardo Bumba', sub: '@eddy.bmb', section: 'A', verified: true, selected: true },
  { name: 'Lucía Ferraz', sub: '@lu.ferraz', section: 'B', selected: true },
  { name: 'Roberto Matamba', sub: '@rob.matamba', section: 'B' },
  { name: 'Ana Sambo', sub: '@ana.sambo', section: 'B' },
  { name: 'Pedro Cassule', sub: '@pedro.cs', section: 'C' },
  { name: 'Inês Mucanza', sub: '@ines.mc', section: 'C' },
  { name: 'José Tchindji', sub: '@jose.tch', section: 'C' },
];

function ScreenCreateGroupMembers() {
  // 3 selected of 500 cap; "you" counts as 1 by convention so show 4/500
  const selected = SAMPLE_CONTACTS.filter(c => c.selected);
  const total = selected.length + 1; // +1 for self

  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.white, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '64px 24px 8px' }}>
        <FlowHeader step={2} total={2} />
      </div>

      <div style={{ padding: '12px 24px 4px' }}>
        <div style={{ fontFamily: MANDA.font, fontSize: 24, fontWeight: 800, letterSpacing: -0.7, color: MANDA.ink }}>Adicionar membros</div>
        <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: MANDA.font, fontSize: 13.5, color: MANDA.inkMuted }}>
            <b style={{ color: MANDA.ink, fontVariantNumeric: 'tabular-nums' }}>{total}</b> / <span style={{ fontVariantNumeric: 'tabular-nums' }}>{MAX_GROUP}</span> membros
          </div>
          <CapacityBar value={total} max={MAX_GROUP} />
        </div>
      </div>

      {/* Selected chips */}
      <div style={{ padding: '12px 16px 4px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'inline-flex', gap: 8 }}>
          {selected.map(c => (
            <div key={c.name} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 12px 6px 6px', borderRadius: 22,
              background: MANDA.greenSoft, border: `1px solid #CFE8DA`,
            }}>
              <Avatar name={c.name} size={26} />
              <span style={{ fontFamily: MANDA.font, fontSize: 13, fontWeight: 700, color: MANDA.greenDeep }}>
                {c.name.split(' ')[0]}
              </span>
              <span style={{
                width: 16, height: 16, borderRadius: 8,
                background: MANDA.green, color: '#fff',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 800,
              }}>×</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: '10px 16px 8px' }}>
        <div style={{ height: 44, borderRadius: 12, background: MANDA.paper, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, color: MANDA.ink, fontFamily: MANDA.font, fontSize: 15 }}>
          {Icon.search(18, MANDA.inkSubtle)}
          <span style={{ color: MANDA.inkSubtle }}>Procurar por @username ou nome</span>
        </div>
      </div>

      {/* List, grouped by initial */}
      <div style={{ flex: 1, overflow: 'auto', padding: '4px 0 8px' }}>
        {['A', 'B', 'C'].map(section => (
          <div key={section}>
            <div style={{ padding: '8px 22px 4px', fontFamily: MANDA.font, fontSize: 11.5, fontWeight: 800, color: MANDA.inkSubtle, letterSpacing: 0.8 }}>{section}</div>
            {SAMPLE_CONTACTS.filter(c => c.section === section).map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px' }}>
                <Avatar name={c.name} size={42} verified={c.verified} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: MANDA.font, fontSize: 14.5, fontWeight: 700, color: MANDA.ink }}>{c.name}</div>
                  <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted }}>{c.sub}</div>
                </div>
                <Checkbox checked={!!c.selected} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ padding: '12px 22px 30px', borderTop: `1px solid ${MANDA.divider}` }}>
        <PrimaryButton full size="md">Criar grupo · {selected.length} convidados</PrimaryButton>
      </div>
    </div>
  );
}

function Checkbox({ checked }) {
  return (
    <div style={{
      width: 24, height: 24, borderRadius: 7,
      background: checked ? MANDA.green : MANDA.white,
      border: `2px solid ${checked ? MANDA.green : MANDA.cardBorder}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      {checked && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  );
}

function CapacityBar({ value, max }) {
  const pct = Math.min(1, value / max);
  const warn = pct > 0.9;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 84, height: 6, borderRadius: 3, background: MANDA.divider, overflow: 'hidden' }}>
        <div style={{ width: `${Math.max(2, pct * 100)}%`, height: '100%', background: warn ? MANDA.warn : MANDA.green, borderRadius: 3 }} />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Add members to existing group — bottom-sheet style screen
// ──────────────────────────────────────────────────────────────
function ScreenAddGroupMembers() {
  // Pretend group currently has 12 members; selecting 3 more = 15/500
  const currentMembers = 12;
  const selected = SAMPLE_CONTACTS.filter(c => c.selected);
  const total = currentMembers + selected.length;

  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.white, display: 'flex', flexDirection: 'column' }}>
      <StatusSpacer />
      {/* Header — modal style */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 14px 10px', borderBottom: `1px solid ${MANDA.divider}` }}>
        <button style={{ width: 38, height: 38, borderRadius: 19, border: 'none', background: 'transparent', color: MANDA.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MANDA.font, fontWeight: 700, fontSize: 15 }}>Cancelar</button>
        <div style={{ flex: 1, textAlign: 'center', fontFamily: MANDA.font, fontWeight: 800, fontSize: 16, color: MANDA.ink }}>Adicionar membros</div>
        <button style={{
          padding: '0 14px', height: 34, borderRadius: 17, border: 'none',
          background: selected.length ? MANDA.green : MANDA.paper,
          color: selected.length ? '#fff' : MANDA.inkSubtle,
          fontFamily: MANDA.font, fontWeight: 700, fontSize: 13.5,
        }}>Adicionar</button>
      </div>

      {/* Group banner */}
      <div style={{ padding: '12px 18px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <GroupAvatar names={['Câmbio', 'Luanda']} size={46} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: MANDA.font, fontSize: 15, fontWeight: 800, color: MANDA.ink }}>Câmbio Luanda 🇦🇴</div>
          <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted, fontVariantNumeric: 'tabular-nums' }}>
            {total} / {MAX_GROUP} membros · grupo público
          </div>
        </div>
        <CapacityBar value={total} max={MAX_GROUP} />
      </div>

      {/* Search */}
      <div style={{ padding: '8px 16px' }}>
        <div style={{ height: 44, borderRadius: 12, background: MANDA.paper, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, color: MANDA.inkSubtle, fontFamily: MANDA.font, fontSize: 15 }}>
          {Icon.search(18, MANDA.inkSubtle)}
          Procurar contactos para adicionar
        </div>
      </div>

      {/* Helper tip */}
      <div style={{ padding: '4px 18px 6px', fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted }}>
        Apenas contactos que aceitam convites de grupo aparecem aqui.
      </div>

      {/* Selected chips row (only if any) */}
      {selected.length > 0 && (
        <div style={{ padding: '4px 16px 6px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <div style={{ display: 'inline-flex', gap: 8 }}>
            {selected.map(c => (
              <div key={c.name} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 12px 6px 6px', borderRadius: 22,
                background: MANDA.greenSoft, border: `1px solid #CFE8DA`,
              }}>
                <Avatar name={c.name} size={26} />
                <span style={{ fontFamily: MANDA.font, fontSize: 13, fontWeight: 700, color: MANDA.greenDeep }}>{c.name.split(' ')[0]}</span>
                <span style={{
                  width: 16, height: 16, borderRadius: 8, background: MANDA.green, color: '#fff',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800,
                }}>×</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* List */}
      <div style={{ flex: 1, overflow: 'auto', padding: '4px 0 8px' }}>
        <div style={{ padding: '6px 22px 4px', fontFamily: MANDA.font, fontSize: 11.5, fontWeight: 800, color: MANDA.inkSubtle, letterSpacing: 0.8 }}>SUGESTÕES</div>
        {SAMPLE_CONTACTS.slice(0, 3).map(c => (
          <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px' }}>
            <Avatar name={c.name} size={42} verified={c.verified} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: MANDA.font, fontSize: 14.5, fontWeight: 700, color: MANDA.ink }}>{c.name}</div>
              <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted }}>{c.sub} · negociante</div>
            </div>
            <Checkbox checked={!!c.selected} />
          </div>
        ))}

        <div style={{ padding: '10px 22px 4px', fontFamily: MANDA.font, fontSize: 11.5, fontWeight: 800, color: MANDA.inkSubtle, letterSpacing: 0.8 }}>OS SEUS CONTACTOS</div>
        {SAMPLE_CONTACTS.slice(3).map(c => (
          <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px' }}>
            <Avatar name={c.name} size={42} verified={c.verified} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: MANDA.font, fontSize: 14.5, fontWeight: 700, color: MANDA.ink }}>{c.name}</div>
              <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted }}>{c.sub}</div>
            </div>
            <Checkbox checked={!!c.selected} />
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  ScreenCreateGroupDetails, ScreenCreateGroupMembers,
  ScreenAddGroupMembers,
});

// Manda — Profile + Push notification (lock screen)

// ──────────────────────────────────────────────────────────────
// Profile
// ──────────────────────────────────────────────────────────────
function ScreenProfile() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.paper, display: 'flex', flexDirection: 'column' }}>
      <StatusSpacer />

      {/* Top hero — green */}
      <div style={{
        position: 'relative', padding: '8px 18px 70px',
        background: `linear-gradient(180deg, ${MANDA.green}, #157346 70%, ${MANDA.paper} 100%)`,
        color: '#fff',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={{ width: 36, height: 36, borderRadius: 18, border: 'none', background: 'rgba(255,255,255,.18)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icon.chevronLeft(20, '#fff')}</button>
          <div style={{ flex: 1, textAlign: 'center', fontFamily: MANDA.font, fontSize: 16, fontWeight: 800 }}>Perfil</div>
          <button style={{ width: 36, height: 36, borderRadius: 18, border: 'none', background: 'rgba(255,255,255,.18)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icon.pencilSquare(18, '#fff')}</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 18 }}>
          <Avatar name="João Cangola" size={84} verified />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: MANDA.font, fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>João Cangola</div>
            <div style={{ fontFamily: MANDA.font, fontSize: 13.5, opacity: .85, marginTop: 2 }}>@joao.cangola</div>
            <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 9px', borderRadius: 10, background: 'rgba(255,255,255,.18)', fontFamily: MANDA.font, fontSize: 11.5, fontWeight: 700 }}>
              {Icon.check(13, '#fff')} Email verificado
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '0 14px 100px', marginTop: -50 }}>
        {/* Stats card — target vision, activates with transactions */}
        <div style={{ background: MANDA.white, borderRadius: 18, padding: '14px 4px 10px', boxShadow: '0 8px 22px rgba(11,77,47,.08)', border: `1px solid ${MANDA.cardBorder}` }}>
          <div style={{ display: 'flex' }}>
          {[
            ['—', 'Transações'],
            ['—', 'Reputação'],
            ['—', 'Volume'],
            ['—', 'Conclusão']].
          map(([v, l], i) =>
            <React.Fragment key={i}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontFamily: MANDA.font, fontSize: 17, fontWeight: 800, color: MANDA.inkSubtle, letterSpacing: -0.4 }}>{v}</div>
                <div style={{ fontFamily: MANDA.font, fontSize: 11, color: MANDA.inkMuted, marginTop: 2, fontWeight: 600 }}>{l}</div>
              </div>
              {i < 3 && <div style={{ width: 1, background: MANDA.divider }} />}
            </React.Fragment>
          )}
          </div>
          <div style={{ marginTop: 10, paddingTop: 8, borderTop: `1px solid ${MANDA.divider}`, textAlign: 'center', fontFamily: MANDA.font, fontSize: 11, color: MANDA.inkSubtle, lineHeight: 1.4 }}>
            Reputação e estatísticas começam quando as transações estiverem activas.
          </div>
        </div>

        {/* Transactions shortcut (no balances — Manda não guarda dinheiro) */}
        <div style={{ marginTop: 14, background: MANDA.white, borderRadius: 18, border: `1px solid ${MANDA.cardBorder}`, overflow: 'hidden' }}>
          <ProfileRow icon={Icon.exchange(20, MANDA.greenDeep)} title="As suas transações" detail="Histórico e recibos" />
          <ProfileRow icon={Icon.bank(20, MANDA.greenDeep)} title="Métodos de pagamento" detail="3 contas" />
        </div>

        {/* Sections */}
        <ProfileSection title="Conta">
          <ProfileRow icon={Icon.user(20, MANDA.greenDeep)} title="Dados pessoais" detail="João C. Domingos" />
          <ProfileRow icon={Icon.bank(20, MANDA.greenDeep)} title="Métodos de pagamento" detail="3 contas" />
          <ProfileRow icon={Icon.shield(20, MANDA.greenDeep)} title="Verificação de identidade" detail="Em breve" badge="soon" />
        </ProfileSection>

        <ProfileSection title="Segurança e privacidade">
          <ProfileRow icon={Icon.lock(20, MANDA.greenDeep)} title="Senha e PIN" />
          <ProfileRow icon={Icon.shield(20, MANDA.greenDeep)} title="Autenticação em 2 etapas" detail="Activa" badge="verde" />
          <ProfileRow icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={MANDA.greenDeep} strokeWidth="1.7"/><path d="M9 12l2 2 4-5" stroke={MANDA.greenDeep} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          } title="Bloqueios e reportes" detail="0" />
        </ProfileSection>

        <ProfileSection title="Histórico">
          <ProfileRow icon={Icon.exchange(20, MANDA.greenDeep)} title="Transações" detail="—" />
          <ProfileRow icon={Icon.star(20, MANDA.greenDeep)} title="Avaliações recebidas" detail="em breve" />
        </ProfileSection>

        <div style={{ marginTop: 18 }}>
          <button style={{ width: '100%', height: 50, borderRadius: 25, background: MANDA.white, border: `1.5px solid ${MANDA.dangerSoft}`, color: MANDA.danger, fontFamily: MANDA.font, fontWeight: 700, fontSize: 14 }}>Terminar sessão</button>
        </div>
        <div style={{ textAlign: 'center', fontFamily: MANDA.font, fontSize: 11, color: MANDA.inkSubtle, marginTop: 14 }}>
          Manda · v2.4.1 · Termos · Privacidade
        </div>
      </div>

      <TabBar active="profile" />
    </div>
  );
}

function ProfileSection({ title, children }) {
  return (
    <div style={{ marginTop: 18 }}>
      <div style={{ fontFamily: MANDA.font, fontSize: 12, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase', color: MANDA.inkMuted, padding: '0 6px 6px' }}>{title}</div>
      <div style={{ background: MANDA.white, borderRadius: 18, border: `1px solid ${MANDA.cardBorder}`, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}
function ProfileRow({ icon, title, detail, badge }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', borderBottom: `1px solid ${MANDA.divider}` }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: MANDA.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      <div style={{ flex: 1, fontFamily: MANDA.font, fontSize: 14.5, fontWeight: 700, color: MANDA.ink }}>{title}</div>
      {badge === 'verde' &&
      <div style={{ padding: '2px 8px', borderRadius: 9, background: MANDA.greenSoft, color: MANDA.greenDeep, fontFamily: MANDA.font, fontSize: 11, fontWeight: 800 }}>{detail}</div>
      }
      {badge === 'soon' &&
      <div style={{ padding: '2px 8px', borderRadius: 9, background: MANDA.paper, color: MANDA.inkSubtle, fontFamily: MANDA.font, fontSize: 11, fontWeight: 800 }}>{detail}</div>
      }
      {!badge && detail && <div style={{ fontFamily: MANDA.font, fontSize: 13, color: MANDA.inkMuted }}>{detail}</div>}
      {Icon.chevronRight(16, MANDA.inkSubtle)}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Push notification — lock screen
// ──────────────────────────────────────────────────────────────
function ScreenLockPush() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      // Lock-screen wallpaper: warm green / dusk gradient
      background: 'linear-gradient(180deg, #0b3a25 0%, #11593a 35%, #1a8754 70%, #2eaa68 100%)',
      overflow: 'hidden',
    }}>
      {/* subtle terrain glow */}
      <div style={{ position: 'absolute', bottom: -80, left: -100, right: -100, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.10), transparent 65%)' }} />

      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', color: '#fff', padding: '70px 16px 110px' }}>
        {/* lock + carrier line */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 26, height: 26, borderRadius: 13, background: 'rgba(255,255,255,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {Icon.lock(15, '#fff')}
          </div>
        </div>

        {/* date + time */}
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <div style={{ fontFamily: MANDA.font, fontSize: 16, fontWeight: 600, opacity: 0.85 }}>terça-feira, 12 de maio</div>
          <div style={{ fontFamily: MANDA.font, fontSize: 88, fontWeight: 300, letterSpacing: -3, lineHeight: 1, marginTop: 4 }}>14:36</div>
        </div>

        {/* notifications stack */}
        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* main notification — full */}
          <PushNotification
            big
            title="Manda"
            time="agora"
            subtitle="Recebemos o seu pagamento"
            body="Estamos a confirmar a entrada dos 175.875 Kz para a transação com Maria Pacheco. Avisamos assim que a verificação estiver feita."
            ctas={[{ label: 'Ver transação', primary: true }, { label: 'Silenciar' }]} />

          {/* second — collapsed */}
          <PushNotification
            title="Manda"
            time="14:34"
            subtitle="Maria Pacheco"
            body="Tudo certo, a enviar os USD agora 🙏"
          />
          {/* third — group */}
          <PushNotification
            title="Manda"
            time="14:18"
            subtitle="Câmbio Luanda 🇦🇴 · 12 novas"
            body="Pedro Cassule: alguém com 1.200 EUR para hoje?"
          />
        </div>

        <div style={{ flex: 1 }} />

        {/* flashlight + camera */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
          {[Icon.camera(22, '#fff'), null].map((ic, i) => (
            <div key={i} style={{ width: 46, height: 46, borderRadius: 23, background: 'rgba(0,0,0,.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {i === 0
                ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 3h6v3l1 1v3l-2 2v9h-4v-9l-2-2V7l1-1V3z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/></svg>
                : <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 8h3l2-2h6l2 2h3a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 012-2z" stroke="#fff" strokeWidth="1.7"/><circle cx="12" cy="13" r="3.5" stroke="#fff" strokeWidth="1.7"/></svg>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PushNotification({ big, title, time, subtitle, body, ctas }) {
  return (
    <div style={{
      borderRadius: 18, padding: '12px 14px',
      background: 'rgba(255,255,255,.78)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      color: MANDA.ink, fontFamily: MANDA.font,
      boxShadow: '0 8px 24px rgba(0,0,0,.18)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <MandaGlyph size={28} />
        <div style={{ flex: 1, fontFamily: MANDA.font, fontSize: 13, fontWeight: 700, color: MANDA.ink, textTransform: 'uppercase', letterSpacing: 0.3 }}>{title}</div>
        <div style={{ fontFamily: MANDA.font, fontSize: 12, color: MANDA.inkMuted }}>{time}</div>
      </div>
      <div style={{ fontFamily: MANDA.font, fontSize: 14.5, fontWeight: 800, color: MANDA.ink, marginTop: 6, letterSpacing: -0.2 }}>{subtitle}</div>
      <div style={{ fontFamily: MANDA.font, fontSize: 13.5, color: MANDA.inkMuted, marginTop: 2, lineHeight: 1.35 }}>{body}</div>
      {big && ctas && (
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          {ctas.map((c, i) => (
            <button key={i} style={{
              flex: 1, height: 34, borderRadius: 12, border: 'none',
              background: c.primary ? MANDA.green : 'rgba(11,77,47,.08)',
              color: c.primary ? '#fff' : MANDA.greenDeep,
              fontFamily: MANDA.font, fontWeight: 700, fontSize: 13,
            }}>{c.label}</button>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, {
  ScreenProfile, ScreenLockPush, PushNotification,
});

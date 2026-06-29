// Manda — Landing page (web marketing). Green-and-white identity.
// Embeds real mobile screens inside IOSDevice frames. Single tall ScreenLanding.
// Product truth: no wallet/balances, no crypto, fee 1% (0,5%+0,5%), timer 15 min.

// Phone mock — scaled IOSDevice that reserves correct layout space
function PhoneMock({ children, scale = 0.6, dark = false }) {
  const W = 402, H = 874;
  return (
    <div style={{ width: W * scale, height: H * scale, flexShrink: 0 }}>
      <div style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        <IOSDevice dark={dark}>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>{children}</div>
        </IOSDevice>
      </div>
    </div>);

}

// Store badge (drawn)
function LandingStoreBadge({ kind = 'apple' }) {
  const apple = kind === 'apple';
  return (
    <div style={{ height: 52, padding: '0 18px', borderRadius: 12, background: MANDA.ink, color: '#fff', display: 'inline-flex', alignItems: 'center', gap: 11, fontFamily: MANDA.font }}>
      {apple ?
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M16.4 12.9c0-2.5 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.2 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3.1 2.4 1.2-.1 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.7-1-2.7-3.9zM14 5.6c.7-.8 1.1-1.9 1-3-.9 0-2.1.6-2.8 1.4-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.5 2.8-1.3z" /></svg> :

      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 3.4l11 8.6L4 20.6V3.4z" fill="#34A853" /><path d="M4 3.4l11 8.6-3.2 2.5L4 3.4z" fill="#4285F4" /><path d="M4 20.6l11-8.6-3.2-2.5L4 20.6z" fill="#FBBC05" /><path d="M15 9l5 3-5 3V9z" fill="#EA4335" /></svg>
      }
      <div>
        <div style={{ fontSize: 10, fontWeight: 500, opacity: 0.75, textTransform: 'uppercase', letterSpacing: 0.3 }}>{apple ? 'Disponível na' : 'Disponível no'}</div>
        <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.3 }}>{apple ? 'App Store' : 'Google Play'}</div>
      </div>
    </div>);

}

function NavLink({ children }) {
  return <span style={{ fontFamily: MANDA.font, fontSize: 14.5, fontWeight: 600, color: MANDA.inkMuted, cursor: 'pointer' }}>{children}</span>;
}

function FeatureRow({ flip, eyebrow, title, body, bullets = [], phone }) {
  const text = (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontFamily: MANDA.font, fontSize: 13, fontWeight: 800, letterSpacing: 0.8, color: MANDA.green, textTransform: 'uppercase' }}>{eyebrow}</div>
      <div style={{ fontFamily: MANDA.font, fontSize: 34, fontWeight: 800, letterSpacing: -1, color: MANDA.ink, marginTop: 10, lineHeight: 1.1, textWrap: 'pretty' }}>{title}</div>
      <div style={{ fontFamily: MANDA.font, fontSize: 16, color: MANDA.inkMuted, marginTop: 14, lineHeight: 1.6, maxWidth: 440 }}>{body}</div>
      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {bullets.map((b) =>
        <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 24, height: 24, borderRadius: 12, background: MANDA.greenSoft, color: MANDA.greenDeep, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{Icon.check(15, MANDA.greenDeep)}</div>
            <span style={{ fontFamily: MANDA.font, fontSize: 14.5, color: MANDA.ink, fontWeight: 600 }}>{b}</span>
          </div>
        )}
      </div>
    </div>);

  const ph = (
    <div style={{ width: 360, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
      <div style={{ padding: 22, borderRadius: 32, background: `linear-gradient(160deg, ${MANDA.greenSoft}, ${MANDA.white})`, boxShadow: `0 20px 50px ${MANDA.green}18` }}>
        {phone}
      </div>
    </div>);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 64, padding: '54px 0' }}>
      {flip ? <>{ph}{text}</> : <>{text}{ph}</>}
    </div>);

}

function ScreenLanding() {
  return (
    <div style={{ position: 'relative', width: '100%', background: MANDA.white, fontFamily: MANDA.font }}>
      {/* L1 · NAV */}
      <div style={{ height: 74, display: 'flex', alignItems: 'center', padding: '0 60px', borderBottom: `1px solid ${MANDA.divider}`, position: 'relative', zIndex: 5, background: 'rgba(255,255,255,.85)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <MandaGlyph size={32} />
          <MandaWordmark size={24} />
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 34 }}>
          <NavLink>Funcionalidades</NavLink>
          <NavLink>Segurança</NavLink>
          <NavLink>Câmbio</NavLink>
          <NavLink>Grupos</NavLink>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <NavLink>Entrar</NavLink>
          <PrimaryButton size="sm" style={{ height: 44, fontSize: 14 }}>Descarregar a app</PrimaryButton>
        </div>
      </div>

      {/* L2 · HERO */}
      <div style={{ position: 'relative', overflow: 'hidden', background: `linear-gradient(165deg, ${MANDA.greenDeep} 0%, ${MANDA.green} 42%, ${MANDA.paper} 100%)` }}>
        <div style={{ position: 'absolute', top: -140, right: -80, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.16), transparent 65%)' }} />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '70px 60px 90px', gap: 40 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 20, background: 'rgba(255,255,255,.16)', color: '#fff', fontFamily: MANDA.font, fontSize: 13, fontWeight: 700 }}>
              {Icon.shield(15, '#fff')} Câmbio P2P protegido por escrow
            </div>
            <div style={{ fontFamily: MANDA.font, fontSize: 54, fontWeight: 800, letterSpacing: -2, color: '#fff', marginTop: 22, lineHeight: 1.05, textWrap: 'balance' }}>
              Converse, negoceie e troque moeda — com segurança.
            </div>
            <div style={{ fontFamily: MANDA.font, fontSize: 18, color: 'rgba(255,255,255,.9)', marginTop: 20, lineHeight: 1.55, maxWidth: 500 }}>
              Câmbio P2P de Kz, USD e EUR com escrow da Manda. Sem carteiras, sem complicações: o seu dinheiro só se move quando os dois confirmam.
            </div>
            <div style={{ marginTop: 30, display: 'flex', gap: 14 }}>
              <LandingStoreBadge kind="apple" />
              <LandingStoreBadge kind="google" />
            </div>
          </div>

          {/* hero phones */}
          <div style={{ position: 'relative', width: 460, height: 540, flexShrink: 0 }}>
            <div style={{ position: 'absolute', left: 30, top: 40, transform: 'rotate(-6deg)', borderRadius: 48, boxShadow: '0 40px 80px rgba(0,0,0,.3)' }}>
              <PhoneMock scale={0.52}><ScreenChat1to1 /></PhoneMock>
            </div>
            <div style={{ position: 'absolute', right: 0, top: 0, transform: 'rotate(5deg)', borderRadius: 48, boxShadow: '0 40px 90px rgba(0,0,0,.34)' }}>
              <PhoneMock scale={0.58}><ScreenTransactionBuyer /></PhoneMock>
            </div>
          </div>
        </div>
      </div>

      {/* L3 · TRUST STRIP */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 0, padding: '0 60px', borderBottom: `1px solid ${MANDA.divider}`, background: MANDA.white }}>
        {[
        [Icon.shield, 'Escrow protege os dois lados'],
        [Icon.user, 'Identidade verificada (KYC)'],
        [Icon.star, 'Reputação da comunidade'],
        [Icon.bank, 'Intermediário sem custódia de saldos']].
        map(([icon, label], i) =>
        <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, padding: '26px 18px', borderLeft: i > 0 ? `1px solid ${MANDA.divider}` : 'none', justifyContent: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: MANDA.greenSoft, color: MANDA.greenDeep, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon(22, MANDA.greenDeep)}</div>
            <span style={{ fontFamily: MANDA.font, fontSize: 14, fontWeight: 700, color: MANDA.ink, lineHeight: 1.25 }}>{label}</span>
          </div>
        )}
      </div>

      {/* L4 · FEATURES */}
      <div style={{ padding: '40px 60px 20px', maxWidth: 1280, margin: '0 auto' }}>
        <FeatureRow
          eyebrow="Mensagens"
          title="Mensagens seguras, em tempo real"
          body="Converse em privado ou em grupos de câmbio. Presença, recibos de leitura e tudo o que precisa para combinar o negócio antes de o fechar."
          bullets={['Conversas 1:1 e grupos até 500 membros', 'Recibos de entrega e leitura', 'Grupos públicos e privados']}
          phone={<PhoneMock scale={0.6}><ScreenChatList /></PhoneMock>} />

        <FeatureRow
          flip
          eyebrow="Câmbio P2P"
          title="Câmbio com escrow — ninguém perde"
          body="A Manda retém os Kz em custódia transitória até as duas partes confirmarem. A perna estrangeira é provada por comprovativo. A matemática é sempre em Kz."
          bullets={['Taxa 1% no total · 0,5% comprador + 0,5% vendedor', 'Só o vendedor propõe; o comprador aceita', 'Cronómetro de 15 min após aceitar']}
          phone={<PhoneMock scale={0.6}><ScreenTransactionBuyer /></PhoneMock>} />

        <FeatureRow
          eyebrow="Confiança"
          title="Identidade e reputação"
          body="Verifique a sua identidade (KYC) e construa reputação a cada negócio fechado. Um perfil de confiança abre mais portas na comunidade."
          bullets={['Verificação de identidade (KYC)', 'Reputação por avaliações', 'Métodos de pagamento pré-registados']}
          phone={<PhoneMock scale={0.6}><ScreenProfile /></PhoneMock>} />
      </div>

      {/* L5 · HOW IT WORKS */}
      <div style={{ background: MANDA.paper, padding: '64px 60px', borderTop: `1px solid ${MANDA.divider}` }}>
        <div style={{ textAlign: 'center', fontFamily: MANDA.font, fontSize: 13, fontWeight: 800, letterSpacing: 0.8, color: MANDA.green, textTransform: 'uppercase' }}>Como funciona</div>
        <div style={{ textAlign: 'center', fontFamily: MANDA.font, fontSize: 32, fontWeight: 800, letterSpacing: -0.8, color: MANDA.ink, marginTop: 10 }}>Quatro passos, zero surpresas</div>
        <div style={{ display: 'flex', gap: 22, marginTop: 40, maxWidth: 1100, margin: '40px auto 0' }}>
          {[
          ['Conversem e combinem', 'Acordem montante e câmbio no chat.', Icon.chat],
          ['Vendedor propõe', 'O vendedor envia a proposta da transação.', Icon.exchange],
          ['Escrow retém os Kz', 'A Manda guarda os Kz em custódia.', Icon.shield],
          ['Confirmam e liberta', 'Os dois confirmam; a Manda paga ao vendedor.', Icon.check]].
          map(([t, d, icon], i) =>
          <div key={i} style={{ flex: 1, background: MANDA.white, borderRadius: 18, border: `1px solid ${MANDA.cardBorder}`, padding: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: 15, background: MANDA.greenDeep, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MANDA.font, fontSize: 14, fontWeight: 800 }}>{i + 1}</div>
                <div style={{ color: MANDA.greenDeep }}>{icon(22, MANDA.greenDeep)}</div>
              </div>
              <div style={{ fontFamily: MANDA.font, fontSize: 16.5, fontWeight: 800, color: MANDA.ink, marginTop: 14 }}>{t}</div>
              <div style={{ fontFamily: MANDA.font, fontSize: 13.5, color: MANDA.inkMuted, marginTop: 6, lineHeight: 1.5 }}>{d}</div>
            </div>
          )}
        </div>
      </div>

      {/* L6 · SECURITY */}
      <div style={{ padding: '64px 60px', maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ fontFamily: MANDA.font, fontSize: 13, fontWeight: 800, letterSpacing: 0.8, color: MANDA.green, textTransform: 'uppercase' }}>Segurança</div>
        <div style={{ fontFamily: MANDA.font, fontSize: 32, fontWeight: 800, letterSpacing: -0.8, color: MANDA.ink, marginTop: 10, maxWidth: 600 }}>Feita para proteger os dois lados</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 32 }}>
          {[
          ['Comprovativos privados', 'Guardados em armazenamento privado, com acessos auditados. Nunca públicos.', Icon.lock],
          ['Escrow só move Kz', 'A perna estrangeira segue direta entre as partes. A Manda nunca toca nos USD/EUR.', Icon.shield],
          ['Confirmação por operações reais', 'A entrada dos Kz é confirmada manualmente contra o extrato — não basta uma foto.', Icon.bank],
          ['Sem carteira interna', 'A Manda é intermediário: não guarda saldos nem oferece levantamentos.', Icon.exchange]].
          map(([t, d, icon], i) =>
          <div key={i} style={{ background: MANDA.white, borderRadius: 18, border: `1px solid ${MANDA.cardBorder}`, padding: 24, display: 'flex', gap: 16 }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: MANDA.greenSoft, color: MANDA.greenDeep, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon(24, MANDA.greenDeep)}</div>
              <div>
                <div style={{ fontFamily: MANDA.font, fontSize: 17, fontWeight: 800, color: MANDA.ink }}>{t}</div>
                <div style={{ fontFamily: MANDA.font, fontSize: 14, color: MANDA.inkMuted, marginTop: 5, lineHeight: 1.55 }}>{d}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* L7 · CTA BAND */}
      <div style={{ position: 'relative', overflow: 'hidden', background: `linear-gradient(120deg, ${MANDA.greenDeep}, ${MANDA.green})`, padding: '64px 60px', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.14), transparent 65%)' }} />
        <div style={{ position: 'relative', fontFamily: MANDA.font, fontSize: 38, fontWeight: 800, letterSpacing: -1, color: '#fff' }}>Pronto para trocar com confiança?</div>
        <div style={{ position: 'relative', fontFamily: MANDA.font, fontSize: 16.5, color: 'rgba(255,255,255,.9)', marginTop: 12 }}>Descarregue o Manda e feche o próximo câmbio com escrow.</div>
        <div style={{ position: 'relative', marginTop: 28, display: 'flex', gap: 14, justifyContent: 'center' }}>
          <LandingStoreBadge kind="apple" />
          <LandingStoreBadge kind="google" />
        </div>
      </div>

      {/* L8 · FOOTER */}
      <div style={{ background: MANDA.ink, color: '#fff', padding: '48px 60px 36px' }}>
        <div style={{ display: 'flex', gap: 40 }}>
          <div style={{ flex: 1 }}>
            <MandaWordmark size={24} color="#fff" />
            <div style={{ fontFamily: MANDA.font, fontSize: 13.5, color: 'rgba(255,255,255,.6)', marginTop: 12, lineHeight: 1.55, maxWidth: 280 }}>
              Mensageria + câmbio P2P para Angola. Kz, USD e EUR com escrow.
            </div>
          </div>
          {[
          ['Produto', ['Funcionalidades', 'Câmbio', 'Grupos', 'Segurança']],
          ['Empresa', ['Sobre', 'Carreiras', 'Contacto']],
          ['Legal', ['Termos', 'Privacidade', 'Cookies']]].
          map(([h, links]) =>
          <div key={h} style={{ width: 180 }}>
              <div style={{ fontFamily: MANDA.font, fontSize: 12.5, fontWeight: 800, letterSpacing: 0.6, color: 'rgba(255,255,255,.5)', textTransform: 'uppercase' }}>{h}</div>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map((l) => <span key={l} style={{ fontFamily: MANDA.font, fontSize: 14, color: 'rgba(255,255,255,.8)', cursor: 'pointer' }}>{l}</span>)}
              </div>
            </div>
          )}
        </div>
        <div style={{ marginTop: 36, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: 'rgba(255,255,255,.55)' }}>© 2026 Manda. Todos os direitos reservados.</div>
          <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: 'rgba(255,255,255,.55)', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
            {Icon.flag(13)} Angola · Português
          </div>
        </div>
      </div>
    </div>);

}

Object.assign(window, { ScreenLanding, PhoneMock });

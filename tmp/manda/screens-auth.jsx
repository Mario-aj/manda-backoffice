// Manda — Authentication screens
// Welcome, Login, Register, Onboarding, OTP (email confirm), Forgot/Reset.

// ──────────────────────────────────────────────────────────────
// Welcome / splash
// ──────────────────────────────────────────────────────────────
function ScreenWelcome() {
  return (
    <div style={{
      position: 'absolute', inset: 0, background: MANDA.green,
      color: MANDA.white, display: 'flex', flexDirection: 'column',
      padding: '70px 28px 50px', overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: -120, right: -100, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.18), transparent 70%)' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -120, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.10), transparent 70%)' }} />

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
        <MandaGlyph size={44} color={MANDA.green} bg={MANDA.white} />
        <span style={{ fontFamily: MANDA.font, fontSize: 26, fontWeight: 800, letterSpacing: -0.7 }}>manda<span style={{ color: MANDA.greenMint }}>.</span></span>
      </div>

      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: -40 }}>
        <div style={{ fontFamily: MANDA.font, fontSize: 44, fontWeight: 800, lineHeight: 1.02, letterSpacing: -1.6, textWrap: 'pretty' }}>
          Converse.<br />Negocie.<br /><span style={{ color: MANDA.greenMint }}>Receba.</span>
        </div>
        <div style={{ fontFamily: MANDA.font, fontSize: 17, lineHeight: 1.45, marginTop: 18, opacity: 0.85, maxWidth: 300 }}>
          Mensagens privadas e câmbio P2P entre Kz, USD e EUR — com custódia segura em cada transação.
        </div>

        <div style={{
          marginTop: 38, padding: '14px 16px', borderRadius: 18,
          background: 'rgba(255,255,255,.13)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,.18)',
          display: 'flex', alignItems: 'center', gap: 12
        }}>
          <div style={{ width: 38, height: 38, borderRadius: 12, background: MANDA.greenMint, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MANDA.greenDeep }}>{Icon.shield(20, MANDA.greenDeep)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Custódia em escrow</div>
            <div style={{ fontSize: 12.5, opacity: 0.78, marginTop: 2 }}>Manda só libera o pagamento depois das duas partes confirmarem.</div>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button style={{ height: 56, borderRadius: 28, border: 'none', background: MANDA.white, color: MANDA.greenDeep, fontFamily: MANDA.font, fontWeight: 800, fontSize: 17, letterSpacing: -0.2 }}>Criar conta</button>
        <button style={{ height: 56, borderRadius: 28, border: '1.5px solid rgba(255,255,255,.45)', background: 'transparent', color: MANDA.white, fontFamily: MANDA.font, fontWeight: 700, fontSize: 16 }}>Já tenho conta</button>
        <div style={{ textAlign: 'center', fontSize: 12, opacity: 0.65, marginTop: 8 }}>
          Ao continuar, aceita os Termos e a Política de Privacidade.
        </div>
      </div>
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Login — CTA sits directly under "Esqueceu a senha?"
// ──────────────────────────────────────────────────────────────
function ScreenLogin() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.white, padding: '64px 24px 30px', display: 'flex', flexDirection: 'column' }}>
      <button style={{ width: 40, height: 40, borderRadius: 20, border: 'none', background: MANDA.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MANDA.ink }}>
        {Icon.chevronLeft(22)}
      </button>

      <div style={{ marginTop: 32 }}>
        <div style={{ fontFamily: MANDA.font, fontSize: 32, fontWeight: 800, letterSpacing: -1, color: MANDA.ink }}>Bem-vindo de volta</div>
        <div style={{ fontFamily: MANDA.font, fontSize: 15, color: MANDA.inkMuted, marginTop: 6 }}>Entre para continuar suas conversas e negociações.</div>
      </div>

      <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <TextField label="Email ou @username" value="joao.cangola" />
        <TextField label="Senha" value="••••••••••" suffix={
        <div style={{ color: MANDA.green, fontSize: 13, fontWeight: 700 }}>Mostrar</div>
        } />
      </div>

      {/* esqueceu a senha — alinhado à direita, encostado nos inputs */}
      <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
        <span style={{ color: MANDA.green, fontSize: 14, fontWeight: 700 }}>Esqueceu a senha?</span>
      </div>

      {/* CTA imediatamente abaixo */}
      <div style={{ marginTop: 16 }}>
        <PrimaryButton full size="lg">Entrar</PrimaryButton>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ textAlign: 'center', fontSize: 14, color: MANDA.inkMuted, fontFamily: MANDA.font }}>
        Novo no Manda? <span style={{ color: MANDA.green, fontWeight: 700 }}>Criar conta</span>
      </div>
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Registro — CTA logo após o aceite dos termos, junto dos inputs
// ──────────────────────────────────────────────────────────────
function ScreenRegister() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.white, padding: '64px 24px 30px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button style={{ width: 40, height: 40, borderRadius: 20, border: 'none', background: MANDA.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MANDA.ink }}>
          {Icon.chevronLeft(22)}
        </button>
        <div style={{ flex: 1, display: 'flex', gap: 6 }}>
          {[1, 2, 3].map((i) =>
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= 2 ? MANDA.green : MANDA.divider }} />
          )}
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: MANDA.inkMuted, fontFamily: MANDA.font }}>2 / 3</div>
      </div>

      <div style={{ marginTop: 22 }}>
        <div style={{ fontFamily: MANDA.font, fontSize: 28, fontWeight: 800, letterSpacing: -0.9, color: MANDA.ink }}>Crie sua conta</div>
        <div style={{ fontFamily: MANDA.font, fontSize: 14.5, color: MANDA.inkMuted, marginTop: 6, lineHeight: 1.4 }}>
          Vamos precisar de alguns dados para você poder conversar e negociar com segurança.
        </div>
      </div>

      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <TextField label="Nome completo" value="João Cangola Domingos" />
        <TextField label="Email" value="joao@cangola.ao" />
        <TextField label="Username" prefix="@" value="joao.cangola"
        suffix={<span style={{ color: MANDA.green, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>{Icon.check(16, MANDA.green)} livre</span>} />
        <TextField label="Telefone" prefix="🇦🇴 +244" value="923 456 789" />
        <TextField label="Senha" value="••••••••••" hint="Mín. 8 caracteres, 1 número e 1 símbolo." />
      </div>

      {/* Termos encostado nos inputs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted, marginTop: 14 }}>
        <div style={{ width: 20, height: 20, borderRadius: 5, background: MANDA.green, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {Icon.check(14, '#fff')}
        </div>
        Aceito os <span style={{ color: MANDA.green, fontWeight: 700 }}>Termos</span> e a <span style={{ color: MANDA.green, fontWeight: 700 }}>Política de Privacidade</span>.
      </div>

      {/* CTA logo abaixo */}
      <div style={{ marginTop: 12 }}>
        <PrimaryButton full size="lg">Continuar</PrimaryButton>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ textAlign: 'center', fontSize: 13, color: MANDA.inkMuted, fontFamily: MANDA.font }}>
        Já tem conta? <span style={{ color: MANDA.green, fontWeight: 700 }}>Entrar</span>
      </div>
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Email OTP — confirmação após cadastro
// ──────────────────────────────────────────────────────────────
function OTPBoxes({ digits = '438' }) {
  // 6 boxes, fill with digits string from the left
  const arr = Array.from({ length: 6 }, (_, i) => digits[i] || '');
  const focusIdx = digits.length; // next empty box gets the caret
  return (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
      {arr.map((d, i) => {
        const focused = i === focusIdx;
        const filled = !!d;
        return (
          <div key={i} style={{
            width: 46, height: 56, borderRadius: 14,
            background: filled ? MANDA.greenSoft : MANDA.white,
            border: `2px solid ${focused ? MANDA.green : filled ? MANDA.green : MANDA.cardBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: MANDA.font, fontSize: 26, fontWeight: 800, color: MANDA.greenDeep,
            fontVariantNumeric: 'tabular-nums', position: 'relative',
            boxShadow: focused ? `0 0 0 4px ${MANDA.greenSoft}` : 'none'
          }}>
            {d}
            {focused && !d && <div style={{ position: 'absolute', width: 2, height: 26, background: MANDA.green, animation: 'none' }} />}
          </div>);

      })}
    </div>);

}

function ScreenOTP() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.white, padding: '64px 24px 30px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button style={{ width: 40, height: 40, borderRadius: 20, border: 'none', background: MANDA.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MANDA.ink }}>
          {Icon.chevronLeft(22)}
        </button>
        <div style={{ flex: 1, display: 'flex', gap: 6 }}>
          {[1, 2, 3].map((i) =>
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: MANDA.green }} />
          )}
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: MANDA.inkMuted, fontFamily: MANDA.font }}>3 / 3</div>
      </div>

      <div style={{
        marginTop: 26, width: 64, height: 64, borderRadius: 20,
        background: MANDA.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
          <rect x="2.5" y="5" width="19" height="14" rx="2.5" stroke={MANDA.greenDeep} strokeWidth="1.7" />
          <path d="M3 7l9 6 9-6" stroke={MANDA.greenDeep} strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ fontFamily: MANDA.font, fontSize: 26, fontWeight: 800, letterSpacing: -0.8, color: MANDA.ink }}>Confirme seu email</div>
        <div style={{ fontFamily: MANDA.font, fontSize: 14.5, color: MANDA.inkMuted, marginTop: 6, lineHeight: 1.45 }}>
          Enviamos um código de 6 dígitos para <b style={{ color: MANDA.ink }}>joao@cangola.ao</b>. Insira-o abaixo para activar a sua conta.
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <OTPBoxes digits="438" />
      </div>

      <div style={{ marginTop: 16, textAlign: 'center', fontFamily: MANDA.font, fontSize: 13.5, color: MANDA.inkMuted }}>
        Não recebeu? <span style={{ color: MANDA.inkSubtle }}>Reenviar em <b style={{ color: MANDA.ink, fontVariantNumeric: 'tabular-nums' }}>0:42</b></span>
      </div>

      <div style={{ marginTop: 18 }}>
        <PrimaryButton full size="lg">Confirmar e continuar</PrimaryButton>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ textAlign: 'center', fontFamily: MANDA.font, fontSize: 13, color: MANDA.inkMuted }}>
        Email errado? <span style={{ color: MANDA.green, fontWeight: 700 }}>Alterar email</span>
      </div>
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Forgot password — pedir email
// ──────────────────────────────────────────────────────────────
function ScreenForgotPassword() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.white, padding: '64px 24px 30px', display: 'flex', flexDirection: 'column' }}>
      <button style={{ width: 40, height: 40, borderRadius: 20, border: 'none', background: MANDA.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MANDA.ink }}>
        {Icon.chevronLeft(22)}
      </button>

      <div style={{
        marginTop: 28, width: 64, height: 64, borderRadius: 20,
        background: MANDA.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>{Icon.lock(32, MANDA.greenDeep)}</div>

      <div style={{ marginTop: 18 }}>
        <div style={{ fontFamily: MANDA.font, fontSize: 28, fontWeight: 800, letterSpacing: -0.9, color: MANDA.ink }}>Esqueceu a senha?</div>
        <div style={{ fontFamily: MANDA.font, fontSize: 14.5, color: MANDA.inkMuted, marginTop: 6, lineHeight: 1.45 }}>
          Sem stress. Diga-nos o email da sua conta e enviamos um código para redefinir a senha.
        </div>
      </div>

      <div style={{ marginTop: 22 }}>
        <TextField label="Email da conta" value="joao@cangola.ao" />
      </div>

      <div style={{ marginTop: 14 }}>
        <PrimaryButton full size="lg">Enviar código</PrimaryButton>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ textAlign: 'center', fontFamily: MANDA.font, fontSize: 13, color: MANDA.inkMuted }}>
        Lembrou a senha? <span style={{ color: MANDA.green, fontWeight: 700 }}>Voltar para Entrar</span>
      </div>
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Reset password — OTP + nova senha
// ──────────────────────────────────────────────────────────────
function ScreenResetPassword() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.white, padding: '64px 24px 30px', display: 'flex', flexDirection: 'column' }}>
      <button style={{ width: 40, height: 40, borderRadius: 20, border: 'none', background: MANDA.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MANDA.ink }}>
        {Icon.chevronLeft(22)}
      </button>

      <div style={{ marginTop: 24 }}>
        <div style={{ fontFamily: MANDA.font, fontSize: 26, fontWeight: 800, letterSpacing: -0.8, color: MANDA.ink }}>Redefinir senha</div>
        <div style={{ fontFamily: MANDA.font, fontSize: 14, color: MANDA.inkMuted, marginTop: 6, lineHeight: 1.45 }}>
          Código enviado para <b style={{ color: MANDA.ink }}>joao@cangola.ao</b>. Insira-o e escolha uma nova senha.
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: MANDA.inkMuted, marginBottom: 8, letterSpacing: 0.1, textTransform: 'uppercase' }}>Código de 6 dígitos</div>
        <OTPBoxes digits="9215" />
      </div>

      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <TextField label="Nova senha" value="••••••••••" hint="Mín. 8 caracteres, 1 número e 1 símbolo." />
        <TextField label="Confirmar nova senha" value="••••••••••" />
      </div>

      <div style={{ marginTop: 16 }}>
        <PrimaryButton full size="lg">Redefinir senha</PrimaryButton>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ textAlign: 'center', fontFamily: MANDA.font, fontSize: 13, color: MANDA.inkMuted }}>
        Não recebeu o código? <span style={{ color: MANDA.green, fontWeight: 700 }}>Reenviar</span>
      </div>
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Onboarding for new users — suggestions
// ──────────────────────────────────────────────────────────────
function ScreenOnboarding() {
  const suggestions = [
  { name: 'Câmbio Luanda 🇦🇴', sub: '1.247 membros · Grupo público', kind: 'group', reason: 'Popular na sua cidade' },
  { name: 'Maria Pacheco', sub: '@maria.p · 12 transações', kind: 'user', verified: true, reason: 'Negociante verificada' },
  { name: 'USD Express', sub: '843 membros · Grupo público', kind: 'group', reason: 'Câmbio USD ↔ Kz' },
  { name: 'Eduardo Bumba', sub: '@eddy.bmb · Reputação 4.9★', kind: 'user', reason: 'Vendedor de USD' },
  { name: 'Câmbio EUR Angola', sub: '512 membros · Grupo público', kind: 'group', reason: 'EUR ↔ Kz' },
  { name: 'Lucía Ferraz', sub: '@lu.ferraz · 38 transações', kind: 'user', verified: true, reason: 'Próxima de você' }];


  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.white, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '60px 22px 14px' }}>
        <div style={{ fontFamily: MANDA.font, fontSize: 13, fontWeight: 700, color: MANDA.green, letterSpacing: 0.6, textTransform: 'uppercase' }}>Passo final</div>
        <div style={{ fontFamily: MANDA.font, fontSize: 28, fontWeight: 800, letterSpacing: -0.9, color: MANDA.ink, marginTop: 6 }}>Encontre pessoas e grupos</div>
        <div style={{ fontFamily: MANDA.font, fontSize: 14.5, color: MANDA.inkMuted, marginTop: 6, lineHeight: 1.4 }}>
          Como você ainda não tem contactos no Manda, separamos sugestões da comunidade.
        </div>

        <div style={{ marginTop: 18, height: 46, borderRadius: 14, background: MANDA.paper, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, color: MANDA.inkSubtle, fontFamily: MANDA.font, fontSize: 15 }}>
          {Icon.search(20, MANDA.inkSubtle)}
          Procurar por @username, nome ou grupo
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '4px 14px 0' }}>
        {suggestions.map((s, i) =>
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 10px', borderRadius: 14 }}>
            {s.kind === 'group' ?
          <GroupAvatar names={[s.name, s.name.split(' ')[1] || 'X']} size={46} /> :
          <Avatar name={s.name} size={46} verified={s.verified} />}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ fontFamily: MANDA.font, fontSize: 15, fontWeight: 700, color: MANDA.ink }}>{s.name}</div>
              </div>
              <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted, marginTop: 1 }}>{s.sub}</div>
              <div style={{ marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 8, background: MANDA.greenSoft, color: MANDA.greenDeep, fontSize: 11, fontWeight: 700 }}>
                {s.reason}
              </div>
            </div>
            <button style={{
            height: 34, padding: '0 14px', borderRadius: 17,
            border: `1.5px solid ${MANDA.green}`, background: i === 0 || i === 1 ? MANDA.green : 'transparent',
            color: i === 0 || i === 1 ? '#fff' : MANDA.green, fontFamily: MANDA.font, fontWeight: 700, fontSize: 13
          }}>{s.kind === 'group' ? 'Entrar' : i === 0 || i === 1 ? 'Seguindo' : 'Seguir'}</button>
          </div>
        )}
      </div>

      <div style={{ padding: '12px 22px 30px', borderTop: `1px solid ${MANDA.divider}` }}>
        <PrimaryButton full size="md">Continuar</PrimaryButton>
      </div>
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Onboarding skeleton — exact mirror of ScreenOnboarding while loading
// ──────────────────────────────────────────────────────────────
function ScreenOnboardingSkeleton() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.white, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '60px 22px 14px' }}>
        <div style={{ fontFamily: MANDA.font, fontSize: 13, fontWeight: 700, color: MANDA.green, letterSpacing: 0.6, textTransform: 'uppercase' }}>Passo final</div>
        <div style={{ fontFamily: MANDA.font, fontSize: 28, fontWeight: 800, letterSpacing: -0.9, color: MANDA.ink, marginTop: 6 }}>Encontre pessoas e grupos</div>
        <div style={{ fontFamily: MANDA.font, fontSize: 14.5, color: MANDA.inkMuted, marginTop: 6, lineHeight: 1.4 }}>
          A procurar sugestões na comunidade Manda…
        </div>

        {/* search field — kept as real chrome, not skeletonized */}
        <div style={{ marginTop: 18, height: 46, borderRadius: 14, background: MANDA.paper, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, color: MANDA.inkSubtle, fontFamily: MANDA.font, fontSize: 15 }}>
          {Icon.search(20, MANDA.inkSubtle)}
          Procurar por @username, nome ou grupo
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', padding: '4px 14px 0' }}>
        {Array.from({ length: 6 }).map((_, i) =>
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 10px', opacity: 1 - i * 0.08 }}>
            <SkelCircle size={46} />
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
              <Skeleton w={`${52 + i * 7 % 30}%`} h={13} r={6} />
              <Skeleton w={`${64 + i * 11 % 22}%`} h={11} r={6} />
              <Skeleton w={`${30 + i * 5 % 18}%`} h={16} r={8} style={{ marginTop: 2 }} />
            </div>
            <Skeleton w={78} h={34} r={17} />
          </div>
        )}
      </div>

      <div style={{ padding: '12px 22px 30px', borderTop: `1px solid ${MANDA.divider}` }}>
        <button disabled style={{
          height: 52, width: '100%', borderRadius: 26, border: 'none',
          background: '#C4D2CB', color: MANDA.white,
          fontFamily: MANDA.font, fontWeight: 700, fontSize: 16,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10
        }}>
          <span style={{
            width: 16, height: 16, borderRadius: 8,
            border: '2.5px solid rgba(255,255,255,.55)',
            borderTopColor: '#fff',
            animation: 'mandaShimmer 1s linear infinite',
            display: 'inline-block'
          }} />
          A carregar sugestões…
        </button>
      </div>

      {/* Spinner rotation */}
      <style>{`
        @keyframes mandaSpin { to { transform: rotate(360deg); } }
        button[disabled] span { animation: mandaSpin 0.9s linear infinite !important; }
      `}</style>
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Onboarding — empty / first user (no community yet)
// ──────────────────────────────────────────────────────────────
function ScreenOnboardingFirstUser() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: MANDA.white, display: 'flex', flexDirection: 'column' }}>
      {/* Soft top hero */}
      <div style={{
        position: 'relative', padding: '60px 22px 22px',
        background: `linear-gradient(180deg, ${MANDA.greenSoft} 0%, ${MANDA.white} 100%)`,
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: -80, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,135,84,.18), transparent 70%)' }} />
        <div style={{ position: 'relative', fontFamily: MANDA.font, fontSize: 13, fontWeight: 700, color: MANDA.green, letterSpacing: 0.6, textTransform: 'uppercase' }}>Passo final</div>
        <div style={{ position: 'relative', fontFamily: MANDA.font, fontSize: 28, fontWeight: 800, letterSpacing: -0.9, color: MANDA.ink, marginTop: 6, textWrap: 'pretty' }}>
          Você é o primeiro<br />por aqui 👋
        </div>
        <div style={{ position: 'relative', fontFamily: MANDA.font, fontSize: 14.5, color: MANDA.inkMuted, marginTop: 8, lineHeight: 1.45, maxWidth: 320 }}>
          Ainda não há outros utilizadores ou grupos no Manda. Convide quem você confia para começar a conversar e negociar.
        </div>

        {/* Avatar stack — your avatar + ghost slots */}
        <div style={{ position: 'relative', marginTop: 18, display: 'flex', alignItems: 'center', gap: -8 }}>
          <div style={{ position: 'relative', zIndex: 4 }}>
            <Avatar name="João Cangola" size={52} ring />
          </div>
          {[0, 1, 2].map((i) =>
          <div key={i} style={{
            width: 52, height: 52, borderRadius: 26,
            marginLeft: -14,
            border: `2.5px dashed ${MANDA.green}`,
            background: MANDA.white,
            color: MANDA.green,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: MANDA.font, fontWeight: 800, fontSize: 22,
            opacity: 1 - i * 0.18,
            zIndex: 3 - i
          }}>+</div>
          )}
        </div>
      </div>

      {/* Action sections */}
      <div style={{ flex: 1, overflow: 'auto', padding: '18px 18px 8px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* ── FEATURED: Criar o primeiro grupo ─────────────────── */}
        <div style={{ fontFamily: MANDA.font, fontSize: 11, fontWeight: 800, letterSpacing: 0.8, color: MANDA.inkMuted, textTransform: 'uppercase', padding: '0 4px' }}>
          Começar a sua comunidade
        </div>
        <div style={{
          position: 'relative', padding: '18px 18px 16px', borderRadius: 20,
          background: MANDA.green, color: MANDA.white, overflow: 'hidden',
          boxShadow: `0 12px 28px ${MANDA.green}30`
        }}>
          <div style={{ position: 'absolute', top: -50, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.16), transparent 70%)' }} />

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14,
              background: 'rgba(255,255,255,.18)',
              border: '1px solid rgba(255,255,255,.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="8" r="3.2" stroke="#fff" strokeWidth="1.8"/>
                <circle cx="17" cy="9" r="2.4" stroke="#fff" strokeWidth="1.8"/>
                <path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M14 19c.3-2.4 2-4 4-4s3.7 1.4 4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: MANDA.font, fontSize: 17, fontWeight: 800, letterSpacing: -0.4 }}>Criar o seu primeiro grupo</div>
              <div style={{ fontFamily: MANDA.font, fontSize: 12.5, opacity: 0.85, marginTop: 2, lineHeight: 1.35 }}>
                Junte amigos, família ou colegas num espaço para conversar e negociar câmbio.
              </div>
            </div>
          </div>

          {/* Sample group types — quick-pick chips */}
          <div style={{ position: 'relative', marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Família', 'Câmbio USD', 'Câmbio EUR', 'Amigos próximos', 'Trabalho'].map((g) => (
              <div key={g} style={{
                padding: '6px 11px', borderRadius: 12,
                background: 'rgba(255,255,255,.16)',
                border: '1px solid rgba(255,255,255,.22)',
                fontFamily: MANDA.font, fontSize: 12, fontWeight: 600
              }}>{g}</div>
            ))}
          </div>

          <button style={{
            position: 'relative', marginTop: 16, height: 44, width: '100%',
            borderRadius: 22, border: 'none',
            background: MANDA.white, color: MANDA.greenDeep,
            fontFamily: MANDA.font, fontWeight: 800, fontSize: 14.5, letterSpacing: -0.2,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8
          }}>
            {Icon.plus(18, MANDA.greenDeep)} Criar grupo
          </button>
        </div>

        {/* ── SECTION: Convidar contactos (generic) ────────────── */}
        <div style={{ fontFamily: MANDA.font, fontSize: 11, fontWeight: 800, letterSpacing: 0.8, color: MANDA.inkMuted, textTransform: 'uppercase', padding: '6px 4px 0' }}>
          Convide os seus contactos
        </div>
        <div style={{
          padding: 16, borderRadius: 18,
          background: MANDA.white, border: `1px solid ${MANDA.cardBorder}`
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: MANDA.greenSoft, color: MANDA.greenDeep, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6" stroke={MANDA.greenDeep} strokeWidth="1.7" strokeLinecap="round"/>
                <path d="M12 3v12M7 8l5-5 5 5" stroke={MANDA.greenDeep} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: MANDA.font, fontSize: 14.5, fontWeight: 800, color: MANDA.ink }}>Partilhar o Manda</div>
              <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted, marginTop: 2, lineHeight: 1.4 }}>
                Envie o link para quem quiser convidar. Eles instalam o Manda gratuitamente e podem conversar consigo.
              </div>
            </div>
          </div>

          {/* Store badges */}
          <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
            <StoreBadge kind="apple" />
            <StoreBadge kind="google" />
          </div>

          <button style={{
            marginTop: 12, height: 44, width: '100%',
            borderRadius: 22, border: `1.5px solid ${MANDA.green}`,
            background: 'transparent', color: MANDA.green,
            fontFamily: MANDA.font, fontWeight: 700, fontSize: 14,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6M16 6l-4-4-4 4M12 2v13" stroke={MANDA.green} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Partilhar link da app
          </button>
        </div>

        {/* Reassurance note */}
        <div style={{
          marginTop: 2, padding: '12px 14px', borderRadius: 14,
          background: MANDA.paper, border: `1px solid ${MANDA.cardBorder}`,
          display: 'flex', gap: 10, alignItems: 'flex-start'
        }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: MANDA.greenSoft, color: MANDA.greenDeep, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {Icon.shield(16, MANDA.greenDeep)}
          </div>
          <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted, lineHeight: 1.45 }}>
            Pode entrar mesmo sem ter contactos — avisaremos quando alguém novo se juntar à comunidade.
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 22px 30px', borderTop: `1px solid ${MANDA.divider}`, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <PrimaryButton full size="md">Continuar para o Manda</PrimaryButton>
        <div style={{ textAlign: 'center', fontFamily: MANDA.font, fontSize: 13, color: MANDA.inkSubtle }}>
          Pode convidar contactos depois, a partir do seu perfil.
        </div>
      </div>
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Store badge — App Store / Play Store
// ──────────────────────────────────────────────────────────────
function StoreBadge({ kind = 'apple' }) {
  const apple = kind === 'apple';
  return (
    <div style={{
      flex: 1, height: 50, padding: '0 12px', borderRadius: 12,
      background: MANDA.ink, color: MANDA.white,
      display: 'flex', alignItems: 'center', gap: 10,
      fontFamily: MANDA.font, minWidth: 0,
    }}>
      {apple ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
          <path d="M16.4 12.9c0-2.5 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.2 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3.1 2.4 1.2-.1 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.7-1-2.7-3.9zM14 5.6c.7-.8 1.1-1.9 1-3-.9 0-2.1.6-2.8 1.4-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.5 2.8-1.3z"/>
        </svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M4 3.4l11 8.6L4 20.6V3.4z" fill="#34A853"/>
          <path d="M4 3.4l11 8.6-3.2 2.5L4 3.4z" fill="#4285F4"/>
          <path d="M4 20.6l11-8.6-3.2-2.5L4 20.6z" fill="#FBBC05"/>
          <path d="M15 12l5-3-5-3v6z" fill="#EA4335"/>
          <path d="M15 12l5 3-5 3v-6z" fill="#EA4335"/>
        </svg>
      )}
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 9.5, fontWeight: 500, opacity: 0.75, letterSpacing: 0.2, textTransform: 'uppercase' }}>
          {apple ? 'Disponível na' : 'Disponível no'}
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.3, marginTop: 1 }}>
          {apple ? 'App Store' : 'Google Play'}
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon, title, sub, cta, tone, chip }) {
  const primary = tone === 'primary';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '14px 14px', borderRadius: 16,
      background: primary ? MANDA.greenSoft : MANDA.white,
      border: `1px solid ${primary ? '#CFE8DA' : MANDA.cardBorder}`
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 12,
        background: primary ? MANDA.white : MANDA.greenSoft,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0
      }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: MANDA.font, fontSize: 14.5, fontWeight: 800, color: MANDA.ink }}>{title}</div>
        <div style={{ fontFamily: MANDA.font, fontSize: 12.5, color: MANDA.inkMuted, marginTop: 2, lineHeight: 1.35 }}>{sub}</div>
        {chip &&
        <div style={{
          marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '3px 8px', borderRadius: 7, background: MANDA.white,
          border: `1px solid ${MANDA.cardBorder}`,
          fontFamily: MANDA.fontMono, fontSize: 11, color: MANDA.greenDeep, fontWeight: 700
        }}>
            {chip}
            {Icon.copy(12, MANDA.inkMuted)}
          </div>
        }
      </div>
      <button style={{
        height: 32, padding: '0 12px', borderRadius: 16,
        border: `1.5px solid ${MANDA.green}`,
        background: primary ? MANDA.green : 'transparent',
        color: primary ? '#fff' : MANDA.green,
        fontFamily: MANDA.font, fontWeight: 700, fontSize: 12,
        flexShrink: 0
      }}>{cta}</button>
    </div>);

}

Object.assign(window, {
  ScreenWelcome, ScreenLogin, ScreenRegister, ScreenOnboarding,
  ScreenOnboardingSkeleton, ScreenOnboardingFirstUser,
  ScreenOTP, ScreenForgotPassword, ScreenResetPassword
});
const moscowTimeFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Moscow',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

function moscowTimeParts(date = new Date()) {
  const parts = moscowTimeFormatter.formatToParts(date)
  return {
    hour: parts.find((part) => part.type === 'hour')?.value ?? '00',
    minute: parts.find((part) => part.type === 'minute')?.value ?? '00',
  }
}

const moscowSecondFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Moscow',
  second: 'numeric',
})

function moscowSecond(date = new Date()) {
  return Number(moscowSecondFormatter.format(date))
}

function ensureClockMarkup(clockEl: HTMLElement) {
  if (clockEl.querySelector('.clock-sep')) return

  clockEl.innerHTML =
    '<span class="clock-time"><span data-clock="hour">00</span><span class="clock-sep" aria-hidden="true">:</span><span data-clock="minute">00</span></span> GMT +3'
}

const clock = document.querySelector<HTMLElement>('#clock')
if (clock) {
  ensureClockMarkup(clock)
  const hourEl = clock.querySelector<HTMLElement>('[data-clock="hour"]')
  const minuteEl = clock.querySelector<HTMLElement>('[data-clock="minute"]')
  const sepEl = clock.querySelector<HTMLElement>('.clock-sep')

  const tick = () => {
    const now = new Date()
    const { hour, minute } = moscowTimeParts(now)
    if (hourEl) hourEl.textContent = hour
    if (minuteEl) minuteEl.textContent = minute
    sepEl?.classList.toggle('is-dim', moscowSecond(now) % 2 === 1)
  }
  tick()
  window.setInterval(tick, 1000)
}

const header = document.querySelector<HTMLElement>('#site-header')
const drawerToggle = document.querySelector<HTMLInputElement>('#topnav-drawer')

const handleScroll = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 10)
}

handleScroll()
window.addEventListener('scroll', handleScroll, { passive: true })

const setMobileMenuOpen = (open: boolean) => {
  if (!drawerToggle) return
  drawerToggle.checked = open
  document.body.classList.toggle('nav-open', open)
}

drawerToggle?.addEventListener('change', () => {
  document.body.classList.toggle('nav-open', drawerToggle.checked)
})

document.querySelectorAll('.drawer-panel a').forEach((link) => {
  link.addEventListener('click', () => setMobileMenuOpen(false))
})

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMobileMenuOpen(false)
})

window.addEventListener('resize', () => {
  if (window.innerWidth > 720) setMobileMenuOpen(false)
})

const THEME_KEY = 'theme'
const themeToggle = document.querySelector<HTMLButtonElement>('#theme-toggle')

const applyTheme = (theme: 'light' | 'dark') => {
  if (theme === 'light') document.documentElement.dataset.theme = 'light'
  else delete document.documentElement.dataset.theme

  const light = theme === 'light'
  themeToggle?.setAttribute('aria-pressed', String(light))
  themeToggle?.setAttribute(
    'aria-label',
    light ? 'Включить тёмную тему' : 'Включить светлую тему',
  )
}

applyTheme(localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark')

if (themeToggle) {
  themeToggle.onclick = () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'
    localStorage.setItem(THEME_KEY, next)
    applyTheme(next)
  }
}

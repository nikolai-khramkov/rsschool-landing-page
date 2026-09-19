import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import './style.css'

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)',
).matches

if (!prefersReducedMotion) {
  new Lenis({
    autoRaf: true,
    anchors: true,
    lerp: 0.07,
  })
}

function moscowClock() {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Moscow',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(new Date()) + ' GMT +3'
}

const clock = document.querySelector<HTMLElement>('#clock')
if (clock) {
  const tick = () => {
    clock.textContent = moscowClock()
  }
  tick()
  window.setInterval(tick, 30_000)
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

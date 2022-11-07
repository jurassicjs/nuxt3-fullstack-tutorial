window.BitterBrainsBanner = window.BitterBrainsBanner || {
    isOpen: false,
    countdownInterval: null,
    affiliateKey: null,
    isInitiated: false,
    style: null,
    phases: [
      {
        name: 'JOIN_NUXT_NATION',
        closedKey: 'JOIN_NUXT_NATION_CLOSED',
        title: 'Join the Largest Online Nuxt Event',
        subtitle: '16th & 17th November 2022',
        cta: 'Join for Free',
        link: 'https://nuxtnation.com',
        ends: '2022-11-12T00:00:00+01:00',
        showCountdown: false
      }
    ],
    activePhase: null,
    affiliateKeys: {
      'nuxtjs.org': 'nuxt',
      'v3.nuxtjs.org': 'nuxt',
      'vueschool.io': 'vueschool',
      'vuejsdevelopers.com': 'vuejsdevelopers',
      'michaelnthiessen.com': 'michaelnthiessen',
      'vuejsfeed.com': 'vuejsfeed',
      'masteringnuxt.com': 'masteringnuxt'
    },
    allowList: {
      'masteringnuxt.com': path => path === '/' || path === '/nuxt2' || path === '/nuxt3',
      'vueschool.io': path => path === '/' || path.startsWith('/courses') || path.startsWith('/articles'),
      'staging.vueschool.io': path => path === '/' || path.startsWith('/courses') || path.startsWith('/articles')
    },
    setActivePhase () {
      const now = new Date()
      this.phases = this.phases.map(phase => ({ ...phase, remaining: new Date(phase.ends) - now })).map(phase => ({ ...phase, lastHours: phase.remaining < 1000 * 60 * 60 * 48 }))
      this.activePhase = this.phases.find(phase => phase.remaining > 0)
    },
    setAffiliateKey () {
      const host = window.location.host
      this.affiliateKey = this.affiliateKeys[host] || ''
    },
    render () {
      const { title, subtitle, cta, link, name, showCountdown } = this.activePhase
      const countdown = showCountdown ? `<div class="bb-countdown">${this.renderCountdown()}</div>` : ''
  
      const template = `
        <div class="bb-background"></div>
        <div class="bb-logo"></div>
        <div class="bb-core">
          <div class="bb-slogan">
            <div class="bb-title">${title}</div>
            <div class="bb-subtitle">${subtitle}</div>
          </div>
          ${countdown}
          <div class="bb-button-wrapper">
            <div class="bb-button">${cta}</div>
          </div>
        </div>
        <div id="bb-close" class="bb-close">&times;</div>
      `
  
      const el = document.createElement('a')
      el.setAttribute('id', 'bb-banner')
      el.setAttribute('target', '_blank')
      el.setAttribute('href', `${link}?friend=${this.affiliateKey}&utm_source=${this.affiliateKey}&utm_medium=website&utm_campaign=affiliate&utm_content=top_banner`)
      el.classList.add(name)
      el.innerHTML = template
      this.addBodyClasses()
      document.body.appendChild(el)
  
      console.log('Top banner rendered')
  
      addEventListener('popstate', (event) => {
        this.handleNavigation()
      })
  
      window.history.pushState = new Proxy(window.history.pushState, {
        apply: (target, thisArg, argumentsList) => {
          const output = target.apply(thisArg, argumentsList)
          this.handleNavigation()
          return output
        }
      })
    },
    handleNavigation () {
      console.log('Navigation')
      this.addBodyClasses()
    },
    addBodyClasses () {
      if (!this.isOpen) return
  
      const root = document.getElementsByTagName('html')[0]
      root.classList.add('has-bb-banner')
  
      const host = window.location.host || ''
      const path = window.location.pathname || '/'
  
      root.classList.add(window.location.host.replaceAll('.', '_'))
  
      if (!this.allowList[host] || this.allowList[host](path)) {
        root.classList.remove('bb-banner-hidden')
      } else {
        root.classList.add('bb-banner-hidden')
      }
    },
    renderCountdown () {
      const parts = ['hours', 'minutes', 'seconds']
      if (!this.activePhase.lastHours) parts.unshift('days')
      return parts.map(part => this.renderCountdownPart(part)).join('')
    },
    renderCountdownPart (part) {
      return `
        <div class="bb-countdown-item">
          <div class="bb-countdown-part">
            <div data-countdown="${part}" class="bb-countdown-number"></div><div class="bb-countdown-text"><span class="bb-countdown-text-initial">${part[0]}</span><span>${part.substring(1)}</span></div>
          </div>
          <div class="bb-countdown-colon">:</div>
        </div>
      `
    },
    addCss () {
      const style = document.createElement('style')
      style.textContent = window.BitterBrainsBanner.style
      document.head.appendChild(style)
    },
    close () {
      document.getElementById('bb-banner').remove()
      const root = document.getElementsByTagName('html')[0]
      root.classList.remove('has-bb-banner')
      clearInterval(this.countdownInterval)
      this.isOpen = false
    },
    bindCloseButton () {
      document.getElementById('bb-close').addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.close()
        localStorage.setItem(this.activePhase.closedKey, 1)
      })
    },
    startCountdown () {
      if (this.activePhase.remaining < 0) return
      this.updateCountdown()
  
      this.countdownInterval = setInterval(() => {
        this.activePhase.remaining -= 1000
        if (this.activePhase.remaining > 0) {
          this.updateCountdown()
        } else {
          this.close()
        }
      }, 1000)
    },
    updateCountdown () {
      if (!this.isOpen) return
  
      const { remaining, lastHours } = this.activePhase
  
      const parts = {
        days: Math.floor(remaining / (1000 * 60 * 60 * 24)),
        hours: Math.floor(remaining % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
        minutes: Math.floor(remaining % (1000 * 60 * 60) / (1000 * 60)),
        seconds: Math.floor(remaining % (1000 * 60) / 1000)
      }
  
      if (lastHours) {
        parts.hours = parts.hours + (parts.days * 24)
        delete parts.days
      }
  
      Object.entries(parts).forEach(([key, value]) => {
        document.querySelector(`[data-countdown=${key}]`).textContent = value.toString().padStart(2, '0')
      })
    },
    init () {
      this.setActivePhase()
      if (!this.activePhase || localStorage.getItem(this.activePhase.closedKey) || this.isInitiated) return
      this.isOpen = true
      this.isInitiated = true
      const stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
          clearInterval(stateCheck)
  
          this.setAffiliateKey()
          this.addCss()
          this.render()
          this.bindCloseButton()
          if (this.activePhase.showCountdown) this.startCountdown()
        }
      }, 100)
    }
  }
  
  window.BitterBrainsBanner.style = `
  html.has-bb-banner {
    margin-top: 72px;
  }
  
  html.has-bb-banner.bb-banner-hidden {
    margin-top: 0;
  }
  
  html.has-bb-banner.bb-banner-hidden #bb-banner {
    display: none;
  }
  
  #bb-banner {
    height: 72px;
    position: fixed;
    z-index: 60;
    top: 0;
    left: 0;
    right: 0;
    text-decoration: none;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Roboto, Arial, sans-serif;
    background: #000;
    overflow: hidden;
  }
  
  #bb-banner * {
    font-family: Roboto, Arial, sans-serif;
  }
  
  #bb-banner .bb-logo {
    width: 30px;
    height: 19px;
    left: 16px;
    position: absolute;
    background-size: contain;
    background-repeat: no-repeat;
  }
  
  #bb-banner .bb-close {
    font-family: sans-serif;
    color: white;
    position: absolute;
    top: 29px;
    right: 24px;
    line-height: 0;
    font-size: 24px;
    height: 14px;
    width: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  #bb-banner .bb-background {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: absolute;
    z-index: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  
  #bb-banner .bb-core {
    display: flex;
    align-items: center;
    text-align: center;
    gap: 6px;
    flex-direction: column;
    position: relative;
    z-index: 10;
  }
  
  #bb-banner .bb-core .bb-title {
    font-size: 14px;
    font-weight: bold;
    color: #00dc82;
  }
  
  #bb-banner .bb-core .bb-subtitle {
    color: #FFF;
    font-size: 12px;
  }
  
  #bb-banner .bb-core .bb-button-wrapper {
    display: none;
  }
  
  #bb-banner .bb-core .bb-button-wrapper .bb-button {
    padding: 14px;
    border-radius: 6px;
    font-size: 18px;
    font-weight: bold;
    color: #000;
    background: white;
  }
  
  #bb-banner .bb-core .bb-countdown {
    align-items: center;
    gap: 4px;
    line-height: 1;
    display: flex;
    font-weight: bold;
    font-size: 12px;
    color: #00dc82;
  }
  
  #bb-banner .bb-core .bb-countdown .bb-countdown-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  #bb-banner .bb-core .bb-countdown .bb-countdown-item .bb-countdown-part > div {
    display: inline;
  }
  
  #bb-banner .bb-core .bb-countdown .bb-countdown-item:last-child .bb-countdown-colon {
    display: none;
  }
  
  #bb-banner .bb-core .bb-countdown .bb-countdown-item .bb-countdown-part .bb-countdown-text .bb-countdown-text-initial~span {
    display: none;
  }
  
  @media (min-width: 768px) {
    #bb-banner .bb-core {
      gap: 12px;
      flex-direction: row;
    }
  
    #bb-banner .bb-core .bb-title {
      margin-top: 4px;
      font-size: 18px;
    }
  
    #bb-banner .bb-core .bb-subtitle {
      margin-top: 4px;
      font-size: 16px;
    }
  
    #bb-banner .bb-core .bb-button-wrapper {
      display: block;
    }
  
    #bb-banner .bb-core .bb-countdown {
      font-weight: normal;
      font-size: inherit;
    }
  
    #bb-banner .bb-core .bb-countdown .bb-countdown-item .bb-countdown-part {
      border-radius: 2px;
      padding: 4px 0;
      text-align: center;
      width: 42px;
      background: rgba(255, 255, 255, 0.1);
    }
  
    #bb-banner .bb-core .bb-countdown .bb-countdown-item .bb-countdown-part > div {
      display: block;
    }
  
    #bb-banner .bb-core .bb-countdown .bb-countdown-item .bb-countdown-part .bb-countdown-number {
      font-size: 28px;
      font-weight: 500;
      line-height: 28px;
    }
  
    #bb-banner .bb-core .bb-countdown .bb-countdown-item .bb-countdown-part .bb-countdown-text {
      font-size: 8px;
      text-transform: uppercase;
    }
  
    #bb-banner .bb-core .bb-countdown .bb-countdown-item .bb-countdown-part .bb-countdown-text .bb-countdown-text-initial~span {
      display: inline;
    }
  
    #bb-banner .bb-core .bb-countdown .bb-countdown-item .bb-countdown-colon {
      font-weight: bold;
    }
  }
  
  @media (min-width: 1280px) {
    #bb-banner .bb-logo {
      width: 152px;
      left: 24px;
    }
  
    #bb-banner .bb-core {
      gap: 32px;
    }
  }
  
  /*
  CAMPAIGN CUSTOMIZATION
  **********************************************************************/
  
  /* Nuxt Nation */
  
  #bb-banner.JOIN_NUXT_NATION {
    background: #0c0c0d;
  }
  
  #bb-banner.JOIN_NUXT_NATION:hover .bb-core .bb-button-wrapper {
    box-shadow: 0 0 50px green;
  }
  
  #bb-banner.JOIN_NUXT_NATION .bb-core .bb-button-wrapper .bb-button {
    border: 1px solid rgba(255, 255, 255, 0.5);
    background: linear-gradient(to bottom, rgba(61,253,171,1) 0%, rgba(18,220,131,1) 100%);
  }
  
  #bb-banner.JOIN_NUXT_NATION .bb-core .bb-title {
    color: #00dc82;
  }
  
  #bb-banner.JOIN_NUXT_NATION .bb-logo {
    background-image: url("https://res.cloudinary.com/nicodevs/image/upload/v1667414581/nuxtnation/JOIN_NUXT_NATION/mark.svg");
    width: 27px;
    height: 29px;
  }
  
  #bb-banner.JOIN_NUXT_NATION .bb-background {
    background-image: url("https://res.cloudinary.com/nicodevs/image/upload/v1667414581/nuxtnation/JOIN_NUXT_NATION/bg-mobile.png");
  }
  
  @media (min-width: 768px) {
    #bb-banner.JOIN_NUXT_NATION .bb-background {
      background-image: url("https://res.cloudinary.com/nicodevs/image/upload/v1667414581/nuxtnation/JOIN_NUXT_NATION/bg-tablet.png");
    }
  }
  
  @media (min-width: 1280px) {
    #bb-banner.JOIN_NUXT_NATION .bb-background {
      background-image: url("https://res.cloudinary.com/nicodevs/image/upload/v1667414581/nuxtnation/JOIN_NUXT_NATION/bg-desktop.png");
    }
  
    #bb-banner.JOIN_NUXT_NATION .bb-logo {
      background-image: url("https://res.cloudinary.com/nicodevs/image/upload/v1667414581/nuxtnation/JOIN_NUXT_NATION/logo.svg");
      width: 152px;
    }
  }
  
  /*
  EXTRA STYLES FOR AFFILIATES
  **********************************************************************/
  
  /* Nuxt Website */
  
  html.has-bb-banner.nuxtjs_org .d-header,
  html.has-bb-banner.nuxtjs_org .d-header-home {
    top: 72px;
  }
  
  html.has-bb-banner.nuxtjs_org .top-header {
    top: calc(var(--header-height) + 72px);
  }
  
  /* Nuxt 3 Website */
  
  html.has-bb-banner.v3_nuxtjs_org header {
    top: 72px;
  }
  
  html.has-bb-banner.v3_nuxtjs_org .top-header {
    top: calc(var(--header-height) + 72px);
  }
  
  @media (min-width: 1024px) {
    html.has-bb-banner.v3_nuxtjs_org .lg\\:top-header {
      top: calc(var(--header-height) + 72px);
    }
  }
  `
  
  try {
    window.BitterBrainsBanner.init()
  } catch (e) {
    console.warn('Error when trying to render top banner')
  }
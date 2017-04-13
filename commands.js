(() => {
  const escapeKeyCode = 27
  const enterKeyCode = 13

  const defaults = {
    enabled: true,
    launchKey: '~',
    fontFamily: 'Monaco, monospace',
    onCommand: (command) => {}
  }

  class Commands {
    constructor(options) {
      this.options = Object.assign({}, defaults, options)
    }

    render() {
      this.el = document.createElement('commands')

      this.inputEl = document.createElement('input')
      this.el.appendChild(this.inputEl)

      this.inputEl.setAttribute('type', 'text')
      this.inputEl.setAttribute('spellcheck', 'false')
      this.inputEl.setAttribute('autocomplete', 'false')

      const inputStyle = document.createElement('style')
      this.el.appendChild(inputStyle)

      inputStyle.innerHTML = `
        commands:not([open]) {
          display: none;
        }

        commands > input {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
          font-size: 21px;
          width: 20em;
          height: 1.5em;
          border: 0;
          font-family: ${ this.options.fontFamily };
          padding: .6em 1em;
          color: #fff;
          background: rgba(0, 0, 0, .8);
          z-index: 1000;
        }

        commands > input::selection {
          background: rgba(255, 255, 255, .3);
        }

        commands > input:focus {
          outline: none;
        }
      `

      document.body.addEventListener('keypress', (e) => {
        if (document.activeElement === document.body && e.key === this.options.launchKey) {
          this.open()
          e.preventDefault()
        }
      })

      document.body.addEventListener('keydown', (e) => {
        if (e.keyCode === escapeKeyCode) {
          this.emptyInput()
          this.close()
        }
      })

      this.inputEl.addEventListener('keydown', (e) => {
        if (e.keyCode === escapeKeyCode) {
          this.emptyInput()
          this.close()
        }
      })

      this.inputEl.addEventListener('keypress', (e) => {
        if (e.keyCode === enterKeyCode) {
          this.options.onCommand(this.inputEl.value)
          this.emptyInput()
          this.close()
        }
      })

      return this
    }

    open() {
      if (this.options.enabled) {
        this.el.setAttribute('open', '')
        this.inputEl.focus()
      }
    }

    close() {
      this.el.removeAttribute('open')
    }

    enable() {
      this.options.enabled = true
    }

    disable() {
      this.options.enabled = false
      this.close()
    }

    emptyInput() {
      this.inputEl.value = ''
    }
  }

  if (window.module && window.module.exports) {
    window.module.exports = Commands
  } else {
    window.Commands = Commands
  }
})()

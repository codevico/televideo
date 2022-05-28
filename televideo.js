(function () {

    var televideo = {}

    televideo.wrapper = document.querySelector('.tv-screen-wrapper')
    televideo.screen = null

    televideo.page_title = null

    televideo.elements = [
        /*{
            title: 'Titolo di prova',
            subtitle: 'Sottotitolo di prova',
            page_index: 100,
            onclick: function() { console.log('clicked!') }
        }*/
    ]

    televideo.init = function(target) {

        if (target) this.set_wrapper(target)

        this.wrapper.innerHTML = ''

        let screen = document.createElement('div')
        screen.classList.add('tv-screen')

        this.wrapper.append(screen)
        this.screen = screen

    }

    televideo.set_wrapper = function(target) {

        this.wrapper = target

    }

    televideo.add_element = function(title, subtitle, page_index, onclick) {

        this.elements.push({title, subtitle, page_index, onclick})

    }

    televideo.get_header_title = function() {

        return 'TELEVIDEO ' + this.get_formatted_date()

    }

    televideo.get_formatted_date = function() {

        // Sa 28 Mag 14:31:27
        let now = new Date()
        return now.toLocaleString()

    }

    televideo.render = function(target) {

        this.screen.innerHTML = ''
        let _this = this

        let el_html_header = document.createElement('div')
        el_html_header.classList.add('tv-row')
        el_html_header.classList.add('tv-header')
        
        let el_html_header_left = document.createElement('div')
        el_html_header_left.classList.add('tv-green')
        el_html_header_left.innerText = '100.1'
        el_html_header.append(el_html_header_left)

        let el_html_header_right = document.createElement('div')
        el_html_header_right.classList.add('tv-right')
        el_html_header_right.innerText = this.get_header_title()
        el_html_header.append(el_html_header_right)

        this.screen.append(el_html_header)

        if (this.page_title) {

            let el_html_page_title = document.createElement('div')
            el_html_page_title.classList.add('tv-page-title')

            let el_html_page_title_p = document.createElement('p')
            el_html_page_title_p.innerText = this.page_title

            el_html_page_title.append(el_html_page_title_p)
            _this.screen.append(el_html_page_title)

        }

        this.elements.forEach(function(element) {

            let el_html = document.createElement('div')
            el_html.classList.add('tv-column')
            el_html.classList.add('tv-element')

            let el_html_title = document.createElement('div')
            el_html_title.classList.add('tv-row')
            el_html_title.classList.add('tv-uppercase')
            el_html_title.innerText = element.title
            el_html.append(el_html_title)

            let el_html_subtitle = document.createElement('div')
            el_html_subtitle.classList.add('tv-row')
            el_html_subtitle.classList.add('tv-subtitle')

            let el_html_green = document.createElement('div')
            el_html_green.classList.add('tv-green')
            el_html_green.innerText = element.subtitle
            el_html_subtitle.append(el_html_green)

            if (element.page_index) {
                let el_html_index = document.createElement('div')
                el_html_index.classList.add('tv-yellow')
                el_html_index.classList.add('tv-right')
                el_html_index.innerText = element.page_index
                el_html_subtitle.append(el_html_index)
            }

            el_html.append(el_html_subtitle)
            _this.screen.append(el_html)

            if (element.onclick) {
                el_html_subtitle.addEventListener('click', element.onclick)
            }

        })

    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = televideo
    } else if (typeof define === 'function' && define.amd) {
        define(module)
    } else {
        window.televideo = televideo
    }

}())
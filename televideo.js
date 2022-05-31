(function () {

    var televideo = {}

    televideo.wrapper = document.querySelector('.tv-screen-wrapper')
    televideo.screen = null

    televideo.pages = []
    televideo.selected_page = null

    televideo.init = function(options) {

        if (options.target) this.set_wrapper(options.target)

        if (options.pages) {

            this.pages = options.pages
            if (window.location.hash) {
                let preselected_index = parseInt(window.location.hash.replace('#', ''))
                if (!isNaN(preselected_index)) {
                    let preselected_page = this.find_page(preselected_index)
                    if (preselected_page) {
                        this.selected_page = preselected_page
                    }
                }
            }            
            if (this.selected_page === null) this.selected_page = this.pages[0]

        }

        this.wrapper.innerHTML = ''

        let screen = document.createElement('div')
        screen.classList.add('tv-screen')

        this.wrapper.append(screen)
        this.screen = screen

        let _this = this
        window.addEventListener('hashchange', function() {
            _this.select_page_by_index(parseInt(window.location.hash.replace('#', '')), false)
        })

    }

    televideo.set_wrapper = function(target) {

        this.wrapper = target
        this.wrapper.classList.add('tv-screen-wrapper')

    }

    televideo.add_element = function(title, subtitle, page_index, onclick) {

        this.elements.push({title, subtitle, page_index, onclick})

    }

    televideo.get_header_title = function() {

        let now = new Date()
        return 'TELEVIDEO <span class="tv-header-date">' +
            this.get_day_of_week(now) + ' ' +
            now.getDate() + ' ' +
            this.get_month(now) + ' ' +
            this.get_formatted_hour(now.getHours()) + ':' + this.get_formatted_hour(now.getMinutes()) + ':' + this.get_formatted_hour(now.getSeconds()) +
            '</span>'

    }

    televideo.render = function(target) {

        this.screen.innerHTML = ''

        let el_html_header = document.createElement('div')
        el_html_header.classList.add('tv-row')
        el_html_header.classList.add('tv-header')
        
        let el_html_header_left = document.createElement('div')
        el_html_header_left.classList.add('tv-green')
        el_html_header_left.innerText = this.selected_page ? (this.selected_page.page_index + '.0') : 100.0
        el_html_header.append(el_html_header_left)

        let el_html_header_right = document.createElement('div')
        el_html_header_right.classList.add('tv-right')
        el_html_header_right.innerHTML = this.get_header_title()
        el_html_header.append(el_html_header_right)

        this.screen.append(el_html_header)

        if (this.selected_page) this.render_page(this.selected_page)

        let el_html_footer = document.createElement('div')
        el_html_footer.classList.add('tv-footer')
        this.screen.append(el_html_footer)

    }

    televideo.select_page = function(page) {

        if (this.selected_page === null || this.selected_page.page_index !== page.page_index) {
            window.location.hash = page.page_index
            this.selected_page = page
            this.render()
        }

    }

    televideo.select_page_by_index = function(page_index) {

        let page_to_select = this.find_page(page_index)

        if (page_to_select) {
            this.select_page(page_to_select)
        }

    }

    televideo.find_page = function(page_index) {

        return this.pages.find(function(page) { return page.page_index === page_index })

    }

    televideo.render_page = function(page) {

        let _this = this

        if (page.page_title) {

            let el_html_page_title = document.createElement('div')
            el_html_page_title.classList.add('tv-page-title')

            let el_html_page_title_p = document.createElement('p')
            el_html_page_title_p.innerText = page.page_title

            el_html_page_title.append(el_html_page_title_p)
            _this.screen.append(el_html_page_title)

        }

        page.elements.forEach(function(element) {

            let el_html = document.createElement('div')
            el_html.classList.add('tv-column')
            el_html.classList.add('tv-element')

            if (element.type === 'link') {

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

                if (element.onclick) {
                    el_html_subtitle.addEventListener('click', element.onclick)
                } else {
                    el_html_subtitle.addEventListener('click', function() { _this.select_page_by_index(element.page_index) })
                }


            } else if (element.type === 'paragraph') {

                let el_html_paragraph = document.createElement('span')
                el_html_paragraph.classList.add('tv-paragraph')
                el_html_paragraph.innerText = element.text
                el_html.append(el_html_paragraph)

            }

            _this.screen.append(el_html)
        })

    }

    televideo.get_formatted_date = function() {

        // Sa 28 Mag 14:31:27
        let now = new Date()
        return now.toLocaleString()

    }

    televideo.get_day_of_week = function(date) {
        switch (date.getDay()) {
            case 0:
                return 'Do'
            case 1:
                return 'Lu'
            case 2:
                return 'Ma'
            case 3:
                return 'Me'
            case 4:
                return 'Gi'
            case 5:
                return 'Ve'
        }
        return 'Sa'
    }

    televideo.get_month = function(date) {
        switch (date.getMonth()) {
            case 0:
                return 'Gen'
            case 1:
                return 'Feb'
            case 2:
                return 'Mar'
            case 3:
                return 'Apr'
            case 4:
                return 'Mag'
            case 5:
                return 'Giu'
            case 6:
                return 'Lug'
            case 7:
                return 'Ago'
            case 8:
                return 'Set'
            case 9:
                return 'Ott'
            case 10:
                return 'Nov'
            case 11:
                return 'Dic'
        }
    }

    televideo.get_formatted_hour = function(number) {
        return (number < 10) ? ('0' + number) : number
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = televideo
    } else if (typeof define === 'function' && define.amd) {
        define(module)
    } else {
        window.televideo = televideo
    }

}())
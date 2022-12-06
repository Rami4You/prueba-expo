const theme = {
    colors: {
        text_primary: '#5D04AC',
        text_secondary: '#000000',
        text_tertiary: '#ffffff',
        text_error: '#d73a4a',
        text_success: '#2ea44f',
        text_warning: '#ffcc00',
        text_info: '#0366d6',
        text_light: '#f8f8f8',
        text_dark: '#24292e',
        text_muted: '#586069'
    },
    fontSizes: {
        body: 14,
        subheading: 18,
        heading: 24
    },
    fonts: {
        main: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'System'
        })
    },
    align: {
        center: 'center',
        left: 'left',
        right: 'right'
    }
}

export default theme;
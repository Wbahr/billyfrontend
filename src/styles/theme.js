const PALETTE = {
    primary: { //Red
        main: '#b51f2b', //Airline Red
        dark1: '#950f23', //Button Gradient 1
        dark2: '#db1633', //Button Gradient 2
    },
    secondary: { //Blue
        main: '#246696',
        contrastText: 'white'
    },
    grays: {
        light: '#f2f3f4',
        medium: '#bababa',
        dark: '#555555'
    }
}

//Place reusable bits of data here that can be referred to inline in styled`` sections, eg, ${props => props.theme.mainColorHover}
// The props will be accessible by any styled component located within a ThemeProvider wrapper
export const airlineRedTheme = {
    mainColor: '#DB1633',
    mainColorBlend: '#950f23',
    mainColorHover: '#B51029',
    buttonForegroundColor: 'white',
    buttonShadow: 'black',
    altButtonColor: '#003978',
    altButtonColorBlend: '#001d3d',
    backgroundImageUrl: 'https://www.airlinehyd.com/customer/aihyco/images/Home/CategoryBackground.jpg',
    sectionBackgroundImageUrl: 'https://www.airlinehyd.com/customer/aihyco/images/Headers/Basic_Background.png',
    fancyFontName: 'Proxima',
    fancyFontNameBold: 'ProximaBold',
    headingFont: 'Verdana',
    textFont: '',
    backgroundColor: '#535353',
    accents: {
        primary: PALETTE.primary.main
    },
    buttons: {
        primary: {
            backgroundGradientLeft: PALETTE.primary.dark1,
            backgroundGradientRight: PALETTE.primary.dark2,
            textColor: PALETTE.grays.light,
        },
        secondary: {
            backgroundColor: PALETTE.secondary.main,
            textColor: PALETTE.grays.light
        }
    },
    backgrounds: {
        blue: {
            main: PALETTE.secondary.main,
            contrastText: PALETTE.grays.light
        }
    }
}


const plugin = require('tailwindcss/plugin'); // eslint-disable-line

const getMaxWidth = (ch, fontSize, baseFontSize = 16) => {
  const chToRemRatio = (0.6 * fontSize) / baseFontSize;
  return `${ch * chToRemRatio}rem`;
};

module.exports = plugin(function ({ addComponents }) {
  addComponents({
    '.prose, .format': {
      color: 'var(--theme-text-primary)',

      // set a base for em sized elements
      fontFamily: 'var(--typography-sm-body-md-font-family)',
      fontWeight: 'var(--typography-sm-body-md-fontweight)',
      letterSpacing: 'var(--typography-sm-body-md-letterspacing)',
      fontSize: 'var(--typography-md-body-md-fontsize)',
      lineHeight: 'var(--typography-md-body-md-lineheight)'
    },

    '.prose:not(.responsive, .responsive *)': {
      maxWidth: getMaxWidth(65, 16)
    },

    '.prose.responsive :where(:not(.not-prose, .not-prose *))': {
      fontSize: 'var(--typography-sm-body-md-fontsize)',
      lineHeight: 'var(--typography-sm-body-md-lineheight)',
      maxWidth: getMaxWidth(65, 14),

      '@screen md': {
        fontSize: 'var(--typography-md-body-md-fontsize)',
        lineHeight: 'var(--typography-md-body-md-lineheight)',
        maxWidth: getMaxWidth(65, 16)
      },
      '@screen lg': {
        fontSize: 'var(--typography-lg-body-md-fontsize)',
        lineHeight: 'var(--typography-lg-body-md-lineheight)',
        maxWidth: getMaxWidth(65, 18)
      },
      '@screen xl': {
        fontSize: 'var(--typography-xl-body-md-fontsize)',
        lineHeight: 'var(--typography-xl-body-md-lineheight)',

        maxWidth: getMaxWidth(65, 20)
      }
    },

    /*
        Display 
    */

    '.display': {
      color: 'var(--theme-text-primary)',
      fontFamily: 'var(--typography-sm-display-font-family)',
      fontWeight: 'var(--typography-sm-display-fontweight)',
      letterSpacing: 'var(--typography-sm-display-letterspacing)',

      // Default to md (static)
      fontSize: 'var(--typography-md-display-fontsize)',
      lineHeight: 'var(--typography-md-display-lineheight)'
    },

    '.display:where(.responsive, .responsive *)': {
      fontSize: 'var(--typography-sm-display-fontsize)',
      lineHeight: 'var(--typography-sm-display-lineheight)',

      '@screen md': {
        fontSize: 'var(--typography-md-display-fontsize)',
        lineHeight: 'var(--typography-md-display-lineheight)'
      },
      '@screen lg': {
        fontSize: 'var(--typography-lg-display-fontsize)',
        lineHeight: 'var(--typography-lg-display-lineheight)'
      },
      '@screen xl': {
        fontSize: 'var(--typography-xl-display-fontsize)',
        lineHeight: 'var(--typography-xl-display-lineheight)'
      }
    },

    '.display.format': {
      marginTop: '0',
      marginBottom: 'var(--spacing-lg-em)'
    },

    '.display.format + *': {
      marginTop: 0
    },

    '.display:has(+ .subhead)': {
      marginBottom: 'var(--spacing-xxs-em)'
    },

    /* 
        Headline
    */

    '.headline, .prose h1:where(:not(.not-prose, .not-prose *))': {
      color: 'var(--theme-text-primary)',
      fontFamily: 'var(--typography-sm-headline-font-family)',
      fontWeight: 'var(--typography-sm-headline-fontweight)',
      letterSpacing: 'var(--typography-sm-headline-letterspacing)',

      // Default to md (static)
      fontSize: 'var(--typography-md-headline-fontsize)',
      lineHeight: 'var(--typography-md-headline-lineheight)'
    },

    '.headline:where(.responsive, .responsive *), .prose h1:where(.responsive, .responsive *):not(.not-prose, .not-prose *)':
      {
        fontSize: 'var(--typography-sm-headline-fontsize)',
        lineHeight: 'var(--typography-sm-headline-lineheight)',
        '@screen md': {
          fontSize: 'var(--typography-md-headline-fontsize)',
          lineHeight: 'var(--typography-md-headline-lineheight)'
        },
        '@screen lg': {
          fontSize: 'var(--typography-lg-headline-fontsize)',
          lineHeight: 'var(--typography-lg-headline-lineheight)'
        },
        '@screen xl': {
          fontSize: 'var(--typography-xl-headline-fontsize)',
          lineHeight: 'var(--typography-xl-headline-lineheight)'
        }
      },

    '.headline.format, .prose h1:where(:not(.not-prose, .not-prose *))': {
      marginTop: 0,
      marginBottom: 'var(--spacing-sm-em)'
    },

    '.headline.format + *, .prose h1 + *:where(:not(.not-prose, .not-prose *))': {
      marginTop: 0
    },

    '.headline.format:has(+ .subhead)': {
      marginBottom: '0.1em'
    },

    /* 
        Subhead
    */

    '.subhead': {
      color: 'var(--theme-text-secondary)',
      fontFamily: 'var(--typography-sm-subhead-font-family)',
      fontWeight: 'var(--typography-sm-subhead-fontweight)',
      letterSpacing: 'var(--typography-sm-subhead-letterspacing)',

      // Default to md (static)
      fontSize: 'var(--typography-md-subhead-fontsize)',
      lineHeight: 'var(--typography-md-subhead-lineheight)'
    },

    '.subhead:where(.responsive, .responsive *)': {
      fontSize: 'var(--typography-sm-subhead-fontsize)',
      lineHeight: 'var(--typography-sm-subhead-lineheight)',

      '@screen md': {
        fontSize: 'var(--typography-md-subhead-fontsize)',
        lineHeight: 'var(--typography-md-subhead-lineheight)'
      },
      '@screen lg': {
        fontSize: 'var(--typography-lg-subhead-fontsize)',
        lineHeight: 'var(--typography-lg-subhead-lineheight)'
      },
      '@screen xl': {
        fontSize: 'var(--typography-xl-subhead-fontsize)',
        lineHeight: 'var(--typography-xl-subhead-lineheight)'
      }
    },

    '.subhead.format': {
      marginTop: '0',
      marginBottom: 'var(--spacing-md-em)'
    },

    '.subhead.format + *': {
      marginTop: 0
    },

    /*
        Title Large 
    */

    '.title-lg, .prose h2:where(:not(.not-prose, .not-prose *))': {
      color: 'var(--theme-text-primary)',
      fontFamily: 'var(--typography-sm-title-lg-font-family)',
      fontWeight: 'var(--typography-sm-title-lg-fontweight)',
      letterSpacing: 'var(--typography-sm-title-lg-letterspacing)',

      // Default to md (static)
      fontSize: 'var(--typography-md-title-lg-fontsize)',
      lineHeight: 'var(--typography-md-title-lg-lineheight)'
    },

    '.title-lg:where(.responsive, .responsive *), .prose h2:where(.responsive, .responsive *):not(.not-prose, .not-prose *)':
      {
        fontSize: 'var(--typography-sm-title-lg-fontsize)',
        lineHeight: 'var(--typography-sm-title-lg-lineheight)',

        '@screen md': {
          fontSize: 'var(--typography-md-title-lg-fontsize)',
          lineHeight: 'var(--typography-md-title-lg-lineheight)'
        },
        '@screen lg': {
          fontSize: 'var(--typography-lg-title-lg-fontsize)',
          lineHeight: 'var(--typography-lg-title-lg-lineheight)'
        },
        '@screen xl': {
          fontSize: 'var(--typography-xl-title-lg-fontsize)',
          lineHeight: 'var(--typography-xl-title-lg-lineheight)'
        }
      },

    '.title-lg.format, .prose h2:where(:not(.not-prose, .not-prose *))': {
      marginTop: 'var(--spacing-3xl-em)',
      marginBottom: 'var(--spacing-md-em)'
    },

    '.title-lg.format + *, .prose h2 + *:where(:not(.not-prose, .not-prose *))': {
      marginTop: 0
    },

    '.title-lg.format:has(+ .subtitle)': {
      marginBottom: '0.1em'
    },

    /*
        Title Medium 
    */

    '.title-md, .prose h3:where(:not(.not-prose, .not-prose *))': {
      color: 'var(--theme-text-primary)',
      fontFamily: 'var(--typography-sm-title-md-font-family)',
      fontWeight: 'var(--typography-sm-title-md-fontweight)',
      letterSpacing: 'var(--typography-sm-title-md-letterspacing)',

      // Default to md (static)
      fontSize: 'var(--typography-md-title-md-fontsize)',
      lineHeight: 'var(--typography-md-title-md-lineheight)'
    },

    '.title-md:where(.responsive, .responsive *), .prose h3:where(.responsive, .responsive *):not(.not-prose, .not-prose *)':
      {
        fontSize: 'var(--typography-sm-title-md-fontsize)',
        lineHeight: 'var(--typography-sm-title-md-lineheight)',

        '@screen md': {
          fontSize: 'var(--typography-md-title-md-fontsize)',
          lineHeight: 'var(--typography-md-title-md-lineheight)'
        },
        '@screen lg': {
          fontSize: 'var(--typography-lg-title-md-fontsize)',
          lineHeight: 'var(--typography-lg-title-md-lineheight)'
        },
        '@screen xl': {
          fontSize: 'var(--typography-xl-title-md-fontsize)',
          lineHeight: 'var(--typography-xl-title-md-lineheight)'
        }
      },

    '.title-md.format, .prose h3:where(:not(.not-prose, .not-prose *))': {
      marginTop: 'var(--spacing-xl-em)',
      marginBottom: 'var(--spacing-xs-em)'
    },

    '.title-md.format + *, .prose h3 + *:where(:not(.not-prose, .not-prose *))': {
      marginTop: 0
    },

    '.title-md.format:has(+ .subtitle)': {
      marginBottom: '0.1em'
    },

    /*
        Title Small 
    */

    '.title-sm, .prose h4:where(:not(.not-prose, .not-prose *))': {
      color: 'var(--theme-text-primary)',
      fontFamily: 'var(--typography-sm-title-sm-font-family)',
      fontWeight: 'var(--typography-sm-title-sm-fontweight)',
      letterSpacing: 'var(--typography-sm-title-sm-letterspacing)',

      // Default to md (static)
      fontSize: 'var(--typography-md-title-sm-fontsize)',
      lineHeight: 'var(--typography-md-title-sm-lineheight)'
    },

    '.title-sm:where(.responsive, .responsive *), .prose h4:where(.responsive, .responsive *):not(.not-prose, .not-prose *)':
      {
        fontSize: 'var(--typography-sm-title-sm-fontsize)',
        lineHeight: 'var(--typography-sm-title-sm-lineheight)',

        '@screen md': {
          fontSize: 'var(--typography-md-title-sm-fontsize)',
          lineHeight: 'var(--typography-md-title-sm-lineheight)'
        },
        '@screen lg': {
          fontSize: 'var(--typography-lg-title-sm-fontsize)',
          lineHeight: 'var(--typography-lg-title-sm-lineheight)'
        },
        '@screen xl': {
          fontSize: 'var(--typography-xl-title-sm-fontsize)',
          lineHeight: 'var(--typography-xl-title-sm-lineheight)'
        }
      },

    '.title-sm.format, .prose h4:where(:not(.not-prose, .not-prose *))': {
      marginTop: 'var(--spacing-xl-em)',
      marginBottom: 'var(--spacing-xs-em)'
    },

    '.title-sm.format + *, .prose h4 + *:where(:not(.not-prose, .not-prose *))': {
      marginTop: 0
    },

    '.title-sm.format:has(+ .subtitle)': {
      marginBottom: '0.1em'
    },

    /*
        Subtitle 
    */

    '.subtitle': {
      color: 'var(--theme-text-secondary)',
      fontFamily: 'var(--typography-sm-subtitle-font-family)',
      fontWeight: 'var(--typography-sm-subtitle-fontweight)',
      letterSpacing: 'var(--typography-sm-subtitle-letterspacing)',

      fontSize: 'var(--typography-md-subtitle-fontsize)',
      lineHeight: 'var(--typography-md-subtitle-lineheight)'
    },

    '.subtitle:where(.responsive, .responsive *)': {
      fontSize: 'var(--typography-sm-subtitle-fontsize)',
      lineHeight: 'var(--typography-sm-subtitle-lineheight)',
      '@screen md': {
        fontSize: 'var(--typography-md-subtitle-fontsize)',
        lineHeight: 'var(--typography-md-subtitle-lineheight)'
      },
      '@screen lg': {
        fontSize: 'var(--typography-lg-subtitle-fontsize)',
        lineHeight: 'var(--typography-lg-subtitle-lineheight)'
      },
      '@screen xl': {
        fontSize: 'var(--typography-xl-subtitle-fontsize)',
        lineHeight: 'var(--typography-xl-subtitle-lineheight)'
      }
    },

    '.subtitle.format': {
      marginTop: '0',
      marginBottom: 'var(--spacing-md-em)'
    },

    '.subtitle.format + *': {
      marginTop: 0
    },

    /*
        Body Large 
    */

    '.body-lg': {
      color: 'var(--theme-text-primary)',
      fontFamily: 'var(--typography-sm-body-lg-font-family)',
      fontWeight: 'var(--typography-sm-body-lg-fontweight)',
      letterSpacing: 'var(--typography-sm-body-lg-letterspacing)',

      fontSize: 'var(--typography-md-body-lg-fontsize)',
      lineHeight: 'var(--typography-md-body-lg-lineheight)'
    },

    '.body-lg:where(.responsive, .responsive *)': {
      fontSize: 'var(--typography-sm-body-lg-fontsize)',
      lineHeight: 'var(--typography-sm-body-lg-lineheight)',

      '@screen md': {
        fontSize: 'var(--typography-md-body-lg-fontsize)',
        lineHeight: 'var(--typography-md-body-lg-lineheight)'
      },
      '@screen lg': {
        fontSize: 'var(--typography-lg-body-lg-fontsize)',
        lineHeight: 'var(--typography-lg-body-lg-lineheight)'
      },
      '@screen xl': {
        fontSize: 'var(--typography-xl-body-lg-fontsize)',
        lineHeight: 'var(--typography-xl-body-lg-lineheight)'
      }
    },

    /*
        Body Medium 
    */

    '.body-md': {
      color: 'var(--theme-text-primary)',
      fontFamily: 'var(--typography-sm-body-md-font-family)',
      fontWeight: 'var(--typography-sm-body-md-fontweight)',
      letterSpacing: 'var(--typography-sm-body-md-letterspacing)',

      fontSize: 'var(--typography-md-body-md-fontsize)',
      lineHeight: 'var(--typography-md-body-md-lineheight)'
    },

    '.body-md:where(.responsive, .responsive *)': {
      fontSize: 'var(--typography-sm-body-md-fontsize)',
      lineHeight: 'var(--typography-sm-body-md-lineheight)',

      '@screen md': {
        fontSize: 'var(--typography-md-body-md-fontsize)',
        lineHeight: 'var(--typography-md-body-md-lineheight)'
      },
      '@screen lg': {
        fontSize: 'var(--typography-lg-body-md-fontsize)',
        lineHeight: 'var(--typography-lg-body-md-lineheight)'
      },
      '@screen xl': {
        fontSize: 'var(--typography-xl-body-md-fontsize)',
        lineHeight: 'var(--typography-xl-body-md-lineheight)'
      }
    },

    /*
        Body Small 
    */

    '.body-sm': {
      color: 'var(--theme-text-primary)',
      fontFamily: 'var(--typography-sm-body-sm-font-family)',
      fontWeight: 'var(--typography-sm-body-sm-fontweight)',
      letterSpacing: 'var(--typography-sm-body-sm-letterspacing)',

      fontSize: 'var(--typography-md-body-sm-fontsize)',
      lineHeight: 'var(--typography-md-body-sm-lineheight)'
    },

    '.body-sm:where(.responsive, .responsive *)': {
      fontSize: 'var(--typography-sm-body-sm-fontsize)',
      lineHeight: 'var(--typography-sm-body-sm-lineheight)',

      '@screen md': {
        fontSize: 'var(--typography-md-body-md-fontsize)',
        lineHeight: 'var(--typography-md-body-md-lineheight)'
      },
      '@screen lg': {
        fontSize: 'var(--typography-lg-body-md-fontsize)',
        lineHeight: 'var(--typography-lg-body-md-lineheight)'
      },
      '@screen xl': {
        fontSize: 'var(--typography-xl-body-md-fontsize)',
        lineHeight: 'var(--typography-xl-body-md-lineheight)'
      }
    },

    /*
        Paragraph 
    */

    'p.format, .prose p:where(:not(.not-prose, .not-prose *))': {
      marginTop: 'var(--spacing-md-em)',
      marginBottom: 'var(--spacing-md-em)'
    },

    '.prose p:where([class~="lead"]):not(.not-prose, .not-prose *)': {
      color: 'var(--theme-text-secondary)',
      marginTop: 'var(--spacing-lg-em)',
      marginBottom: 'var(--spacing-lg-em)',
      fontFamily: 'var(--typography-sm-body-lg-font-family)',
      fontWeight: 'var(--typography-sm-body-lg-fontweight)',
      letterSpacing: 'var(--typography-sm-body-lg-letterspacing)',

      fontSize: 'var(--typography-md-body-lg-fontsize)',
      lineHeight: 'var(--typography-md-body-lg-lineheight)'
    },

    '.prose.responsive p:where([class~="lead"]):not(.not-prose, .not-prose *)': {
      fontSize: 'var(--typography-sm-body-lg-fontsize)',
      lineHeight: 'var(--typography-sm-body-lg-lineheight)',
      '@screen md': {
        fontSize: 'var(--typography-md-body-lg-fontsize)',
        lineHeight: 'var(--typography-md-body-lg-lineheight)'
      },
      '@screen lg': {
        fontSize: 'var(--typography-lg-body-lg-fontsize)',
        lineHeight: 'var(--typography-lg-body-lg-lineheight)'
      },
      '@screen xl': {
        fontSize: 'var(--typography-xl-body-lg-fontsize)',
        lineHeight: 'var(--typography-xl-body-lg-lineheight)'
      }
    },

    /*
        Caption/ Figcaption
    */

    '.caption, .prose figcaption:where(:not(.not-prose, .not-prose *))': {
      color: 'var(--theme-text-secondary)',
      fontFamily: 'var(--typography-sm-caption-font-family)',
      fontWeight: 'var(--typography-sm-caption-fontweight)',
      letterSpacing: 'var(--typography-sm-caption-letterspacing)',

      fontSize: 'var(--typography-md-caption-fontsize)',
      lineHeight: 'var(--typography-md-caption-lineheight)'
    },

    '.caption:where(.responsive, .responsive *), .prose figcaption:where(.responsive, .responsive *):not(.not-prose, .not-prose *)':
      {
        fontSize: 'var(--typography-sm-caption-fontsize)',
        lineHeight: 'var(--typography-sm-caption-lineheight)',
        '@screen md': {
          fontSize: 'var(--typography-md-caption-fontsize)',
          lineHeight: 'var(--typography-md-caption-lineheight)'
        },
        '@screen lg': {
          fontSize: 'var(--typography-lg-caption-fontsize)',
          lineHeight: 'var(--typography-lg-caption-lineheight)'
        },
        '@screen xl': {
          fontSize: 'var(--typography-xl-caption-fontsize)',
          lineHeight: 'var(--typography-xl-caption-lineheight)'
        }
      },

    /* 
        Links
    */

    'a.format, .prose a:not(:where(:is(h2, h3, h4) *)):where(:not(.not-prose, .not-prose *))': {
      color: 'var(--theme-action-primary)',
      fontWeight: 'var(--font-weight-semibold)',
      textDecoration: 'underline',
      textUnderlineOffset: '2px',
      textDecorationColor: 'var(--theme-action-primary)',
      textDecorationThickness: '1px',
      '& code': {
        fontWeight: 'var(--font-weight-semibold)'
      }
    },

    'a.format:hover, .prose a:hover:where(:not(.not-prose, .not-prose *))': {
      textDecorationThickness: '2px'
    },

    'hr.format, .prose hr:where(:not(.not-prose, .not-prose *))': {
      borderColor: 'var(--theme-ui-border-secondary)',
      borderTopWidth: '1px',
      marginTop: 'var(--spacing-5xl-em)',
      marginBottom: 'var(--spacing-5xl-em)'
    },

    /*
        Image, Picture, Video, Figure
    */

    'img.format, .prose img:where(:not(.not-prose, .not-prose *)), .prose.responsive img:where(:not(.not-prose, .not-prose *))':
      {
        marginTop: 'var(--spacing-3xl-em)',
        marginBottom: 'var(--spacing-3xl-em)',
        maxWidth: '100%'
      },

    'picture.format, .prose picture:where(:not(.not-prose, .not-prose *)), .prose.responsive picture:where(:not(.not-prose, .not-prose *))':
      {
        display: 'block',
        marginTop: 'var(--spacing-3xl-em)',
        marginBottom: 'var(--spacing-3xl-em)',
        maxWidth: '100%'
      },

    'video.format, .prose video:where(:not(.not-prose, .not-prose *)), .prose.responsive video:where(:not(.not-prose, .not-prose *))':
      {
        marginTop: 'var(--spacing-3xl-em)',
        marginBottom: 'var(--spacing-3xl-em)',
        maxWidth: '100%'
      },

    'figure.format, .prose figure:where(:not(.not-prose, .not-prose *))': {
      marginTop: 'var(--spacing-3xl-em)',
      marginBottom: 'var(--spacing-3xl-em)'
    },

    'figure.format > *, .prose figure > *:where(:not(.not-prose, .not-prose *))': {
      marginTop: 0,
      marginBottom: 0
    },

    '.caption.format, .prose figcaption:where(:not(.not-prose, .not-prose *))': {
      color: 'var(--theme-text-secondary)',
      marginTop: 'var(--spacing-sm-em)'
    },

    'picture.format > img, .prose picture > img:where(:not(.not-prose, .not-prose *))': {
      marginTop: 0,
      marginBottom: 0
    },

    /*
        Lists
    */

    'ul.format, .prose ul:where(:not(.not-prose, .not-prose *))': {
      marginTop: 'var(--spacing-lg-em)',
      marginBottom: 'var(--spacing-lg-em)',
      paddingInlineStart: 'var(--spacing-lg-em)',
      listStyleType: 'disc'
    },

    'ul.format li, .prose ul li:where(:not(.not-prose, .not-prose *))': {
      paddingLeft: 'var(--spacing-md-em)'
    },

    'ul.format li + li, .prose ul li + li:where(:not(.not-prose, .not-prose *))': {
      marginTop: 'var(--spacing-md-em)'
    },

    'ul.format li::marker, .prose ul li:where(:not(.not-prose, .not-prose *))::marker': {
      color: 'var(--theme-text-secondary)'
    },

    'ol.format, .prose ol:where(:not(.not-prose, .not-prose *))': {
      listStyleType: 'decimal',
      marginTop: 'var(--spacing-lg-em)',
      marginBottom: 'var(--spacing-lg-em)',
      paddingInlineStart: 'var(--spacing-lg-em)'
    },

    '.prose ol[type="A"]:where(:not(.not-prose, .not-prose *))': {
      listStyleType: 'upper-alpha'
    },

    '.prose ol[type="a"]:where(:not(.not-prose, .not-prose *))': {
      listStyleType: 'lower-alpha'
    },

    '.prose ol[type="A s"]:where(:not(.not-prose, .not-prose *))': {
      listStyleType: 'upper-alpha'
    },

    '.prose ol[type="o s"]:where(:not(.not-prose, .not-prose *))': {
      listStyleType: 'lower-alpha'
    },

    '.prose ol[type="I"]:where(:not(.not-prose, .not-prose *))': {
      listStyleType: 'upper-roman'
    },

    '.prose ol[type="i"]:where(:not(.not-prose, .not-prose *))': {
      listStyleType: 'lower-roman'
    },

    '.prose ol[type="I s"]:where(:not(.not-prose, .not-prose *))': {
      listStyleType: 'upper-roman'
    },

    '.prose ol[type="i s"]:where(:not(.not-prose, .not-prose *))': {
      listStyleType: 'lower-roman'
    },

    '.prose ol[type="1"]:where(:not(.not-prose, .not-prose *))': {
      listStyleType: 'decimal'
    },

    '.format li, .prose li:where(:not(.not-prose, .not-prose *))': {
      marginTop: 'var(--spacing-sm-em)',
      marginBottom: 'var(--spacing-sm-em)'
    },

    'ol.format > li, .prose ol > li:where(:not(.not-prose, .not-prose *))': {
      paddingInlineStart: 'var(--spacing-xs-em)'
    },

    'ul.format > li, .prose ul > li:where(:not(.not-prose, .not-prose *))': {
      paddingInlineStart: 'var(--spacing-xs-em)'
    },

    'ul.format > li p, .prose ul > li p:where(:not(.not-prose, .not-prose *))': {
      marginTop: 'var(--spacing-sm-em)',
      marginBottom: 'var(--spacing-sm-em)'
    },

    '.ul.format > li > p:first-child, .prose ul > li > p:first-child:where(:not(.not-prose, .not-prose *))':
      {
        marginTop: 'var(--spacing-lg-em)'
      },

    'ul.format > li > p:last-child, .prose ul > li > p:last-child:where(:not(.not-prose, .not-prose *))':
      {
        marginBottom: 'var(--spacing-lg-em)'
      },

    'ol.format > li > p:first-child, .prose ol > li > p:first-child:where(:not(.not-prose, .not-prose *))':
      {
        marginTop: 'var(--spacing-lg-em)'
      },

    'ol.format > li > p:last-child, .prose ol > li > p:last-child:where(:not(.not-prose, .not-prose *))':
      {
        marginBottom: 'var(--spacing-lg-em)'
      },

    '.prose ul ul:where(:not(.not-prose, .not-prose *)), .prose  ul ol:where(:not(.not-prose, .not-prose *)), .prose  ol ul:where(:not(.not-prose, .not-prose *)), .prose  ol ol:where(:not(.not-prose, .not-prose *))':
      {
        marginTop: 'var(--spacing-sm-em)',
        marginBottom: 'var(--spacing-sm-em)'
      },

    'ul.format ul,  ul.format ol,  ol.format ul,  ol.format ol': {
      marginTop: 'var(--spacing-sm-em)',
      marginBottom: 'var(--spacing-sm-em)'
    },

    'dl.format, .prose dl:where(:not(.not-prose, .not-prose *))': {
      marginTop: 'var(--spacing-lg-em)',
      marginBottom: 'var(--spacing-lg-em)'
    },

    '.prose dd:where(:not(.not-prose, .not-prose *))': {
      marginTop: 'var(--spacing-xs-em)',
      paddingInlineStart: 'var(--spacing-xl-em)'
    },

    '.prose dt:where(:not(.not-prose, .not-prose *))': {
      color: 'var(--theme-text-primary)',
      fontWeight: 600,
      marginTop: 'var(--spacing-lg-em)'
    },

    /*
        BlockQuotes
    */

    'blockquote.format, .prose blockquote:where(:not(.not-prose, .not-prose *))': {
      color: 'var(--theme-text-secondary)',
      fontSize: 'var(--typography-md-body-lg-fontsize)',
      lineHeight: 'var(--typography-md-body-lg-lineheight)',

      borderInlineStartWidth: 'var(--spacing-xxs)',
      borderInlineStartColor: 'var(--global-color-static-brand)',
      quotes: `“ ” ‘ ’`,
      marginTop: 'var(--spacing-lg-em)',
      marginBottom: 'var(--spacing-lg-em)',
      paddingInlineStart: 'var(--spacing-md-em)'
    },

    'blockquote :where(.responsive, .responsive *), .prose blockquote :where( .responsive, .responsive *):not(.not-prose, .not-prose *, code)':
      {
        fontSize: 'var(--typography-sm-body-lg-fontsize)',
        lineHeight: 'var(--typography-sm-body-lg-lineheight)',

        '@screen md': {
          fontSize: 'var(--typography-md-body-lg-fontsize)',
          lineHeight: 'var(--typography-md-body-lg-lineheight)'
        },
        '@screen lg': {
          fontSize: 'var(--typography-lg-body-lg-fontsize)',
          lineHeight: 'var(--typography-lg-body-lg-lineheight)'
        },
        '@screen xl': {
          fontSize: 'var(--typography-xl-body-lg-fontsize)',
          lineHeight: 'var(--typography-xl-body-lg-lineheight)'
        }
      },

    'blockquote.format:before, .prose blockquote :where(p:first-of-type):not(:where(.not-prose, .not-prose *)):before':
      {
        content: 'open-quote'
      },

    'blockquote.format:after, .prose blockquote :where(p:last-of-type):not(:where(.not-prose, .not-prose *)):after':
      {
        content: 'close-quote'
      },

    /*
        Tables 
    */

    'table.format, .prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *))': {
      width: '100%',
      tableLayout: 'auto',
      marginTop: 'var(--spacing-3xl-em)',
      marginBottom: 'var(--spacing-3xl-em)',
      fontSize: '0.875em',
      lineHeight: 'var(--typography-sm-body-md-lineheight)'
    },

    'table.format thead, .prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *))':
      {
        borderBottomWidth: '1px',
        borderBottomColor: 'var(--theme-ui-border-primary)'
      },

    'table.format thead th, .prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *))':
      {
        color: 'var(--prose-headings)',
        fontWeight: 600,
        verticalAlign: 'bottom',
        paddingInlineEnd: 'var(--spacing-xs-em)',
        paddingBottom: 'var(--spacing-xs-em)',
        paddingInlineStart: 'var(--spacing-xs-em)'
      },

    'table.format tbody tr, .prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *))':
      {
        borderBottomWidth: '1px',
        borderBottomColor: 'var(--theme-ui-border-secondary)'
      },

    'table.format tbody tr:last-child, .prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *))':
      {
        borderBottomWidth: 0
      },

    'table.format tbody td, .prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *))':
      {
        verticalAlign: 'baseline'
      },

    'table.format tfoot, .prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *))':
      {
        borderTopWidth: '1px',
        borderTopColor: 'var(--theme-ui-border-primary)'
      },

    'table.format tfoot td, .prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *))':
      {
        verticalAlign: 'top'
      },

    'table.format th, table.format td, .prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *))':
      {
        textAlign: 'start'
      },

    'table.format thead th:first-child, .prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *))':
      {
        paddingInlineStart: 0
      },

    'table.format thead th:last-child, .prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *))':
      {
        paddingInlineEnd: 0
      },

    'table.format tbody td, table.format tfoot td, .prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *))':
      {
        paddingTop: 'var(--spacing-xs-em)',
        paddingInlineEnd: 'var(--spacing-xs-em)',
        paddingBottom: 'var(--spacing-xs-em)',
        paddingInlineStart: 'var(--spacing-xs-em)'
      },

    'table.format tbody td:first-child, table.format tfoot td:first-child, .prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *))':
      {
        paddingInlineStart: 0
      },

    'table.format tbody td:last-child,table.format tfoot td:last-child, .prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *))':
      {
        paddingInlineEnd: 0
      },

    /*
        CODE
    */

    '.format code, .prose code:where(:not(.not-prose, .not-prose *))': {
      fontFamily: 'monospace',
      padding: 'var(--spacing-xxs-em) var(--spacing-xs-em)',
      fontSize: 'var(--typography-body-sm)',
      backgroundColor: 'var(--theme-container-level-1)'
    },

    '.format code, .prose code:where(:not(.not-prose, .not-prose *)):before': {
      content: '`'
    },

    '.format code, .prose code:where(:not(.not-prose, .not-prose *)):after': {
      content: '`'
    }
  });
});

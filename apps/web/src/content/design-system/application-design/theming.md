---
title: Theming
description: Accessible themes respecting user preference
section: Application design
navLabel: Theming
---

## Principles

The system provides a single theme with two "modes" - **light** and **dark**. For legacy reasons the mode occasionally referenced as 'theme' even if it is not strictly true. For example the `ThemeSwitcher` component actually changes the `mode`.

### User preference

Both modes have been carefully considered to have accessible contrast levels. Offering users the ability to choose light or dark mode honours their preferences, which could be due to lighting conditions, accessibility requirements or simply their preferred choice.

### Modes

![An illustration of the different light and dark modes that can be applied to applications and components](/theming/mode-examples.png)

Modes are applied to applications as a whole, but can be overridden on a per component basis.

#### Light mode

We consider the light mode as the default. In this mode the use of semantic color design tokens will default to their light mode variant. Canvas and surface elements will default to light background.

In light mode the `<Header>`, `<Footer>`, `<Sidebar>` components stay in dark mode by default. This is to reinforce structure and brand recognition.

In certain scenarios these components can be styled in full light mode (as the sidebar for this documentation is)

#### Dark mode

In dark mode all components adopt their dark mode variants, contrast levels remain consistent, but color hues adapt to the dark surface elements.

## Practice

### Using Css

Assuming you are importing the relevant css files - [see the getting started section](/design-system/getting-started) you can then use css variables to style your application.

Refer to the documentation on [design tokens](http://localhost:5173/design-system/foundations/design-tokens#practice) for reference. All tokens listed are available as css variables:

```css
// token name
color-text-muted;

// css variable
--color-text-muted;

// variable application
.my-class: var(--color-text-muted)
```

[Read the mozilla docs for more about using css variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties#using_the_root_pseudo-class)

The inclusion of styles from `primitives.css`, `light.css` and `dark.css` will allow you to use mode aware variables.

`primatives` and `light` are scoped to the root:

```css
:root { ...
```

`dark` is scoped to a `.dark` root modifier

```css
:root.dark, .dark { ...
```

this means you can target mode switching with a `.dark` class, and any children of that class will inherit the mode. Applying the class to the html `<body>` element applies the mode globally.

```html
<body class="dark">
	All ancestors will inherit dark mode
</body>
```

You can use the same method to apply the dark mode at a component level

```css
.text-class: var(--color-text);
```

```html
<div class="dark">
	<p class="text-class">I'm in dark mode regardless as my parent has a 'dark' class</p>
</div>

<div>
	<p class="text-class">
		I'm in light mode unless a 'dark' class has been applied to one of my ancestors
	</p>
</div>
```

If working in an environment that uses the tailwind setup from `@ldn-viz/themes` package the theme switching and css setup is already done.

You can check [our storybook](https://greater-london-authority.github.io/ldn-viz-tools/) for further information.

### Using raw colour values

If you are preparing a presentation in a non web format (e.g. Powerpoint) where you are not using css or web technologies you may use raw color values. In all other circumstances you should use the tokens provided by the design system.

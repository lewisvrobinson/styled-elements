# Styled Elements

![Specs](https://github.com/lewisvrobinson/styled-elements/workflows/Specs/badge.svg)

🚨 An **experiment** to recreate the [styled-components](https://github.com/styled-components) API (kinda).

Element styles are appended to a `<style>` element. Each styled element is assigned a unique ID to scope the styles. This ID is appended to the elements `classList`.

Because this runs in the browser rather than as part of a build step all styling will be applied *after* the JS has been parsed by the client. This will cause there to be a flash of unstyled elements and therefore is not intended for production.

## Create a styled element

```js
const myElement = styled.div`
  background: lightgreen;
  padding: 2em;
  margin-bottom: 2em; 
  border-radius: 0.5em;
`
```

## Style existing elements
```js
const existingElement = document.querySelector('button')

styled(existingElement)`
  padding: 2em;
  background: linear-gradient(
    ${45}deg, 
    purple, 
    rebeccapurple
  );
  color: white;
`
```

## Theming

```js
styled.setTheme({ 
  colors: { primary: 'purple' }
})
        
const themedElement = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
`
```

## Global Styles
The globalCSS method can create global styles.

```js
globalCSS`
  *>* {
    box-sizing: border-box;
  }
  body {
    background: #fff;
    border: 1em solid #eee;
    padding: 1em;
    margin: 0;
    min-height: 100vh;
  }
  pre {
    background: #eee;
    padding: .5em
  }
  code { color: #333;}
`
```

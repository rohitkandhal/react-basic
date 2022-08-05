// React.createContext
// Context is designed to share data that can be considered “global” for a tree of React components,
// such as the current authenticated user, theme, or preferred language

import { createContext, useContext, useState } from "react";

// Use Case When props need to be shared with most of a tree of components.

// 1. Create new context at root level using `createContext` hook
//        const ThemeContext = createContext(themes.light);
//
// 2. Define context in a container so that all child elements will theme context value
//        <ThemeContext.Provider value={valueFromUseStateHook} >
//             <Toolbar />   // No need to pass theme now.
//        </ThemeContext.Provider>
// 
// 3. Consume value using `useContext` hook
//        const [foreground, background] = useContext(ThemeContext)

// React Context is designed for low frequency updates (Authenticated User, Theme, Locale (language))
// React Context is not designed for high frequency updates (keyboard input)
// React Context by default causes a rerender of all components on the page

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#eeeeee",
    background: "gray"
  }
};

// Create context to share between components 
const ThemeContext = createContext(themes.light);

export function React11WithContext() {
  const [themeName, setThemeName] = useState("light");
  const currentTheme = themes[themeName];

  return (
    <>
      <div style={{ color: currentTheme.foreground, background: currentTheme.background }}>
        <input type="radio" name="selectedTheme" value="dark" id="darkRadio" onChange={(e) => setThemeName(e.target.value)} />
        <label htmlFor="darkRadio" >Dark</label>
        <input type="radio" name="selectedTheme" value="light" id="lightRadio" onChange={(e) => setThemeName(e.target.value)} />
        <label htmlFor="lightRadio" > Light</label>
      </div>

      <ThemeContext.Provider value={currentTheme}>
        <Toolbar />
      </ThemeContext.Provider>

    </>
  )
}

// No need to pass theme
function Toolbar() {
  return <ThemedButton />
}

function ThemedButton() {
  const { foreground, background } = useContext(ThemeContext);

  return (
    <button style={{ color: foreground, background: background }}>Themed Button</button>
  )
}
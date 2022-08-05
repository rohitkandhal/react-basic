// React.createContext
// Context is designed to share data that can be considered “global” for a tree of React components,
// such as the current authenticated user, theme, or preferred language

import { useState } from "react";

// Use Case When props need to be shared with most of a tree of components.

// Example without using context.
// You need to pass props everywhere

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

export function React10WithoutContext() {
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

      <Toolbar theme={currentTheme} />
    </>
  )
}

function Toolbar({ theme }) {
  return <ThemedButton theme={theme} />
}

function ThemedButton({ theme }) {
  const { foreground, background } = theme;

  return (
    <button style={{ color: foreground, background: background }}>Themed Button</button>
  )
}

// The Problem with this approach is that you need to pass theme from parent to each and every child component to use it.
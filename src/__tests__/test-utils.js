import React from 'react'
import { render } from '@testing-library/react'
import { GamePhaseContext } from "../components/contextProviders/GamePhaseProvider";

const AllTheProviders = ({ children }) => {
  return (
    <GamePhaseContext >
        {children}
    </GamePhaseContext>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
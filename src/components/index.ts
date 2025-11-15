/**
 * Central export hub for application components.
 *
 * This file re-exports all reusable UI components used across
 * the application, providing a single entry point for imports.
 * This keeps imports cleaner and the project structure organized.
 *
 * Exports:
 *  - Container
 *  - Footer
 *  - Header
 *  - Animations/..
 *  - Post/..
 *  - ErrorMessage
 */

export { default as Container } from './Container';
export { default as Footer } from './Footer';
export { default as Header } from './Header';
export { default as ErrorMessage } from './ErrorMessage';
export * from './Animations';
export * from './Post';
export * from './Markdown';

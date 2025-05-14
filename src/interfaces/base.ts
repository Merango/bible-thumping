/**
 * Base interfaces for multi-agent chat platform
 * Defines core abstractions and contracts for system components
 */

// Define common error handling structure
export interface ErrorResponse {
  code: string;
  message: string;
  timestamp: number;
}

// Generic interface for data validation
export interface Validator<T> {
  validate(data: T): boolean;
  getErrors(): string[];
}

// Base interface for all components
export interface BaseComponent {
  id: string;
  name: string;
  version: string;
  validateState(): boolean;
}

// Logging and tracing interface
export interface Logger {
  info(message: string, context?: Record<string, unknown>): void;
  warn(message: string, context?: Record<string, unknown>): void;
  error(message: string, error?: Error, context?: Record<string, unknown>): void;
}

// Generic result wrapper for consistent response handling
export interface Result<T> {
  success: boolean;
  data?: T;
  error?: ErrorResponse;
}

// Configuration management interface
export interface ConfigManager {
  get<T>(key: string, defaultValue?: T): T;
  set<T>(key: string, value: T): void;
  validate(): boolean;
}
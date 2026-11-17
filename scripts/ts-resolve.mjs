// Resolver imports relativos sin extensión de los módulos TypeScript del proyecto.
import { registerHooks } from 'node:module';
registerHooks({ resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('.') && !/\.[cm]?[jt]sx?$/.test(specifier)) {
    try { return nextResolve(`${specifier}.ts`, context); } catch (error) {
      if (error.code !== 'ERR_MODULE_NOT_FOUND') throw error;
    }
  }
  return nextResolve(specifier, context);
} });

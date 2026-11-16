import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
  it("resolves the new reading module without falling back to 404",()=>{
    const router=createRouter({routeTree,context:{queryClient:new QueryClient()}});
    const matches=router.matchRoutes("/lectura");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    expect(matches.at(-1)?.routeId).toBe("/lectura");
  });
  it("resolves /redaccion with generated route metadata",()=>{
    const router=createRouter({routeTree,context:{queryClient:new QueryClient()}});
    expect(router.matchRoutes("/redaccion").at(-1)?.routeId).toBe("/redaccion");
  });
});
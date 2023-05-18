import { Page } from "@playwright/test";
import { GUI } from "../models/GUI";
export interface TestProps {
    page: Page;
    GUI: GUI;
}
/**
 * Extend base test to inject a wallet, the GUI page object model, and redirect RPC requests to Anvil
 */
export declare const test: import("@playwright/test").TestType<import("@playwright/test").PlaywrightTestArgs & import("@playwright/test").PlaywrightTestOptions & {
    gui: GUI;
}, import("@playwright/test").PlaywrightWorkerArgs & import("@playwright/test").PlaywrightWorkerOptions>;

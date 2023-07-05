import { test } from "@guardianui/test";

test.describe("JonesDAO", () => {
    test("Should deposit AURA into jAURA vault", async ({ page, gui }) => {
        // Initialize fork
        await gui.initializeChain(1);

        // Navigate to site
        await page.goto("https://app.jonesdao.io/vaults");

        // Set up wallet
        const auraToken = "0xC0c293ce456fF0ED870ADd98a0828Dd4d2903DBF";
        const depositContract = "0xf01dd67ed9006f13f79ba9de1a370864ad92b449";
        await gui.setEthBalance("100000000000000000000000");
        await gui.setAllowance(auraToken, depositContract, "1000000000000000000000000");
        await gui.setBalance(auraToken, "1000000000000000000000000");

        // Dismiss ToS modal
        await page.locator("input[name='apy']").check();
        await page.locator("input[name='risk']").check();
        await page.locator("input[name='ui']").check();
        await page.locator("input[name='countries']").check();
        await page.getByRole('button', { name: 'Accept Terms' }).click();

        // Navigate to the AURA vault
        // Do this after setting up the wallet and AURA balance, otherwise the dApp won't recognise the balance
        await page.locator(`h2:has-text('jAURA')`).click();

        // Enter input amount
        await page.getByRole('complementary').getByPlaceholder('0.00').waitFor();
        await page.getByRole('complementary').getByPlaceholder('0.00').click();
        await page.getByRole('complementary').getByPlaceholder('0.00').fill('1.0');
        await page.getByRole('complementary').getByPlaceholder('0.00').press('Enter');

        // Select vault
        await page.getByLabel('jAURA', { exact: true }).check();

        // Execute
        await page.locator(`button:near(:text("Deposit into:"))`).click();

        // Submit stake transaction
        await gui.validateContractInteraction(`button:near(:text("Deposit into:"))`, depositContract);
    });
});

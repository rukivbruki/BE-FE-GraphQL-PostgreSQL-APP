import {test} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('http://127.0.0.1:5173/');
});

test.describe('Show the table applied filters or search', () => {
    test('the transactions table should be shown', async ({page}) => {
        await page.getByRole('combobox', {name: 'Bank:'}).selectOption('Business SuperBank');
        await page.getByRole('combobox', { name: 'Account:' }).selectOption('Mr. Kevin (Bills)');
        await page.getByLabel('Start date:').fill('2018-01-01');
        await page.locator('div').filter({ hasText: 'Search transaction' }).nth(3).click();
        await page.locator('#date').nth(1).fill('2021-01-01');
        await page.locator('div').filter({ hasText: 'Search transaction' }).nth(2).click();
        await page.getByRole('link', { name: '2020-11-02 2725 EUR Calving Administrate Imperatorian Refunds' }).click();
        await page.getByRole('link', { name: 'Back to transactions list' }).click();
    })
});
